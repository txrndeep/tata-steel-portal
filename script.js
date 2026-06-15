/* ===================================================
   TATA STEEL — MAINTENANCE TRAINING PORTAL
   script.js  |  Navigation, Search, Pages, Animations
   =================================================== */

'use strict';

// ── SITE DATA MAP ─────────────────────────────────────────────────────────────

const SITE_MAP = {
  dashboard: {
    label: 'Dashboard',
    icon: 'fa-gauge-high',
    type: 'dashboard',
    breadcrumb: [{ label: 'Dashboard', page: 'dashboard' }]
  },
  mechanical: {
    label: 'Mechanical',
    icon: 'fa-gear',
    type: 'section',
    desc: 'Mechanical maintenance division — covers preventive, predictive and corrective maintenance for all mechanical systems across Tata Steel plants.',
    children: [],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Maintenance', page: null },
      { label: 'Mechanical', page: 'mechanical' }
    ]
  },
  'eei-epc': {
    label: 'EPC',
    icon: 'fa-microchip',
    type: 'section',
    desc: 'Electrical Process Control (EPC) division under Electrical & Electronics Instrumentation (EEI). Covers PLC, Instrumentation, and Electronics & Communication.',
    children: [
      { page: 'plc-pre', label: 'PLC — Pre-EMP', icon: 'fa-circle-nodes', desc: 'Pre-Employment training for PLC fundamentals' },
      { page: 'plc-post-group', label: 'PLC — Post-EMP', icon: 'fa-forward', desc: 'Advanced Post-Employment PLC modules' },
      { page: 'instrumentation', label: 'Instrumentation', icon: 'fa-temperature-half', desc: 'Process instrumentation training' },
      { page: 'electronics', label: 'Electronics & Communication', icon: 'fa-radio', desc: 'Electronics and communication systems' }
    ],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Maintenance', page: null },
      { label: 'Electrical (EEI)', page: 'eei' },
      { label: 'EPC', page: 'eei-epc' }
    ]
  },
  'eei-edr': {
    label: 'EDR',
    icon: 'fa-chart-line',
    type: 'section',
    desc: 'Electrical Design & Reliability (EDR) division focuses on the design standards, reliability engineering, and life-cycle management of electrical systems.',
    children: [],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Maintenance', page: null },
      { label: 'Electrical (EEI)', page: 'eei' },
      { label: 'EDR', page: 'eei-edr' }
    ]
  },
  'eei-egs': {
    label: 'EGS',
    icon: 'fa-shield-halved',
    type: 'section',
    desc: 'Electrical General Services (EGS) division manages general electrical services, power distribution, and facility electrical systems.',
    children: [],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Maintenance', page: null },
      { label: 'Electrical (EEI)', page: 'eei' },
      { label: 'EGS', page: 'eei-egs' }
    ]
  },
  'plc-pre': {
    label: 'PLC — Pre-EMP',
    icon: 'fa-play',
    type: 'section',
    desc: 'Pre-Employment PLC training module. Foundational concepts in Programmable Logic Controllers before job placement.',
    children: [],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'PLC', page: null },
      { label: 'Pre-EMP', page: 'plc-pre' }
    ]
  },
  'plc-post-group': {
    label: 'PLC — Post-EMP',
    icon: 'fa-forward',
    type: 'section',
    desc: 'Post-Employment PLC training. Advanced structured modules covering ECBS, SOE, E4, and training request workflows.',
    children: [
      { page: 'SCEP21', label: 'SCEP21 (Rockwell)', icon: 'fa-cube', desc: 'ECBS Rockwell PLC module' },
      { page: 'SCEP22', label: 'SCEP22 (Siemens)', icon: 'fa-cube', desc: 'ECBS Siemens PLC module' },
      { page: 'SCEP23', label: 'SCEP23 (ABB)', icon: 'fa-cube', desc: 'ECBS ABB PLC module' },
      { page: 'SCEP32', label: 'SCEP32 (Data Comm.)', icon: 'fa-cube', desc: 'ECBS Data Communication module' },
      { page: 'SEPLC1', label: 'SEPLC1 — Siemens', icon: 'fa-diagram-project', desc: 'SOE Siemens Level 1' },
      { page: 'SEPLC2', label: 'SEPLC2 — Siemens', icon: 'fa-diagram-project', desc: 'SOE Siemens Level 2' },
      { page: 'SEPLC3', label: 'SEPLC3 — Siemens', icon: 'fa-diagram-project', desc: 'SOE Siemens Level 3' },
      { page: 'SEABB1', label: 'SEABB1 — ABB', icon: 'fa-diagram-project', desc: 'SOE ABB Level 1' },
      { page: 'SEABB2', label: 'SEABB2 — ABB', icon: 'fa-diagram-project', desc: 'SOE ABB Level 2' },
      { page: 'SEABB3', label: 'SEABB3 — ABB', icon: 'fa-diagram-project', desc: 'SOE ABB Level 3' },
      { page: 'E4', label: 'E4', icon: 'fa-e', desc: 'Advanced E4 module' },
      { page: 'request', label: 'Request', icon: 'fa-paper-plane', desc: 'Training request form' }
    ],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'PLC', page: null },
      { label: 'Post-EMP', page: 'plc-post-group' }
    ]
  },
  instrumentation: {
    label: 'Instrumentation',
    icon: 'fa-temperature-half',
    type: 'section',
    desc: 'Process instrumentation covers temperature, pressure, flow, and level measurement instruments used in steel plant operations.',
    children: [],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'Instrumentation', page: 'instrumentation' }
    ]
  },
  electronics: {
    label: 'Electronics & Communication',
    icon: 'fa-radio',
    type: 'section',
    desc: 'Electronics and communication systems training covering signal processing, industrial communication protocols, and embedded systems.',
    children: [],
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'Electronics & Communication', page: 'electronics' }
    ]
  },

  // ── TRAINING MODULES (leaf) ──────────────────────────────────────────────
  SCEP21: {
    label: 'SCEP21',
    icon: 'fa-cube',
    type: 'module',
    tag: 'ECBS · Rockwell · Post-EMP',
    desc: 'PLC-based control system training using Rockwell Automation (Allen-Bradley) platforms. Covers Studio 5000, RSLogix, and ControlLogix architecture.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'ECBS', page: null },
      { label: 'SCEP21', page: 'SCEP21' }
    ]
  },
  SCEP22: {
    label: 'SCEP22',
    icon: 'fa-cube',
    type: 'module',
    tag: 'ECBS · Siemens · Post-EMP',
    desc: 'PLC control system training using Siemens SIMATIC family. Covers TIA Portal, S7-300/400/1500 series programming and diagnostics.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'ECBS', page: null },
      { label: 'SCEP22', page: 'SCEP22' }
    ]
  },
  SCEP23: {
    label: 'SCEP23',
    icon: 'fa-cube',
    type: 'module',
    tag: 'ECBS · ABB · Post-EMP',
    desc: 'PLC control system training on ABB platform. Covers AC500 series, Automation Builder, and ABB industrial automation ecosystem.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'ECBS', page: null },
      { label: 'SCEP23', page: 'SCEP23' }
    ]
  },
  SCEP32: {
    label: 'SCEP32',
    icon: 'fa-cube',
    type: 'module',
    tag: 'ECBS · Data Communication · Post-EMP',
    desc: 'Data communication protocols for industrial automation. Covers PROFIBUS, PROFINET, Ethernet/IP, Modbus, and OPC-UA.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'EPC', page: 'eei-epc' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'ECBS', page: null },
      { label: 'SCEP32', page: 'SCEP32' }
    ]
  },
  SEPLC1: {
    label: 'SEPLC1',
    icon: 'fa-diagram-project',
    type: 'module',
    tag: 'SOE · Siemens · Level 1',
    desc: 'Sequence of Events (SOE) training — Siemens Level 1. Foundational SOE concepts, event logging and alarm management fundamentals.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'SOE', page: null },
      { label: 'Siemens', page: null },
      { label: 'SEPLC1', page: 'SEPLC1' }
    ]
  },
  SEPLC2: {
    label: 'SEPLC2',
    icon: 'fa-diagram-project',
    type: 'module',
    tag: 'SOE · Siemens · Level 2',
    desc: 'Sequence of Events (SOE) training — Siemens Level 2. Advanced configuration, time synchronisation, and fault diagnostics.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'SOE', page: null },
      { label: 'Siemens', page: null },
      { label: 'SEPLC2', page: 'SEPLC2' }
    ]
  },
  SEPLC3: {
    label: 'SEPLC3',
    icon: 'fa-diagram-project',
    type: 'module',
    tag: 'SOE · Siemens · Level 3',
    desc: 'Sequence of Events (SOE) training — Siemens Level 3. Expert-level SOE integration, cybersecurity, and cross-system communication.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'SOE', page: null },
      { label: 'Siemens', page: null },
      { label: 'SEPLC3', page: 'SEPLC3' }
    ]
  },
  SEABB1: {
    label: 'SEABB1',
    icon: 'fa-diagram-project',
    type: 'module',
    tag: 'SOE · ABB · Level 1',
    desc: 'Sequence of Events (SOE) training — ABB Level 1. Foundational ABB SOE concepts, Relion relay integration, and event recording.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'SOE', page: null },
      { label: 'ABB', page: null },
      { label: 'SEABB1', page: 'SEABB1' }
    ]
  },
  SEABB2: {
    label: 'SEABB2',
    icon: 'fa-diagram-project',
    type: 'module',
    tag: 'SOE · ABB · Level 2',
    desc: 'Sequence of Events (SOE) training — ABB Level 2. Advanced configuration of ABB SOE systems and network-based event synchronisation.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'SOE', page: null },
      { label: 'ABB', page: null },
      { label: 'SEABB2', page: 'SEABB2' }
    ]
  },
  SEABB3: {
    label: 'SEABB3',
    icon: 'fa-diagram-project',
    type: 'module',
    tag: 'SOE · ABB · Level 3',
    desc: 'Sequence of Events (SOE) training — ABB Level 3. Expert integration with plant DCS and integration testing protocols.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'SOE', page: null },
      { label: 'ABB', page: null },
      { label: 'SEABB3', page: 'SEABB3' }
    ]
  },
  E4: {
    label: 'E4',
    icon: 'fa-e',
    type: 'module',
    tag: 'Post-EMP · Advanced Module',
    desc: 'E4 Advanced training module covering higher-level integration, plant-wide electrical system management, and energy optimisation strategies.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'E4', page: 'E4' }
    ]
  },
  request: {
    label: 'Request',
    icon: 'fa-paper-plane',
    type: 'module',
    tag: 'Post-EMP · Training Request',
    desc: 'Submit a new training request for any module, schedule a session, or request custom training materials for your team.',
    breadcrumb: [
      { label: 'Dashboard', page: 'dashboard' },
      { label: 'Post-EMP', page: 'plc-post-group' },
      { label: 'Request', page: 'request' }
    ]
  }
};

// ── TRAINING CARD DEFINITIONS ─────────────────────────────────────────────────
const TRAINING_CARDS = [
  {
    id: 'ppt',
    title: 'Presentations',
    sub: 'PowerPoint slides',
    icon: 'fa-file-powerpoint',
    color: '#d0451b',
    desc: 'Slide decks and visual presentations covering core concepts, diagrams, and lecture notes for the module.'
  },
  {
    id: 'pdf',
    title: 'PDF Manuals',
    sub: 'Reference documents',
    icon: 'fa-file-pdf',
    color: '#e11d48',
    desc: 'Comprehensive reference manuals, datasheets, and technical documentation in PDF format.'
  },
  {
    id: 'study',
    title: 'Study Material',
    sub: 'Reading resources',
    icon: 'fa-book-open',
    color: '#0052a5',
    desc: 'Structured study guides, handouts, and supplementary reading material for self-paced learning.'
  },
  {
    id: 'pretest',
    title: 'Pre-Test Quiz',
    sub: 'Baseline assessment',
    icon: 'fa-clipboard-question',
    color: '#7c3aed',
    desc: 'Baseline knowledge assessment before training begins. Identifies learning gaps and readiness level.'
  },
  {
    id: 'posttest',
    title: 'Post-Test Quiz',
    sub: 'Knowledge verification',
    icon: 'fa-circle-check',
    color: '#059669',
    desc: 'Comprehensive assessment after module completion to verify learning outcomes and certify competency.'
  },
  {
    id: 'result',
    title: 'Results',
    sub: 'Score & progress',
    icon: 'fa-chart-bar',
    color: '#0891b2',
    desc: 'View your test scores, attempt history, progress tracking, and certification status for this module.'
  },
  {
    id: 'feedback',
    title: 'Feedback',
    sub: 'Rate & review',
    icon: 'fa-star',
    color: '#d97706',
    desc: 'Share your training experience, suggest improvements, and rate the quality of the training material.'
  }
];

// ── SEARCH INDEX ──────────────────────────────────────────────────────────────
const SEARCH_INDEX = [
  { code: 'SCEP21', label: 'SCEP21 — Rockwell PLC', path: 'EPC › ECBS', icon: 'fa-cube', page: 'SCEP21' },
  { code: 'SCEP22', label: 'SCEP22 — Siemens PLC', path: 'EPC › ECBS', icon: 'fa-cube', page: 'SCEP22' },
  { code: 'SCEP23', label: 'SCEP23 — ABB PLC', path: 'EPC › ECBS', icon: 'fa-cube', page: 'SCEP23' },
  { code: 'SCEP32', label: 'SCEP32 — Data Communication', path: 'EPC › ECBS', icon: 'fa-cube', page: 'SCEP32' },
  { code: 'SEPLC1', label: 'SEPLC1 — SOE Siemens L1', path: 'EPC › SOE › Siemens', icon: 'fa-diagram-project', page: 'SEPLC1' },
  { code: 'SEPLC2', label: 'SEPLC2 — SOE Siemens L2', path: 'EPC › SOE › Siemens', icon: 'fa-diagram-project', page: 'SEPLC2' },
  { code: 'SEPLC3', label: 'SEPLC3 — SOE Siemens L3', path: 'EPC › SOE › Siemens', icon: 'fa-diagram-project', page: 'SEPLC3' },
  { code: 'SEABB1', label: 'SEABB1 — SOE ABB L1', path: 'EPC › SOE › ABB', icon: 'fa-diagram-project', page: 'SEABB1' },
  { code: 'SEABB2', label: 'SEABB2 — SOE ABB L2', path: 'EPC › SOE › ABB', icon: 'fa-diagram-project', page: 'SEABB2' },
  { code: 'SEABB3', label: 'SEABB3 — SOE ABB L3', path: 'EPC › SOE › ABB', icon: 'fa-diagram-project', page: 'SEABB3' },
  { code: 'E4', label: 'E4 — Advanced Module', path: 'EPC › Post-EMP', icon: 'fa-e', page: 'E4' },
  { code: 'Request', label: 'Request — Training Request', path: 'EPC › Post-EMP', icon: 'fa-paper-plane', page: 'request' },
  { code: 'Mechanical', label: 'Mechanical Division', path: 'Maintenance', icon: 'fa-gear', page: 'mechanical' },
  { code: 'EPC', label: 'EPC — Electrical Process Control', path: 'Electrical (EEI)', icon: 'fa-microchip', page: 'eei-epc' },
  { code: 'EDR', label: 'EDR — Electrical Design & Reliability', path: 'Electrical (EEI)', icon: 'fa-chart-line', page: 'eei-edr' },
  { code: 'EGS', label: 'EGS — Electrical General Services', path: 'Electrical (EEI)', icon: 'fa-shield-halved', page: 'eei-egs' },
  { code: 'Pre-EMP', label: 'PLC Pre-EMP', path: 'EPC › PLC', icon: 'fa-play', page: 'plc-pre' },
  { code: 'Post-EMP', label: 'PLC Post-EMP', path: 'EPC › PLC', icon: 'fa-forward', page: 'plc-post-group' },
  { code: 'Instrumentation', label: 'Instrumentation', path: 'EPC', icon: 'fa-temperature-half', page: 'instrumentation' },
  { code: 'Electronics', label: 'Electronics & Communication', path: 'EPC', icon: 'fa-radio', page: 'electronics' }
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let currentPage = 'dashboard';
let recentPages = [];
let sidebarOpen = true;
let mobileWidth = window.innerWidth <= 768;

// ── DOM REFS ──────────────────────────────────────────────────────────────────
const hamburgerBtn   = document.getElementById('hamburgerBtn');
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mainContent    = document.getElementById('mainContent');
const themeToggle    = document.getElementById('themeToggle');
const themeIcon      = document.getElementById('themeIcon');
const searchInput    = document.getElementById('searchInput');
const searchResults  = document.getElementById('searchResults');
const breadcrumb     = document.getElementById('breadcrumb');
const recentList     = document.getElementById('recentList');

// Page containers
const pageDashboard = document.getElementById('page-dashboard');
const pageSection   = document.getElementById('page-section');
const pageModule    = document.getElementById('page-module');

// Section page elements
const sectionHeroIcon  = document.getElementById('sectionHeroIcon');
const sectionHeroTitle = document.getElementById('sectionHeroTitle');
const sectionHeroDesc  = document.getElementById('sectionHeroDesc');
const childrenGrid     = document.getElementById('childrenGrid');

// Module page elements
const moduleIcon    = document.getElementById('moduleIcon');
const moduleTag     = document.getElementById('moduleTag');
const moduleTitle   = document.getElementById('moduleTitle');
const moduleDesc    = document.getElementById('moduleDesc');
const trainingGrid  = document.getElementById('trainingGrid');

// ── SIDEBAR TOGGLE ────────────────────────────────────────────────────────────
function toggleSidebar() {
  if (mobileWidth) {
    sidebar.classList.toggle('mobile-open');
    sidebarOverlay.classList.toggle('show');
    hamburgerBtn.classList.toggle('active');
  } else {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('collapsed', !sidebarOpen);
    mainContent.classList.toggle('expanded', !sidebarOpen);
    hamburgerBtn.classList.toggle('active', !sidebarOpen);
  }
}

hamburgerBtn.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('mobile-open');
  sidebarOverlay.classList.remove('show');
  hamburgerBtn.classList.remove('active');
});

window.addEventListener('resize', () => {
  mobileWidth = window.innerWidth <= 768;
  if (!mobileWidth) {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('show');
  }
});

// ── THEME TOGGLE ──────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('ts_theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('ts_theme') || 'dark';
applyTheme(savedTheme);

// ── TREE NAV ──────────────────────────────────────────────────────────────────
document.querySelectorAll('.tree-parent').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    const key = el.dataset.key;
    const children = document.getElementById(key);
    if (!children) return;
    const isOpen = children.classList.contains('open');
    children.classList.toggle('open', !isOpen);
    el.classList.toggle('open', !isOpen);
  });
});

document.querySelectorAll('.tree-leaf').forEach(el => {
  el.addEventListener('click', () => {
    const page = el.dataset.page;
    if (page) navigateTo(page);
  });
});

function highlightSidebarItem(pageKey) {
  document.querySelectorAll('.tree-label').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.tree-label[data-page="${pageKey}"]`);
  if (!target) return;
  target.classList.add('active');
  // Expand all parents
  let parent = target.parentElement;
  while (parent) {
    if (parent.classList.contains('tree-children')) {
      parent.classList.add('open');
      const sibling = parent.previousElementSibling;
      if (sibling && sibling.classList.contains('tree-parent')) {
        sibling.classList.add('open');
      }
    }
    parent = parent.parentElement;
  }
}

// ── BREADCRUMB ────────────────────────────────────────────────────────────────
function renderBreadcrumb(items) {
  breadcrumb.innerHTML = '';
  items.forEach((item, i) => {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = '›';
      breadcrumb.appendChild(sep);
    }
    if (item.page && i < items.length - 1) {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = item.label;
      a.addEventListener('click', e => { e.preventDefault(); navigateTo(item.page); });
      breadcrumb.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.className = i === items.length - 1 ? 'current' : '';
      span.textContent = item.label;
      breadcrumb.appendChild(span);
    }
  });
}

// ── RECENT PAGES ──────────────────────────────────────────────────────────────
function addToRecent(pageKey) {
  if (pageKey === 'dashboard') return;
  const data = SITE_MAP[pageKey];
  if (!data) return;
  recentPages = recentPages.filter(p => p.page !== pageKey);
  recentPages.unshift({ page: pageKey, label: data.label, icon: data.icon });
  if (recentPages.length > 8) recentPages = recentPages.slice(0, 8);
  renderRecent();
}

function renderRecent() {
  if (recentPages.length === 0) {
    recentList.innerHTML = '<div class="recent-empty"><i class="fa-solid fa-folder-open"></i> No recent modules yet. Start exploring!</div>';
    return;
  }
  recentList.innerHTML = recentPages.map(item => `
    <div class="recent-chip" data-page="${item.page}">
      <i class="fa-solid ${item.icon}"></i> ${item.label}
    </div>
  `).join('');
  recentList.querySelectorAll('.recent-chip').forEach(chip => {
    chip.addEventListener('click', () => navigateTo(chip.dataset.page));
  });
}

// ── PAGE NAVIGATION ───────────────────────────────────────────────────────────
function showPage(type) {
  [pageDashboard, pageSection, pageModule].forEach(p => p.classList.remove('active'));
  if (type === 'dashboard') pageDashboard.classList.add('active');
  else if (type === 'section') pageSection.classList.add('active');
  else if (type === 'module') pageModule.classList.add('active');
}

function navigateTo(pageKey) {
  if (!SITE_MAP[pageKey]) return;
  currentPage = pageKey;
  const data = SITE_MAP[pageKey];

  // Breadcrumb
  renderBreadcrumb(data.breadcrumb);

  // Sidebar highlight
  highlightSidebarItem(pageKey);

  // Recent
  addToRecent(pageKey);

  // Show correct page
  if (data.type === 'dashboard') {
    showPage('dashboard');
  } else if (data.type === 'section') {
    renderSectionPage(pageKey, data);
    showPage('section');
  } else if (data.type === 'module') {
    renderModulePage(pageKey, data);
    showPage('module');
  }

  // Close mobile sidebar
  if (mobileWidth) {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('show');
    hamburgerBtn.classList.remove('active');
  }

  // Scroll to top
  mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── SECTION PAGE ──────────────────────────────────────────────────────────────
function renderSectionPage(pageKey, data) {
  sectionHeroIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
  sectionHeroTitle.textContent = data.label;
  sectionHeroDesc.textContent = data.desc || '';

  if (data.children && data.children.length > 0) {
    childrenGrid.innerHTML = data.children.map(child => `
      <div class="child-card" data-page="${child.page}">
        <div class="child-card-icon"><i class="fa-solid ${child.icon}"></i></div>
        <div class="child-card-name">${child.label}</div>
        <div class="child-card-desc">${child.desc || ''}</div>
      </div>
    `).join('');
    childrenGrid.querySelectorAll('.child-card').forEach(card => {
      card.addEventListener('click', () => navigateTo(card.dataset.page));
    });
  } else {
    childrenGrid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding: 48px 0; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:12px; display:block;"></i>
        <div style="font-size:14px;">Sub-modules coming soon. Check back later.</div>
      </div>
    `;
  }
}

// ── MODULE PAGE ───────────────────────────────────────────────────────────────
function renderModulePage(pageKey, data) {
  moduleIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
  moduleTag.textContent = data.tag || '';
  moduleTitle.textContent = data.label;
  moduleDesc.textContent = data.desc || '';

  trainingGrid.innerHTML = TRAINING_CARDS.map(card => `
    <div class="training-card" style="--card-color:${card.color}">
      <div class="tc-header">
        <div class="tc-icon"><i class="fa-solid ${card.icon}"></i></div>
        <div>
          <div class="tc-title">${card.title}</div>
          <div class="tc-sub">${card.sub}</div>
        </div>
      </div>
      <div class="tc-body">
        <div class="tc-desc">${card.desc}</div>
        <span class="tc-status under-construction">
          <i class="fa-solid fa-triangle-exclamation"></i> Under Construction
        </span>
        <div class="uc-badge">
          <i class="fa-solid fa-hard-hat"></i> Content being prepared
        </div>
      </div>
      <div class="tc-footer">
        <button class="tc-btn" onclick="showUnderConstruction('${card.title}')">
          <i class="fa-solid fa-clock"></i> Coming Soon
        </button>
      </div>
    </div>
  `).join('');
}

function showUnderConstruction(title) {
  // Brief toast-style notification
  const existing = document.querySelector('.ts-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'ts-toast';
  toast.innerHTML = `<i class="fa-solid fa-hard-hat"></i> <strong>${title}</strong> — Content is being prepared. Please check back soon.`;
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px;
    background:var(--bg-surface); border:1px solid var(--bg-border);
    border-left: 4px solid var(--brand-accent);
    color:var(--text-primary); padding:14px 20px;
    border-radius:8px; box-shadow:var(--shadow-lg);
    font-size:13px; z-index:9999;
    display:flex; align-items:center; gap:10px;
    animation: slideInRight 0.3s ease;
    max-width: 380px;
  `;
  document.head.insertAdjacentHTML('beforeend', `<style>
    @keyframes slideInRight { from { transform: translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
    @keyframes slideOutRight { from { transform:translateX(0); opacity:1; } to { transform:translateX(100%); opacity:0; } }
  </style>`);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── SEARCH ────────────────────────────────────────────────────────────────────
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.classList.remove('show'); return; }

  const hits = SEARCH_INDEX.filter(item =>
    item.code.toLowerCase().includes(q) ||
    item.label.toLowerCase().includes(q) ||
    item.path.toLowerCase().includes(q)
  ).slice(0, 8);

  if (hits.length === 0) {
    searchResults.innerHTML = '<div class="search-no-result"><i class="fa-solid fa-magnifying-glass"></i> No results found</div>';
  } else {
    searchResults.innerHTML = hits.map(item => `
      <div class="search-result-item" data-page="${item.page}">
        <i class="fa-solid ${item.icon}"></i>
        <span class="search-result-code">${item.code}</span>
        <span style="color:var(--text-secondary); font-size:12px;">${item.label.replace(item.code + ' — ', '')}</span>
        <span class="search-result-path">${item.path}</span>
      </div>
    `).join('');
    searchResults.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        navigateTo(el.dataset.page);
        searchInput.value = '';
        searchResults.classList.remove('show');
      });
    });
  }
  searchResults.classList.add('show');
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') { searchResults.classList.remove('show'); searchInput.blur(); }
});

document.addEventListener('click', e => {
  if (!e.target.closest('#searchWrap')) {
    searchResults.classList.remove('show');
  }
});

// ── TOP NAV LINKS ─────────────────────────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const page = el.dataset.page;
    if (page && SITE_MAP[page]) navigateTo(page);
  });
});

// ── STAT COUNTER ANIMATION ────────────────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  // Default breadcrumb for dashboard
  renderBreadcrumb([{ label: 'Dashboard', page: 'dashboard' }]);

  // Animate stats on load
  setTimeout(animateCounters, 300);

  // Mobile: start with sidebar closed
  if (mobileWidth) {
    // sidebar starts hidden via CSS
  }

  // Open maintenance tree by default for discoverability
  ['maintenance', 'eei', 'epc'].forEach(key => {
    const el = document.getElementById(key);
    const lbl = document.querySelector(`.tree-parent[data-key="${key}"]`);
    if (el && lbl) { el.classList.add('open'); lbl.classList.add('open'); }
  });
}

init();
