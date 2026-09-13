# Confecciones Perú — Directorio

MVP de un directorio web para centralizar lo que hoy está disperso en carteles
físicos por Ate/Santa Anita/La Molina/Gamarra: talleres que necesitan
costureros, costureros/as que buscan trabajo, compra/venta de mercadería
textil (mayorista y minorista), y talleres que ofrecen servicio de producción
(corte, confección, estampado, bordado) a otras empresas.

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
- Y la sección **Servicios** conecta talleres que tienen capacidad de
  producción libre (corte, confección, estampado, bordado) con empresas que
  necesitan que alguien les fabrique — es taller-a-empresa, distinto de
  Empleos (persona-a-taller) y de Mercadería (venta de mercadería ya hecha).

En Mercadería se puede subir hasta 6 fotos y un video corto por aviso —
suficiente para mostrar bien el producto sin depender de que primero te
escriban por WhatsApp.

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

El precio es **S/10** para destacar el aviso (aparece primero) o extenderlo
7 días más — ese monto ya aparece escrito en el mensaje de cada formulario,
justo antes del botón de publicar. Si en algún momento cambias el precio,
también hay que actualizar el texto en `index.html` (busca "Yapea").

Cuando alguien yapea para destacar o extender su aviso, te comparte el
comprobante por WhatsApp al mismo número de Yape (el botón del formulario, o
el recordatorio chiquito que aparece al final de su propia tarjeta ya
publicada, ya le abren WhatsApp con un mensaje que incluye su nombre y su
propio WhatsApp). Confirmas el pago y luego marcas **su aviso más reciente**
pegando esto en el SQL Editor de Supabase (reemplaza el número de WhatsApp
por el de esa persona — corre solo la de la sección que corresponda):

```sql
update empleos set destacado = true,
  vence = (extract(epoch from now())*1000)::bigint + 7*24*60*60*1000
where id = (select id from empleos where whatsapp = '999999999' order by fecha desc limit 1);

update mercaderia set destacado = true,
  vence = (extract(epoch from now())*1000)::bigint + 7*24*60*60*1000
where id = (select id from mercaderia where whatsapp = '999999999' order by fecha desc limit 1);

update servicios set destacado = true,
  vence = (extract(epoch from now())*1000)::bigint + 7*24*60*60*1000
where id = (select id from servicios where whatsapp = '999999999' order by fecha desc limit 1);
```

(Si alguien paga por más tiempo, por ejemplo dos semanas, cambia el `7` por
`14` en ese `UPDATE` — el precio de esa opción lo decides tú.)

(Las secciones donde no exista ningún aviso de ese WhatsApp simplemente no
hacen nada — no pasa nada por correr las tres.) Un aviso "destacado" aparece
primero en la lista y con una insignia ★ Destacado.

### Límite de un aviso gratis por WhatsApp (evita el abuso del gratis)

Sin ningún límite, una misma persona podría publicar avisos gratis sin fin, o
esperar a que se le acaben sus 7 días gratis, borrar el aviso y volver a
crearlo — sin pagar nunca. Para evitarlo, la base de datos (no el navegador,
así que no se puede saltar editando la página) lleva la cuenta de qué números
de WhatsApp ya usaron su aviso gratis en cada sección — Empleos, Compra/Venta
y Servicios cuentan por separado. **La primera vez** que un WhatsApp publica
algo nuevo en una sección, sale gratis 7 días como siempre. **La segunda vez**
(así el aviso anterior ya no exista, se haya borrado o haya expirado), el
aviso nuevo se guarda pero llega ya "vencido" — oculto para todo el mundo
menos para quien lo publicó, que sí lo ve en su celular con una insignia
"Vencido" y el mismo recordatorio para pagar. Cuando confirmas su pago con el
`UPDATE` de arriba, el aviso pasa a verse normal para todos.

Esto vive en `supabase/migration_005_limite_avisos_gratis.sql` (una tabla
`avisos_gratis_usados`, que nunca se borra aunque el aviso sí, más un trigger
en las tres tablas que decide el `vence`/`destacado` de cada aviso nuevo).

Una limitación a tener en cuenta: si un mismo taller quisiera publicar dos
vacantes distintas el mismo día (por ejemplo "busco operario de recta" y
"busco cortador" por separado), la segunda también contaría como su "segundo
aviso" y llegaría vencida — el sistema no distingue eso de alguien
republicando lo mismo para no pagar, porque no hay forma de saber la
diferencia sin cuentas de usuario reales. Si esto te genera problemas en la
práctica, avísame y ajustamos la regla (por ejemplo, permitir 2 gratis en vez
de 1 antes de empezar a cobrar).

## Fotos y video

Las fotos (hasta 6 por aviso, en las tres secciones) se comprimen en el
propio navegador antes de guardarse, y se guardan directo como texto dentro
de la fila del aviso en la base — por eso son livianas a propósito, no fotos
de calidad completa.

El video (solo en Mercadería, uno por aviso, hasta 25 MB) funciona distinto:
no se comprime ni se guarda como texto — se sube tal cual a un espacio de
archivos aparte ("Supabase Storage", un cajón llamado `mercaderia-videos`
que ya viene incluido en tu proyecto) y en la tabla `mercaderia` solo se
guarda el link a ese archivo (columna `video`). Si más adelante quieres subir
el límite de 25 MB, o agregar video a Empleos/Servicios también, avísame.

Esto vive en `supabase/migration_006_video_mercaderia.sql` (crea la columna
`video`, el cajón de Storage, y sus políticas de acceso — mismo criterio sin
cuentas de usuario que el resto del sitio).

## DNI / RUC (confianza)

El formulario tiene un campo opcional de documento. Un RUC (11 dígitos) se
muestra completo en la tarjeta porque es información pública en el Perú
(está en el registro de SUNAT). Un DNI (8 dígitos) **no se muestra nunca
completo** — solo aparece como una insignia "DNI registrado", para no
exponer el número de identidad de nadie en una página pública. Ninguno de
los dos está verificado de verdad contra RENIEC/SUNAT todavía — es
autodeclarado, sirve como filtro social liviano, no como garantía.

## Estructura

- `index.html` — layout, filtros, formularios de publicación (Empleos,
  Mercadería y Servicios), Tailwind CSS vía CDN.
- `app.js` — conexión a Supabase, filtrado, render de tarjetas, compresión de
  fotos, generación de links `wa.me` con mensaje prellenado.
- `supabase/schema.sql` — tablas `empleos`, `mercaderia` y `servicios`,
  políticas de acceso, y los avisos de ejemplo (ficticios, inspirados en
  carteles y casos reales pero con datos de contacto inventados).
- `supabase/migration_002_vencimiento_destacado.sql` — agrega las columnas
  `vence` y `destacado` a una base ya creada (correr una sola vez).
- `supabase/migration_003_modalidad_pago_multiple.sql` — convierte
  "modalidad de pago" de una sola opción a varias (correr una sola vez).
- `supabase/migration_004_servicios.sql` — agrega la tabla `servicios` a una
  base ya creada (correr una sola vez).
- `supabase/migration_005_limite_avisos_gratis.sql` — agrega el límite de un
  aviso gratis por WhatsApp por sección (correr una sola vez).
- `supabase/migration_006_video_mercaderia.sql` — agrega la columna `video`
  y el cajón de Storage para videos de Mercadería (correr una sola vez).
- `supabase/ponte_al_dia.sql` — revisa qué falta de las migraciones
  anteriores y lo agrega, sin duplicar lo que ya esté hecho. Si no estás
  seguro de qué corriste antes, corre este archivo — es seguro correrlo las
  veces que sea.
