// Usa Faker.js para generar datos ficticios
function rellenarFormulario() {
  const campos = document.querySelectorAll('input, textarea, select');

  campos.forEach(campo => {
    const t = campo.tagName.toLowerCase();

    // Texto genérico
    if (campo.type === 'text') {
      if (faker && faker.name && typeof faker.name.findName === 'function') {
        campo.value = faker.name.findName(); // versión clásica
      } else if (faker && faker.person && typeof faker.person.fullName === 'function') {
        campo.value = faker.person.fullName(); // versión moderna
      } else {
        campo.value = 'Nombre Apellido';
      }
    }

    // Email
    if (campo.type === 'email') {
      campo.value = (faker && faker.internet && typeof faker.internet.email === 'function')
        ? faker.internet.email()
        : 'demo@example.com';
    }

    // Teléfono
    if (campo.type === 'tel') {
      campo.value = (faker && faker.phone && typeof faker.phone.number === 'function')
        ? faker.phone.number()
        : '555-123-4567';
    }

    // Número
    if (campo.type === 'number') {
      campo.value = (faker && faker.datatype && typeof faker.datatype.number === 'function')
        ? faker.datatype.number()
        : '42';
    }

    // Textarea
    if (t === 'textarea') {
      campo.value = (faker && faker.lorem && typeof faker.lorem.paragraph === 'function')
        ? faker.lorem.paragraph()
        : 'Texto de prueba';
    }

    // Select (elige un valor aleatorio si existe)
    if (t === 'select' && campo.options.length > 0) {
      campo.selectedIndex = Math.floor(Math.random() * campo.options.length);
    }
  });
}

// Escucha mensajes desde el popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "rellenar") {
    rellenarFormulario();
  }
});
