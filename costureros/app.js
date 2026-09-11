// Directorio de costureros y talleres — datos guardados en localStorage (demo local).
// Cada aviso: {id, tipo:'ofrezco'|'busco', categorias:[], zona, pago, contacto, whatsapp, descripcion, urgente, fecha}

const STORAGE_KEY = 'costureros_listings_v1';

const CATEGORIAS = [
  'Recta', 'Remalle', 'Recubierto', 'Cerrado de costado', 'Basteado',
  'Pegado de manga', 'Ojalado', 'Cortador(a)', 'Ayudante de línea',
  'Planchado', 'Estampado', 'Aprendiz'
];

const ZONAS = [
  'Santa Anita', 'Ate', 'La Molina', 'San Luis', 'Vitarte',
  'El Agustino', 'San Juan de Lurigancho', 'Chosica', 'Cercado de Lima', 'Otro'
];

const SEED_DATA = [
  { tipo: 'ofrezco', categorias: ['Recta', 'Remalle'], zona: 'Santa Anita', pago: 'S/1300 + beneficios', contacto: 'Taller Mayorazgo Chico', whatsapp: '977000001', descripcion: 'Experiencia en recta plana y remalle. Buen sueldo.', urgente: true, fecha: Date.now() - 1000 * 60 * 60 * 3 },
  { tipo: 'ofrezco', categorias: ['Cerrado de costado', 'Basteado', 'Pegado de manga'], zona: 'Santa Anita', pago: 'A tratar', contacto: 'Clínica Municipal - Taller', whatsapp: '955000002', descripcion: 'También se necesita ayudante de línea, de 18 a 28 años.', urgente: true, fecha: Date.now() - 1000 * 60 * 60 * 5 },
  { tipo: 'ofrezco', categorias: ['Recubierto', 'Recta', 'Remalle'], zona: 'Santa Anita', pago: 'Con o sin experiencia', contacto: 'Taller Botica Carrión', whatsapp: '926000003', descripcion: 'Manuales de costura, con o sin experiencia.', urgente: false, fecha: Date.now() - 1000 * 60 * 60 * 20 },
  { tipo: 'ofrezco', categorias: ['Recta', 'Remalle'], zona: 'Ate', pago: 'Buen sueldo', contacto: 'Confecciones Javier Prado', whatsapp: '977000004', descripcion: 'Zona Prolongación Javier Prado, costado del estadio de la U.', urgente: false, fecha: Date.now() - 1000 * 60 * 60 * 30 },
  { tipo: 'busco', categorias: ['Recta', 'Remalle', 'Recubierto'], zona: 'Ate', pago: '', contacto: 'Rosa M.', whatsapp: '944000005', descripcion: '5 años de experiencia en confección textil, disponibilidad inmediata.', urgente: false, fecha: Date.now() - 1000 * 60 * 60 * 8 },
  { tipo: 'busco', categorias: ['Cortador(a)', 'Recta'], zona: 'San Juan de Lurigancho', pago: '', contacto: 'Jhon P.', whatsapp: '999000006', descripcion: 'Busco taller estable, experiencia en corte y confección.', urgente: false, fecha: Date.now() - 1000 * 60 * 60 * 50 },
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

function fillSelect(select, options, placeholderLabel) {
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

function waMessage(listing) {
  if (listing.tipo === 'ofrezco') {
    return `Hola, vi el aviso de "${listing.categorias.join(', ')}" en ${listing.zona}. Me interesa, ¿sigue disponible?`;
  }
  return `Hola ${listing.contacto}, vi tu perfil de ${listing.categorias.join(', ')} en ${listing.zona}. Tenemos una vacante, ¿te interesa?`;
}

function waLink(listing) {
  const digits = (listing.whatsapp || '').replace(/\D/g, '');
  return `https://wa.me/51${digits}?text=${encodeURIComponent(waMessage(listing))}`;
}

function matchesFilters(listing) {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const cat = document.getElementById('filterCategoria').value;
  const zona = document.getElementById('filterZona').value;
  const soloUrgente = document.getElementById('filterUrgente').checked;

  if (activeTipo && listing.tipo !== activeTipo) return false;
  if (cat && !listing.categorias.includes(cat)) return false;
  if (zona && listing.zona !== zona) return false;
  if (soloUrgente && !listing.urgente) return false;
  if (q) {
    const haystack = [listing.contacto, listing.descripcion, listing.zona, ...listing.categorias].join(' ').toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function render() {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('emptyState');
  const tpl = document.getElementById('cardTemplate');
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

    const chipsWrap = node.querySelector('.cat-chips');
    listing.categorias.forEach(c => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = c;
      chipsWrap.appendChild(chip);
    });

    const pagoEl = node.querySelector('.pago-text');
    if (listing.pago) { pagoEl.textContent = listing.pago; } else { pagoEl.remove(); }

    const descEl = node.querySelector('.desc-text');
    if (listing.descripcion) { descEl.textContent = listing.descripcion; } else { descEl.remove(); }

    const link = node.querySelector('.wa-link');
    link.href = waLink(listing);

    grid.appendChild(node);
  });
}

function buildCategoriaChips() {
  const wrap = document.getElementById('categoriaChips');
  CATEGORIAS.forEach(cat => {
    const label = document.createElement('label');
    label.className = 'cat-toggle';
    label.innerHTML = `<input type="checkbox" value="${cat}"><span>${cat}</span>`;
    wrap.appendChild(label);
  });
}

function openModal() { document.getElementById('modal').classList.add('open'); }
function closeModal() { document.getElementById('modal').classList.remove('open'); }

function initFormListeners() {
  document.getElementById('fab').addEventListener('click', openModal);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  document.getElementById('publishForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const categorias = Array.from(document.querySelectorAll('#categoriaChips input:checked')).map(i => i.value);
    if (categorias.length === 0) { alert('Selecciona al menos una especialidad.'); return; }

    const whatsappDigits = document.getElementById('formWhatsapp').value.replace(/\D/g, '');
    if (whatsappDigits.length !== 9) { alert('Ingresa un número de WhatsApp válido de 9 dígitos.'); return; }

    const listing = {
      id: 'l-' + Date.now(),
      tipo: document.querySelector('input[name="tipo"]:checked').value,
      categorias,
      zona: document.getElementById('formZona').value,
      pago: document.getElementById('formPago').value.trim(),
      contacto: document.getElementById('formContacto').value.trim(),
      whatsapp: whatsappDigits,
      descripcion: document.getElementById('formDescripcion').value.trim(),
      urgente: document.getElementById('formUrgente').checked,
      fecha: Date.now(),
    };

    listings.unshift(listing);
    saveListings(listings);
    e.target.reset();
    document.querySelectorAll('#categoriaChips input').forEach(i => i.checked = false);
    closeModal();
    render();
  });
}

function initFilterListeners() {
  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('filterCategoria').addEventListener('change', render);
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
  fillSelect(document.getElementById('filterCategoria'), CATEGORIAS);
  fillSelect(document.getElementById('filterZona'), ZONAS);
  fillSelect(document.getElementById('formZona'), ZONAS);
  buildCategoriaChips();
  initFormListeners();
  initFilterListeners();
  initShare();
  document.querySelector('.tipo-tab[data-tipo=""]').click();
}

document.addEventListener('DOMContentLoaded', init);
