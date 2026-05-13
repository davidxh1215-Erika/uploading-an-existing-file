export const runtime = 'edge';

export async function POST(request) {
  const { contacts, productType, language = 'en' } = await request.json();
  const encoder = new TextEncoder();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

      if (!apiKey) {
        send({ type: 'error', message: '请先在 Vercel 配置 ANTHROPIC_API_KEY' });
        controller.close();
        return;
      }

      const productDesc = {
        both: 'biodegradable paper bags and compostable garbage/trash bags',
        paper: 'biodegradable kraft paper bags and eco-friendly shopping bags',
        trash: 'biodegradable garbage bags and compostable bin liners',
      }[productType] || 'biodegradable paper bags and compostable garbage bags';

      send({ type: 'log', message: `📝 正在为 ${contacts.length} 位联系人生成开发信...` });

      const results = [];

      for (let i = 0; i < contacts.length; i++) {
        const c = contacts[i];
        send({ type: 'progress', value: Math.round(((i + 1) / contacts.length) * 100) });
        send({ type: 'log', message: `✉️ 生成第 ${i + 1}/${contacts.length}: ${c.name} @ ${c.company}` });

        // Generate email address guesses
        const nameParts = (c.name || '').trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts[nameParts.length - 1] || '';
        const domain = (c.website || '').replace(/^www\./, '');
        const emailFormats = [
          `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
          `${firstName[0]?.toLowerCase() || ''}${lastName.toLowerCase()}@${domain}`,
          `${firstName.toLowerCase()}@${domain}`,
          `${firstName.toLowerCase()}${lastName.toLowerCase()}@${domain}`,
        ];

        // Generate email content via Claude
        const prompt = `Write a professional, concise B2B cold outreach email in English from a Chinese manufacturer of ${productDesc} to ${c.name} (${c.title}) at ${c.company} (${c.country}).

Key points to include:
- We are a manufacturer based in China specializing in eco-friendly/biodegradable packaging
- Our products are certified (BPI, OK Compost, EN 13432) and meet international standards
- Competitive pricing, MOQ flexibility, OEM/private label available
- Relevant to their role as ${c.title}

Requirements:
- Subject line: compelling, under 10 words
- Body: 3-4 short paragraphs, professional but warm
- Clear CTA (schedule a call or request samples)
- Personalize to their company type (${c.type || 'retailer'}) and country (${c.country})
- Total length: 150-200 words

Return ONLY a JSON object, no markdown:
{"subject":"Email subject here","body":"Full email body here with \\n for line breaks"}`;

        try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 600,
              messages: [{ role: 'user', content: prompt }],
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              results.push({
                ...c,
                emailFormats,
                subject: parsed.subject || '',
                body: parsed.body || '',
              });
            } else {
              results.push({ ...c, emailFormats, subject: '', body: text });
            }
          } else {
            results.push({ ...c, emailFormats, subject: 'Eco-Friendly Packaging Partnership Opportunity', body: '' });
          }
        } catch {
          results.push({ ...c, emailFormats, subject: '', body: '' });
        }

        send({ type: 'email', data: results[results.length - 1] });
      }

      send({ type: 'done', total: results.length });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
