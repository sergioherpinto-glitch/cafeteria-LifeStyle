// Directorio de costureros y talleres — datos guardados en localStorage (demo local).
// Cada aviso: ver SEED_DATA más abajo para la forma completa del objeto.

const STORAGE_KEY = 'costureros_listings_v2';

const PERFILES = ['Operario(a) de máquina', 'Manual de costura', 'Cortador(a)'];

const PRENDAS = [
  'Polos/Camisetas', 'Camisas', 'Pantalones/Jeans', 'Ropa deportiva',
  'Ropa interior/Lencería', 'Uniformes', 'Chompas/Tejido', 'Casacas', 'Otra'
];

const TELAS = ['Tela plana', 'Tela punto (jersey)', 'Denim/Jean', 'Tejido grueso', 'Otra'];

const EXPERIENCIA = ['Sin experiencia', 'Menos de 1 año', '1 a 3 años', '3 a 5 años', 'Más de 5 años'];

const MAQUINAS = [
  'Recta', 'Remalle', 'Recubridora', 'Collaretera', 'Ojaladora',
  'Botonera', 'Cortadora de tela', 'Otra'
];

const OPERACIONES = [
  'Cerrado de costado', 'Pegado de manga', 'Bastas', 'Pretina',
  'Bolsillos', 'Cierres/cremalleras', 'Armado completo', 'Otra'
];

const LABOR_MANUAL = ['Habilitado', 'Acabados', 'Planchado/Vaporizado', 'Limpieza/Deshilachado', 'Empaquetado', 'Otra'];

const TAMANO_TALLER = ['Taller en casa (pequeño)', 'Taller mediano', 'Taller grande / Fábrica'];

const MODALIDAD_PAGO = ['Jornal (sueldo semanal)', 'Destajo por prenda (armado completo)', 'Destajo por operación', 'Pago por día', 'A tratar'];

const DISPONIBILIDAD = ['Tiempo completo (L-V)', 'Medio tiempo / días específicos', 'Fines de semana', 'Turno noche', 'Amanecidas (urgente)'];

const ZONAS = [
  'Santa Anita', 'Ate', 'La Molina', 'San Luis', 'Vitarte',
  'El Agustino', 'San Juan de Lurigancho', 'Chosica', 'Cercado de Lima', 'Gamarra', 'Otro'
];

const SEED_DATA = [
  {
    tipo: 'ofrezco', perfiles: ['Operario(a) de máquina'],
    prendas: ['Polos/Camisetas'], telas: ['Tela punto (jersey)'], experiencia: '1 a 3 años',
    maquinas: ['Recta', 'Remalle'], operaciones: ['Cerrado de costado', 'Pegado de manga'], laborManual: [],
    tamanoTaller: 'Taller mediano', modalidadPago: 'Jornal (sueldo semanal)', pago: 'S/1300 + beneficios',
    disponibilidad: ['Tiempo completo (L-V)'],
    zona: 'Santa Anita', contacto: 'Taller Mayorazgo Chico', whatsapp: '977000001',
    descripcion: 'Experiencia en recta plana y remalle para polos en tela punto.', urgente: true,
    fecha: Date.now() - 1000 * 60 * 60 * 3,
  },
  {
    tipo: 'ofrezco', perfiles: ['Manual de costura'],
    prendas: ['Uniformes'], telas: ['Tela plana'], experiencia: '',
    maquinas: [], operaciones: [], laborManual: ['Habilitado', 'Acabados'],
    tamanoTaller: 'Taller mediano', modalidadPago: 'Destajo por operación', pago: 'A tratar',
    disponibilidad: ['Tiempo completo (L-V)'],
    zona: 'Santa Anita', contacto: 'Clínica Municipal - Taller', whatsapp: '955000002',
    descripcion: 'También se necesita ayudante de línea, de 18 a 28 años.', urgente: true,
    fecha: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    tipo: 'ofrezco', perfiles: ['Operario(a) de máquina'],
    prendas: ['Ropa deportiva', 'Polos/Camisetas'], telas: ['Tela punto (jersey)', 'Tejido grueso'], experiencia: 'Sin experiencia',
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
    disponibilidad: ['Tiempo completo (L-V)'],
    zona: 'Ate', contacto: 'Confecciones Javier Prado', whatsapp: '977000004',
    descripcion: 'Zona Prolongación Javier Prado, costado del estadio de la U.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 30,
  },
  {
    tipo: 'busco', perfiles: ['Operario(a) de máquina'],
    prendas: ['Polos/Camisetas', 'Ropa deportiva'], telas: ['Tela punto (jersey)'], experiencia: 'Más de 5 años',
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
    tamanoTaller: '', modalidadPago: 'Pago por día', pago: '',
    disponibilidad: ['Fines de semana', 'Turno noche'],
    zona: 'San Juan de Lurigancho', contacto: 'Jhon P.', whatsapp: '999000006',
    descripcion: 'Busco taller estable, experiencia en corte y confección. Disponible fines de semana o de noche.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 50,
  },
];

let listings = loadListings();
let activeTipo = '';

function loadListings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* localStorage no disponible */ }
  saveListings(SEED_DATA.map((d, i) => ({ id: 'seed-' + i, ...d })));
  return loadListingsRaw();
}

function loadListingsRaw() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) { return []; }
}

function saveListings(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
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

function updatePerfilSections() {
  const perfiles = checkedValues('perfilChips');
  document.getElementById('maquinaSection').classList.toggle('hidden', !perfiles.includes('Operario(a) de máquina'));
  document.getElementById('manualSection').classList.toggle('hidden', !perfiles.includes('Manual de costura'));
}

function updateTallerSection() {
  const esOfrezco = document.querySelector('input[name="tipo"]:checked').value === 'ofrezco';
  document.getElementById('tallerSection').classList.toggle('hidden', !esOfrezco);
}

function openModal() { document.getElementById('modal').classList.add('open'); }
function closeModal() { document.getElementById('modal').classList.remove('open'); }

function resetForm(form) {
  form.reset();
  document.querySelectorAll('#publishForm input[type=checkbox]').forEach(i => i.checked = false);
  updatePerfilSections();
  updateTallerSection();
}

function initFormListeners() {
  document.getElementById('fab').addEventListener('click', openModal);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  document.querySelectorAll('#perfilChips input').forEach(i => i.addEventListener('change', updatePerfilSections));
  document.querySelectorAll('input[name="tipo"]').forEach(i => i.addEventListener('change', updateTallerSection));

  document.getElementById('publishForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const whatsappDigits = document.getElementById('formWhatsapp').value.replace(/\D/g, '');
    if (whatsappDigits.length !== 9) { alert('Ingresa un número de WhatsApp válido de 9 dígitos.'); return; }

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const perfiles = checkedValues('perfilChips');

    const listing = {
      id: 'l-' + Date.now(),
      tipo,
      perfiles,
      prendas: checkedValues('prendaChips'),
      telas: checkedValues('telaChips'),
      experiencia: document.getElementById('formExperiencia').value,
      maquinas: perfiles.includes('Operario(a) de máquina') ? checkedValues('maquinaChips') : [],
      operaciones: perfiles.includes('Operario(a) de máquina') ? checkedValues('operacionChips') : [],
      laborManual: perfiles.includes('Manual de costura') ? checkedValues('manualChips') : [],
      tamanoTaller: tipo === 'ofrezco' ? document.getElementById('formTamanoTaller').value : '',
      modalidadPago: document.getElementById('formModalidadPago').value,
      pago: document.getElementById('formPago').value.trim(),
      disponibilidad: checkedValues('disponibilidadChips'),
      zona: document.getElementById('formZona').value,
      contacto: document.getElementById('formContacto').value.trim(),
      whatsapp: whatsappDigits,
      descripcion: document.getElementById('formDescripcion').value.trim(),
      urgente: document.getElementById('formUrgente').checked,
      fecha: Date.now(),
    };

    listings.unshift(listing);
    saveListings(listings);
    resetForm(e.target);
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
  initFormListeners();
  initFilterListeners();
  initShare();
  document.querySelector('.tipo-tab[data-tipo=""]').click();
}

document.addEventListener('DOMContentLoaded', init);
