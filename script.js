/**
 * ═══════════════════════════════════════════════════════════
 * TATA STEEL – MAINTENANCE TRAINING PORTAL
 * script.js
 * ═══════════════════════════════════════════════════════════
 *
 * ──────────────────────────────────────────────────────────
 * SUPABASE SETUP (REQUIRED FOR FILE STORAGE)
 * ──────────────────────────────────────────────────────────
 * 1. Go to https://supabase.com and create a FREE account.
 * 2. Create a new project.
 * 3. In your project dashboard go to:
 *      Settings → API
 * 4. Copy:
 *      • Project URL  →  paste below as SUPABASE_URL
 *      • anon/public key  →  paste below as SUPABASE_ANON_KEY
 * 5. In Supabase go to:
 *      Storage → Create a new bucket
 *      Name it exactly:  training-files
 *      Make it PUBLIC (toggle ON)
 * 6. In Supabase go to:
 *      Table Editor → Create a new table
 *      Name: files
 *      Columns (add these exactly):
 *        id          uuid  default: gen_random_uuid()  primary key
 *        module      text
 *        category    text
 *        name        text
 *        path        text
 *        size        int8
 *        type        text
 *        url         text
 *        uploaded_at timestamptz  default: now()
 *      Enable Row Level Security = OFF (for internal use)
 * ──────────────────────────────────────────────────────────
 */

const SUPABASE_URL      = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// ════════════════════════════════════════════════════
// MODULE REGISTRY  –  every navigable destination
// ════════════════════════════════════════════════════
const MODULES = {
  home: {
    label: 'Home',
    path: ['Home'],
  },
  mechanical: {
    label: 'Mechanical',
    path: ['Home', 'Mechanical'],
    desc: 'Mechanical maintenance training resources covering equipment maintenance, inspection procedures, and mechanical systems.',
  },
  eei: {
    label: 'Electrical (EEI)',
    path: ['Home', 'Electrical (EEI)'],
    desc: 'Electrical EEI overview – umbrella for EPC, EDR, and EGS training streams.',
  },
  epc: {
    label: 'EPC',
    path: ['Home', 'Electrical (EEI)', 'EPC'],
    desc: 'Electrical Power & Control – covers PLC, Instrumentation, and Electronics & Communication training.',
  },
  edr: {
    label: 'EDR',
    path: ['Home', 'Electrical (EEI)', 'EDR'],
    desc: 'EDR training resources and materials.',
  },
  egs: {
    label: 'EGS',
    path: ['Home', 'Electrical (EEI)', 'EGS'],
    desc: 'EGS training resources and materials.',
  },
  'plc-pre': {
    label: 'PLC – Pre-EMP',
    path: ['Home', 'Electrical (EEI)', 'EPC', 'PLC', 'Pre-EMP'],
    desc: 'Pre-Employment training for PLC systems. Covers foundational concepts before formal EMP enrollment.',
  },
  'plc-post': {
    label: 'PLC – Post-EMP',
    path: ['Home', 'Electrical (EEI)', 'EPC', 'PLC', 'Post-EMP'],
    desc: 'Post-EMP advanced PLC training resources including ECBS, SOE, E4, and Request modules.',
  },
  'ecbs-scep21': {
    label: 'SCEP21 – Rockwell',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'ECBS', 'SCEP21'],
    desc: 'ECBS SCEP21 – Rockwell Automation PLC training. Covers Allen-Bradley PLCs and Studio 5000 programming environment.',
  },
  'ecbs-scep22': {
    label: 'SCEP22 – Siemens',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'ECBS', 'SCEP22'],
    desc: 'ECBS SCEP22 – Siemens PLC training. Covers S7 series PLCs and TIA Portal programming.',
  },
  'ecbs-scep23': {
    label: 'SCEP23 – ABB',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'ECBS', 'SCEP23'],
    desc: 'ECBS SCEP23 – ABB PLC training. Covers AC500 series and Automation Builder software.',
  },
  'ecbs-scep32': {
    label: 'SCEP32 – Data Communication',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'ECBS', 'SCEP32'],
    desc: 'ECBS SCEP32 – Industrial Data Communication training. Covers PROFIBUS, PROFINET, Ethernet/IP protocols.',
  },
  'soe-seplc1': {
    label: 'SEPLC1 – Siemens',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'SOE', 'Siemens', 'SEPLC1'],
    desc: 'SOE Siemens SEPLC1 – Level 1 Siemens PLC maintenance and operation training.',
  },
  'soe-seplc2': {
    label: 'SEPLC2 – Siemens',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'SOE', 'Siemens', 'SEPLC2'],
    desc: 'SOE Siemens SEPLC2 – Level 2 advanced Siemens PLC programming and diagnostics.',
  },
  'soe-seplc3': {
    label: 'SEPLC3 – Siemens',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'SOE', 'Siemens', 'SEPLC3'],
    desc: 'SOE Siemens SEPLC3 – Level 3 specialist Siemens PLC systems and network integration.',
  },
  'soe-seabb1': {
    label: 'SEABB1 – ABB',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'SOE', 'ABB', 'SEABB1'],
    desc: 'SOE ABB SEABB1 – Level 1 ABB PLC and drive systems training.',
  },
  'soe-seabb2': {
    label: 'SEABB2 – ABB',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'SOE', 'ABB', 'SEABB2'],
    desc: 'SOE ABB SEABB2 – Level 2 advanced ABB systems configuration and troubleshooting.',
  },
  'soe-seabb3': {
    label: 'SEABB3 – ABB',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'SOE', 'ABB', 'SEABB3'],
    desc: 'SOE ABB SEABB3 – Level 3 specialist ABB automation and safety systems.',
  },
  e4: {
    label: 'E4',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'E4'],
    desc: 'E4 training module resources and materials.',
  },
  request: {
    label: 'Request',
    path: ['Home', 'EEI', 'EPC', 'PLC', 'Post-EMP', 'Request'],
    desc: 'Training resource request module – submit requests for new training materials or course additions.',
  },
  instrumentation: {
    label: 'Instrumentation',
    path: ['Home', 'EEI', 'EPC', 'Instrumentation'],
    desc: 'Instrumentation training – covers process instrumentation, calibration, HART & FOUNDATION Fieldbus protocols.',
  },
  electronics: {
    label: 'Electronics & Communication',
    path: ['Home', 'EEI', 'EPC', 'Electronics & Communication'],
    desc: 'Electronics & Communication training – covers industrial electronics, signal processing, and communication systems.',
  },
};

const CATEGORIES = [
  { key: 'presentations', label: 'Presentations',  icon: 'presentation' },
  { key: 'manuals',       label: 'PDF Manuals',     icon: 'file-text' },
  { key: 'study',         label: 'Study Materials', icon: 'book-open' },
  { key: 'pretest',       label: 'Pre-Test Quiz',   icon: 'clipboard-list' },
  { key: 'posttest',      label: 'Post-Test Quiz',  icon: 'clipboard-check' },
  { key: 'results',       label: 'Results',         icon: 'bar-chart-2' },
  { key: 'feedback',      label: 'Feedback',        icon: 'message-square' },
];

// ════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════
let currentModule   = 'home';
let currentCategory = 'presentations';
let uploadContext   = { module: null, category: null };
let uploadQueue     = [];   // { file, id }
let fileCache       = {};   // { "module:category": [...] }

// ════════════════════════════════════════════════════
// SUPABASE CLIENT (vanilla fetch-based)
// ════════════════════════════════════════════════════
const supabase = (() => {
  const configured = SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE';

  async function query(endpoint, options = {}) {
    if (!configured) return { data: null, error: { message: 'Supabase not configured' } };
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...options.headers,
      },
      ...options,
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      return { data: null, error: err };
    }
    const data = await resp.json().catch(() => null);
    return { data, error: null };
  }

  async function uploadFile(bucket, path, file) {
    if (!configured) return { data: null, error: { message: 'Supabase not configured' } };
    const resp = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      return { data: null, error: err };
    }
    const data = await resp.json().catch(() => null);
    return { data, error: null };
  }

  function getPublicUrl(bucket, path) {
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
  }

  async function deleteFile(bucket, path) {
    if (!configured) return { error: { message: 'Not configured' } };
    const resp = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    if (!resp.ok) return { error: await resp.json().catch(() => ({})) };
    return { error: null };
  }

  return { query, uploadFile, getPublicUrl, deleteFile, configured };
})();

// ════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNav();
  initSidebar();
  initSearch();
  initUploadModal();
  navigateTo('home');
  if (!supabase.configured) {
    console.warn('Supabase not configured. Files will not persist. See script.js for setup instructions.');
  }
});

// ════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════
function initNav() {
  // All data-nav links (sidebar + quick-nav + home cards)
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-nav]');
    if (!el) return;
    e.preventDefault();
    const dest = el.getAttribute('data-nav');
    if (dest) navigateTo(dest);
    // close quick-nav menu on click
    document.getElementById('quick-nav-menu').classList.remove('open');
    // close sidebar on mobile
    if (window.innerWidth <= 900) closeSidebar();
  });

  // Quick nav toggle
  document.getElementById('quick-nav-toggle').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('quick-nav-menu').classList.toggle('open');
  });
  document.addEventListener('click', () => {
    document.getElementById('quick-nav-menu').classList.remove('open');
  });

  // Tab buttons
  document.querySelector('.tab-strip').addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const tab = btn.dataset.tab;
    activateTab(tab);
  });
}

function navigateTo(moduleKey) {
  if (!MODULES[moduleKey]) return;
  currentModule = moduleKey;

  // Update active nav items
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-nav') === moduleKey);
  });

  if (moduleKey === 'home') {
    showPage('page-home');
    updateBreadcrumb([{ label: 'Home', key: 'home' }]);
    updateLocationChip('Home');
    return;
  }

  showPage('page-module');
  const mod = MODULES[moduleKey];
  document.getElementById('module-title').textContent = mod.label;
  document.getElementById('module-desc').textContent  = mod.desc || '';

  // Build breadcrumb
  const crumbs = mod.path.map((label, i) => ({
    label,
    key: i === 0 ? 'home' : Object.keys(MODULES).find(k => MODULES[k].label === label) || null,
  }));
  updateBreadcrumb(crumbs);
  updateLocationChip(mod.label);

  // Reset to first tab and load files
  activateTab('presentations');
  openSidebarTo(moduleKey);
}

function showPage(id) {
  document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

function updateBreadcrumb(crumbs) {
  const ol = document.getElementById('breadcrumb');
  ol.innerHTML = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    return `<li class="${isLast ? 'current' : ''}">
      ${isLast || !c.key
        ? `<span>${c.label}</span>`
        : `<a href="#" data-nav="${c.key}">${c.label}</a>`}
    </li>`;
  }).join('');
  lucide.createIcons();
}

function updateLocationChip(label) {
  document.getElementById('location-chip').textContent = label;
}

// ════════════════════════════════════════════════════
// SIDEBAR BEHAVIOUR
// ════════════════════════════════════════════════════
function initSidebar() {
  const hamburger = document.getElementById('hamburger-btn');
  const overlay   = document.getElementById('sidebar-overlay');

  hamburger.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const open = sidebar.classList.toggle('open');
    overlay.classList.toggle('active', open);
  });
  overlay.addEventListener('click', closeSidebar);

  // Collapsible section headers
  document.querySelectorAll('.nav-section-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      const body = document.getElementById(`section-${section}`);
      if (!body) return;
      btn.classList.toggle('open');
      body.classList.toggle('open');
    });
  });

  // Sub-section headers (nested collapse)
  document.querySelectorAll('.nav-sub-header').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const sub = btn.dataset.sub;
      const body = document.getElementById(`subsection-${sub}`);
      if (!body) return;
      btn.classList.toggle('open');
      body.classList.toggle('open');
    });
  });
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

// Auto-expand sidebar path to current module
function openSidebarTo(moduleKey) {
  const mod = MODULES[moduleKey];
  if (!mod) return;
  const path = mod.path.map(l => l.toLowerCase().replace(/\s/g, '-').replace(/[()&]/g, ''));

  // Open EEI section if needed
  const needsEei = ['eei','epc','edr','egs','plc-pre','plc-post','ecbs-scep21','ecbs-scep22',
    'ecbs-scep23','ecbs-scep32','soe-seplc1','soe-seplc2','soe-seplc3',
    'soe-seabb1','soe-seabb2','soe-seabb3','e4','request','instrumentation','electronics'].includes(moduleKey);
  if (needsEei) openSidebarSection('eei');

  const needsMech = moduleKey === 'mechanical';
  if (needsMech) openSidebarSection('mechanical');

  // Deeper auto-opens
  const epcMods = ['epc','plc-pre','plc-post','ecbs-scep21','ecbs-scep22','ecbs-scep23',
    'ecbs-scep32','soe-seplc1','soe-seplc2','soe-seplc3','soe-seabb1','soe-seabb2',
    'soe-seabb3','e4','request','instrumentation','electronics'];
  if (epcMods.includes(moduleKey)) openSubSection('epc');

  const plcMods = ['plc-pre','plc-post','ecbs-scep21','ecbs-scep22','ecbs-scep23',
    'ecbs-scep32','soe-seplc1','soe-seplc2','soe-seplc3','soe-seabb1','soe-seabb2',
    'soe-seabb3','e4','request'];
  if (plcMods.includes(moduleKey)) openSubSection('plc');

  const postMods = ['ecbs-scep21','ecbs-scep22','ecbs-scep23','ecbs-scep32',
    'soe-seplc1','soe-seplc2','soe-seplc3','soe-seabb1','soe-seabb2','soe-seabb3','e4','request'];
  if (postMods.includes(moduleKey)) openSubSection('plc-post');

  if (['ecbs-scep21','ecbs-scep22','ecbs-scep23','ecbs-scep32'].includes(moduleKey)) openSubSection('ecbs');
  if (['soe-seplc1','soe-seplc2','soe-seplc3','soe-seabb1','soe-seabb2','soe-seabb3'].includes(moduleKey)) openSubSection('soe');
  if (['soe-seplc1','soe-seplc2','soe-seplc3'].includes(moduleKey)) openSubSection('soe-siemens');
  if (['soe-seabb1','soe-seabb2','soe-seabb3'].includes(moduleKey)) openSubSection('soe-abb');
}

function openSidebarSection(key) {
  const btn  = document.querySelector(`.nav-section-header[data-section="${key}"]`);
  const body = document.getElementById(`section-${key}`);
  if (btn)  btn.classList.add('open');
  if (body) body.classList.add('open');
}
function openSubSection(key) {
  const btn  = document.querySelector(`.nav-sub-header[data-sub="${key}"]`);
  const body = document.getElementById(`subsection-${key}`);
  if (btn)  btn.classList.add('open');
  if (body) body.classList.add('open');
}

// ════════════════════════════════════════════════════
// TABS & FILE PANELS
// ════════════════════════════════════════════════════
function activateTab(tabKey) {
  currentCategory = tabKey;

  document.querySelectorAll('.tab-btn').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.tab === tabKey));
  document.querySelectorAll('.tab-panel').forEach(panel =>
    panel.classList.toggle('active', panel.id === `panel-${tabKey}`));

  renderFilePanel(currentModule, tabKey);
}

function renderFilePanel(moduleKey, category) {
  const panel = document.getElementById(`panel-${category}`);
  if (!panel) return;

  const cat = CATEGORIES.find(c => c.key === category);
  const title = cat ? cat.label : category;

  panel.innerHTML = `
    <div class="file-panel-header">
      <span class="file-panel-title">${title}</span>
      <button class="btn-primary" id="open-upload-btn-${category}">
        <i data-lucide="upload"></i> Upload File
      </button>
    </div>
    <div id="file-list-${category}" class="file-list">
      <div class="file-list-empty">
        <i data-lucide="loader-circle" style="animation:spin 1s linear infinite"></i>
        <p>Loading files…</p>
      </div>
    </div>
  `;
  lucide.createIcons();

  document.getElementById(`open-upload-btn-${category}`).addEventListener('click', () => {
    openUploadModal(moduleKey, category);
  });

  loadFiles(moduleKey, category);
}

async function loadFiles(moduleKey, category) {
  const cacheKey = `${moduleKey}:${category}`;
  const listEl   = document.getElementById(`file-list-${category}`);
  if (!listEl) return;

  // Check local cache first
  if (fileCache[cacheKey]) {
    renderFileList(listEl, fileCache[cacheKey], moduleKey, category);
    return;
  }

  if (!supabase.configured) {
    renderFileList(listEl, [], moduleKey, category);
    return;
  }

  const { data, error } = await supabase.query(
    `files?module=eq.${encodeURIComponent(moduleKey)}&category=eq.${encodeURIComponent(category)}&order=uploaded_at.desc`
  );

  if (error) {
    listEl.innerHTML = `<div class="file-list-empty"><p style="color:var(--c-error)">Could not load files. Check Supabase configuration.</p></div>`;
    return;
  }

  fileCache[cacheKey] = data || [];
  renderFileList(listEl, fileCache[cacheKey], moduleKey, category);
}

function renderFileList(container, files, moduleKey, category) {
  if (!files || files.length === 0) {
    container.innerHTML = `
      <div class="file-list-empty">
        <i data-lucide="folder-open"></i>
        <p>No files uploaded yet for this category.</p>
        <p style="font-size:12px;margin-top:4px;color:var(--c-text-3)">Click <strong>Upload File</strong> to add materials.</p>
      </div>`;
    lucide.createIcons();
    return;
  }

  container.innerHTML = files.map(f => `
    <div class="file-row" data-file-id="${f.id}">
      <div class="file-icon ${getExtClass(f.name)}">${getExtLabel(f.name)}</div>
      <div class="file-info">
        <div class="file-name">${escHtml(f.name)}</div>
        <div class="file-meta">${formatSize(f.size)} · Uploaded ${formatDate(f.uploaded_at)}</div>
      </div>
      <div class="file-actions">
        <a href="${escHtml(f.url)}" target="_blank" download="${escHtml(f.name)}" class="btn-icon" title="Download">
          <i data-lucide="download"></i>
        </a>
        <button class="btn-icon delete-file-btn" data-file-id="${f.id}" data-file-path="${escHtml(f.path)}" data-module="${moduleKey}" data-category="${category}" title="Delete">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();

  container.querySelectorAll('.delete-file-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteFileById(btn.dataset.fileId, btn.dataset.filePath, btn.dataset.module, btn.dataset.category);
    });
  });
}

async function deleteFileById(id, storagePath, moduleKey, category) {
  if (!confirm('Delete this file? This cannot be undone.')) return;

  if (!supabase.configured) {
    showToast('Supabase not configured – cannot delete.', 'warning');
    return;
  }

  // Delete from storage
  await supabase.deleteFile('training-files', storagePath);

  // Delete from database
  const { error } = await supabase.query(`files?id=eq.${id}`, { method: 'DELETE' });
  if (error) {
    showToast('Failed to delete file record.', 'error');
    return;
  }

  // Invalidate cache
  const cacheKey = `${moduleKey}:${category}`;
  delete fileCache[cacheKey];

  showToast('File deleted.', 'success');
  loadFiles(moduleKey, category);
}

// ════════════════════════════════════════════════════
// UPLOAD MODAL
// ════════════════════════════════════════════════════
function initUploadModal() {
  const modal     = document.getElementById('upload-modal');
  const closeBtn  = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('cancel-upload-btn');
  const uploadBtn = document.getElementById('confirm-upload-btn');
  const dropZone  = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');

  closeBtn.addEventListener('click',  closeUploadModal);
  cancelBtn.addEventListener('click', closeUploadModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeUploadModal(); });

  // File input change
  fileInput.addEventListener('change', () => {
    addToQueue([...fileInput.files]);
    fileInput.value = '';
  });

  // Drop zone click → trigger file input
  dropZone.addEventListener('click', () => fileInput.click());

  // Drag events
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    addToQueue([...e.dataTransfer.files]);
  });

  uploadBtn.addEventListener('click', runUploads);
}

function openUploadModal(moduleKey, category) {
  uploadContext = { module: moduleKey, category };
  uploadQueue   = [];
  document.getElementById('file-queue').innerHTML = '';
  document.getElementById('upload-modal').classList.add('open');
  const cat = CATEGORIES.find(c => c.key === category);
  document.getElementById('modal-title').textContent =
    `Upload – ${MODULES[moduleKey]?.label || moduleKey} › ${cat?.label || category}`;
}

function closeUploadModal() {
  document.getElementById('upload-modal').classList.remove('open');
  uploadQueue = [];
  document.getElementById('file-queue').innerHTML = '';
}

function addToQueue(files) {
  const MAX = 50 * 1024 * 1024; // 50 MB
  files.forEach(file => {
    if (file.size > MAX) {
      showToast(`"${file.name}" exceeds 50 MB and was skipped.`, 'warning');
      return;
    }
    const id = 'q-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    uploadQueue.push({ file, id });
    renderQueueItem({ file, id });
  });
}

function renderQueueItem({ file, id }) {
  const queue = document.getElementById('file-queue');
  const div = document.createElement('div');
  div.className = 'queue-item';
  div.id = id;
  div.innerHTML = `
    <div class="file-icon ${getExtClass(file.name)}" style="width:28px;height:28px;font-size:9px">${getExtLabel(file.name)}</div>
    <div style="flex:1;min-width:0">
      <div class="queue-item-name">${escHtml(file.name)}</div>
      <div class="queue-item-size">${formatSize(file.size)}</div>
    </div>
    <button class="queue-item-remove" data-queue-id="${id}" title="Remove">
      <i data-lucide="x"></i>
    </button>
  `;
  div.querySelector('.queue-item-remove').addEventListener('click', () => {
    uploadQueue = uploadQueue.filter(q => q.id !== id);
    div.remove();
  });
  queue.appendChild(div);
  lucide.createIcons();
}

async function runUploads() {
  if (uploadQueue.length === 0) {
    showToast('No files selected.', 'warning');
    return;
  }
  if (!supabase.configured) {
    showToast('Supabase is not configured. Files cannot be saved permanently. See script.js for setup.', 'warning');
    return;
  }

  document.getElementById('confirm-upload-btn').disabled = true;
  document.getElementById('confirm-upload-btn').textContent = 'Uploading…';

  let successCount = 0;

  for (const { file, id } of uploadQueue) {
    const itemEl = document.getElementById(id);
    if (!itemEl) continue;

    // Add progress bar
    const progressDiv = document.createElement('div');
    progressDiv.innerHTML = `<div class="queue-item-progress"><div class="queue-item-bar" id="bar-${id}" style="width:0%"></div></div>
      <div class="queue-item-status uploading" id="status-${id}">Uploading…</div>`;
    itemEl.appendChild(progressDiv);

    const storagePath = `${uploadContext.module}/${uploadContext.category}/${Date.now()}-${file.name}`;

    // Upload to storage
    const { data: storageData, error: storageErr } = await supabase.uploadFile('training-files', storagePath, file);
    const barEl    = document.getElementById(`bar-${id}`);
    const statusEl = document.getElementById(`status-${id}`);

    if (storageErr) {
      if (barEl) barEl.style.background = 'var(--c-error)';
      if (statusEl) { statusEl.textContent = 'Upload failed'; statusEl.className = 'queue-item-status error'; }
      continue;
    }

    if (barEl) barEl.style.width = '70%';

    const publicUrl = supabase.getPublicUrl('training-files', storagePath);

    // Insert metadata into database
    const { error: dbErr } = await supabase.query('files', {
      method: 'POST',
      body: JSON.stringify({
        module:   uploadContext.module,
        category: uploadContext.category,
        name:     file.name,
        path:     storagePath,
        size:     file.size,
        type:     file.type,
        url:      publicUrl,
      }),
    });

    if (dbErr) {
      if (statusEl) { statusEl.textContent = 'DB error – file uploaded but not recorded'; statusEl.className = 'queue-item-status error'; }
      continue;
    }

    if (barEl) barEl.style.width = '100%';
    if (statusEl) { statusEl.textContent = 'Done'; statusEl.className = 'queue-item-status done'; }
    successCount++;
  }

  // Invalidate cache and reload
  const cacheKey = `${uploadContext.module}:${uploadContext.category}`;
  delete fileCache[cacheKey];

  document.getElementById('confirm-upload-btn').disabled = false;
  document.getElementById('confirm-upload-btn').textContent = 'Upload Files';

  showToast(
    `${successCount} of ${uploadQueue.length} file(s) uploaded successfully.`,
    successCount === uploadQueue.length ? 'success' : 'warning'
  );

  // Close after short delay and refresh
  setTimeout(() => {
    closeUploadModal();
    if (currentModule === uploadContext.module && currentCategory === uploadContext.category) {
      loadFiles(currentModule, currentCategory);
    }
  }, 1200);
}

// ════════════════════════════════════════════════════
// GLOBAL SEARCH
// ════════════════════════════════════════════════════
function initSearch() {
  const input    = document.getElementById('global-search');
  const dropdown = document.getElementById('search-results');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.classList.remove('visible'); return; }

    const results = Object.entries(MODULES)
      .filter(([key, mod]) =>
        key !== 'home' &&
        (mod.label.toLowerCase().includes(q) ||
         mod.path.join(' ').toLowerCase().includes(q) ||
         (mod.desc || '').toLowerCase().includes(q))
      )
      .slice(0, 8);

    if (results.length === 0) {
      dropdown.innerHTML = `<div class="search-result-item" style="color:var(--c-text-3)">No results found</div>`;
    } else {
      dropdown.innerHTML = results.map(([key, mod]) => `
        <div class="search-result-item" data-nav="${key}">
          <i data-lucide="search"></i>
          <span>${escHtml(mod.label)}</span>
          <span class="search-result-path">${mod.path.slice(1).join(' › ')}</span>
        </div>
      `).join('');
      lucide.createIcons();

      dropdown.querySelectorAll('[data-nav]').forEach(el => {
        el.addEventListener('click', () => {
          navigateTo(el.dataset.nav);
          input.value = '';
          dropdown.classList.remove('visible');
        });
      });
    }

    dropdown.classList.add('visible');
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { dropdown.classList.remove('visible'); input.blur(); }
  });
}

// ════════════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ════════════════════════════════════════════════════
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 320); }, duration);
}

// ════════════════════════════════════════════════════
// UTILITY HELPERS
// ════════════════════════════════════════════════════
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  } catch { return iso; }
}

function getExt(filename) {
  return (filename || '').split('.').pop().toLowerCase();
}

function getExtLabel(filename) {
  const ext = getExt(filename);
  return ext.toUpperCase().slice(0, 4);
}

function getExtClass(filename) {
  const ext = getExt(filename);
  if (ext === 'pdf') return 'pdf';
  if (ext === 'ppt' || ext === 'pptx') return 'ppt';
  if (ext === 'doc' || ext === 'docx') return 'doc';
  if (ext === 'xls' || ext === 'xlsx') return 'xls';
  return 'default';
}
