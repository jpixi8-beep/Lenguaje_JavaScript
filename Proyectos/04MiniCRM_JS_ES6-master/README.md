# 👥 Mini CRM – Gestor Inteligente de Clientes

Aplicación web completa desarrollada en **JavaScript ES6 Vanilla** para gestionar clientes, contactos y anotaciones de manera profesional. Perfecto para emprendedores, agentes de ventas y pequeños equipos.

---

## 🚀 Características principales

- **Gestión de clientes**:
  - Crear, editar y eliminar clientes.
  - Información completa: nombre, email, teléfono, empresa.
  - Estados de cliente: Potencial, Activo, En Conversación, Inactivo.
  - Vista de tarjetas interactivas.

- **Sistema de estadísticas**:
  - Total de clientes.
  - Clientes activos.
  - Clientes potenciales.
  - En conversación.

- **Notas por cliente**:
  - Agregar notas ilimitadas a cada cliente.
  - Historial con fecha de creación.
  - Eliminar notas individuales.

- **Búsqueda y filtrados avanzados**:
  - Buscar por nombre, email o empresa.
  - Filtrar por estado de cliente.
  - Combinación de filtros en tiempo real.

- **Exportación de datos**:
  - Descargar lista de clientes en formato CSV.
  - Compatible con Excel y Google Sheets.

- **Modal intuitivo**:
  - Vista detallada de cliente.
  - Edición inline de información.
  - Gestión de notas integrada.

- **Persistencia local**:
  - Todos los datos se guardan en `localStorage`.
  - Sin necesidad de servidor.

- **Diseño moderno**:
  - Interfaz responsiva y amigable.
  - Paleta oscura con acentos púrpura.
  - Animaciones suaves y transiciones.

---

## 📸 Pantallazo de ejemplo

![Mini CRM Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica con modales.
- **CSS3** – Grid/Flexbox, gradientes, animaciones y mediaqueries.
- **JavaScript ES6** – Clases, métodos, gestión de eventos, destructuring.
- **LocalStorage** – Persistencia de datos en cliente.
- **Date API** – Formateo y gestión de fechas.

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- No requiere dependencias externas
- No requiere servidor backend

---

## 🚀 Cómo correr localmente

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! El CRM está funcional

### Opción 2: Con servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 04MiniCRM

# Con Python 3
python -m http.server 8000

# O con Node.js + http-server
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Agregar cliente
1. Completa el formulario en el panel izquierdo.
2. Los campos **Nombre** y **Email** son obligatorios.
3. Presiona "Agregar Cliente".

### 2. Ver detalles
1. Haz clic en cualquier tarjeta de cliente.
2. Se abre un modal con toda la información.

### 3. Agregar notas
1. En el modal del cliente, escribe una nota.
2. Presiona "Agregar Nota".
3. Las notas se guardan automáticamente.

### 4. Editar cliente
1. Abre el modal del cliente.
2. Presiona "Editar".
3. Modifica los campos.
4. Presiona "Guardar Cambios".

### 5. Filtrado avanzado
1. Usa la barra de búsqueda para buscar por nombre/email/empresa.
2. Filtra por estado de cliente.
3. Combina ambos para resultados precisos.

### 6. Exportar datos
1. Presiona "Exportar CSV".
2. Se descarga un archivo con todos tus clientes.
3. Abre en Excel o Google Sheets.

---

## 🎨 Estructura del código

```javascript
class MiniCRM {
  // Gestión de clientes
  addClient()
  updateClient()
  deleteClient()

  // Notas
  addNote()
  deleteNote()

  // Filtrados
  filterClients()

  // Estadísticas
  updateStats()

  // Modales
  openClientModal()
  openEditModal()

  // Exportación
  exportToCSV()

  // Almacenamiento
  saveClients()
  loadClients()
}
```

---

## 📊 Estados de cliente

| Estado | Color | Uso |
|--------|-------|-----|
| 🎯 Potencial | Naranja | Leads sin contacto aún |
| ✅ Cliente Activo | Verde | Clientes confirmados |
| 💬 En Conversación | Azul | Negocios en desarrollo |
| ❌ Inactivo | Rojo | Clientes sin actividad |

---

## 🔐 Almacenamiento de datos

Todos los clientes se guardan en `localStorage`:
- Clave: `mini-crm-clients`
- Formato: JSON serializado
- Los datos persisten entre sesiones

### Estructura de cliente

```json
{
  "id": 1234567890,
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+1 234 567 8900",
  "company": "Empresa XYZ",
  "status": "Cliente Activo",
  "notes": [
    {
      "id": 1234567891,
      "text": "Nota de ejemplo",
      "createdAt": "2026-02-15T10:30:00.000Z"
    }
  ],
  "createdAt": "2026-02-15T10:00:00.000Z"
}
```

---

## 💾 Formato CSV

Los archivos exportados contienen:
```
Nombre,Email,Teléfono,Empresa,Estado,Fecha de Registro
Juan Pérez,juan@ejemplo.com,+1 234 567 8900,Empresa XYZ,Cliente Activo,15/02/2026
```

---

## ⚡ Características avanzadas

- **Búsqueda en tiempo real**: Filtra mientras escribes
- **Ordenamiento automático**: Los nuevos clientes aparecen primero
- **Validación de campos**: Previene datos incompletos
- **Confirmación de borrado**: Evita eliminaciones accidentales
- **Modales animados**: Interfaz fluida y profesional

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Los clientes no se guardan | Limpia localStorage: `localStorage.clear()` |
| CSV vacío al exportar | Verifica que tengas clientes creados |
| Buscar no funciona | Recarga la página (F5) |
| Modal no se abre | Comprueba la consola (F12) para errores |

---

## 🚀 Mejoras futuras

- Integración con API de correo para enviar campañas
- Historial de interacciones por cliente
- Recordatorios de seguimiento automáticos
- Tags personalizados para categorizar clientes
- Gráficos de pipeline de ventas
- Sincronización en la nube (Firebase, etc.)
- Versión móvil optimizada
- Importación de clientes desde CSV

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
