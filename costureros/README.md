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

## Estado actual (demo)

Los avisos se guardan en `localStorage` del navegador — sirve para probar el
flujo completo (publicar, editar, eliminar, filtrar, contactar), pero **cada
persona ve solo lo que publicó en su propio dispositivo**. Para que sea un
directorio real y compartido entre todos hace falta:

1. **Base de datos compartida** (ej. Supabase o Firebase, capa gratuita):
   reemplazar `loadFrom`/`saveListings`/`saveMercListings` en `app.js` por
   llamadas a la API. Ahí también tendría más sentido mover "quién puede
   editar qué" de estar atado al navegador (`mineIds`) a estar atado al
   WhatsApp de la persona.
2. **Hosting** del sitio (Vercel/Netlify/GitHub Pages) para tener una URL fija
   que se pueda compartir y pegar en los mismos carteles/grupos de WhatsApp.
3. (Opcional, fase 2) **WhatsApp Business API / bot**: permitir publicar un
   aviso mandando un mensaje de WhatsApp con un formato simple, para no
   depender de que la gente entre a la web a publicar.
4. Moderación básica (reportar aviso falso/duplicado) antes de abrirlo al público.

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
  Mercadería).
- `app.js` — datos de ejemplo, filtrado, render de tarjetas, compresión de
  fotos, generación de links `wa.me` con mensaje prellenado.

Los avisos de ejemplo son ficticios (inspirados en carteles y casos reales,
pero con datos de contacto inventados).
