/* ===== NC Tool Suite - 共通ライブラリ ===== */

// ===== 素材DB =====
const MAT_DB = {
  S45C:   {vc:{超硬:180,サーメット:220,CBN:300,ハイス:30},f:{荒削り:.25,中削り:.18,仕上げ:.10},ap:{荒削り:2.5,中削り:1.5,仕上げ:.30},label:'S45C 炭素鋼 HB200',kc:2000},
  S50C:   {vc:{超硬:160,サーメット:200,CBN:280,ハイス:25},f:{荒削り:.22,中削り:.16,仕上げ:.08},ap:{荒削り:2.0,中削り:1.2,仕上げ:.25},label:'S50C 炭素鋼 HB220',kc:2100},
  SS400:  {vc:{超硬:200,サーメット:240,CBN:320,ハイス:35},f:{荒削り:.28,中削り:.20,仕上げ:.12},ap:{荒削り:3.0,中削り:1.8,仕上げ:.35},label:'SS400 軟鋼 HB130',kc:1800},
  SCM440: {vc:{超硬:150,サーメット:180,CBN:260,ハイス:20},f:{荒削り:.20,中削り:.15,仕上げ:.08},ap:{荒削り:2.0,中削り:1.2,仕上げ:.25},label:'SCM440 合金鋼 HB280',kc:2300},
  SKD11:  {vc:{超硬:100,サーメット:120,CBN:200,ハイス:12},f:{荒削り:.15,中削り:.10,仕上げ:.06},ap:{荒削り:1.0,中削り:.8,仕上げ:.15},label:'SKD11 ダイス鋼 HRC58',kc:2800},
  SUS304: {vc:{超硬:120,サーメット:140,CBN:180,ハイス:15},f:{荒削り:.18,中削り:.13,仕上げ:.07},ap:{荒削り:1.5,中削り:1.0,仕上げ:.20},label:'SUS304 ステンレス',kc:2200},
  SUS316: {vc:{超硬:110,サーメット:130,CBN:170,ハイス:13},f:{荒削り:.16,中削り:.12,仕上げ:.06},ap:{荒削り:1.2,中削り:.8,仕上げ:.18},label:'SUS316 高耐食SUS',kc:2300},
  A2017:  {vc:{超硬:500,サーメット:600,CBN:800,ハイス:120},f:{荒削り:.35,中削り:.25,仕上げ:.15},ap:{荒削り:4.0,中削り:2.5,仕上げ:.50},label:'A2017 ジュラルミン HB120',kc:700},
  A5052:  {vc:{超硬:600,サーメット:700,CBN:900,ハイス:150},f:{荒削り:.40,中削り:.28,仕上げ:.18},ap:{荒削り:5.0,中削り:3.0,仕上げ:.60},label:'A5052 アルミ合金 HB60',kc:600},
  A6061:  {vc:{超硬:550,サーメット:650,CBN:850,ハイス:130},f:{荒削り:.38,中削り:.26,仕上げ:.16},ap:{荒削り:4.5,中削り:2.8,仕上げ:.55},label:'A6061 アルミ合金 HB95',kc:650},
  C3604:  {vc:{超硬:400,サーメット:450,CBN:600,ハイス:100},f:{荒削り:.35,中削り:.25,仕上げ:.15},ap:{荒削り:3.5,中削り:2.0,仕上げ:.40},label:'C3604 快削黄銅',kc:900},
  CAC403: {vc:{超硬:200,サーメット:250,CBN:350,ハイス:60}, f:{荒削り:.25,中削り:.18,仕上げ:.10},ap:{荒削り:2.5,中削り:1.5,仕上げ:.30},label:'CAC403 青銅',kc:1100},
  MC901:  {vc:{超硬:300,サーメット:350,CBN:400,ハイス:80}, f:{荒削り:.30,中削り:.22,仕上げ:.12},ap:{荒削り:3.0,中削り:2.0,仕上げ:.40},label:'MC901 ナイロン',kc:400},
  PEEK:   {vc:{超硬:250,サーメット:300,CBN:350,ハイス:60}, f:{荒削り:.25,中削り:.18,仕上げ:.10},ap:{荒削り:2.5,中削り:1.5,仕上げ:.30},label:'PEEK 樹脂',kc:350},
  POM:    {vc:{超硬:350,サーメット:400,CBN:500,ハイス:90}, f:{荒削り:.32,中削り:.24,仕上げ:.13},ap:{荒削り:3.5,中削り:2.2,仕上げ:.45},label:'POM ジュラコン',kc:380},
};

// ===== 工具DB (LocalStorage) =====
const TOOL_DB = {
  getAll() {
    try { return JSON.parse(localStorage.getItem('nc_tools') || '[]'); } catch { return []; }
  },
  save(tools) {
    localStorage.setItem('nc_tools', JSON.stringify(tools));
  },
  add(tool) {
    const tools = this.getAll();
    tool.id = Date.now();
    tool.createdAt = new Date().toISOString();
    tools.push(tool);
    this.save(tools);
    return tool;
  },
  update(id, data) {
    const tools = this.getAll().map(t => t.id === id ? {...t, ...data} : t);
    this.save(tools);
  },
  remove(id) {
    this.save(this.getAll().filter(t => t.id !== id));
  },
  getByType(type) {
    return this.getAll().filter(t => t.type === type);
  }
};

// ===== 加工実績ログ (LocalStorage) =====
const LOG_DB = {
  getAll() {
    try { return JSON.parse(localStorage.getItem('nc_logs') || '[]'); } catch { return []; }
  },
  save(logs) {
    localStorage.setItem('nc_logs', JSON.stringify(logs));
  },
  add(log) {
    const logs = this.getAll();
    log.id = Date.now();
    log.createdAt = new Date().toISOString();
    logs.unshift(log);
    if (logs.length > 500) logs.pop();
    this.save(logs);
    return log;
  },
  remove(id) {
    this.save(this.getAll().filter(l => l.id !== id));
  },
  search(q) {
    const kw = q.toLowerCase();
    return this.getAll().filter(l =>
      (l.partNo||'').toLowerCase().includes(kw) ||
      (l.material||'').toLowerCase().includes(kw) ||
      (l.memo||'').toLowerCase().includes(kw) ||
      (l.procName||'').toLowerCase().includes(kw)
    );
  }
};

// ===== テンプレートDB (LocalStorage) =====
const TPL_DB = {
  getAll() {
    try { return JSON.parse(localStorage.getItem('nc_templates') || '[]'); } catch { return []; }
  },
  save(list) { localStorage.setItem('nc_templates', JSON.stringify(list)); },
  add(tpl) {
    const list = this.getAll();
    tpl.id = Date.now();
    tpl.createdAt = new Date().toISOString();
    list.unshift(tpl);
    this.save(list);
    return tpl;
  },
  remove(id) { this.save(this.getAll().filter(t => t.id !== id)); }
};

// ===== 切削条件自動計算 =====
function calcConditions(matKey, toolMat, toolD, finish) {
  const db = MAT_DB[matKey]; if (!db) return null;
  const vc = db.vc[toolMat] || db.vc['超硬'];
  const rpm = Math.round(vc * 1000 / (Math.PI * toolD));
  const feed = db.f[finish];
  const ap = db.ap[finish];
  return { rpm, feed, ap, feedMin: Math.round(feed * rpm), vc, kc: db.kc };
}

// ===== 加工時間計算 =====
function calcCycleTime(proc, params) {
  let machineMin = 0;
  const f = (k, d) => parseFloat(params[k]) || d;
  switch (proc) {
    case 'od': {
      const passes = Math.max(1, Math.ceil((f('blank_d',50) - f('fin_d',45)) / 2 / f('depth',1.5)));
      const feedRate = f('rpm',1000) * f('feed',.2);
      machineMin = (f('fin_l',80) * passes / feedRate) + (f('fin_l',80) / feedRate);
      break;
    }
    case 'thread': {
      const passes = f('pass',5);
      const feedRate = f('rpm',500) * f('pitch',1.5);
      machineMin = (f('len',30) * passes / feedRate) * 2;
      break;
    }
    case 'groove': {
      machineMin = f('d',5) / (f('rpm',600) * f('feed',.05)) * 60 / 1000;
      break;
    }
    default:
      machineMin = 1.0;
  }
  return Math.max(0.1, machineMin);
}

// ===== 面粗さ計算 =====
function calcRoughness(feed_mm_rev, noseR_mm) {
  // 理論面粗さ Ry(Rmax) = f² / (8×Re) [mm]
  const ry = (feed_mm_rev * feed_mm_rev) / (8 * noseR_mm) * 1000; // μm
  const ra = ry / 4; // 近似
  return { ry: ry.toFixed(2), ra: ra.toFixed(2) };
}

// ===== 切削負荷計算 =====
function calcCuttingForce(matKey, ap, feed, vc, toolD) {
  const db = MAT_DB[matKey]; if (!db) return null;
  const kc = db.kc;
  // 主分力 Fc = kc × ap × f [N]
  const fc = kc * ap * feed;
  // 必要馬力 Pc = Fc × vc / (60×1000×η) [kW] η=0.8
  const pc = (fc * vc) / (60 * 1000 * 0.8);
  // 比切削抵抗（補正後）
  return { fc: Math.round(fc), pc: pc.toFixed(2), kc };
}

// ===== Gコードレンダリング =====
function renderGcode(raw, containerId) {
  let n = 1;
  const html = raw.split('\n').map(line => {
    const num = `<span class="lnum">${String(n++).padStart(4,' ')}</span>`;
    let l = line.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    if (l.startsWith('(') || l.startsWith(';') || l === '%')
      return num + `<span class="cm">${l}</span>`;
    l = l.replace(/\b([GM]\d+)/g,(m,w) => w.startsWith('G') ? `<span class="gw">${w}</span>` : `<span class="mw">${w}</span>`);
    l = l.replace(/([XZUWICKFSRCPQR])(-?[\d.]+)/g,(m,k,v) => `${k}<span class="vl">${v}</span>`);
    return num + l;
  }).join('\n');
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = html;
}

// ===== ユーティリティ =====
function fmtDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.15);transition:opacity .3s;font-family:'Noto Sans JP',sans-serif`;
  t.style.background = type==='success' ? '#16a34a' : type==='error' ? '#dc2626' : '#2563eb';
  t.style.color = '#fff';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; setTimeout(()=>t.remove(),300); }, 2000);
}
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('コピーしました'));
}
function downloadText(text, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text],{type:'text/plain'}));
  a.download = filename; a.click();
  URL.revokeObjectURL(a.href);
}

// ===== ナビ アクティブ =====
function setNavActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href.includes(path));
  });
}
document.addEventListener('DOMContentLoaded', setNavActive);
