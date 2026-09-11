// Directorio de costureros y talleres — datos guardados en localStorage (demo local).
// Cada aviso: ver SEED_DATA más abajo para la forma completa del objeto.

const STORAGE_KEY = 'costureros_listings_v2';
const MINE_KEY = 'costureros_mine_v2';

const PERFILES = ['Operario(a) de máquina', 'Manual de costura', 'Cortador(a)', 'Vendedor(a)'];

const PRENDAS = [
  'Polos/Camisetas', 'Camisas', 'Pantalones/Jeans', 'Ropa deportiva',
  'Ropa interior/Lencería', 'Uniformes', 'Chompas/Tejido', 'Casacas', 'Otra'
];

const TELAS = ['Tela punto (polos, buzos)', 'Tela plana', 'Denim/Jean', 'Drill (ropa de trabajo)', 'Tejido grueso', 'Otra'];

const EXPERIENCIA = [
  'Sin experiencia', 'Sin experiencia, con ganas de aprender',
  'Menos de 1 año', '1 a 3 años', '3 a 5 años', 'Más de 5 años'
];

const MAQUINAS = [
  'Recta', 'Remalle', 'Recubridora', 'Collaretera', 'Ojaladora',
  'Botonera', 'Cortadora de tela', 'Otra'
];

const OPERACIONES = [
  'Cerrado de costado', 'Pegado de manga', 'Bastas', 'Pretina',
  'Bolsillos', 'Cierres/cremalleras', 'Armado completo', 'Otra'
];

const LABOR_MANUAL = ['Habilitado', 'Acabados', 'Planchado/Vaporizado', 'Limpieza/Deshilachado', 'Empaquetado', 'Otra'];

const TAMANO_TALLER = ['Taller pequeño', 'Taller mediano', 'Taller grande / Fábrica'];

const MODALIDAD_PAGO = ['Jornal (sueldo semanal)', 'Destajo por prenda (armado completo)', 'Destajo por operación', 'Pago por días trabajados', 'A tratar'];

const DISPONIBILIDAD = ['Tiempo completo (L-S)', 'Medio tiempo / días específicos', 'Fines de semana', 'Turno noche', 'Amanecidas'];

const ZONAS = [
  'Santa Anita', 'Ate', 'La Molina', 'San Luis', 'Vitarte',
  'El Agustino', 'San Juan de Lurigancho', 'Chosica', 'Cercado de Lima', 'Gamarra', 'Otro'
];

const SEED_DATA = [
  {
    tipo: 'ofrezco', perfiles: ['Operario(a) de máquina'],
    prendas: ['Polos/Camisetas'], telas: ['Tela punto (polos, buzos)'], experiencia: '1 a 3 años',
    maquinas: ['Recta', 'Remalle'], operaciones: ['Cerrado de costado', 'Pegado de manga'], laborManual: [],
    tamanoTaller: 'Taller mediano', modalidadPago: 'Jornal (sueldo semanal)', pago: 'S/1300 + beneficios',
    disponibilidad: ['Tiempo completo (L-S)'],
    zona: 'Santa Anita', contacto: 'Taller Mayorazgo Chico', whatsapp: '977000001',
    descripcion: 'Experiencia en recta plana y remalle para polos en tela punto.', urgente: true,
    fecha: Date.now() - 1000 * 60 * 60 * 3,
  },
  {
    tipo: 'ofrezco', perfiles: ['Manual de costura'],
    prendas: ['Uniformes'], telas: ['Tela plana'], experiencia: 'Sin experiencia, con ganas de aprender',
    maquinas: [], operaciones: [], laborManual: ['Habilitado', 'Acabados'],
    tamanoTaller: 'Taller mediano', modalidadPago: 'Destajo por operación', pago: 'A tratar',
    disponibilidad: ['Tiempo completo (L-S)'],
    zona: 'Santa Anita', contacto: 'Clínica Municipal - Taller', whatsapp: '955000002',
    descripcion: 'También se necesita ayudante de línea, de 18 a 28 años. Se enseña.', urgente: true,
    fecha: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    tipo: 'ofrezco', perfiles: ['Operario(a) de máquina'],
    prendas: ['Ropa deportiva', 'Polos/Camisetas'], telas: ['Tela punto (polos, buzos)', 'Tejido grueso'], experiencia: 'Sin experiencia',
    maquinas: ['Recta', 'Remalle', 'Recubridora'], operaciones: [], laborManual: [],
    tamanoTaller: 'Taller grande / Fábrica', modalidadPago: 'A tratar', pago: 'Con o sin experiencia',
    disponibilidad: [],
    zona: 'Santa Anita', contacto: 'Taller Botica Carrión', whatsapp: '926000003',
    descripcion: 'Manuales de costura, con o sin experiencia.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 20,
  },
  {
    tipo: 'ofrezco', perfiles: ['Operario(a) de máquina'],
    prendas: ['Camisas'], telas: ['Tela plana'], experiencia: '3 a 5 años',
    maquinas: ['Recta', 'Remalle'], operaciones: ['Armado completo'], laborManual: [],
    tamanoTaller: 'Taller mediano', modalidadPago: 'Destajo por prenda (armado completo)', pago: 'Buen sueldo',
    disponibilidad: ['Tiempo completo (L-S)'],
    zona: 'Ate', contacto: 'Confecciones Javier Prado', whatsapp: '977000004',
    descripcion: 'Zona Prolongación Javier Prado, costado del estadio de la U.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 30,
  },
  {
    tipo: 'busco', perfiles: ['Operario(a) de máquina'],
    prendas: ['Polos/Camisetas', 'Ropa deportiva'], telas: ['Tela punto (polos, buzos)'], experiencia: 'Más de 5 años',
    maquinas: ['Recta', 'Remalle', 'Recubridora'], operaciones: ['Cerrado de costado', 'Pegado de manga'], laborManual: [],
    tamanoTaller: '', modalidadPago: 'Destajo por operación', pago: '',
    disponibilidad: ['Medio tiempo / días específicos'],
    zona: 'Ate', contacto: 'Rosa M.', whatsapp: '944000005',
    descripcion: 'Trabajé en talleres de Santa Anita, Vitarte y en Gamarra. Solo trabajo lunes a miércoles.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 8,
  },
  {
    tipo: 'busco', perfiles: ['Cortador(a)'],
    prendas: ['Pantalones/Jeans'], telas: ['Denim/Jean'], experiencia: '3 a 5 años',
    maquinas: [], operaciones: [], laborManual: [],
    tamanoTaller: '', modalidadPago: 'Pago por días trabajados', pago: '',
    disponibilidad: ['Fines de semana', 'Turno noche'],
    zona: 'San Juan de Lurigancho', contacto: 'Jhon P.', whatsapp: '999000006',
    descripcion: 'Busco taller estable, experiencia en corte y confección. Disponible fines de semana o de noche.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 50,
  },
  {
    tipo: 'busco', perfiles: ['Vendedor(a)'],
    prendas: ['Ropa deportiva', 'Casacas'], telas: [], experiencia: '3 a 5 años',
    maquinas: [], operaciones: [], laborManual: [],
    tamanoTaller: '', modalidadPago: 'Jornal (sueldo semanal)', pago: '',
    disponibilidad: ['Fines de semana'],
    zona: 'Gamarra', contacto: 'Milagros T.', whatsapp: '933000007',
    descripcion: 'Experiencia vendiendo ropa deportiva de marca en Gamarra, buen trato al cliente.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 40,
  },
];

let listings = loadListings();
let mineIds = loadMineIds();
let activeTipo = '';
let editingId = null;

function loadListings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* localStorage no disponible */ }
  saveListings(SEED_DATA.map((d, i) => ({ id: 'seed-' + i, ...d })));
  return loadListingsRaw();
}

function loadListingsRaw() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; }
}

function saveListings(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
}

function loadMineIds() {
  try { return JSON.parse(localStorage.getItem(MINE_KEY)) || []; } catch (e) { return []; }
}

function saveMineIds() {
  try { localStorage.setItem(MINE_KEY, JSON.stringify(mineIds)); } catch (e) { /* ignore */ }
}

function fillSelect(select, options) {
  options.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt;
    el.textContent = opt;
    select.appendChild(el);
  });
}

function timeAgo(ts) {
  const diffMin = Math.round((Date.now() - ts) / 60000);
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `hace ${diffH} h`;
  return `hace ${Math.round(diffH / 24)} d`;
}

// Etiquetas cortas que identifican la especialidad de un aviso, en el orden
// que de verdad se usa para evaluar a alguien: máquina/labor antes que prenda.
function skillTags(listing) {
  if (listing.maquinas.length || listing.operaciones.length) {
    return [...listing.maquinas, ...listing.operaciones];
  }
  if (listing.laborManual.length) return listing.laborManual;
  if (listing.perfiles.includes('Cortador(a)')) return ['Corte de tela'];
  if (listing.perfiles.includes('Vendedor(a)')) return ['Venta de ropa'];
  return listing.prendas;
}

function waMessage(listing) {
  const skill = skillTags(listing).slice(0, 3).join(', ') || 'costura';
  if (listing.tipo === 'ofrezco') {
    return `Hola, vi el aviso de "${skill}" en ${listing.zona}. Me interesa, ¿sigue disponible?`;
  }
  return `Hola ${listing.contacto}, vi tu perfil de ${skill} en ${listing.zona}. Tenemos una vacante, ¿te interesa?`;
}

function waLink(listing) {
  const digits = (listing.whatsapp || '').replace(/\D/g, '');
  return `https://wa.me/51${digits}?text=${encodeURIComponent(waMessage(listing))}`;
}

function matchesFilters(listing) {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const perfil = document.getElementById('filterPerfil').value;
  const zona = document.getElementById('filterZona').value;
  const soloUrgente = document.getElementById('filterUrgente').checked;

  if (activeTipo && listing.tipo !== activeTipo) return false;
  if (perfil && !listing.perfiles.includes(perfil)) return false;
  if (zona && listing.zona !== zona) return false;
  if (soloUrgente && !listing.urgente) return false;
  if (q) {
    const haystack = [
      listing.contacto, listing.descripcion, listing.zona, listing.experiencia,
      listing.tamanoTaller, listing.modalidadPago,
      ...listing.perfiles, ...listing.prendas, ...listing.telas,
      ...listing.maquinas, ...listing.operaciones, ...listing.laborManual, ...listing.disponibilidad,
    ].join(' ').toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function appendChips(container, values, className) {
  values.forEach(v => {
    const chip = document.createElement('span');
    chip.className = className;
    chip.textContent = v;
    container.appendChild(chip);
  });
}

function appendMetaLine(container, template, text) {
  if (!text) return;
  const node = template.content.cloneNode(true);
  node.querySelector('span').textContent = text;
  container.appendChild(node);
}

function render() {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('emptyState');
  const tpl = document.getElementById('cardTemplate');
  const metaTpl = document.getElementById('metaLineTemplate');
  grid.innerHTML = '';

  const filtered = listings
    .filter(matchesFilters)
    .sort((a, b) => (b.urgente - a.urgente) || (b.fecha - a.fecha));

  document.getElementById('resultCount').textContent =
    `${filtered.length} aviso${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}`;

  empty.classList.toggle('visible', filtered.length === 0);

  filtered.forEach(listing => {
    const node = tpl.content.cloneNode(true);
    const article = node.querySelector('.card');
    article.dataset.id = listing.id;

    node.querySelector('.owner-actions').classList.toggle('hidden', !mineIds.includes(listing.id));

    const tipoBadge = node.querySelector('.tipo-badge');
    tipoBadge.textContent = listing.tipo === 'ofrezco' ? 'Busca personal' : 'Busca trabajo';
    tipoBadge.classList.add(listing.tipo === 'ofrezco' ? 'badge-ofrezco' : 'badge-busca');

    node.querySelector('.urgente-badge').classList.toggle('hidden', !listing.urgente);
    node.querySelector('.contacto-name').textContent = listing.contacto;
    node.querySelector('.zona-line span').textContent = `${listing.zona} · ${timeAgo(listing.fecha)}`;

    appendChips(node.querySelector('.perfil-chips'), listing.perfiles, 'chip chip-perfil');

    const prendaTela = [
      listing.prendas.length ? `Prenda: ${listing.prendas.join(', ')}` : '',
      listing.telas.length ? `Tela: ${listing.telas.join(', ')}` : '',
    ].filter(Boolean).join(' · ');
    appendMetaLine(node.querySelector('.meta-lines'), metaTpl, prendaTela);

    appendChips(node.querySelector('.skill-chips'), [...listing.maquinas, ...listing.operaciones], 'chip');
    appendChips(node.querySelector('.skill-chips'), listing.laborManual, 'chip');

    const metaLines = node.querySelector('.meta-lines');
    appendMetaLine(metaLines, metaTpl, listing.experiencia ? `Experiencia: ${listing.experiencia}` : '');
    appendMetaLine(metaLines, metaTpl, listing.tipo === 'ofrezco' && listing.tamanoTaller ? listing.tamanoTaller : '');

    const pagoParts = [listing.modalidadPago, listing.pago].filter(Boolean).join(' · ');
    const pagoEl = node.querySelector('.pago-text');
    if (pagoParts) { pagoEl.textContent = pagoParts; } else { pagoEl.remove(); }

    appendChips(node.querySelector('.disponibilidad-chips'), listing.disponibilidad, 'chip chip-disponibilidad');

    const descEl = node.querySelector('.desc-text');
    if (listing.descripcion) { descEl.textContent = listing.descripcion; } else { descEl.remove(); }

    node.querySelector('.wa-link').href = waLink(listing);

    grid.appendChild(node);
  });
}

function buildChipGroup(containerId, values) {
  const wrap = document.getElementById(containerId);
  values.forEach(v => {
    const label = document.createElement('label');
    label.className = 'cat-toggle';
    label.innerHTML = `<input type="checkbox" value="${v}"><span>${v}</span>`;
    wrap.appendChild(label);
  });
}

function checkedValues(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input:checked`)).map(i => i.value);
}

// Convierte los checkboxes marcados en valores finales: si "Otra" está
// marcada, la reemplaza por lo que la persona escribió en el campo de texto.
function resolveChipValues(containerId, otroInputId) {
  const checked = checkedValues(containerId);
  if (!checked.includes('Otra')) return checked;
  const custom = document.getElementById(otroInputId).value.trim();
  const withoutOtra = checked.filter(v => v !== 'Otra');
  if (!custom) return checked;
  const customValues = custom.split(',').map(s => s.trim()).filter(Boolean);
  return [...withoutOtra, ...customValues];
}

function populateChipGroup(containerId, canonicalList, storedValues, otroInputId, otroFieldId) {
  const canonicalSet = new Set(canonicalList);
  const leftovers = storedValues.filter(v => !canonicalSet.has(v));
  const hasOtra = leftovers.length > 0;
  document.querySelectorAll(`#${containerId} input`).forEach(cb => {
    cb.checked = storedValues.includes(cb.value) || (cb.value === 'Otra' && hasOtra);
  });
  document.getElementById(otroInputId).value = leftovers.join(', ');
  document.getElementById(otroFieldId).classList.toggle('hidden', !hasOtra);
}

function wireOtroToggle(containerId, otroFieldId) {
  const otraCheckbox = document.querySelector(`#${containerId} input[value="Otra"]`);
  if (!otraCheckbox) return;
  otraCheckbox.addEventListener('change', () => {
    document.getElementById(otroFieldId).classList.toggle('hidden', !otraCheckbox.checked);
  });
}

function hideAllOtroFields() {
  document.querySelectorAll('.otro-field').forEach(f => f.classList.add('hidden'));
}

function updatePerfilSections() {
  const perfiles = checkedValues('perfilChips');
  document.getElementById('maquinaSection').classList.toggle('hidden', !perfiles.includes('Operario(a) de máquina'));
  document.getElementById('manualSection').classList.toggle('hidden', !perfiles.includes('Manual de costura'));
}

function updateTallerSection() {
  const esOfrezco = document.querySelector('input[name="tipo"]:checked').value === 'ofrezco';
  document.getElementById('tallerSection').classList.toggle('hidden', !esOfrezco);
}

function updateZonaOtro() {
  document.getElementById('zonaOtroField').classList.toggle('hidden', document.getElementById('formZona').value !== 'Otro');
}

function openModal() { document.getElementById('modal').classList.add('open'); }
function closeModal() { document.getElementById('modal').classList.remove('open'); }

function openModalForCreate() {
  editingId = null;
  const form = document.getElementById('publishForm');
  form.reset();
  hideAllOtroFields();
  updatePerfilSections();
  updateTallerSection();
  updateZonaOtro();
  document.getElementById('modalTitle').textContent = 'Publicar aviso';
  document.getElementById('submitBtn').textContent = 'Publicar aviso';
  openModal();
}

function openModalForEdit(listing) {
  editingId = listing.id;
  const form = document.getElementById('publishForm');
  form.reset();

  document.querySelector(`input[name="tipo"][value="${listing.tipo}"]`).checked = true;

  document.querySelectorAll('#perfilChips input').forEach(cb => { cb.checked = listing.perfiles.includes(cb.value); });

  populateChipGroup('prendaChips', PRENDAS, listing.prendas, 'prendaOtro', 'prendaOtroField');
  populateChipGroup('telaChips', TELAS, listing.telas, 'telaOtro', 'telaOtroField');
  document.getElementById('formExperiencia').value = listing.experiencia || '';
  populateChipGroup('maquinaChips', MAQUINAS, listing.maquinas, 'maquinaOtro', 'maquinaOtroField');
  populateChipGroup('operacionChips', OPERACIONES, listing.operaciones, 'operacionOtro', 'operacionOtroField');
  populateChipGroup('manualChips', LABOR_MANUAL, listing.laborManual, 'manualOtro', 'manualOtroField');
  document.getElementById('formTamanoTaller').value = listing.tamanoTaller || '';

  if (ZONAS.includes(listing.zona)) {
    document.getElementById('formZona').value = listing.zona;
    document.getElementById('zonaOtro').value = '';
  } else {
    document.getElementById('formZona').value = 'Otro';
    document.getElementById('zonaOtro').value = listing.zona;
  }
  document.getElementById('formModalidadPago').value = listing.modalidadPago || '';
  document.getElementById('formPago').value = listing.pago || '';
  Array.from(document.querySelectorAll('#disponibilidadChips input')).forEach(cb => {
    cb.checked = listing.disponibilidad.includes(cb.value);
  });
  document.getElementById('formContacto').value = listing.contacto;
  document.getElementById('formWhatsapp').value = listing.whatsapp;
  document.getElementById('formDescripcion').value = listing.descripcion || '';
  document.getElementById('formUrgente').checked = listing.urgente;

  updatePerfilSections();
  updateTallerSection();
  updateZonaOtro();
  document.getElementById('modalTitle').textContent = 'Editar aviso';
  document.getElementById('submitBtn').textContent = 'Guardar cambios';
  openModal();
}

function deleteListing(id) {
  if (!confirm('¿Seguro que quieres eliminar este aviso?')) return;
  listings = listings.filter(l => l.id !== id);
  mineIds = mineIds.filter(i => i !== id);
  saveListings(listings);
  saveMineIds();
  render();
}

function initFormListeners() {
  document.getElementById('fab').addEventListener('click', openModalForCreate);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  document.querySelectorAll('#perfilChips input').forEach(i => i.addEventListener('change', updatePerfilSections));
  document.querySelectorAll('input[name="tipo"]').forEach(i => i.addEventListener('change', updateTallerSection));
  document.getElementById('formZona').addEventListener('change', updateZonaOtro);

  wireOtroToggle('prendaChips', 'prendaOtroField');
  wireOtroToggle('telaChips', 'telaOtroField');
  wireOtroToggle('maquinaChips', 'maquinaOtroField');
  wireOtroToggle('operacionChips', 'operacionOtroField');
  wireOtroToggle('manualChips', 'manualOtroField');

  document.getElementById('grid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;
    if (e.target.closest('.edit-btn')) {
      const listing = listings.find(l => l.id === id);
      if (listing) openModalForEdit(listing);
    } else if (e.target.closest('.delete-btn')) {
      deleteListing(id);
    }
  });

  document.getElementById('publishForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const whatsappDigits = document.getElementById('formWhatsapp').value.replace(/\D/g, '');
    if (whatsappDigits.length !== 9) { alert('Ingresa un número de WhatsApp válido de 9 dígitos.'); return; }

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const perfiles = checkedValues('perfilChips');
    const zonaSelect = document.getElementById('formZona').value;
    const zona = zonaSelect === 'Otro' ? (document.getElementById('zonaOtro').value.trim() || 'Otro') : zonaSelect;

    const data = {
      tipo,
      perfiles,
      prendas: resolveChipValues('prendaChips', 'prendaOtro'),
      telas: resolveChipValues('telaChips', 'telaOtro'),
      experiencia: document.getElementById('formExperiencia').value,
      maquinas: perfiles.includes('Operario(a) de máquina') ? resolveChipValues('maquinaChips', 'maquinaOtro') : [],
      operaciones: perfiles.includes('Operario(a) de máquina') ? resolveChipValues('operacionChips', 'operacionOtro') : [],
      laborManual: perfiles.includes('Manual de costura') ? resolveChipValues('manualChips', 'manualOtro') : [],
      tamanoTaller: tipo === 'ofrezco' ? document.getElementById('formTamanoTaller').value : '',
      modalidadPago: document.getElementById('formModalidadPago').value,
      pago: document.getElementById('formPago').value.trim(),
      disponibilidad: checkedValues('disponibilidadChips'),
      zona,
      contacto: document.getElementById('formContacto').value.trim(),
      whatsapp: whatsappDigits,
      descripcion: document.getElementById('formDescripcion').value.trim(),
      urgente: document.getElementById('formUrgente').checked,
    };

    if (editingId) {
      const idx = listings.findIndex(l => l.id === editingId);
      if (idx !== -1) listings[idx] = { ...listings[idx], ...data };
    } else {
      const id = 'l-' + Date.now();
      listings.unshift({ id, ...data, fecha: Date.now() });
      mineIds.push(id);
      saveMineIds();
    }

    saveListings(listings);
    closeModal();
    render();
  });
}

function initFilterListeners() {
  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('filterPerfil').addEventListener('change', render);
  document.getElementById('filterZona').addEventListener('change', render);
  document.getElementById('filterUrgente').addEventListener('change', render);

  document.querySelectorAll('.tipo-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTipo = btn.dataset.tipo;
      document.querySelectorAll('.tipo-tab').forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      render();
    });
  });
}

function initShare() {
  const btn = document.getElementById('shareBtn');
  btn.style.display = 'inline-flex';
  btn.addEventListener('click', () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Costureros Lima', url }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent('Directorio de costureros y talleres: ' + url)}`, '_blank');
    }
  });
}

function init() {
  fillSelect(document.getElementById('filterPerfil'), PERFILES);
  fillSelect(document.getElementById('filterZona'), ZONAS);
  fillSelect(document.getElementById('formZona'), ZONAS);
  fillSelect(document.getElementById('formExperiencia'), EXPERIENCIA);
  fillSelect(document.getElementById('formTamanoTaller'), TAMANO_TALLER);
  fillSelect(document.getElementById('formModalidadPago'), MODALIDAD_PAGO);

  buildChipGroup('perfilChips', PERFILES);
  buildChipGroup('prendaChips', PRENDAS);
  buildChipGroup('telaChips', TELAS);
  buildChipGroup('maquinaChips', MAQUINAS);
  buildChipGroup('operacionChips', OPERACIONES);
  buildChipGroup('manualChips', LABOR_MANUAL);
  buildChipGroup('disponibilidadChips', DISPONIBILIDAD);

  updatePerfilSections();
  updateTallerSection();
  updateZonaOtro();
  initFormListeners();
  initFilterListeners();
  initShare();
  document.querySelector('.tipo-tab[data-tipo=""]').click();
}

document.addEventListener('DOMContentLoaded', init);
