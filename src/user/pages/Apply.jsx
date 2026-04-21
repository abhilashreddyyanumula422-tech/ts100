import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

html, body, #root {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #fff;
  min-height: 100vh;
}

/* ══ Keyframes ══ */
@keyframes fadeDown  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeUp    { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }
@keyframes cardIn    { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.8)} }
@keyframes waIn      { from{opacity:0;transform:scale(0) rotate(-30deg)} to{opacity:1;transform:scale(1) rotate(0)} }
@keyframes pop       { from{transform:scale(0) rotate(-20deg)} to{transform:scale(1) rotate(0)} }
@keyframes slideUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes float     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }
@keyframes iconBounce{ 0%,100%{transform:translateY(0)} 40%{transform:translateY(-11px)} 60%{transform:translateY(-5px)} }
@keyframes drawRoad  { from{stroke-dashoffset:var(--road-len,2000)} to{stroke-dashoffset:0} }
@keyframes nodeIn    { from{opacity:0;transform:scale(0) rotate(-20deg)} to{opacity:1;transform:scale(1) rotate(0)} }
@keyframes slideInRight { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
@keyframes carDrive  { 0%{offset-distance:0%} 100%{offset-distance:100%} }

/* ══ Layout ══ */
.app-shell {
  display: flex;
  min-height: 100vh;
  background: #fff;
}

/* ══ LEFT ROAD PANEL ══ */
.road-panel {
  width: 280px;
  min-width: 280px;
  background: #f8faff;
  border-right: 1.5px solid #e8edf8;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 80px 0 40px;
  scrollbar-width: none;
}
.road-panel::-webkit-scrollbar { display:none; }

.road-inner {
  width: 100%;
  padding: 0 0 60px;
  position: relative;
}

/* SVG road */
.road-svg-wrap {
  width: 100%;
  position: relative;
}

/* Road step labels */
.road-label {
  position: absolute;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.3;
  pointer-events: none;
}

/* Animated road nodes */
.rnode { opacity: 0; animation: nodeIn .55s cubic-bezier(.34,1.56,.64,1) forwards; }

/* ══ RIGHT PORTAL PANEL ══ */
.portal-panel {
  flex: 1;
  background: #f0f4ff;
  min-height: 100vh;
  overflow-y: auto;
}


/* ══ Portal wrap ══ */
.portal-wrap { max-width: 820px; margin: 0 auto; padding: 96px 20px 72px; }

/* ══ Hero ══ */
.hero-header { text-align:center; padding:20px 0 32px; animation:fadeDown .7s ease both; }
.live-badge {
  display:inline-flex; align-items:center; gap:2px;
  background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.2);
  border-radius:100px; padding:7px 20px; font-size:13px; color:#1d4ed8;
  margin-bottom:16px;
}
.live-dot { width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;animation:pulse 2s infinite; }
.hero-header h1 {
  font-size: clamp(26px,4.5vw,42px); font-weight:900;
  color:#0f172a; letter-spacing:-1px; line-height:1.15;
}
.hero-header h1 em { font-style:normal; color:#3b82f6; }
.hero-header p { color:#64748b; font-size:15px; margin-top:10px; }

/* ══ Track bar ══ */
.track-bar {
  background:#fff; border:1.5px solid #e2e8f0;
  border-radius:18px; padding:10px 10px; display:flex; gap:1px;
  margin-bottom:32px;
  animation:fadeDown .7s .1s ease both;
  box-shadow: 0 4px 20px rgba(15,52,120,0.06);
}
.track-input {
  flex:1; background:#f8fafc; border:1.5px solid #e2e8f0;
  border-radius:11px; padding:11px 16px; color:#0f172a; font-size:14px;
  font-family:inherit; outline:none; transition:border .2s;
}
.track-input::placeholder { color:#94a3b8; }
.track-input:focus { border-color:#3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.1); }
.track-btn {
  background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:#fff; border:none;
  border-radius:11px; padding:11px 26px; font-size:14px; font-weight:700;
  cursor:pointer; font-family:inherit; transition:transform .15s,box-shadow .2s; white-space:nowrap;
}
.track-btn:hover { transform:scale(1.04); box-shadow:0 6px 22px rgba(59,130,246,.4); }

/* ══ Process explainer ══ */
.process-section { margin-bottom:36px; animation:fadeUp .8s .2s ease both; }
.proc-eyebrow {
  text-align:center; font-size:12px; font-weight:700; letter-spacing:2.5px;
  color:#94a3b8; text-transform:uppercase; margin-bottom:18px;
}
.proc-ribbon {
  display:flex; align-items:stretch;
  background:#fff; border:1.5px solid #e2e8f0;
  border-radius:20px; overflow:hidden;
  box-shadow: 0 4px 20px rgba(15,52,120,0.06);
}
.proc-cell {
  flex:1; padding:22px 10px 20px; text-align:center; position:relative;
  border-right:1px solid #f1f5f9;
  transition:background .4s;
}
.proc-cell:last-child { border-right:none; }
.proc-cell.pc-done   { background:rgba(34,197,94,.06); }
.proc-cell.pc-active { background:rgba(59,130,246,.07); }

.proc-orb {
  width:52px; height:52px; border-radius:50%; margin:0 auto 11px;
  display:flex; align-items:center; justify-content:center; font-size:22px;
  background:#f8fafc; border:2px solid #e2e8f0;
  position:relative; transition:border-color .4s, background .4s;
}
.proc-cell.pc-done   .proc-orb { background:rgba(34,197,94,.1); border-color:#86efac; }
.proc-cell.pc-active .proc-orb { background:rgba(59,130,246,.1); border-color:#93c5fd; animation:float 2.4s ease-in-out infinite; }
.proc-cell.pc-done .proc-orb::after {
  content:'✓'; position:absolute; top:-5px; right:-5px;
  width:20px; height:20px; border-radius:50%;
  background:#22c55e; color:#fff; font-size:11px; font-weight:800;
  display:flex; align-items:center; justify-content:center;
  animation:pop .35s cubic-bezier(.34,1.7,.64,1) both;
}
.proc-name { font-size:11px; font-weight:700; letter-spacing:.4px; text-transform:uppercase; color:#94a3b8; margin-bottom:3px; }
.proc-cell.pc-done   .proc-name,
.proc-cell.pc-active .proc-name { color:#1e293b; }
.proc-hint { font-size:10.5px; color:#cbd5e1; line-height:1.4; }
.proc-cell.pc-active .proc-hint { color:#64748b; }

.flow-track { height:5px; background:#f1f5f9; border-radius:100px; margin:10px 0 30px; overflow:hidden; }
.flow-fill   { height:100%; border-radius:100px; background:linear-gradient(90deg,#22c55e,#3b82f6,#a855f7); transition:width .65s cubic-bezier(.4,0,.2,1); }

/* ══ Steps nav ══ */
.steps-nav { margin-bottom:24px; animation:fadeDown .7s .15s ease both; }
.steps-row { display:flex; align-items:flex-start; }
.step-item { flex:1; display:flex; flex-direction:column; align-items:center; position:relative; }
.step-item:not(:last-child)::after {
  content:''; position:absolute; top:22px; left:50%; width:100%; height:3px;
  background:#f1f5f9; z-index:0; transition:background .5s;
}
.step-item.done:not(:last-child)::after { background:linear-gradient(90deg,#3b82f6,#60a5fa); }
.step-circle {
  width:44px; height:44px; border-radius:50%; display:flex; align-items:center;
  justify-content:center; font-weight:700; font-size:15px; position:relative; z-index:1;
  border:3px solid #e2e8f0; background:#fff;
  color:#94a3b8; transition:all .4s cubic-bezier(.34,1.56,.64,1);
}
.step-item.done   .step-circle { background:linear-gradient(135deg,#3b82f6,#1d4ed8); border-color:#3b82f6; color:#fff; box-shadow:0 0 22px rgba(59,130,246,.4); }
.step-item.active .step-circle { background:linear-gradient(135deg,#60a5fa,#3b82f6); border-color:#60a5fa; color:#fff; box-shadow:0 0 34px rgba(96,165,250,.5); transform:scale(1.18); }
.step-label { font-size:11px; color:#94a3b8; margin-top:8px; text-align:center; font-weight:600; transition:color .3s; }
.step-item.active .step-label { color:#0f172a; font-weight:800; }
.step-item.done   .step-label { color:#64748b; }

/* ══ Main card ══ */
.main-card { background:#fff; border-radius:26px; padding:34px 30px; box-shadow:0 8px 48px rgba(15,52,120,0.10); border:1px solid #e8edf5; }
.card-anim { animation:cardIn .5s cubic-bezier(.34,1.2,.64,1) both; }

.step-header { display:flex; align-items:center; gap:16px; margin-bottom:28px; padding-bottom:20px; border-bottom:2px solid #f1f5f9; }
.step-icon { width:56px; height:56px; border-radius:18px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
.icon-blue   { background:linear-gradient(135deg,#eff6ff,#dbeafe); }
.icon-green  { background:linear-gradient(135deg,#f0fdf4,#dcfce7); }
.icon-purple { background:linear-gradient(135deg,#faf5ff,#ede9fe); }
.icon-amber  { background:linear-gradient(135deg,#fffbeb,#fef3c7); }
.step-title    { font-size:22px; font-weight:800; color:#0f172a; }
.step-subtitle { font-size:14px; color:#64748b; margin-top:3px; }

.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:600px){ .form-grid { grid-template-columns:1fr; } }
.field { display:flex; flex-direction:column; gap:6px; }
.field label { font-size:13px; font-weight:700; color:#374151; }
.field input,.field select {
  padding:11px 14px; border:1.5px solid #e2e8f0; border-radius:11px;
  font-size:14px; font-family:inherit; outline:none; color:#1e293b; background:#fff;
  transition:border .2s,box-shadow .2s;
}
.field input:focus,.field select:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.1); }
.req { color:#ef4444; }

.sec-title { font-size:16px; font-weight:800; color:#1e293b; margin:26px 0 14px; display:flex; align-items:center; gap:10px; }
.sec-title::before { content:''; width:4px; height:20px; background:linear-gradient(180deg,#3b82f6,#2563eb); border-radius:2px; display:inline-block; }

.degree-card { background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px; margin-bottom:14px; transition:border .2s; }
.degree-card:hover { border-color:#bfdbfe; }
.deg-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
.deg-num { font-size:13px; font-weight:700; color:#3b82f6; background:#eff6ff; padding:4px 12px; border-radius:6px; }
.btn-rm { background:none; border:none; color:#ef4444; cursor:pointer; font-size:13px; font-weight:700; padding:5px 10px; border-radius:7px; transition:background .2s; font-family:inherit; }
.btn-rm:hover { background:#fef2f2; }

.upload-box { background:linear-gradient(135deg,#eff6ff,#f8fafc); border:2px dashed #bfdbfe; border-radius:14px; padding:20px; margin-bottom:16px; transition:border .2s; }
.upload-box:hover { border-color:#3b82f6; }
.upload-lbl { font-size:13px; font-weight:700; color:#1e40af; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.upload-row { display:flex; gap:10px; flex-wrap:wrap; }
.upload-row input[type=file] { flex:1; min-width:180px; padding:8px 12px; border:1.5px solid #dbeafe; border-radius:8px; font-size:13px; font-family:inherit; background:#fff; cursor:pointer; }
.upload-row select { padding:8px 12px; border:1.5px solid #dbeafe; border-radius:8px; font-size:13px; font-family:inherit; background:#fff; color:#1e293b; cursor:pointer; }
.prog-wrap { margin-top:10px; }
.prog-bar  { height:6px; background:#e2e8f0; border-radius:100px; overflow:hidden; margin-bottom:4px; }
.prog-fill { height:100%; border-radius:100px; transition:width .2s,background .4s; background:linear-gradient(90deg,#3b82f6,#60a5fa); }
.prog-fill.pdone { background:linear-gradient(90deg,#22c55e,#4ade80); }
.prog-text  { font-size:12px; color:#64748b; }
.upload-actions { display:flex; gap:8px; margin-top:10px; }
.btn-attach { background:linear-gradient(135deg,#22c55e,#16a34a); color:#fff; border:none; border-radius:8px; padding:8px 18px; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; transition:transform .15s; }
.btn-attach:hover { transform:scale(1.04); }
.btn-del { background:#fee2e2; color:#dc2626; border:none; border-radius:8px; padding:8px 18px; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; transition:background .2s; }
.btn-del:hover { background:#fecaca; }
.file-nm { font-size:12px; color:#64748b; margin-top:6px; }

.check-list { display:flex; flex-direction:column; gap:10px; margin-top:20px; }
.check-item { display:flex; align-items:flex-start; gap:10px; cursor:pointer; padding:13px 16px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:11px; transition:border .2s,background .2s; }
.check-item:hover { border-color:#bfdbfe; background:#eff6ff; }
.check-item input { margin-top:2px; accent-color:#3b82f6; width:16px; height:16px; flex-shrink:0; cursor:pointer; }
.check-item span  { font-size:13px; color:#374151; line-height:1.5; }

.btn-primary {
  background:linear-gradient(135deg,#3b82f6,#2563eb); color:#fff; border:none;
  border-radius:13px; padding:14px 36px; font-size:15px; font-weight:800;
  cursor:pointer; font-family:inherit; transition:transform .15s,box-shadow .2s;
  display:inline-flex; align-items:center; gap:5px;
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(59,130,246,.4); }
.btn-primary:active { transform:scale(.98); }
.btn-primary.green { background:linear-gradient(135deg,#22c55e,#16a34a); }
.btn-primary.green:hover { box-shadow:0 10px 30px rgba(34,197,94,.4); }
.btn-secondary { background:#f1f5f9; color:#374151; border:none; border-radius:13px; padding:13px 26px; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; transition:background .2s; }
.btn-secondary:hover { background:#e2e8f0; }
.btn-add { background:linear-gradient(135deg,#6366f1,#4f46e5); color:#fff; border:none; border-radius:10px; padding:10px 22px; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; transition:transform .15s; }
.btn-add:hover { transform:scale(1.04); }
.actions { display:flex; justify-content:center; gap:10px; margin-top:32px; flex-wrap:wrap; }

.info-panel { border-radius:18px; padding:30px; text-align:center; margin:10px 0 24px; }
.info-panel.amber  { background:linear-gradient(135deg,#fffbeb,#fef3c7); border:2px solid #fde68a; }
.info-panel.blue   { background:linear-gradient(135deg,#eff6ff,#dbeafe); border:2px solid #bfdbfe; }
.info-panel.indigo { background:linear-gradient(135deg,#eef2ff,#e0e7ff); border:2px solid #c7d2fe; }
.info-panel.green  { background:linear-gradient(135deg,#f0fdf4,#dcfce7); border:2px solid #86efac; }
.info-icon  { font-size:50px; display:block; margin-bottom:12px; }
.info-panel h3 { font-size:20px; font-weight:800; margin-bottom:8px; color:#1e293b; }
.info-panel p  { font-size:14px; color:#475569; line-height:1.65; }
.amount { font-size:36px; font-weight:900; color:#1e293b; margin:12px 0 6px; }
.info-chip { display:inline-block; margin-top:10px; background:rgba(255,255,255,.8); border-radius:10px; padding:9px 18px; font-size:13px; color:#374151; }

.timeline { display:flex; flex-direction:column; }
.tl-item  { display:flex; gap:10px; padding:0 0 22px; }
.tl-item:last-child { padding-bottom:0; }
.tl-left  { display:flex; flex-direction:column; align-items:center; }
.tl-dot   { width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
.tl-line  { width:2px; background:#f1f5f9; flex:1; margin-top:6px; }
.tl-content    { flex:1; padding-top:6px; }
.tl-content h4 { font-size:15px; font-weight:700; color:#1e293b; margin-bottom:4px; }
.tl-content p  { font-size:13px; color:#64748b; line-height:1.5; }
.tl-badge { display:inline-block; font-size:11px; font-weight:700; padding:3px 10px; border-radius:100px; margin-top:6px; }
.bdone { background:#dcfce7; color:#166534; }
.bprog { background:#dbeafe; color:#1e40af; }
.bwait { background:#f1f5f9; color:#64748b; }

.star-burst { font-size:70px; display:block; text-align:center; margin-bottom:12px; animation:pop .55s cubic-bezier(.34,1.7,.64,1) both; }
.success-wrap { animation:slideUp .55s cubic-bezier(.34,1.2,.64,1) both; }

.wa-btn {
  position:fixed; bottom:26px; right:26px; width:56px; height:56px;
  background:linear-gradient(135deg,#25d366,#128c7e); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 4px 24px rgba(37,211,102,.5); cursor:pointer;
  text-decoration:none; transition:transform .2s; z-index:999;
  animation:waIn .8s 1s cubic-bezier(.34,1.56,.64,1) both;
}
.wa-btn:hover { transform:scale(1.12) rotate(8deg); }

/* ══ Road panel inner styles ══ */
.road-title {
  text-align:center;
  font-size:11px; font-weight:800; letter-spacing:2px;
  text-transform:uppercase; color:#94a3b8;
  padding: 0 20px 16px;
}

.road-step-card {
  margin: 0 16px 0;
  padding: 10px 14px;
  border-radius:12px;
  border: 1.5px solid #e8edf5;
  background:#fff;
  opacity:0;
  transform: translateX(-16px);
  transition: opacity .5s ease, transform .5s ease, box-shadow .2s, border-color .2s;
  cursor:default;
}
.road-step-card.vis { opacity:1; transform:translateX(0); }
.road-step-card:hover { box-shadow:0 4px 18px rgba(15,52,120,0.09); border-color:#bfdbfe; }
.road-step-card.active-card { border-color:#3b82f6; background:linear-gradient(135deg,#eff6ff,#fff); box-shadow:0 4px 18px rgba(59,130,246,0.15); }
.road-step-card.done-card { border-color:#86efac; background:linear-gradient(135deg,#f0fdf4,#fff); }

.rsc-num { font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px; }
.rsc-num.c-blue { color:#3b82f6; }
.rsc-num.c-green { color:#16a34a; }
.rsc-num.c-gray { color:#94a3b8; }
.rsc-title { font-size:12px;font-weight:800;color:#1e293b;margin-bottom:2px; }
.rsc-desc  { font-size:11px;color:#94a3b8;line-height:1.4; }
.rsc-badge { display:inline-block;margin-top:5px;font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px; }
.badge-b { background:#eff6ff;color:#1d4ed8; }
.badge-a { background:#fffbeb;color:#b45309; }
.badge-g { background:#f0fdf4;color:#166534; }
.badge-p { background:#f5f3ff;color:#6d28d9; }
.badge-gr { background:#f8fafc;color:#64748b; }
`;

/* ─────────────────────────────────────────
   ROAD PANEL COMPONENT
───────────────────────────────────────── */
const ROAD_STEPS = [
  { num:"01", label:"Start Process", desc:"Begin online", badge:"Portal", bc:"badge-b", color:"c-blue" },
  { num:"02", label:"Upload Docs",   desc:"PDF / images", badge:"Secure", bc:"badge-b", color:"c-blue" },
  { num:"03", label:"Doc Review",    desc:"24–48 hrs",    badge:"Expert check", bc:"badge-p", color:"c-blue" },
  { num:"04", label:"Payment",       desc:"₹1 fee",   badge:"₹ 1", bc:"badge-a", color:"c-blue" },
  { num:"05", label:"University",    desc:"3–7 work days",badge:"Official", bc:"badge-p", color:"c-blue" },
  { num:"06", label:"Completed!",    desc:"Docs delivered",badge:"✓ Done", bc:"badge-g", color:"c-green" },
];

function RoadPanel({ activeStep }) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    ROAD_STEPS.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), 300 + i * 200);
    });
  }, []);

  return (
    <div className="road-panel">
      <div className="road-title">Your Journey</div>

      {/* Animated SVG Road */}
      <div style={{ padding: "0 10px 8px", position: "relative" }}>
        <svg viewBox="0 0 260 920" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
          <defs>
            <marker id="rarr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#93c5fd" opacity=".7"/>
            </marker>
          </defs>

          {/* Road shadow/base */}
          <path
            d="M80,50 C80,100 190,130 190,210 C190,290 80,320 80,400 C80,480 190,510 190,590 C190,670 80,700 80,780 C80,840 140,870 140,900"
            fill="none" stroke="#dde8f8" strokeWidth="32" strokeLinecap="round"
          />
          {/* Road surface */}
          <path
            d="M80,50 C80,100 190,130 190,210 C190,290 80,320 80,400 C80,480 190,510 190,590 C190,670 80,700 80,780 C80,840 140,870 140,900"
            fill="none" stroke="#e8f0fb" strokeWidth="26" strokeLinecap="round"
          />
          {/* Road edge lines */}
          <path
            d="M80,50 C80,100 190,130 190,210 C190,290 80,320 80,400 C80,480 190,510 190,590 C190,670 80,700 80,780 C80,840 140,870 140,900"
            fill="none" stroke="#c3d4f0" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="none"
          />
          {/* Animated center dashes */}
          <path
            id="roadDash"
            d="M80,50 C80,100 190,130 190,210 C190,290 80,320 80,400 C80,480 190,510 190,590 C190,670 80,700 80,780 C80,840 140,870 140,900"
            fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="16 14"
            style={{ strokeDashoffset: 2400, animation: "drawRoad 3s ease forwards 0.4s", "--road-len": "2400" }}
          />

          {/* NODE 1 — Start ~(80,50) */}
          <g className="rnode" style={{ animationDelay: ".3s", animationFillMode: "forwards" }}>
            <circle cx="80" cy="50" r="28" fill="#0f172a" stroke="#1e293b" strokeWidth="2"/>
            <circle cx="80" cy="50" r="21" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" strokeDasharray="5 4"/>
            <text x="80" y="45" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="Plus Jakarta Sans,sans-serif">START</text>
            <text x="80" y="57" textAnchor="middle" fill="rgba(255,255,255,.6)" fontSize="7" fontFamily="Plus Jakarta Sans,sans-serif">THE PROCESS</text>
            <text x="46" y="54" fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Plus Jakarta Sans,sans-serif">1</text>
          </g>

          {/* NODE 2 — Upload ~(190,210) */}
          <g className="rnode" style={{ animationDelay: ".7s", animationFillMode: "forwards" }}>
            <circle cx="190" cy="210" r="26" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
            {/* Upload arrow */}
            <path d="M190,198 L190,220" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M182,205 L190,198 L198,205" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            <path d="M182,220 L198,220" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <text x="190" y="245" textAnchor="middle" fill="#1d4ed8" fontSize="9" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">UPLOAD</text>
            <text x="190" y="257" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">DOCUMENTS</text>
            <text x="218" y="213" fill="#1d4ed8" fontSize="16" fontWeight="900" fontFamily="Plus Jakarta Sans,sans-serif">2</text>
          </g>

          {/* NODE 3 — Doc Review ~(80,400) */}
          <g className="rnode" style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}>
            <circle cx="80" cy="400" r="26" fill="#f8faff" stroke="#c7d2fe" strokeWidth="2"/>
            {/* Doc + check */}
            <rect x="70" y="388" width="14" height="18" rx="2.5" fill="none" stroke="#6366f1" strokeWidth="1.8"/>
            <path d="M73,394 L81,394 M73,398 L81,398 M73,402 L78,402" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="88" cy="407" r="8" fill="#22c55e"/>
            <path d="M84.5,407 L87,409.5 L91.5,403.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <text x="48" y="380" fill="#4f46e5" fontSize="8.5" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">DOCUMENT</text>
            <text x="48" y="391" fill="#4f46e5" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">REVIEW &amp;</text>
            <text x="48" y="402" fill="#4f46e5" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">ACCEPTANCE</text>
            <text x="46" y="403" fill="#4f46e5" fontSize="16" fontWeight="900" fontFamily="Plus Jakarta Sans,sans-serif">3</text>
          </g>

          {/* NODE 4 — Payment ~(190,590) */}
          <g className="rnode" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}>
            <circle cx="190" cy="590" r="26" fill="#fffbeb" stroke="#fde68a" strokeWidth="2"/>
            {/* Rupee + arrows */}
            <circle cx="190" cy="590" r="13" fill="none" stroke="#f59e0b" strokeWidth="2"/>
            <path d="M190,581 C187,581 184,583.5 184,586 C184,588.5 187,589.5 190,590.5 C193,591.5 196,593 196,595.5 C196,598 193,600 190,600 M190,579 L190,582 M190,599 L190,602" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/>
            {/* Circular arrows */}
            <path d="M172,578 C172,569 180,563 190,564" stroke="#94a3b8" strokeWidth="1.6" fill="none" strokeLinecap="round" markerEnd="url(#rarr)"/>
            <path d="M208,602 C208,611 200,617 190,616" stroke="#94a3b8" strokeWidth="1.6" fill="none" strokeLinecap="round" markerEnd="url(#rarr)"/>
            <text x="218" y="593" fill="#b45309" fontSize="16" fontWeight="900" fontFamily="Plus Jakarta Sans,sans-serif">4</text>
            <text x="165" y="618" fill="#b45309" fontSize="9" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">PAYMENT</text>
          </g>

          {/* NODE 5 — University ~(80,780) */}
          <g className="rnode" style={{ animationDelay: "1.9s", animationFillMode: "forwards" }}>
            <circle cx="80" cy="780" r="26" fill="#faf5ff" stroke="#ddd6fe" strokeWidth="2"/>
            {/* Building */}
            <rect x="69" y="774" width="22" height="13" rx="1.5" fill="none" stroke="#7c3aed" strokeWidth="1.8"/>
            <path d="M71,774 L71,768 L89,768 L89,774" fill="none" stroke="#7c3aed" strokeWidth="1.8"/>
            <path d="M75,774 L75,783 M80,774 L80,783 M85,774 L85,783" stroke="#7c3aed" strokeWidth="1.4"/>
            <path d="M71,768 L80,762 L89,768" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinejoin="round"/>
            <text x="44" y="760" fill="#6d28d9" fontSize="8.5" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">UNIVERSITY</text>
            <text x="44" y="771" fill="#6d28d9" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">VERIFICATION</text>
            <text x="46" y="783" fill="#6d28d9" fontSize="16" fontWeight="900" fontFamily="Plus Jakarta Sans,sans-serif">5</text>
          </g>

          {/* NODE 6 — Complete ~(140,900) */}
          <g className="rnode" style={{ animationDelay: "2.3s", animationFillMode: "forwards" }}>
            <circle cx="140" cy="900" r="28" fill="#f0fdf4" stroke="#86efac" strokeWidth="2.5"/>
            <circle cx="140" cy="900" r="19" fill="none" stroke="#22c55e" strokeWidth="1.8"/>
            <path d="M131,900 L137,906 L149,892" stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <text x="108" y="876" fill="#166534" fontSize="16" fontWeight="900" fontFamily="Plus Jakarta Sans,sans-serif">6</text>
            <text x="114" y="938" fill="#166534" fontSize="9" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">PROCESS</text>
            <text x="110" y="950" fill="#166534" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">COMPLETED</text>
          </g>
        </svg>
      </div>

      {/* Step cards below road */}
      {/* <div style={{ paddingTop: 8 }}>
        {ROAD_STEPS.map((s, i) => {
          const isDone = i < activeStep;
          const isActive = i === activeStep;
          return (
            <div
              key={i}
              className={`road-step-card ${visible.includes(i) ? "vis" : ""} ${isActive ? "active-card" : ""} ${isDone ? "done-card" : ""}`}
              style={{ transitionDelay: `${i * 80}ms`, marginBottom: 8 }}
            >
              <div className={`rsc-num ${isDone ? "c-green" : isActive ? "c-blue" : "c-gray"}`}>
                {isDone ? "✓" : `Step ${s.num}`}
              </div>
              <div className="rsc-title">{s.label}</div>
              <div className="rsc-desc">{s.desc}</div>
              <span className={`rsc-badge ${s.bc}`}>{s.badge}</span>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_ITEMS = ["Home","About","Services","Apply","Contact Us","Partnered Colleges"];

const STEPS = [
  { label:"Upload Docs" },
  { label:"Payment"     },
  { label:"Doc Review"  },
  { label:"University"  },
  { label:"Delivery"    },
];

const PROC = [
  { icon:"🧑‍💻", label:"You Apply",       hint:"Fill form & upload docs"   },
  { icon:"💳",  label:"Make Payment",   hint:"Secure one-time service fee" },
  { icon:"🔍",  label:"Admin Verifies", hint:"Our team checks your docs"   },
  { icon:"🏛️",  label:"University",     hint:"Official board confirms"     },
  { icon:"🎉",  label:"You Receive",    hint:"Certified docs delivered!"   },
];

/* ─────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────── */
const TlItem = ({ icon, bg, title, desc, badge, last }) => (
  <div className="tl-item">
    <div className="tl-left">
      <div className="tl-dot" style={{ background: bg }}>{icon}</div>
      {!last && <div className="tl-line" />}
    </div>
    <div className="tl-content">
      <h4>{title}</h4>
      {desc && <p>{desc}</p>}
      <span className={`tl-badge ${badge}`}>
        {badge==="bdone"?"Done":badge==="bprog"?"In Progress":"Upcoming"}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Apply() {
  const [activeStep, setActiveStep] = useState(0);
  const [trackId,    setTrackId]    = useState("");
  const [animKey,    setAnimKey]    = useState(0);

  const [form, setForm] = useState({
    fullName:"", altPhone:"", email:"", phone:"",
    requirement:"", referenceNumber:"",
    termsAccepted:false, specialCondition:false,
  });

  const [upProg,  setUpProg]  = useState({ cmm:0, degree:0, internship:0 });
  const [upNames, setUpNames] = useState({ cmm:null, degree:null, internship:null });
  const [degrees, setDegrees] = useState([{ id:1, type:"", university:"", course:"", college:"" }]);

  useEffect(() => {
    if (!document.getElementById("apply-css")) {
      const s = document.createElement("style");
      s.id = "apply-css";
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  const goStep = (n) => { setActiveStep(n); setAnimKey(k=>k+1); window.scrollTo({top:0,behavior:"smooth"}); };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type==="checkbox" ? checked : value }));
  };

  const addDeg = () => {
    const id = Math.max(0,...degrees.map(d=>d.id)) + 1;
    setDegrees(ds => [...ds, { id, type:"", university:"", course:"", college:"" }]);
  };
  const rmDeg = (id) => { if (degrees.length>1) setDegrees(ds=>ds.filter(d=>d.id!==id)); };
  const chDeg = (id, field, val) => setDegrees(ds=>ds.map(d=>d.id===id?{...d,[field]:val}:d));

  const onFile = (type) => (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUpNames(p=>({...p,[type]:file.name}));
    let v = 0;
    const t = setInterval(()=>{ v+=12; if(v>=100){v=100;clearInterval(t);} setUpProg(p=>({...p,[type]:v})); }, 120);
  };
  const delFile = (type) => { setUpProg(p=>({...p,[type]:0})); setUpNames(p=>({...p,[type]:null})); };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName||!form.email||!form.phone||!form.altPhone||!form.requirement||!form.termsAccepted) {
      alert("Please fill all required fields (*) and accept the Terms & Conditions.");
      return;
    }
    goStep(1);
  };

  const reset = () => {
    setForm({ fullName:"", altPhone:"", email:"", phone:"", requirement:"", referenceNumber:"", termsAccepted:false, specialCondition:false });
    setDegrees([{ id:1, type:"", university:"", course:"", college:"" }]);
    setUpProg({ cmm:0, degree:0, internship:0 });
    setUpNames({ cmm:null, degree:null, internship:null });
    goStep(0);
  };

  const UpBlock = ({ type, label, options }) => {
    const prog = upProg[type]; const nm = upNames[type];
    return (
      <div className="upload-box">
        <div className="upload-lbl">📎 {label}</div>
        <div className="upload-row">
          <input type="file" accept="application/pdf,image/*" onChange={onFile(type)} />
          <select>{options.map(o=><option key={o}>{o}</option>)}</select>
        </div>
        {prog>0 && (
          <div className="prog-wrap">
            <div className="prog-bar"><div className={`prog-fill${prog===100?" pdone":""}`} style={{width:`${prog}%`}} /></div>
            <div className="prog-text">{prog===100?"✅ Uploaded successfully":`Uploading... ${prog}%`}</div>
          </div>
        )}
        {nm && <div className="file-nm">📄 {nm}</div>}
        <div className="upload-actions">
          <button className="btn-attach" type="button" onClick={()=>alert(`${label} attached!`)}>Attach</button>
          <button className="btn-del"    type="button" onClick={()=>delFile(type)}>Delete</button>
        </div>
      </div>
    );
  };

  /* STEP 0 */
  const Step0 = () => (
    <form onSubmit={onSubmit}>
      <div className="step-header">
        <div className="step-icon icon-blue">📄</div>
        <div>
          <div className="step-title">Upload Your Documents</div>
          <div className="step-subtitle">Fill in your personal details and upload clear certificate copies</div>
        </div>
      </div>
      <div className="sec-title">Personal Information</div>
      <div className="form-grid">
        {[
          {id:"fullName", label:"Full Name",         type:"text",  ph:"e.g. Ravi Kumar",   req:true},
          {id:"email",    label:"Email Address",      type:"email", ph:"email@example.com", req:true},
          {id:"phone",    label:"Phone Number",       type:"tel",   ph:"+91 98765 43210",    req:true},
          {id:"altPhone", label:"Alternative Number", type:"tel",   ph:"+91 98765 43210",    req:true},
        ].map(({id,label,type,ph,req})=>(
          <div className="field" key={id}>
            <label>{label} {req&&<span className="req">*</span>}</label>
            <input type={type} name={id} value={form[id]} onChange={onChange} placeholder={ph} />
          </div>
        ))}
        <div className="field">
          <label>Select Requirement <span className="req">*</span></label>
          <select name="requirement" value={form.requirement} onChange={onChange}>
            <option value="">— Choose Service —</option>
            <option value="Transcripts">Transcripts</option>
            <option value="WES">WES</option>
            <option value="Genuineness">Genuineness</option>
          </select>
        </div>
        <div className="field">
          <label>Reference Number</label>
          <input type="text" name="referenceNumber" value={form.referenceNumber} onChange={onChange} placeholder="If you have one" />
        </div>
      </div>
      <div className="sec-title">Academic Degrees</div>
      {degrees.map(d=>(
        <div className="degree-card" key={d.id}>
          <div className="deg-header">
            <span className="deg-num">Degree {d.id}</span>
            {degrees.length>1&&<button type="button" className="btn-rm" onClick={()=>rmDeg(d.id)}>✕ Remove</button>}
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Degree Type</label>
              <select value={d.type} onChange={e=>chDeg(d.id,"type",e.target.value)}>
                <option value="">Select Type</option>
                {["B.Tech","B.Sc","B.Com","M.Tech","MBA","Diploma"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="field">
              <label>University / Board <span className="req">*</span></label>
              <input type="text" value={d.university} placeholder="e.g. Osmania University" onChange={e=>chDeg(d.id,"university",e.target.value)} />
            </div>
            <div className="field">
              <label>Course / Specialization</label>
              <input type="text" value={d.course} placeholder="e.g. Computer Science" onChange={e=>chDeg(d.id,"course",e.target.value)} />
            </div>
            <div className="field">
              <label>College / School Name <span className="req">*</span></label>
              <input type="text" value={d.college} placeholder="e.g. JNTU College" onChange={e=>chDeg(d.id,"college",e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={addDeg}>+ Add Another Degree</button>
      <div className="sec-title">Upload Documents</div>
      <UpBlock type="cmm"        label="CMM / Yearly Marks Sheet"        options={["CMM","Semester 1","Semester 2","Semester 3","Semester 4","Semester 5","Semester 6","Semester 7","Semester 8"]} />
      <UpBlock type="degree"     label="Degree / Provisional Certificate" options={["Degree Certificate","Provisional Certificate"]} />
      <UpBlock type="internship" label="Internship Certificate"           options={["Internship Certificate"]} />
      <div className="check-list">
        <label className="check-item">
          <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={onChange} />
          <span>I have read and accepted the <strong>Terms &amp; Conditions</strong> of this service</span>
        </label>
        <label className="check-item">
          <input type="checkbox" name="specialCondition" checked={form.specialCondition} onChange={onChange} />
          <span>I confirm that I am not physically challenged / pregnant or under similar special conditions</span>
        </label>
      </div>
      <div className="actions">
        <button type="submit" className="btn-primary">Proceed to Payment &nbsp;→</button>
      </div>
    </form>
  );


const handlePayment = async () => {
  try {
    // 1️⃣ create order
    const res = await fetch("http://127.0.0.1:8000/create-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1}),
    });

    const data = await res.json();

    // 2️⃣ Razorpay
    const options = {
      key: "YOUR_KEY_ID",
      amount: data.amount,
      currency: "INR",
      order_id: data.order_id,

      name: "Your Company",
      description: "Document Verification Fee",

      handler: async function (response) {
        // 3️⃣ verify
        const verifyRes = await fetch("http://192.168.1.5:8000/verifys/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.status === "success") {
          alert("Payment Successful ✅");
          goStep(2);
        } else {
          alert("Payment Failed ❌");
        }
      },

      prefill: {
        name: form.fullName,
        email: form.email,
        contact: form.phone,
      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment error");
  }
};
  /* STEP 1 */
  const Step1 = () => (
    <div>
      <div className="step-header">
        <div className="step-icon icon-amber">💳</div>
        <div>
          <div className="step-title">Secure Payment</div>
          <div className="step-subtitle">Complete your payment to begin document processing</div>
        </div>
      </div>
      <div className="info-panel amber">
        <span className="info-icon">🔒</span>
        <h3>Service Fee</h3>
        <div className="amount">₹ 1,500</div>
        <p>One-time fee for verification, attestation &amp; processing.<br/>100% Secure &bull; Instant confirmation</p>
      </div>
      <div className="timeline">
        <TlItem icon="✅" bg="#dcfce7" title="Documents Received" desc="All your documents submitted successfully." badge="bdone" />
        <TlItem icon="💳" bg="#fef3c7" title="Payment Required"   desc="Complete payment to unlock document review." badge="bprog" />
        <TlItem icon="🔍" bg="#f1f5f9" title="Document Review"    desc="Our team verifies your documents (24–48 hrs)." badge="bwait" last />
      </div>
      <div className="actions">
        <button className="btn-secondary" onClick={()=>goStep(0)}>← Back</button>
        <button className="btn-primary green" onClick={handlePayment}>
  💳 &nbsp;Pay ₹1,500 Now
</button>
      </div>
    </div>
  );

  /* STEP 2 */
  const Step2 = () => (
    <div>
      <div className="step-header">
        <div className="step-icon icon-blue">🔍</div>
        <div>
          <div className="step-title">Document Review</div>
          <div className="step-subtitle">Our experts are carefully verifying your documents</div>
        </div>
      </div>
      <div className="info-panel blue">
        <span className="info-icon">⏳</span>
        <h3>Review in Progress</h3>
        <p>Your documents are being checked for authenticity &amp; completeness.<br/><strong>Estimated: 24–48 business hours</strong></p>
      </div>
      <div className="timeline">
        <TlItem icon="✅" bg="#dcfce7" title="Documents Submitted"      desc="All documents received."                              badge="bdone" />
        <TlItem icon="✅" bg="#dcfce7" title="Payment Confirmed"         desc="₹1,500 received. Thank you!"                         badge="bdone" />
        <TlItem icon="🔍" bg="#dbeafe" title="Document Review — Active"  desc="Experts checking authenticity &amp; completeness."   badge="bprog" />
        <TlItem icon="🏛️" bg="#f1f5f9" title="University Verification"  desc="Sent to university after review clears."             badge="bwait" last />
      </div>
      <div className="actions">
        <button className="btn-secondary" onClick={()=>goStep(1)}>← Back</button>
        <button className="btn-primary"   onClick={()=>goStep(3)}>Continue &nbsp;→</button>
      </div>
    </div>
  );

  /* STEP 3 */
  const Step3 = () => (
    <div>
      <div className="step-header">
        <div className="step-icon icon-purple">🏛️</div>
        <div>
          <div className="step-title">University / Board Verification</div>
          <div className="step-subtitle">Documents sent to the official authority</div>
        </div>
      </div>
      <div className="info-panel indigo">
        <span className="info-icon">🏛️</span>
        <h3>Sent to University / Board</h3>
        <p>Your documents have been forwarded to the respective authority.<br/><strong>Estimated: 3–7 working days</strong></p>
      </div>
      <div className="timeline">
        <TlItem icon="✅" bg="#dcfce7" title="Documents Submitted"                                          badge="bdone" />
        <TlItem icon="✅" bg="#dcfce7" title="Payment Confirmed"                                             badge="bdone" />
        <TlItem icon="✅" bg="#dcfce7" title="Document Review Cleared"                                       badge="bdone" />
        <TlItem icon="🏛️" bg="#e0e7ff" title="University Verification — Active" desc="Official authority is processing your request." badge="bprog" />
        <TlItem icon="🚀" bg="#f1f5f9" title="Final Delivery"                   desc="Digital &amp; physical copies delivered."        badge="bwait" last />
      </div>
      <div className="actions">
        <button className="btn-secondary" onClick={()=>goStep(2)}>← Back</button>
        <button className="btn-primary"   onClick={()=>goStep(4)}>Continue &nbsp;→</button>
      </div>
    </div>
  );

  /* STEP 4 */
  const Step4 = () => (
    <div className="success-wrap">
      <div className="step-header">
        <div className="step-icon icon-green">🚀</div>
        <div>
          <div className="step-title">All Done! Delivery Complete</div>
          <div className="step-subtitle">Your verified documents are ready</div>
        </div>
      </div>
      <div className="info-panel green" style={{padding:40}}>
        <span className="star-burst">🎉</span>
        <h3 style={{fontSize:24,color:"#166534"}}>Congratulations!</h3>
        <p style={{fontSize:15,marginTop:8}}>Your documents have been successfully verified and delivered.</p>
        {form.email          && <div className="info-chip">📧 Sent to: <strong>{form.email}</strong></div>}
        {form.referenceNumber && <div className="info-chip" style={{marginLeft:8}}>🔖 Ref: <strong>{form.referenceNumber}</strong></div>}
      </div>
      <div className="timeline">
        <TlItem icon="✅" bg="#dcfce7" title="Documents Submitted"    badge="bdone" />
        <TlItem icon="✅" bg="#dcfce7" title="Payment Confirmed"       badge="bdone" />
        <TlItem icon="✅" bg="#dcfce7" title="Document Review Cleared" badge="bdone" />
        <TlItem icon="✅" bg="#dcfce7" title="University Verified"      badge="bdone" />
        <TlItem icon="🚀" bg="#dcfce7" title="Delivered!"              badge="bdone" last />
      </div>
      <div className="actions">
        <button className="btn-primary" onClick={reset}>+ Start New Request</button>
      </div>
    </div>
  );

  const fillPct = Math.round((activeStep / (PROC.length - 1)) * 100);

  return (
    <>
    

      {/* App shell: left road + right portal */}
      <div className="app-shell">
        {/* ── LEFT: Animated Road Panel ── */}
        <RoadPanel activeStep={activeStep} />

        {/* ── RIGHT: Portal ── */}
        <div className="portal-panel">
          <div className="portal-wrap">

            {/* Hero */}
            <div className="hero-header">
          
              <h1>Document Verification &amp; <em>Attestation</em></h1>
              <p>Fast, secure, and 100% online — get your documents verified in 5 easy steps</p>
            </div>

            {/* Track */}
            <div className="track-bar">
              <input className="track-input" type="text" value={trackId}
                onChange={e=>setTrackId(e.target.value)}
                placeholder="🔍  Enter your Tracking ID to check status..." />
              <button className="track-btn" onClick={()=>{
                if(trackId) alert(`Tracking ID: ${trackId}\n\nStatus: Document Review in Progress\nEstimated: 24–48 hours`);
                else alert("Please enter a Tracking ID.");
              }}>Track Status</button>
            </div>

            {/* Process ribbon */}
            <div className="process-section">
             
              <div className="flow-track">
                <div className="flow-fill" style={{ width: `${fillPct}%` }} />
              </div>
              <div className="proc-ribbon">
                {PROC.map((p, i) => (
                  <div key={i} className={`proc-cell ${i < activeStep ? "pc-done" : ""} ${i === activeStep ? "pc-active" : ""}`}>
                    <div className="proc-orb">{p.icon}</div>
                    <div className="proc-name">{p.label}</div>
                    <div className="proc-hint">{p.hint}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step circles */}
            {/* <div className="steps-nav">
              <div className="steps-row">
                {STEPS.map((s, i) => (
                  <div key={i} className={`step-item ${i<activeStep?"done":""} ${i===activeStep?"active":""}`}>
                    <div className="step-circle">{i<activeStep?"✓":i+1}</div>
                    <div className="step-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Main white card */}
            <div className="main-card card-anim" key={animKey}>
              {activeStep===0 && <Step0 />}
              {activeStep===1 && <Step1 />}
              {activeStep===2 && <Step2 />}
              {activeStep===3 && <Step3 />}
              {activeStep===4 && <Step4 />}
            </div>

          </div>
        </div>
      </div>

      {/* WhatsApp float */}
      <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="wa-btn">
        <svg width="26" height="26" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.199 5.077 4.447.709.297 1.262.457 1.69.63 1.838.732 2.715.993 3.241.944.574-.052 1.773-.699 2.02-1.401.248-.702.248-1.277.173-1.401-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.885c0 2.06.52 4.036 1.495 5.79L.337 22l4.512-1.212c1.687.892 3.59.83 5.247-.085l.015-.008c1.671-1.081 2.796-2.887 3.093-4.839.315-2.115-.105-4.247-1.211-5.99L22.001 0l-1.518 2.388z"/>
        </svg>
      </a>
    </>
  );
}