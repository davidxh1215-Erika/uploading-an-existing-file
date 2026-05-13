'use client';

import { useState, useRef, useCallback } from 'react';

/* ─── Constants ─────────────────────────────────────────────── */
const FLAGS = {
  USA: '🇺🇸', 'United States': '🇺🇸',
  UK: '🇬🇧', 'United Kingdom': '🇬🇧',
  Germany: '🇩🇪', France: '🇫🇷',
  Australia: '🇦🇺', Canada: '🇨🇦',
  Japan: '🇯🇵', Netherlands: '🇳🇱',
  Sweden: '🇸🇪', Denmark: '🇩🇰', Norway: '🇳🇴',
};

function getFlag(country) {
  return FLAGS[country] || '🌍';
}

function getRoleBadge(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('vp') || t.includes('vice president') || t.includes('director') || t.includes('head of'))
    return { bg: 'bg-violet-100', text: 'text-violet-800', dot: 'bg-violet-400', label: 'VP / Director' };
  if (t.includes('catalog'))
    return { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-400', label: 'Catalog Mgr' };
  if (t.includes('sourcing'))
    return { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-400', label: 'Sourcing' };
  if (t.includes('supply chain'))
    return { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-400', label: 'Supply Chain' };
  if (t.includes('buyer') || t.includes('purchasing') || t.includes('procurement'))
    return { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-400', label: 'Buyer' };
  return { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400', label: 'Manager' };
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function Home() {
  const [market, setMarket]   = useState('all');
  const [product, setProduct] = useState('both');
  const [count, setCount]     = useState('20');

  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs]         = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [elapsed, setElapsed]   = useState(0);
  const [copied, setCopied]     = useState(false);

  const timerRef = useRef(null);
  const logRef   = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs((prev) => [...prev, msg]);
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 50);
  }, []);

  /* ── Search ── */
  const startSearch = async () => {
    setLoading(true);
    setProgress(0);
    setLogs([]);
    setContacts([]);
    setSelected(new Set());
    setElapsed(0);

    const t0 = Date.now();
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - t0) / 1000)), 500);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market, product, count }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const evt = JSON.parse(line.slice(6));
            if (evt.type === 'log')      addLog(evt.message);
            if (evt.type === 'progress') setProgress(evt.value);
            if (evt.type === 'contacts') {
              setContacts(evt.data);
              setSelected(new Set(evt.data.map((_, i) => i)));
            }
          } catch { /* ignore parse errors */ }
        }
      }
    } catch (err) {
      addLog(`❌ 错误: ${err.message}`);
    } finally {
      clearInterval(timerRef.current);
      setLoading(false);
    }
  };

  /* ── Selection ── */
  const toggleSelect = (i) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === contacts.length ? new Set() : new Set(contacts.map((_, i) => i))
    );
  };

  const getSelected = () => contacts.filter((_, i) => selected.has(i));

  /* ── Export / Email ── */
  const openEmailGen = () => {
    const sel = getSelected();
    if (!sel.length) return;
    const text = sel
      .map((c) => `Company: ${c.company} | Country: ${c.country} | Name: ${c.name} | Title: ${c.title} | Website: ${c.website}`)
      .join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
    window.open('https://v0-email-generator-one.vercel.app/', '_blank');
  };

  const exportCSV = () => {
    const sel = getSelected();
    if (!sel.length) return;
    const bom = '\uFEFF';
    const header = 'Company,Country,Website,Company Type,Contact Name,Title\n';
    const rows = sel
      .map((c) => `"${c.company}","${c.country}","${c.website}","${c.type}","${c.name}","${c.title}"`)
      .join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([bom + header + rows], { type: 'text/csv;charset=utf-8' }));
    a.download = `eco_buyers_${Date.now()}.csv`;
    a.click();
  };

  const copyAll = async () => {
    const sel = getSelected();
    if (!sel.length) return;
    const text = sel
      .map((c) => `${c.company}\t${c.country}\t${c.name}\t${c.title}\t${c.website}`)
      .join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-3xl select-none">🌿</span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">全球采购联系人搜索系统</h1>
            <p className="text-emerald-400 text-xs mt-0.5">
              可降解纸袋 · 垃圾袋 &nbsp;|&nbsp; VP · Buyer · Catalog Manager · Global Sourcing · Supply Chain
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs bg-emerald-800 text-emerald-300 px-3 py-1 rounded-full font-medium">
              ⚡ Claude AI + Web Search
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-5">

        {/* ── Search Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">搜索条件</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">🌍 目标市场</label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                disabled={loading}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              >
                <option value="all">全部发达国家</option>
                <option value="us">🇺🇸 美国</option>
                <option value="uk">🇬🇧 英国</option>
                <option value="de">🇩🇪 德国</option>
                <option value="fr">🇫🇷 法国</option>
                <option value="au">🇦🇺 澳大利亚</option>
                <option value="ca">🇨🇦 加拿大</option>
                <option value="jp">🇯🇵 日本</option>
                <option value="nl">🇳🇱 荷兰</option>
                <option value="se">🇸🇪 瑞典</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">📦 产品类型</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                disabled={loading}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              >
                <option value="both">纸袋 + 垃圾袋（全部）</option>
                <option value="paper">可降解纸袋 / 购物袋</option>
                <option value="trash">可降解垃圾袋 / 厨余袋</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">🔢 搜索企业数量</label>
              <select
                value={count}
                onChange={(e) => setCount(e.target.value)}
                disabled={loading}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              >
                <option value="10">10 家企业</option>
                <option value="20">20 家企业</option>
                <option value="30">30 家企业</option>
              </select>
            </div>

          </div>

          {/* Search Button */}
          <button
            onClick={startSearch}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-base font-semibold transition-all duration-150 flex items-center justify-center gap-2.5 shadow-sm"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 spinner" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12" />
                </svg>
                <span>Claude AI 正在搜索&hellip; &nbsp;<span className="font-mono text-emerald-200">{elapsed}s</span></span>
              </>
            ) : (
              <>
                <span className="text-lg">🔍</span>
                一键搜索全球采购联系人
              </>
            )}
          </button>
        </div>

        {/* ── Loading / Progress ── */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>搜索进度</span>
              <span className="font-mono">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Log */}
            <div
              ref={logRef}
              className="bg-slate-950 rounded-xl p-4 h-32 overflow-y-auto font-mono text-xs space-y-1"
            >
              {logs.map((line, i) => (
                <p key={i} className="log-line text-emerald-400">{line}</p>
              ))}
              <p className="text-slate-600 animate-pulse">█</p>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {contacts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

            {/* Table Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-slate-900">搜索结果</h2>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {contacts.length} 条联系人
                </span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-sm text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selected.size === contacts.length && contacts.length > 0}
                    onChange={toggleAll}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  全选
                </label>
                <span className="text-xs text-slate-400">
                  已选 <strong className="text-emerald-600">{selected.size}</strong> / {contacts.length}
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-medium uppercase tracking-wide">
                    <th className="w-10 px-4 py-3 text-center">#</th>
                    <th className="px-4 py-3 text-left">公司名称</th>
                    <th className="px-4 py-3 text-left">国家</th>
                    <th className="px-4 py-3 text-left">职位类型</th>
                    <th className="px-4 py-3 text-left">联系人姓名</th>
                    <th className="px-4 py-3 text-left">职务</th>
                    <th className="px-4 py-3 text-left">官网</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {contacts.map((c, i) => {
                    const badge = getRoleBadge(c.title);
                    const isSelected = selected.has(i);
                    return (
                      <tr
                        key={i}
                        onClick={() => toggleSelect(i)}
                        className={`cursor-pointer transition-colors hover:bg-slate-50 ${isSelected ? 'row-selected' : ''}`}
                      >
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(i)}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900 max-w-[200px] truncate" title={c.company}>
                          {c.company}
                        </td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                          {getFlag(c.country)} {c.country}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-800 font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate" title={c.title}>
                          {c.title}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`https://${c.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:underline text-xs"
                          >
                            {c.website}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Action Bar */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={openEmailGen}
                disabled={selected.size === 0}
                className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                ✉️ 批量生成开发信 → Vercel 邮件生成器
              </button>
              <button
                onClick={exportCSV}
                disabled={selected.size === 0}
                className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
              >
                📊 导出 CSV
              </button>
              <button
                onClick={copyAll}
                disabled={selected.size === 0}
                className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
              >
                {copied ? '✅ 已复制' : '📋 复制'}
              </button>
              <a
                href="https://v0-email-generator-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-blue-600 underline underline-offset-2 ml-auto"
              >
                直接访问 Vercel 邮件生成器 ↗
              </a>
            </div>
          </div>
        )}

        {/* ── Empty State (before search) ── */}
        {!loading && contacts.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-16 px-8 text-center">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-slate-700 font-semibold text-lg mb-2">准备就绪</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              设置搜索条件后点击上方按钮，Claude AI 将通过网络搜索找到全球发达国家可降解纸袋、垃圾袋采购商的联系人，包括 VP、Buyer、Catalog Manager、Global Sourcing、Supply Chain 等职位。
            </p>
            <div className="mt-6 flex justify-center gap-6 text-xs text-slate-400">
              <span>🔍 Claude AI 网络搜索</span>
              <span>📊 实时数据解析</span>
              <span>✉️ 一键生成开发信</span>
              <span>📥 CSV 导出</span>
            </div>
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-100 mt-8">
        Powered by Claude AI · Anthropic API · Vercel Edge Functions
      </footer>
    </div>
  );
}
