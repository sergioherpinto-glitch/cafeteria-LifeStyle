// Directorio de costureros y talleres — datos guardados en localStorage (demo local).
// Dos secciones independientes: Empleos (avisos de trabajo) y Mercadería (compra/venta).

const STORAGE_KEY = 'costureros_listings_v2';
const MERC_STORAGE_KEY = 'costureros_mercaderia_v1';
const MINE_KEY = 'costureros_mine_v2';

// A este correo llegan los reportes y las confirmaciones de pago. No usamos
// WhatsApp aquí a propósito: así el número personal de Sergio no queda
// expuesto en el código de la página.
const ADMIN_EMAIL = 'sergioestratega.oficial@gmail.com';
// El número de Yape sí tiene que ser visible para que la gente pueda pagar —
// eso lo exige Yape, no es una decisión de la app.
const YAPE_NUMBER = '926924581';

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

const MERC_ITEMS = [
  'Polos/Camisetas', 'Camisas', 'Pantalones/Jeans', 'Ropa deportiva',
  'Ropa interior/Lencería', 'Uniformes', 'Chompas/Tejido', 'Casacas',
  'Telas (por rollo)', 'Insumos/Accesorios de costura', 'Otra'
];

const TALLAS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Talla única/estándar', 'Otra'];

const COLORES = [
  'Negro', 'Blanco', 'Gris', 'Azul', 'Celeste', 'Rojo', 'Verde',
  'Amarillo', 'Rosado', 'Beige/Crema', 'Marrón', 'Multicolor/Varios colores', 'Otro'
];

const VENTA_TIPO = ['Por mayor', 'Por menor', 'Mayor y menor'];

const MODALIDAD_VENTA = ['Contra entrega', 'Envío de muestra primero', 'Recojo en tienda/domicilio', 'Envío a nivel nacional', 'Otra'];

const MERC_ZONAS = [
  'Santa Anita', 'Ate', 'La Molina', 'San Luis', 'Vitarte',
  'El Agustino', 'San Juan de Lurigancho', 'Chosica', 'Cercado de Lima', 'Gamarra',
  'Provincia - Sierra', 'Provincia - Costa', 'Provincia - Selva', 'Todo el Perú (envío nacional)', 'Otro'
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
    documento: '20601234567', documentoTipo: 'RUC',
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
    zona: 'Ate', zonasTrabajo: ['Santa Anita', 'Vitarte', 'Gamarra'], contacto: 'Rosa M.', whatsapp: '944000005',
    descripcion: 'Trabajé en talleres de Santa Anita, Vitarte y en Gamarra. Solo trabajo lunes a miércoles.', urgente: false,
    documento: '45678912', documentoTipo: 'DNI',
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

const MERC_SEED_DATA = [
  {
    tipo: 'vendo', items: ['Chompas/Tejido'], tallas: ['S', 'M', 'L', 'XL'], colores: ['Multicolor/Varios colores'],
    cantidad: '200 unidades', ventaTipo: 'Mayor y menor', modalidadVenta: ['Recojo en tienda/domicilio', 'Envío a nivel nacional'],
    precioMayor: 'S/25 por unidad', precioMenor: 'S/35 por unidad', zona: 'Gamarra', contacto: 'Manuel R.', whatsapp: '911000001',
    descripcion: 'Chompas de tejido grueso, varios colores. Mando fotos y video por WhatsApp.',
    documento: '20601987654', documentoTipo: 'RUC',
    urgente: false, fecha: Date.now() - 1000 * 60 * 60 * 10,
  },
  {
    tipo: 'compro', items: ['Ropa deportiva'], tallas: [], colores: [],
    cantidad: '1000 unidades', ventaTipo: 'Por mayor', modalidadVenta: [],
    precioMayor: '', precioMenor: '', zona: 'Cercado de Lima', contacto: 'Distribuidora Andina', whatsapp: '922000002',
    descripcion: 'Mayorista busca proveedor constante de ropa deportiva.', urgente: false,
    fecha: Date.now() - 1000 * 60 * 60 * 15,
  },
  {
    tipo: 'vendo', items: ['Chompas/Tejido'], tallas: ['Talla única/estándar'], colores: ['Multicolor/Varios colores'],
    cantidad: '500 unidades', ventaTipo: 'Por mayor', modalidadVenta: ['Contra entrega', 'Envío de muestra primero'],
    precioMayor: 'A tratar según cantidad', precioMenor: '', zona: 'Provincia - Sierra', contacto: 'Confecciones Rivera', whatsapp: '944556677',
    descripcion: 'Chompas para temporada de frío, pensadas para reventa en provincia. Mando muestra primero.',
    urgente: true, fecha: Date.now() - 1000 * 60 * 60 * 6,
  },
];

let listings = loadFrom(STORAGE_KEY, SEED_DATA, 'l');
let mercListings = loadFrom(MERC_STORAGE_KEY, MERC_SEED_DATA, 'm');
let mineIds = loadMineIds();
let activeTipo = '';
let activeMercTipo = '';
let editingId = null;
let mercEditingId = null;
let currentView = 'empleos';
const MAX_PHOTOS = 3;
let formPhotoPicker = null;
let mercPhotoPicker = null;

function loadFrom(key, seed, prefix) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* localStorage no disponible */ }
  const withIds = seed.map((d, i) => ({ id: `${prefix}-seed-${i}`, ...d }));
  try { localStorage.setItem(key, JSON.stringify(withIds)); } catch (e) { /* ignore */ }
  return withIds;
}

function saveListings(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
}

function saveMercListings(data) {
  try { localStorage.setItem(MERC_STORAGE_KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
}

// Reduce el archivo a una sola imagen liviana (comprimida) para que quepa cómodamente
// en localStorage — no se guarda el archivo original ni video: ver nota del formulario.
function readAndCompressImage(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; }
        else if (height >= width && height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

// Controla un selector de "hasta MAX_PHOTOS fotos" para un formulario: comprime
// cada imagen al elegirla, dibuja las miniaturas, y permite quitarlas una por una.
// confirmWrapId (opcional) es una casilla "mis fotos son apropiadas" que solo se
// pide (y solo bloquea el envío) cuando hay al menos una foto agregada.
function makePhotoPicker(inputId, listId, labelId, confirmWrapId) {
  let photos = [];

  function updateConfirmCheckbox() {
    if (!confirmWrapId) return;
    const wrap = document.getElementById(confirmWrapId);
    const checkbox = wrap.querySelector('input');
    const show = photos.length > 0;
    wrap.classList.toggle('hidden', !show);
    checkbox.required = show;
    if (!show) checkbox.checked = false;
  }

  function renderThumbs() {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    photos.forEach((src, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'foto-thumb';
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'foto-thumb-remove';
      removeBtn.setAttribute('aria-label', 'Quitar foto');
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => { photos.splice(i, 1); renderThumbs(); });
      thumb.appendChild(img);
      thumb.appendChild(removeBtn);
      list.appendChild(thumb);
    });
    document.getElementById(labelId).classList.toggle('hidden', photos.length >= MAX_PHOTOS);
    updateConfirmCheckbox();
  }

  document.getElementById(inputId).addEventListener('change', async (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_PHOTOS - photos.length);
    for (const file of files) {
      try {
        photos.push(await readAndCompressImage(file, 480, 0.55));
      } catch (err) {
        alert('No se pudo procesar una de las imágenes. Prueba con otra.');
      }
    }
    e.target.value = '';
    renderThumbs();
  });

  return {
    get: () => photos,
    set(arr) { photos = (arr || []).slice(0, MAX_PHOTOS); renderThumbs(); },
    reset() { photos = []; renderThumbs(); },
  };
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

// ---------- Utilidades genéricas de chips ("otra" con texto libre) ----------

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

function resolveChipValues(containerId, otroInputId) {
  const checked = checkedValues(containerId);
  if (!checked.includes('Otra')) return checked;
  const custom = document.getElementById(otroInputId).value.trim();
  if (!custom) return checked;
  const withoutOtra = checked.filter(v => v !== 'Otra');
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

function hideOtroFieldsIn(rootId) {
  document.querySelectorAll(`#${rootId} .otro-field`).forEach(f => f.classList.add('hidden'));
}

// ---------- Utilidad genérica de "Zona: Otro" con texto libre ----------

function wireZonaOtro(selectId, otroFieldId) {
  document.getElementById(selectId).addEventListener('change', () => updateZonaOtroVisibility(selectId, otroFieldId));
}

function updateZonaOtroVisibility(selectId, otroFieldId) {
  document.getElementById(otroFieldId).classList.toggle('hidden', document.getElementById(selectId).value !== 'Otro');
}

function resolveZona(selectId, otroId) {
  const val = document.getElementById(selectId).value;
  if (val !== 'Otro') return val;
  return document.getElementById(otroId).value.trim() || 'Otro';
}

// Un RUC (11 dígitos) es información pública en el Perú (registro SUNAT), así
// que se puede mostrar completo. Un DNI (8 dígitos) es un dato personal — nunca
// se muestra el número, solo que la persona lo registró. Devuelve null si lo
// que escribieron no tiene ni 8 ni 11 dígitos (para pedir que lo corrijan).
function parseDocumento(raw) {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.length === 0) return { tipo: '', valor: '' };
  if (digits.length === 8) return { tipo: 'DNI', valor: digits };
  if (digits.length === 11) return { tipo: 'RUC', valor: digits };
  return null;
}

function renderCardPhotos(node, fotos) {
  const container = node.querySelector('.card-photos');
  if (!fotos || !fotos.length) { container.remove(); return; }
  fotos.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    container.appendChild(img);
  });
}

function renderDocLine(node, listing) {
  const docEl = node.querySelector('.doc-line');
  if (listing.documentoTipo === 'RUC') {
    docEl.querySelector('span').textContent = `RUC: ${listing.documento}`;
  } else if (listing.documentoTipo === 'DNI') {
    docEl.querySelector('span').textContent = 'DNI registrado';
  } else {
    docEl.remove();
  }
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

// ================= EMPLEOS =================

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
  if (zona && listing.zona !== zona && !(listing.zonasTrabajo || []).includes(zona)) return false;
  if (soloUrgente && !listing.urgente) return false;
  if (q) {
    const haystack = [
      listing.contacto, listing.descripcion, listing.zona, listing.experiencia,
      listing.tamanoTaller, listing.modalidadPago,
      ...listing.perfiles, ...listing.prendas, ...listing.telas, ...(listing.zonasTrabajo || []),
      ...listing.maquinas, ...listing.operaciones, ...listing.laborManual, ...listing.disponibilidad,
    ].join(' ').toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
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
    renderCardPhotos(node, listing.fotos);

    const tipoBadge = node.querySelector('.tipo-badge');
    tipoBadge.textContent = listing.tipo === 'ofrezco' ? 'Busca personal' : 'Busca trabajo';
    tipoBadge.classList.add(listing.tipo === 'ofrezco' ? 'badge-ofrezco' : 'badge-busca');

    node.querySelector('.urgente-badge').classList.toggle('hidden', !listing.urgente);
    node.querySelector('.contacto-name').textContent = listing.contacto;
    node.querySelector('.zona-line span').textContent = listing.tipo === 'busco'
      ? `Vive en ${listing.zona} · ${timeAgo(listing.fecha)}`
      : `${listing.zona} · ${timeAgo(listing.fecha)}`;
    renderDocLine(node, listing);

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
    appendMetaLine(metaLines, metaTpl, listing.tipo === 'busco' && listing.zonasTrabajo && listing.zonasTrabajo.length ? `También trabajaría en: ${listing.zonasTrabajo.join(', ')}` : '');

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

function updatePerfilSections() {
  const perfiles = checkedValues('perfilChips');
  document.getElementById('maquinaSection').classList.toggle('hidden', !perfiles.includes('Operario(a) de máquina'));
  document.getElementById('manualSection').classList.toggle('hidden', !perfiles.includes('Manual de costura'));
}

function updateTallerSection() {
  const esOfrezco = document.querySelector('input[name="tipo"]:checked').value === 'ofrezco';
  document.getElementById('tallerSection').classList.toggle('hidden', !esOfrezco);
  // Un taller tiene una sola ubicación fija; un costurero/a tiene dónde vive
  // y, aparte, las zonas donde además le gustaría trabajar (pueden ser varias).
  document.getElementById('formZonaLabel').textContent = esOfrezco ? 'Zona (dónde está el taller)' : 'Distrito donde vives';
  document.getElementById('zonaTrabajoSection').classList.toggle('hidden', esOfrezco);
}

function openModal() { document.getElementById('modal').classList.add('open'); }
function closeModal() { document.getElementById('modal').classList.remove('open'); }

function openModalForCreate() {
  editingId = null;
  const form = document.getElementById('publishForm');
  form.reset();
  hideOtroFieldsIn('publishForm');
  formPhotoPicker.reset();
  updatePerfilSections();
  updateTallerSection();
  updateZonaOtroVisibility('formZona', 'zonaOtroField');
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
  document.querySelectorAll('#disponibilidadChips input').forEach(cb => {
    cb.checked = listing.disponibilidad.includes(cb.value);
  });
  populateChipGroup('zonaTrabajoChips', ZONAS, listing.zonasTrabajo || [], 'zonaTrabajoOtro', 'zonaTrabajoOtroField');
  document.getElementById('formContacto').value = listing.contacto;
  document.getElementById('formWhatsapp').value = listing.whatsapp;
  document.getElementById('formDocumento').value = listing.documento || '';
  document.getElementById('formDescripcion').value = listing.descripcion || '';
  document.getElementById('formUrgente').checked = listing.urgente;

  formPhotoPicker.set(listing.fotos);

  updatePerfilSections();
  updateTallerSection();
  updateZonaOtroVisibility('formZona', 'zonaOtroField');
  document.getElementById('modalTitle').textContent = 'Editar aviso';
  document.getElementById('submitBtn').textContent = 'Guardar cambios';
  openModal();
}

function openAdminEmail(subject, body) {
  window.location.href = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function reportListing(sectionLabel, listing) {
  const body = `Quiero reportar este aviso de ${sectionLabel}: "${listing.contacto}" (publicado ${timeAgo(listing.fecha)}).\n\nMotivo: `;
  openAdminEmail(`Reporte de aviso — ${sectionLabel}`, body);
}

function confirmYapePayment(contactoInputId) {
  const contacto = document.getElementById(contactoInputId).value.trim();
  const body = `Hola, ya yapeé a ${YAPE_NUMBER} para destacar/mantener mi aviso${contacto ? ` ("${contacto}")` : ''}.\n\nVoy a adjuntar la captura del pago a este correo.`;
  openAdminEmail('Confirmación de pago Yape', body);
}

function deleteListing(id) {
  if (!confirm('¿Seguro que quieres eliminar este aviso?')) return;
  listings = listings.filter(l => l.id !== id);
  mineIds = mineIds.filter(i => i !== id);
  saveListings(listings);
  saveMineIds();
  render();
}

function initEmpleosForm() {
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  document.querySelectorAll('#perfilChips input').forEach(i => i.addEventListener('change', updatePerfilSections));
  document.querySelectorAll('input[name="tipo"]').forEach(i => i.addEventListener('change', updateTallerSection));
  wireZonaOtro('formZona', 'zonaOtroField');

  wireOtroToggle('prendaChips', 'prendaOtroField');
  wireOtroToggle('telaChips', 'telaOtroField');
  wireOtroToggle('maquinaChips', 'maquinaOtroField');
  wireOtroToggle('operacionChips', 'operacionOtroField');
  wireOtroToggle('manualChips', 'manualOtroField');
  wireOtroToggle('zonaTrabajoChips', 'zonaTrabajoOtroField');

  formPhotoPicker = makePhotoPicker('formFoto', 'formFotoPreviewList', 'formFotoLabel', 'formFotoConfirmWrap');

  document.querySelector('#publishForm .yape-confirm-link').addEventListener('click', (e) => {
    e.preventDefault();
    confirmYapePayment('formContacto');
  });

  document.getElementById('grid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;
    if (e.target.closest('.edit-btn')) {
      const listing = listings.find(l => l.id === id);
      if (listing) openModalForEdit(listing);
    } else if (e.target.closest('.delete-btn')) {
      deleteListing(id);
    } else if (e.target.closest('.report-link')) {
      const listing = listings.find(l => l.id === id);
      if (listing) reportListing('Empleos', listing);
    }
  });

  document.getElementById('publishForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const whatsappDigits = document.getElementById('formWhatsapp').value.replace(/\D/g, '');
    if (whatsappDigits.length !== 9) { alert('Ingresa un número de WhatsApp válido de 9 dígitos.'); return; }

    const doc = parseDocumento(document.getElementById('formDocumento').value);
    if (doc === null) { alert('El DNI debe tener 8 dígitos y el RUC 11. Déjalo vacío si prefieres no ponerlo.'); return; }

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const perfiles = checkedValues('perfilChips');

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
      zona: resolveZona('formZona', 'zonaOtro'),
      zonasTrabajo: tipo === 'busco' ? resolveChipValues('zonaTrabajoChips', 'zonaTrabajoOtro') : [],
      contacto: document.getElementById('formContacto').value.trim(),
      whatsapp: whatsappDigits,
      descripcion: document.getElementById('formDescripcion').value.trim(),
      urgente: document.getElementById('formUrgente').checked,
      documento: doc.valor,
      documentoTipo: doc.tipo,
      fotos: formPhotoPicker.get(),
    };

    const nextListings = listings.slice();
    let newId = null;
    if (editingId) {
      const idx = nextListings.findIndex(l => l.id === editingId);
      if (idx !== -1) nextListings[idx] = { ...nextListings[idx], ...data };
    } else {
      newId = 'l-' + Date.now();
      nextListings.unshift({ id: newId, ...data, fecha: Date.now() });
    }

    if (!saveListings(nextListings)) {
      alert('No se pudo guardar. Es probable que las fotos sean muy pesadas para este navegador — prueba con menos fotos o más livianas.');
      return;
    }
    listings = nextListings;
    if (newId) {
      mineIds.push(newId);
      saveMineIds();
    }
    closeModal();
    render();
  });
}

function initEmpleosFilters() {
  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('filterPerfil').addEventListener('change', render);
  document.getElementById('filterZona').addEventListener('change', render);
  document.getElementById('filterUrgente').addEventListener('change', render);

  document.querySelectorAll('#empleosView .tipo-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTipo = btn.dataset.tipo;
      document.querySelectorAll('#empleosView .tipo-tab').forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      render();
    });
  });
}

// ================= MERCADERÍA =================

function mercWaMessage(listing) {
  const item = listing.items.slice(0, 2).join(', ') || 'la mercadería';
  if (listing.tipo === 'vendo') {
    return `Hola, vi que tienes ${item} disponible en ${listing.zona}. Me interesa, ¿cuál es el precio?`;
  }
  return `Hola ${listing.contacto}, vi que buscas comprar ${item}. Tengo disponible, ¿te interesa?`;
}

function mercWaLink(listing) {
  const digits = (listing.whatsapp || '').replace(/\D/g, '');
  return `https://wa.me/51${digits}?text=${encodeURIComponent(mercWaMessage(listing))}`;
}

function matchesMercFilters(listing) {
  const q = document.getElementById('mercSearchInput').value.trim().toLowerCase();
  const item = document.getElementById('mercFilterItem').value;
  const zona = document.getElementById('mercFilterZona').value;
  const soloUrgente = document.getElementById('mercFilterUrgente').checked;

  if (activeMercTipo && listing.tipo !== activeMercTipo) return false;
  if (item && !listing.items.includes(item)) return false;
  if (zona && listing.zona !== zona) return false;
  if (soloUrgente && !listing.urgente) return false;
  if (q) {
    const haystack = [
      listing.contacto, listing.descripcion, listing.zona, listing.cantidad,
      listing.ventaTipo, listing.precioMayor, listing.precioMenor, ...listing.items, ...listing.tallas, ...listing.colores, ...listing.modalidadVenta,
    ].join(' ').toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function mercRender() {
  const grid = document.getElementById('mercGrid');
  const empty = document.getElementById('mercEmptyState');
  const tpl = document.getElementById('mercCardTemplate');
  const metaTpl = document.getElementById('metaLineTemplate');
  grid.innerHTML = '';

  const filtered = mercListings
    .filter(matchesMercFilters)
    .sort((a, b) => (b.urgente - a.urgente) || (b.fecha - a.fecha));

  document.getElementById('mercResultCount').textContent =
    `${filtered.length} publicación${filtered.length === 1 ? '' : 'es'} encontrada${filtered.length === 1 ? '' : 's'}`;

  empty.classList.toggle('visible', filtered.length === 0);

  filtered.forEach(listing => {
    const node = tpl.content.cloneNode(true);
    const article = node.querySelector('.card');
    article.dataset.id = listing.id;

    node.querySelector('.owner-actions').classList.toggle('hidden', !mineIds.includes(listing.id));

    renderCardPhotos(node, listing.fotos || (listing.foto ? [listing.foto] : []));

    const tipoBadge = node.querySelector('.tipo-badge');
    tipoBadge.textContent = listing.tipo === 'vendo' ? 'Vendo' : 'Busco comprar';
    tipoBadge.classList.add(listing.tipo === 'vendo' ? 'badge-ofrezco' : 'badge-busca');

    node.querySelector('.urgente-badge').classList.toggle('hidden', !listing.urgente);
    node.querySelector('.contacto-name').textContent = listing.contacto;
    node.querySelector('.zona-line span').textContent = `${listing.zona} · ${timeAgo(listing.fecha)}`;
    renderDocLine(node, listing);

    appendChips(node.querySelector('.item-chips'), listing.items, 'chip');
    appendChips(node.querySelector('.talla-chips'), listing.tallas, 'chip');
    appendChips(node.querySelector('.color-chips'), listing.colores, 'chip');

    const metaLines = node.querySelector('.meta-lines');
    const cantidadVenta = [
      listing.cantidad ? `Cantidad: ${listing.cantidad}` : '',
      listing.ventaTipo ? `Venta: ${listing.ventaTipo}` : '',
    ].filter(Boolean).join(' · ');
    appendMetaLine(metaLines, metaTpl, cantidadVenta);
    const precioLine = [
      listing.precioMayor ? `Mayor: ${listing.precioMayor}` : '',
      listing.precioMenor ? `Menor: ${listing.precioMenor}` : '',
    ].filter(Boolean).join(' · ');
    appendMetaLine(metaLines, metaTpl, precioLine ? `Precio — ${precioLine}` : '');

    appendChips(node.querySelector('.modalidad-venta-chips'), listing.modalidadVenta, 'chip chip-disponibilidad');

    const descEl = node.querySelector('.desc-text');
    if (listing.descripcion) { descEl.textContent = listing.descripcion; } else { descEl.remove(); }

    node.querySelector('.wa-link').href = mercWaLink(listing);

    grid.appendChild(node);
  });
}

function updatePrecioFields() {
  const venta = document.getElementById('mercVentaTipo').value;
  const tipo = document.querySelector('input[name="mercTipo"]:checked').value;
  const showMayor = venta === 'Por mayor' || venta === 'Mayor y menor';
  const showMenor = venta === 'Por menor' || venta === 'Mayor y menor';
  document.getElementById('precioMayorField').classList.toggle('hidden', !showMayor);
  document.getElementById('precioMenorField').classList.toggle('hidden', !showMenor);
  document.getElementById('mercPrecioMayor').required = showMayor && tipo === 'vendo';
  document.getElementById('mercPrecioMenor').required = showMenor && tipo === 'vendo';
}

function openMercModal() { document.getElementById('mercModal').classList.add('open'); }
function closeMercModal() { document.getElementById('mercModal').classList.remove('open'); }

function openMercModalForCreate() {
  mercEditingId = null;
  const form = document.getElementById('mercForm');
  form.reset();
  hideOtroFieldsIn('mercForm');
  updateZonaOtroVisibility('mercZona', 'mercZonaOtroField');
  mercPhotoPicker.reset();
  updatePrecioFields();
  document.getElementById('mercModalTitle').textContent = 'Publicar mercadería';
  document.getElementById('mercSubmitBtn').textContent = 'Publicar';
  openMercModal();
}

function openMercModalForEdit(listing) {
  mercEditingId = listing.id;
  const form = document.getElementById('mercForm');
  form.reset();

  document.querySelector(`input[name="mercTipo"][value="${listing.tipo}"]`).checked = true;
  populateChipGroup('mercItemChips', MERC_ITEMS, listing.items, 'mercItemOtro', 'mercItemOtroField');
  populateChipGroup('mercTallaChips', TALLAS, listing.tallas, 'mercTallaOtro', 'mercTallaOtroField');
  populateChipGroup('mercColorChips', COLORES, listing.colores, 'mercColorOtro', 'mercColorOtroField');
  document.getElementById('mercCantidad').value = listing.cantidad || '';
  document.getElementById('mercVentaTipo').value = listing.ventaTipo || '';
  populateChipGroup('mercModalidadVentaChips', MODALIDAD_VENTA, listing.modalidadVenta, 'mercModalidadVentaOtro', 'mercModalidadVentaOtroField');
  document.getElementById('mercPrecioMayor').value = listing.precioMayor || '';
  document.getElementById('mercPrecioMenor').value = listing.precioMenor || '';
  updatePrecioFields();

  if (MERC_ZONAS.includes(listing.zona)) {
    document.getElementById('mercZona').value = listing.zona;
    document.getElementById('mercZonaOtro').value = '';
  } else {
    document.getElementById('mercZona').value = 'Otro';
    document.getElementById('mercZonaOtro').value = listing.zona;
  }
  document.getElementById('mercContacto').value = listing.contacto;
  document.getElementById('mercWhatsapp').value = listing.whatsapp;
  document.getElementById('mercDocumento').value = listing.documento || '';
  document.getElementById('mercDescripcion').value = listing.descripcion || '';
  document.getElementById('mercUrgente').checked = listing.urgente;

  mercPhotoPicker.set(listing.fotos || (listing.foto ? [listing.foto] : []));

  updateZonaOtroVisibility('mercZona', 'mercZonaOtroField');
  document.getElementById('mercModalTitle').textContent = 'Editar publicación';
  document.getElementById('mercSubmitBtn').textContent = 'Guardar cambios';
  openMercModal();
}

function deleteMercListing(id) {
  if (!confirm('¿Seguro que quieres eliminar esta publicación?')) return;
  mercListings = mercListings.filter(l => l.id !== id);
  mineIds = mineIds.filter(i => i !== id);
  saveMercListings(mercListings);
  saveMineIds();
  mercRender();
}

function initMercForm() {
  document.getElementById('mercCloseModal').addEventListener('click', closeMercModal);
  document.getElementById('mercModal').addEventListener('click', (e) => {
    if (e.target.id === 'mercModal') closeMercModal();
  });

  document.getElementById('mercVentaTipo').addEventListener('change', updatePrecioFields);
  document.querySelectorAll('input[name="mercTipo"]').forEach(i => i.addEventListener('change', updatePrecioFields));

  wireZonaOtro('mercZona', 'mercZonaOtroField');
  wireOtroToggle('mercItemChips', 'mercItemOtroField');
  wireOtroToggle('mercTallaChips', 'mercTallaOtroField');
  wireOtroToggle('mercColorChips', 'mercColorOtroField');
  wireOtroToggle('mercModalidadVentaChips', 'mercModalidadVentaOtroField');

  mercPhotoPicker = makePhotoPicker('mercFoto', 'mercFotoPreviewList', 'mercFotoLabel', 'mercFotoConfirmWrap');

  document.querySelector('#mercForm .yape-confirm-link').addEventListener('click', (e) => {
    e.preventDefault();
    confirmYapePayment('mercContacto');
  });

  document.getElementById('mercGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;
    if (e.target.closest('.edit-btn')) {
      const listing = mercListings.find(l => l.id === id);
      if (listing) openMercModalForEdit(listing);
    } else if (e.target.closest('.delete-btn')) {
      deleteMercListing(id);
    } else if (e.target.closest('.report-link')) {
      const listing = mercListings.find(l => l.id === id);
      if (listing) reportListing('Mercadería', listing);
    }
  });

  document.getElementById('mercForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const whatsappDigits = document.getElementById('mercWhatsapp').value.replace(/\D/g, '');
    if (whatsappDigits.length !== 9) { alert('Ingresa un número de WhatsApp válido de 9 dígitos.'); return; }

    const doc = parseDocumento(document.getElementById('mercDocumento').value);
    if (doc === null) { alert('El DNI debe tener 8 dígitos y el RUC 11. Déjalo vacío si prefieres no ponerlo.'); return; }

    const data = {
      tipo: document.querySelector('input[name="mercTipo"]:checked').value,
      items: resolveChipValues('mercItemChips', 'mercItemOtro'),
      tallas: resolveChipValues('mercTallaChips', 'mercTallaOtro'),
      colores: resolveChipValues('mercColorChips', 'mercColorOtro'),
      cantidad: document.getElementById('mercCantidad').value.trim(),
      ventaTipo: document.getElementById('mercVentaTipo').value,
      modalidadVenta: resolveChipValues('mercModalidadVentaChips', 'mercModalidadVentaOtro'),
      precioMayor: document.getElementById('mercPrecioMayor').value.trim(),
      precioMenor: document.getElementById('mercPrecioMenor').value.trim(),
      zona: resolveZona('mercZona', 'mercZonaOtro'),
      contacto: document.getElementById('mercContacto').value.trim(),
      whatsapp: whatsappDigits,
      descripcion: document.getElementById('mercDescripcion').value.trim(),
      urgente: document.getElementById('mercUrgente').checked,
      fotos: mercPhotoPicker.get(),
      documento: doc.valor,
      documentoTipo: doc.tipo,
    };

    const nextListings = mercListings.slice();
    let newId = null;
    if (mercEditingId) {
      const idx = nextListings.findIndex(l => l.id === mercEditingId);
      if (idx !== -1) nextListings[idx] = { ...nextListings[idx], ...data };
    } else {
      newId = 'm-' + Date.now();
      nextListings.unshift({ id: newId, ...data, fecha: Date.now() });
    }

    if (!saveMercListings(nextListings)) {
      alert('No se pudo guardar. Es probable que la foto sea muy pesada para este navegador — prueba con una foto más liviana o quítala.');
      return;
    }
    mercListings = nextListings;
    if (newId) {
      mineIds.push(newId);
      saveMineIds();
    }
    closeMercModal();
    mercRender();
  });
}

function initMercFilters() {
  document.getElementById('mercSearchInput').addEventListener('input', mercRender);
  document.getElementById('mercFilterItem').addEventListener('change', mercRender);
  document.getElementById('mercFilterZona').addEventListener('change', mercRender);
  document.getElementById('mercFilterUrgente').addEventListener('change', mercRender);

  document.querySelectorAll('#mercaderiaView .tipo-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMercTipo = btn.dataset.tipo;
      document.querySelectorAll('#mercaderiaView .tipo-tab').forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      mercRender();
    });
  });
}

// ================= Navegación entre secciones + compartir =================

function switchView(view) {
  currentView = view;
  document.getElementById('empleosView').classList.toggle('hidden', view !== 'empleos');
  document.getElementById('mercaderiaView').classList.toggle('hidden', view !== 'mercaderia');
  document.querySelectorAll('.mode-tab').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
  document.getElementById('fab').setAttribute('aria-label', view === 'empleos' ? 'Publicar aviso' : 'Publicar mercadería');
}

function initNav() {
  document.querySelectorAll('.mode-tab').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  document.getElementById('fab').addEventListener('click', () => {
    if (currentView === 'empleos') openModalForCreate();
    else openMercModalForCreate();
  });
}

function initShare() {
  const btn = document.getElementById('shareBtn');
  btn.style.display = 'inline-flex';
  btn.addEventListener('click', () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Confecciones Lima', url }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent('Directorio de empleos y mercadería de confección: ' + url)}`, '_blank');
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
  buildChipGroup('zonaTrabajoChips', ZONAS);

  updatePerfilSections();
  updateTallerSection();
  updateZonaOtroVisibility('formZona', 'zonaOtroField');
  initEmpleosForm();
  initEmpleosFilters();
  render();

  fillSelect(document.getElementById('mercFilterItem'), MERC_ITEMS);
  fillSelect(document.getElementById('mercFilterZona'), MERC_ZONAS);
  fillSelect(document.getElementById('mercZona'), MERC_ZONAS);
  fillSelect(document.getElementById('mercVentaTipo'), VENTA_TIPO);
  buildChipGroup('mercItemChips', MERC_ITEMS);
  buildChipGroup('mercTallaChips', TALLAS);
  buildChipGroup('mercColorChips', COLORES);
  buildChipGroup('mercModalidadVentaChips', MODALIDAD_VENTA);
  updateZonaOtroVisibility('mercZona', 'mercZonaOtroField');
  initMercForm();
  initMercFilters();
  mercRender();

  initNav();
  initShare();
}

function showFatalError(err) {
  console.error(err);
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;inset:0;z-index:999;background:#2b2118;color:#fff;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem;font-family:sans-serif;';
  banner.innerHTML = '<div><p style="font-weight:700;margin-bottom:.5rem;">Hubo un problema cargando la página</p>' +
    '<p style="opacity:.85;margin-bottom:1.2rem;">Prueba recargar (o cerrar y volver a abrir el link) — a veces el navegador se queda con una versión vieja guardada.</p>' +
    '<button onclick="location.reload(true)" style="background:#c2542a;color:#fff;border:none;padding:.7rem 1.4rem;border-radius:.6rem;font-weight:700;cursor:pointer;">Recargar</button></div>';
  document.body.appendChild(banner);
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (err) {
    showFatalError(err);
  }
});
