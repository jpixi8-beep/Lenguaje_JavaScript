# 📝 Blog Multiusuario – Plataforma de Blogs Moderna

Blog completo desarrollado en **JavaScript ES6 Vanilla** con sistema de autenticación JWT simulado, panel de administración, comentarios y estadísticas. Ideal para mostrar un proyecto fullstack frontend.

---

## 🚀 Características principales

- **Sistema de Autenticación**:
  - Registro de nuevos usuarios.
  - Login/Logout seguro.
  - Sesión persistente en localStorage.
  - Validación de credenciales.

- **Creación y Gestión de Posts**:
  - Crear posts con título, contenido, categoría.
  - Editar propios posts.
  - Agregar tags personalizados.
  - Categorías: tecnología, viajes, lifestyle, negocios, educación.

- **Sistema de Comentarios**:
  - Comentarios en tiempo real.
  - Autor y fecha en cada comentario.
  - Persistencia de comentarios.

- **Filtrado Avanzado**:
  - Búsqueda por texto.
  - Filtro por categoría.
  - Ordenar: Más nuevos, populares, antiguos.

- **Panel de Administración**:
  - Vista mis posts.
  - Gestión de usuarios.
  - Moderación comentarios.
  - Estadísticas personales.

- **Estadísticas**:
  - Posts publicados.
  - Comentarios recibidos.
  - Vistas totales.
  - Likes recibidos.

- **Interfaz Responsiva**:
  - Diseño adaptable.
  - Funciona en todos los dispositivos.
  - Dark mode moderno.

---

## 📸 Pantallazo de ejemplo

![Blog Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica.
- **CSS3** – Flexbox, Grid, Gradientes, Animaciones.
- **JavaScript ES6** – Clases, localStorage, async patterns.

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
3. ¡Listo! El blog está listo para usar

### Opción 2: Con servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 10BlogMultiusuario_JS_ES6

# Con Python 3
python -m http.server 8000

# O con Node.js
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Crear Cuenta
1. Presiona "Crear cuenta" en la página de login.
2. Completa tu información:
   - Nombre completo
   - Nombre de usuario
   - Email
   - Contraseña
3. Presiona "Crear Cuenta".

### 2. Iniciar Sesión
1. Ingresa tu usuario y contraseña.
2. Presiona "Iniciar Sesión".
3. ¡Estás dentro! Verás el blog.

### 3. Explorar Posts
1. Visualiza posts de todos los usuarios.
2. Haz click en cualquier post para verlo completo.
3. Usa filtros para buscar:
   - Por nombre
   - Por categoría
   - Ordenar

### 4. Crear un Post
1. Presiona "✍️ Nuevo Post".
2. Completa:
   - Título
   - Contenido
   - Categoría
   - Tags (opcional)
3. Presiona "Publicar Post".

### 5. Comentar
1. Abre un post.
2. Desplázate hacia abajo.
3. Escribe tu comentario.
4. Presiona "Comentar".

### 6. Panel Admin
1. Presiona "⚙️ Admin" en la navbar.
2. Visualiza:
   - **Mis Posts**: Tus posts publicados
   - **Usuarios**: Lista de usuarios
   - **Comentarios**: Comentarios en tu blog
   - **Estadísticas**: Vistas, likes, comentarios

### 7. Cerrar Sesión
1. Presiona el botón "Salir".
2. Se limpia la sesión.

---

## 🎨 Estructura del código

```javascript
class BlogApp {
  // Inicialización
  init()

  // Auth
  handleLogin()
  handleRegister()
  logout()
  checkUserSession()

  // Posts
  handlePostSubmit()
  openPostDetail()
  renderPosts()
  getFilteredPosts()

  // Comentarios
  handleCommentSubmit()
  renderComments()

  // Admin
  toggleAdminView()
  renderStats()
  renderMyPosts()

  // Almacenamiento
  saveData()
  loadData()
}
```

---

## 👥 Usuarios de Demo

| Usuario | Contraseña | Email |
|---------|-----------|-------|
| jfuentes | pass123 | jorge@email.com |
| mgarcia | pass456 | maria@email.com |

---

## 📊 Estructura de datos

```javascript
// Usuario
{
  id: 1,
  name: 'Jorge Fuentes',
  username: 'jfuentes',
  email: 'jorge@email.com',
  password: 'pass123'
}

// Post
{
  id: 1,
  authorId: 1,
  title: 'Mi primer post',
  content: 'Contenido del post...',
  category: 'tecnologia',
  tags: ['js', 'web'],
  date: Date,
  views: 234,
  likes: 45,
  comments: []
}

// Comentario
{
  id: 1,
  authorId: 2,
  text: 'Gran post!',
  date: Date
}
```

---

## 🔐 Autenticación y Seguridad

*Nota: Esta es una simulación. En producción, usar:*
- Tokens JWT reales desde servidor
- Hashing de contraseñas (bcrypt)
- HTTPS
- Rate limiting
- Validación server-side

---

## 📝 Categorías disponibles

- 🔬 **Tecnología**: Posts sobre programación, web, apps
- ✈️ **Viajes**: Experiencias de viaje
- 🌟 **Lifestyle**: Consejos de vida, bienestar
- 💼 **Negocios**: Emprendimiento, startups
- 📚 **Educación**: Aprendizaje, tutoriales

---

## 💾 Persistencia de datos

Todos los datos se guardan en localStorage:
- **Usuarios**: `blog-users`
- **Posts**: `blog-posts`
- **Sesión**: `blog-current-user`

---

## 🚀 Mejoras futuras

- Autenticación real con JWT
- Base de datos backend
- Sistema de likes/reacciones
- Edición y eliminación de posts
- Notificaciones en tiempo real
- Sistema de follow/followers
- API REST completa
- Socket.io para comandos en vivo
- Sistema de reportes
- Moderación de contenido
- Variables privadas/públicas
- Trending posts
- Recomendaciones personalizadas

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Datos no persisten | Habilita localStorage |
| No puedo crear post | Inicia sesión primero |
| Comentarios desaparecen | Abre localStorage en DevTools |
| Admin panel vacío | Accede como el usuario correcto |

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
