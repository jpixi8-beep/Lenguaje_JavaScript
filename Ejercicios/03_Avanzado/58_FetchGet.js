// Ejercicio 58: Petición GET con fetch() a JSONPlaceholder
// Tema: Fetch API - GET

// 1. Petición GET básica a JSONPlaceholder
async function obtenerPosts() {
  console.log('--- Ejercicio 1: GET básico a JSONPlaceholder ---');
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const posts = await response.json();
    console.log('Posts obtenidos:', posts);
    console.log('Cantidad de posts:', posts.length);
    
    // Mostrar los primeros 3 posts
    console.log('\nPrimeros 3 posts:');
    posts.slice(0, 3).forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
    });
    
    return posts;
  } catch (error) {
    console.log('Error al obtener posts:', error.message);
    return null;
  }
}

obtenerPosts();

// 2. Obtener un post específico por ID
async function obtenerPostPorId(id) {
  console.log(`\n--- Ejercicio 2: GET post por ID (${id}) ---`);
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const post = await response.json();
    console.log('Post encontrado:', post);
    console.log(`Título: ${post.title}`);
    console.log(`Cuerpo: ${post.body}`);
    
    return post;
  } catch (error) {
    console.log('Error al obtener post:', error.message);
    return null;
  }
}

setTimeout(() => obtenerPostPorId(1), 2000);

// 3. Obtener comentarios de un post específico
async function obtenerComentarios(postId) {
  console.log(`\n--- Ejercicio 3: GET comentarios del post ${postId} ---`);
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const comentarios = await response.json();
    console.log('Comentarios obtenidos:', comentarios);
    console.log('Cantidad de comentarios:', comentarios.length);
    
    // Mostrar los primeros 2 comentarios
    console.log('\nPrimeros 2 comentarios:');
    comentarios.slice(0, 2).forEach((comentario, index) => {
      console.log(`${index + 1}. ${comentario.name} - ${comentario.email}`);
    });
    
    return comentarios;
  } catch (error) {
    console.log('Error al obtener comentarios:', error.message);
    return null;
  }
}

setTimeout(() => obtenerComentarios(1), 4000);

// 4. Obtener usuarios con query parameters
async function obtenerUsuariosConParams() {
  console.log('\n--- Ejercicio 4: GET con query parameters ---');
  
  try {
    // Obtener solo los primeros 5 usuarios
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const usuarios = await response.json();
    console.log('Usuarios obtenidos:', usuarios);
    
    // Mostrar información de los usuarios
    usuarios.forEach((usuario, index) => {
      console.log(`${index + 1}. ${usuario.name} - ${usuario.email}`);
    });
    
    return usuarios;
  } catch (error) {
    console.log('Error al obtener usuarios:', error.message);
    return null;
  }
}

setTimeout(() => obtenerUsuariosConParams(), 6000);

// 5. Obtener albums de un usuario específico
async function obtenerAlbumsUsuario(userId) {
  console.log(`\n--- Ejercicio 5: GET albums del usuario ${userId} ---`);
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const albums = await response.json();
    console.log('Albums obtenidos:', albums);
    console.log('Cantidad de albums:', albums.length);
    
    // Mostrar títulos de albums
    albums.forEach((album, index) => {
      console.log(`${index + 1}. ${album.title}`);
    });
    
    return albums;
  } catch (error) {
    console.log('Error al obtener albums:', error.message);
    return null;
  }
}

setTimeout(() => obtenerAlbumsUsuario(1), 8000);

// 6. Usar fetch con then/catch en lugar de async/await
console.log('\n--- Ejercicio 6: GET con then/catch ---');
fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(todos => {
    console.log('Todos obtenidos:', todos);
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo.title} - Completado: ${todo.completed}`);
    });
  })
  .catch(error => {
    console.log('Error:', error.message);
  });
