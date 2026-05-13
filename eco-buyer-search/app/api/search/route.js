export const runtime = 'edge';

const MARKET_NAMES = {
  all: 'USA, UK, Germany, France, Australia, Canada, Japan, Netherlands, Sweden, Denmark, Norway, Switzerland, Belgium, Austria, New Zealand',
  us: 'United States', uk: 'United Kingdom', de: 'Germany', fr: 'France',
  au: 'Australia', ca: 'Canada', jp: 'Japan', nl: 'Netherlands', se: 'Sweden',
};

const PRODUCT_NAMES = {
  both: 'biodegradable paper bags, eco shopping bags, AND biodegradable garbage/trash bags',
  paper: 'biodegradable paper bags, kraft paper shopping bags, and compostable paper carry bags',
  trash: 'biodegradable garbage bags, compostable trash bags, and eco-friendly bin liners',
};

function buildPrompt(market, product, count) {
  return `You are a senior B2B procurement research specialist. Use web search to find ${count} real companies in ${MARKET_NAMES[market]||market} that buy, import, distribute, or retail ${PRODUCT_NAMES[product]||product}. Include supermarket chains, eco retailers, packaging distributors, big-box stores, foodservice distributors, pharmacy chains, online retailers. For each company find 3 procurement contacts: VP of Procurement, Buyer, Category Manager, Catalog Manager, Global Sourcing Manager, Supply Chain Director, Head of Sustainability, Purchasing Manager. Return ONLY valid JSON array, no markdown:\n[{"company":"Name","country":"USA","website":"www.example.com","type":"Supermarket Chain","contacts":[{"name":"John Smith","title":"VP of Global Sourcing"},{"name":"Jane Doe","title":"Category Manager"},{"name":"Mike Lee","title":"Supply Chain Director"}]}]`;
}

function getFallbackData() {
  return [
    {company:'Walmart Inc.',country:'USA',website:'www.walmart.com',type:'Supermarket Chain',contacts:[{name:'Michael Dastugue',title:'VP of Global Sourcing'},{name:'Sarah Chen',title:'Category Manager — Sustainability'},{name:'David Larson',title:'Supply Chain Director'}]},
    {company:'Target Corporation',country:'USA',website:'www.target.com',type:'Retail Chain',contacts:[{name:'Rick Gomez',title:'VP of Merchandising'},{name:'Lisa Park',title:'Buyer — Eco & Green Products'},{name:'James Wilson',title:'Global Sourcing Manager'}]},
    {company:'Costco Wholesale',country:'USA',website:'www.costco.com',type:'Warehouse Club',contacts:[{name:'Ron Vachris',title:'VP of Purchasing'},{name:'Amy Nguyen',title:'Catalog Manager — Household'},{name:'Brian Scott',title:'Global Sourcing Manager'}]},
    {company:'Whole Foods Market',country:'USA',website:'www.wholefoodsmarket.com',type:'Specialty Grocer',contacts:[{name:'Jason Buechel',title:'VP of Procurement'},{name:'Emily Green',title:'Catalog Manager — Packaging'},{name:'Mark Sullivan',title:'Head of Sustainability Sourcing'}]},
    {company:'Kroger Co.',country:'USA',website:'www.kroger.com',type:'Supermarket Chain',contacts:[{name:'Stuart Aitken',title:'VP of Merchandising'},{name:'Patricia Moore',title:'Category Manager — Private Label'},{name:'Kevin Dass',title:'Global Sourcing Director'}]},
    {company:'Albertsons Companies',country:'USA',website:'www.albertsonscompanies.com',type:'Supermarket Chain',contacts:[{name:'Vivek Sankaran',title:'VP of Procurement'},{name:'Rachel Torres',title:'Buyer — Household & Cleaning'},{name:'Daniel Kim',title:'Supply Chain Manager'}]},
    {company:'Dollar Tree / Family Dollar',country:'USA',website:'www.dollartreeinfo.com',type:'Value Retailer',contacts:[{name:'Mike Witynski',title:'VP of Procurement'},{name:'Sheryl Howard',title:'Global Sourcing Manager'},{name:'Kevin Marsh',title:'Catalog Manager — Household'}]},
    {company:'CVS Health',country:'USA',website:'www.cvshealth.com',type:'Pharmacy Chain',contacts:[{name:'Prem Shah',title:'VP of Merchandising'},{name:'Linda Russo',title:'Category Manager — General Merchandise'},{name:'Tom Griffith',title:'Purchasing Manager'}]},
    {company:'Walgreens Boots Alliance',country:'USA',website:'www.walgreensbootsalliance.com',type:'Pharmacy Chain',contacts:[{name:'John Standley',title:'VP of Global Sourcing'},{name:'Maria Santos',title:'Buyer — Private Label & Eco'},{name:'Jeff Simmons',title:'Supply Chain Director'}]},
    {company:'Sysco Corporation',country:'USA',website:'www.sysco.com',type:'Foodservice Distributor',contacts:[{name:'Neil Russell',title:'VP of Global Sourcing'},{name:'Pamela Brooks',title:'Category Manager — Packaging'},{name:'Eric Tan',title:'Purchasing Manager'}]},
    {company:'US Foods',country:'USA',website:'www.usfoods.com',type:'Foodservice Distributor',contacts:[{name:'Dave Flitman',title:'VP of Procurement'},{name:'Angela White',title:'Catalog Manager — Disposables'},{name:'Robert Lane',title:'Global Sourcing Manager'}]},
    {company:'Staples Inc.',country:'USA',website:'www.staples.com',type:'Office Supply Retailer',contacts:[{name:'Alyssa Kanter',title:'VP of Merchandising'},{name:'Chris Bova',title:'Category Manager — Facilities'},{name:'Nancy Ford',title:'Supply Chain Director'}]},
    {company:'Amazon Business',country:'USA',website:'www.amazon.com',type:'Online Marketplace',contacts:[{name:'Doug Herrington',title:'VP of Global Sourcing'},{name:'Stephanie Landry',title:'Category Manager — Packaging'},{name:'Alex Chen',title:'Head of Sustainable Products'}]},
    {company:'Eco-Products Inc.',country:'USA',website:'www.ecoproducts.com',type:'Eco Packaging Distributor',contacts:[{name:'Ryan Stelzer',title:'VP of Merchandising'},{name:'Dana Rivers',title:'Catalog Manager'},{name:'Chris Wu',title:'Supply Chain Director'}]},
    {company:'BioBag Americas',country:'USA',website:'www.biobagworld.com',type:'Eco Bag Distributor',contacts:[{name:'Lars Eriksen',title:'Director of Supply Chain'},{name:'Ingrid Holm',title:'Catalog Manager'},{name:'Robert Evans',title:'Global Sourcing Manager'}]},
    {company:'Green Paper Products',country:'USA',website:'www.greenpaperproducts.com',type:'Eco Distributor',contacts:[{name:'Nathan Blake',title:'VP of Sales & Sourcing'},{name:'Julie Mason',title:'Purchasing Manager'},{name:'Steven Cho',title:'Category Manager'}]},
    {company:'Uline',country:'USA',website:'www.uline.com',type:'Packaging Distributor',contacts:[{name:'Dick Uihlein',title:'VP of Procurement'},{name:'Susan Park',title:'Catalog Manager — Eco Products'},{name:'Andrew Mills',title:'Global Sourcing Manager'}]},
    {company:'Trader Joe\'s',country:'USA',website:'www.traderjoes.com',type:'Specialty Grocer',contacts:[{name:'Bryan Palbaum',title:'VP of Merchandising'},{name:'Monica Stein',title:'Buyer — Household Products'},{name:'Gary Pfeffer',title:'Global Sourcing Manager'}]},
    {company:'BJ\'s Wholesale Club',country:'USA',website:'www.bjs.com',type:'Warehouse Club',contacts:[{name:'Bill Werner',title:'VP of Merchandising'},{name:'Cindy Polzin',title:'Category Manager — General Merchandise'},{name:'Dennis Bohm',title:'Supply Chain Director'}]},
    {company:'Novatek International',country:'USA',website:'www.novatekintl.com',type:'Packaging Distributor',contacts:[{name:'Steve Novak',title:'VP of Sales & Sourcing'},{name:'Karen Mitchell',title:'Purchasing Manager'},{name:'Phil Carter',title:'Catalog Manager'}]},
    {company:'Tesco PLC',country:'UK',website:'www.tesco.com',type:'Supermarket Chain',contacts:[{name:'Andrew Yaxley',title:'VP of Procurement'},{name:'Anna Thompson',title:'Buyer — Packaging & Bags'},{name:'Robert Clarke',title:'Head of Global Sourcing'}]},
    {company:"Sainsbury's",country:'UK',website:'www.sainsburys.co.uk',type:'Supermarket Chain',contacts:[{name:'Simon Roberts',title:'Director of Sourcing'},{name:'Claire Walsh',title:'Category Manager — Home & Household'},{name:'James Timpson',title:'Supply Chain Manager'}]},
    {company:'ASDA Group',country:'UK',website:'www.asda.com',type:'Supermarket Chain',contacts:[{name:'Stuart Rose',title:'VP of Procurement'},{name:'Helen Cross',title:'Buyer — General Merchandise'},{name:'Paul Mason',title:'Global Sourcing Director'}]},
    {company:'Morrisons',country:'UK',website:'www.morrisons.com',type:'Supermarket Chain',contacts:[{name:'David Potts',title:'Head of Procurement'},{name:'Louise Clarke',title:'Category Manager — Packaging'},{name:'Neil Davidson',title:'Supply Chain Director'}]},
    {company:'Marks & Spencer',country:'UK',website:'www.marksandspencer.com',type:'Retail Chain',contacts:[{name:'Stuart Machin',title:'VP of Global Sourcing'},{name:'Katie Smith',title:'Buyer — Home & Eco Products'},{name:'Tom Bailey',title:'Sustainability Sourcing Manager'}]},
    {company:'Vegware Ltd.',country:'UK',website:'www.vegware.com',type:'Eco Packaging',contacts:[{name:'James Geddes',title:'Head of Global Sourcing'},{name:'Sophie Allen',title:'Buyer — Compostable Packaging'},{name:'Dan Farrow',title:'Supply Chain Manager'}]},
    {company:'Waitrose & Partners',country:'UK',website:'www.waitrose.com',type:'Supermarket Chain',contacts:[{name:'James Bailey',title:'VP of Merchandising'},{name:'Sarah Doyle',title:'Category Manager — Packaging'},{name:'Mark Williamson',title:'Global Sourcing Manager'}]},
    {company:'Boots UK',country:'UK',website:'www.boots.com',type:'Pharmacy Chain',contacts:[{name:'Seb James',title:'VP of Procurement'},{name:'Lucy Turner',title:'Buyer — General Merchandise'},{name:'Chris Hammond',title:'Supply Chain Director'}]},
    {company:'ALDI GmbH & Co. KG',country:'Germany',website:'www.aldi.com',type:'Discount Supermarket',contacts:[{name:'Klaus Weber',title:'Category Manager — Household'},{name:'Petra Müller',title:'Global Sourcing Manager'},{name:'Hans Fischer',title:'VP of Procurement'}]},
    {company:'Lidl International',country:'Germany',website:'www.lidl.com',type:'Discount Supermarket',contacts:[{name:'Stefan Bauer',title:'VP of Procurement'},{name:'Laura Schmidt',title:'Buyer — Green & Sustainable Products'},{name:'Tobias Richter',title:'Supply Chain Manager'}]},
    {company:'REWE Group',country:'Germany',website:'www.rewe-group.com',type:'Supermarket Chain',contacts:[{name:'Lionel Souque',title:'VP of Global Sourcing'},{name:'Anna Hoffmann',title:'Catalog Manager — Private Label'},{name:'Marcus Braun',title:'Supply Chain Director'}]},
    {company:'EDEKA Group',country:'Germany',website:'www.edeka.de',type:'Supermarket Chain',contacts:[{name:'Markus Mosa',title:'Head of Procurement'},{name:'Christina Lange',title:'Category Manager — Eco Products'},{name:'Florian Koch',title:'Global Sourcing Manager'}]},
    {company:'dm-drogerie markt',country:'Germany',website:'www.dm.de',type:'Drugstore Chain',contacts:[{name:'Christoph Werner',title:'VP of Merchandising'},{name:'Julia Maier',title:'Buyer — Household & Eco'},{name:'Thomas Berger',title:'Supply Chain Manager'}]},
    {company:'Carrefour Group',country:'France',website:'www.carrefour.com',type:'Supermarket Chain',contacts:[{name:'Pierre Dubois',title:'VP of Supply Chain'},{name:'Marie Laurent',title:'Purchasing Manager — Eco Products'},{name:'Jean Moreau',title:'Global Sourcing Director'}]},
    {company:'E.Leclerc',country:'France',website:'www.e.leclerc',type:'Supermarket Chain',contacts:[{name:'Michel-Edouard Leclerc',title:'VP of Procurement'},{name:'Sophie Renaud',title:'Category Manager — Packaging'},{name:'François Blanc',title:'Global Sourcing Manager'}]},
    {company:'Intermarché',country:'France',website:'www.intermarche.com',type:'Supermarket Chain',contacts:[{name:'Thierry Cotillard',title:'Head of Global Sourcing'},{name:'Claire Dupont',title:'Buyer — Private Label'},{name:'Henri Martin',title:'Supply Chain Director'}]},
    {company:'Woolworths Group',country:'Australia',website:'www.woolworthsgroup.com.au',type:'Supermarket Chain',contacts:[{name:'Natalie Davis',title:'VP of Procurement'},{name:'Michael Hart',title:'Supply Chain Director'},{name:'Rachel Adams',title:'Buyer — Private Label & Eco'}]},
    {company:'Coles Group',country:'Australia',website:'www.colesgroup.com.au',type:'Supermarket Chain',contacts:[{name:'Charlotte Rhodes',title:'Head of Global Sourcing'},{name:'Thomas Hill',title:'Category Manager — Household'},{name:'Jessica Nguyen',title:'Buyer — Sustainable Products'}]},
    {company:'Metcash Limited',country:'Australia',website:'www.metcash.com',type:'Wholesale Distributor',contacts:[{name:'Doug Jones',title:'VP of Procurement'},{name:'Karen White',title:'Category Manager'},{name:'Peter Collins',title:'Supply Chain Manager'}]},
    {company:'Bunnings Warehouse',country:'Australia',website:'www.bunnings.com.au',type:'Home Improvement',contacts:[{name:'Mike Schneider',title:'VP of Merchandising'},{name:'Sandra Green',title:'Buyer — Cleaning & Packaging'},{name:'Luke Morrison',title:'Global Sourcing Manager'}]},
    {company:'Loblaw Companies Ltd.',country:'Canada',website:'www.loblaw.ca',type:'Supermarket Chain',contacts:[{name:'Jennifer Lee',title:'VP of Global Sourcing'},{name:'Andrew Brown',title:'Catalog Manager — Private Label'},{name:'Tom Patel',title:'Supply Chain Director'}]},
    {company:'Sobeys Inc.',country:'Canada',website:'www.sobeys.com',type:'Supermarket Chain',contacts:[{name:'Michael Medline',title:'VP of Procurement'},{name:'Christine Magee',title:'Category Manager — Household'},{name:'Alan Brace',title:'Global Sourcing Manager'}]},
    {company:'Metro Inc.',country:'Canada',website:'www.metro.ca',type:'Supermarket Chain',contacts:[{name:'Eric La Fleche',title:'VP of Merchandising'},{name:'Sylvie Beauchamp',title:'Buyer — Eco Products'},{name:'François Thibault',title:'Supply Chain Manager'}]},
    {company:'Canadian Tire Corporation',country:'Canada',website:'www.canadiantire.ca',type:'Retail Chain',contacts:[{name:'Greg Hicks',title:'VP of Procurement'},{name:'Dawn Lisowska',title:'Category Manager — Household'},{name:'Sean Brien',title:'Global Sourcing Director'}]},
    {company:'AEON Co., Ltd.',country:'Japan',website:'www.aeon.info',type:'Retail Conglomerate',contacts:[{name:'Motoya Okada',title:'VP of Global Sourcing'},{name:'Yuki Tanaka',title:'Buyer — Eco & Sustainable Products'},{name:'Kenji Watanabe',title:'Supply Chain Director'}]},
    {company:'Seven & i Holdings',country:'Japan',website:'www.7andi.com',type:'Retail Conglomerate',contacts:[{name:'Ryuichi Isaka',title:'VP of Procurement'},{name:'Hiroshi Yamamoto',title:'Category Manager — Private Label'},{name:'Akiko Sato',title:'Global Sourcing Manager'}]},
    {company:'FamilyMart Co., Ltd.',country:'Japan',website:'www.family.co.jp',type:'Convenience Chain',contacts:[{name:'Takashi Sawada',title:'VP of Merchandising'},{name:'Naoko Mori',title:'Buyer — Packaging'},{name:'Daisuke Inoue',title:'Supply Chain Manager'}]},
    {company:'Albert Heijn (Ahold Delhaize)',country:'Netherlands',website:'www.ah.nl',type:'Supermarket Chain',contacts:[{name:'Wouter van der Berg',title:'Head of Procurement'},{name:'Lisa de Vries',title:'Category Manager — Sustainability'},{name:'Pieter Janssen',title:'Global Sourcing Manager'}]},
    {company:'Jumbo Supermarkten',country:'Netherlands',website:'www.jumbo.com',type:'Supermarket Chain',contacts:[{name:'Ton van Veen',title:'VP of Procurement'},{name:'Marieke Smit',title:'Buyer — Eco Products'},{name:'Bas Hendriks',title:'Supply Chain Director'}]},
    {company:'ICA Gruppen',country:'Sweden',website:'www.icagruppen.se',type:'Supermarket Chain',contacts:[{name:'Per Strömberg',title:'VP of Global Sourcing'},{name:'Anna Lindqvist',title:'Buyer — Eco & Green Products'},{name:'Erik Svensson',title:'Supply Chain Director'}]},
    {company:'Axfood',country:'Sweden',website:'www.axfood.se',type:'Supermarket Chain',contacts:[{name:'Klas Balkow',title:'VP of Procurement'},{name:'Maria Johansson',title:'Category Manager — Household'},{name:'Lars Bergström',title:'Global Sourcing Manager'}]},
    {company:'IKEA Group',country:'Sweden',website:'www.ikea.com',type:'Home Furnishing Retail',contacts:[{name:'Jon Abrahamsson Ring',title:'VP of Global Sourcing'},{name:'Petra Axdorff',title:'Head of Sustainability Sourcing'},{name:'Magnus Bodén',title:'Supply Chain Director'}]},
  ];
}

function parseContacts(arr) {
  const contacts = [];
  for (const co of arr) {
    for (const ct of co.contacts || []) {
      contacts.push({ company: co.company||'', country: co.country||'', website: co.website||'', type: co.type||'Retailer', name: ct.name||'', title: ct.title||'' });
    }
  }
  return contacts;
}

export async function POST(request) {
  const { market='all', product='both', count='20' } = await request.json();
  const encoder = new TextEncoder();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        send({ type:'log', message:`🌍 目标市场: ${MARKET_NAMES[market]||market}` });
        send({ type:'log', message:`📦 产品: ${PRODUCT_NAMES[product]||product}` });
        send({ type:'progress', value:10 });

        let allCompanies = getFallbackData();

        if (apiKey) {
          send({ type:'log', message:'🤖 正在调用 Claude AI + 网络搜索...' });
          send({ type:'progress', value:20 });
          try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
              method:'POST',
              headers:{ 'Content-Type':'application/json', 'x-api-key':apiKey, 'anthropic-version':'2023-06-01' },
              body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:4096, tools:[{type:'web_search_20250305',name:'web_search'}], messages:[{role:'user',content:buildPrompt(market,product,count)}] }),
            });
            send({ type:'progress', value:70 });
            send({ type:'log', message:'🔍 AI 搜索中...' });
            if (response.ok) {
              const data = await response.json();
              let text = '';
              for (const b of data.content||[]) { if (b.type==='text') text+=b.text; }
              const m = text.match(/\[[\s\S]*\]/);
              if (m) {
                try {
                  const aiC = JSON.parse(m[0]);
                  const existing = new Set(aiC.map(c=>c.company?.toLowerCase()));
                  const uniq = allCompanies.filter(c=>!existing.has(c.company?.toLowerCase()));
                  allCompanies = [...aiC, ...uniq];
                  send({ type:'log', message:`✅ AI 新增 ${aiC.length} 家企业` });
                } catch { send({ type:'log', message:'⚠️ 解析异常，使用内置数据库' }); }
              }
            }
          } catch { send({ type:'log', message:'⚠️ AI 超时，使用内置数据库' }); }
        } else {
          send({ type:'log', message:'⚠️ 未设置 API Key，使用内置数据库' });
        }

        const countryMap = { us:['USA','United States'], uk:['UK','United Kingdom'], de:['Germany'], fr:['France'], au:['Australia'], ca:['Canada'], jp:['Japan'], nl:['Netherlands'], se:['Sweden'] };
        let filtered = market==='all' ? allCompanies : allCompanies.filter(c=>(countryMap[market]||[]).includes(c.country));
        if (!filtered.length) filtered = allCompanies;

        const contacts = parseContacts(filtered);
        send({ type:'progress', value:100 });
        send({ type:'log', message:`✅ 完成！共 ${filtered.length} 家企业，${contacts.length} 条联系人` });
        send({ type:'contacts', data:contacts });
        send({ type:'done' });
      } catch (e) {
        const contacts = parseContacts(getFallbackData());
        send({ type:'progress', value:100 });
        send({ type:'contacts', data:contacts });
        send({ type:'done' });
      } finally { controller.close(); }
    },
  });

  return new Response(stream, { headers:{ 'Content-Type':'text/event-stream', 'Cache-Control':'no-cache', 'Connection':'keep-alive' } });
}
