# Costureros Lima — Directorio

MVP de un directorio web para centralizar lo que hoy está disperso en carteles
físicos por Ate/Santa Anita/La Molina: talleres que necesitan costureros y
costureros/as que buscan trabajo.

## Idea

En vez de una app que la gente tenga que instalar, el directorio se apoya en
lo que ya usa todo el mundo: **WhatsApp**.

- Un taller publica su vacante (especialidad, zona, pago, urgencia) en 30 segundos.
- Un costurero/a busca por especialidad y zona, y contacta directo por WhatsApp
  con un mensaje ya redactado (no hace falta escribir nada desde cero).
- Un costurero/a que busca trabajo también puede publicarse para que los
  talleres lo/la contacten.

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
flujo completo (publicar, filtrar, contactar), pero **cada persona ve solo
los avisos que publicó en su propio dispositivo**. Para que sea un directorio
real y compartido entre todos hace falta:

1. **Base de datos compartida** (ej. Supabase o Firebase, capa gratuita):
   reemplazar `loadListings`/`saveListings` en `app.js` por llamadas a la API.
2. **Hosting** del sitio (Vercel/Netlify/GitHub Pages) para tener una URL fija
   que se pueda compartir y pegar en los mismos carteles/grupos de WhatsApp.
3. (Opcional, fase 2) **WhatsApp Business API / bot**: permitir publicar un
   aviso mandando un mensaje de WhatsApp con un formato simple, para no
   depender de que la gente entre a la web a publicar.
4. Moderación básica (reportar aviso falso/duplicado) antes de abrirlo al público.

## Estructura

- `index.html` — layout, filtros, formulario de publicación.
- `app.js` — datos de ejemplo, filtrado, render de tarjetas, generación de
  links `wa.me` con mensaje prellenado.

Los 6 avisos de ejemplo son ficticios (inspirados en los carteles reales,
pero con datos de contacto inventados).
