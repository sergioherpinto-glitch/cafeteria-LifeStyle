# Confecciones Perú — Directorio

MVP de un directorio web para centralizar lo que hoy está disperso en carteles
físicos por Ate/Santa Anita/La Molina/Gamarra: talleres que necesitan
costureros, costureros/as que buscan trabajo, y compra/venta de mercadería
textil (mayorista y minorista).

## Idea

En vez de una app que la gente tenga que instalar, el directorio se apoya en
lo que ya usa todo el mundo: **WhatsApp**.

- Un taller publica su vacante (perfil, prenda, tela, máquina/operación,
  zona, pago) en un par de minutos.
- Un costurero/a busca por perfil y zona, y contacta directo por WhatsApp
  con un mensaje ya redactado (no hace falta escribir nada desde cero).
- Un costurero/a que busca trabajo también puede publicarse para que los
  talleres lo/la contacten.
- Por separado, la sección **Mercadería** conecta a quien vende mercadería
  (con foto de referencia, talla, color, modalidad de venta) con quien
  quiere comprar, por mayor o por menor.

Fotos y video de la mercadería no se suben a la web (solo una foto liviana
de referencia) — el resto viaja directo por WhatsApp una vez que hay contacto.

## Cómo verlo

Es un sitio estático, sin instalación:

```bash
cd costureros
python3 -m http.server 8000
# abrir http://localhost:8000
```

O simplemente abrir `index.html` en el navegador.

## Estado actual

Los avisos se guardan en una base de datos compartida (Supabase/Postgres) —
cualquiera que entre a la página, desde cualquier dispositivo, ve los mismos
avisos y los cambios de todos. El esquema de la base está en
`supabase/schema.sql` (correrlo una sola vez desde el SQL Editor del proyecto
de Supabase para crear las tablas y los datos de ejemplo).

El sitio se publica solo con GitHub Pages (`.github/workflows/deploy-pages.yml`)
cada vez que se actualiza `costureros/`.

Pendiente para una siguiente fase:

1. **Cuentas de usuario reales**: hoy "quién puede editar/eliminar qué" sigue
   atado al navegador de cada quien (`mineIds` en `localStorage`) — es una
   ayuda de la interfaz, no una regla de seguridad real (cualquiera con la
   URL y la clave pública de la base podría, en teoría, editar avisos ajenos
   llamando a la API directamente). Migrar esto a estar atado al WhatsApp o
   a una cuenta de la persona es el siguiente paso importante.
2. (Opcional, fase 2) **WhatsApp Business API / bot**: permitir publicar un
   aviso mandando un mensaje de WhatsApp con un formato simple, para no
   depender de que la gente entre a la web a publicar.
3. Moderación básica (reportar aviso falso/duplicado) antes de abrirlo al público a gran escala.

## Vencimiento y avisos destacados (monetización)

Todo aviso nuevo dura publicado **7 días gratis** (`DIAS_GRATIS` en `app.js`)
y después deja de aparecer en las búsquedas — no se borra, solo se oculta
(`vence` en la base es una fecha, no un borrado). Imita lo que ya pasa en los
carteles físicos: casi siempre se resuelve en los primeros días.

Cuando alguien yapea para destacar o extender su aviso, te comparte el
comprobante por WhatsApp al mismo número de Yape (el botón del formulario ya
le abre WhatsApp con un mensaje que incluye su nombre y su propio WhatsApp).
Confirmas el pago y luego marcas el aviso pegando esto en el SQL Editor de
Supabase (reemplaza el número de WhatsApp por el de esa persona):

```sql
update empleos set destacado = true,
  vence = (extract(epoch from now())*1000)::bigint + 7*24*60*60*1000
where whatsapp = '999999999';

update mercaderia set destacado = true,
  vence = (extract(epoch from now())*1000)::bigint + 7*24*60*60*1000
where whatsapp = '999999999';
```

(Si alguien paga por más tiempo, por ejemplo dos semanas, cambia el `7` por
`14` en ese `UPDATE` — el precio de esa opción lo decides tú.)

(Una de las dos tablas no va a encontrar esa fila y no hace nada — no pasa
nada por correrlas ambas.) Un aviso "destacado" aparece primero en la lista
y con una insignia ★ Destacado.

## DNI / RUC (confianza)

El formulario tiene un campo opcional de documento. Un RUC (11 dígitos) se
muestra completo en la tarjeta porque es información pública en el Perú
(está en el registro de SUNAT). Un DNI (8 dígitos) **no se muestra nunca
completo** — solo aparece como una insignia "DNI registrado", para no
exponer el número de identidad de nadie en una página pública. Ninguno de
los dos está verificado de verdad contra RENIEC/SUNAT todavía — es
autodeclarado, sirve como filtro social liviano, no como garantía.

## Estructura

- `index.html` — layout, filtros, formularios de publicación (Empleos y
  Mercadería), Tailwind CSS vía CDN.
- `app.js` — conexión a Supabase, filtrado, render de tarjetas, compresión de
  fotos, generación de links `wa.me` con mensaje prellenado.
- `supabase/schema.sql` — tablas `empleos` y `mercaderia`, políticas de acceso,
  y los avisos de ejemplo (ficticios, inspirados en carteles y casos reales
  pero con datos de contacto inventados).
- `supabase/migration_002_vencimiento_destacado.sql` — agrega las columnas
  `vence` y `destacado` a una base ya creada (correr una sola vez).
- `supabase/migration_003_modalidad_pago_multiple.sql` — convierte
  "modalidad de pago" de una sola opción a varias (correr una sola vez).
