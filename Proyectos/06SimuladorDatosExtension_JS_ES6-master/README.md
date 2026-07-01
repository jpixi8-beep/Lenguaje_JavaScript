# 06 - Simulador de Datos (Extensión de navegador)

Descripción
- Extensión para autocompletar formularios con datos ficticios usando Faker.js.

Estructura
- `manifest.json`, `background.js`, `content.js`, `popup.html`, `popup.js`, `faker.min.js`

Cómo probar
1. Descargar `faker.min.js` desde un CDN (p. ej. https://cdnjs.com/libraries/faker) y reemplazar `faker.min.js` en esta carpeta.
2. Abrir `chrome://extensions`, activar *Modo desarrollador*.
3. Cargar la carpeta `06SimuladorDatosExtension_JS_ES6` como extensión sin empaquetar.
4. Abrir una página con un formulario y usar el popup para autocompletar.
