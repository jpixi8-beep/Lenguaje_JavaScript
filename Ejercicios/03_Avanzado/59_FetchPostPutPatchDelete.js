// Ejercicio 59: POST, PUT, PATCH, DELETE con fetch() a JSONPlaceholder
// Tema: Fetch API - POST, PUT, PATCH, DELETE

// 1. POST: Crear un nuevo post
async function crearPost() {
  console.log('--- Ejercicio 1: POST - Crear nuevo post ---');
  
  const nuevoPost = {
    title: 'Mi nuevo post',
    body: 'Este es el contenido del post',
    userId: 1
  };
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoPost),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const postCreado = await response.json();
    console.log('Post creado:', postCreado);
    console.log('ID asignado:', postCreado.id);
    
    return postCreado;
  } catch (error) {
    console.log('Error al crear post:', error.message);
    return null;
  }
}

crearPost();

// 2. PUT: Actualizar completamente un post
async function actualizarPostPut(id) {
  console.log(`\n--- Ejercicio 2: PUT - Actualizar post ${id} ---`);
  
  const postActualizado = {
    id: id,
    title: 'Título actualizado completamente',
    body: 'Cuerpo actualizado completamente',
    userId: 1
  };
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postActualizado),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const post = await response.json();
    console.log('Post actualizado:', post);
    
    return post;
  } catch (error) {
    console.log('Error al actualizar post:', error.message);
    return null;
  }
}

setTimeout(() => actualizarPostPut(1), 2000);

// 3. PATCH: Actualizar parcialmente un post
async function actualizarPostPatch(id) {
  console.log(`\n--- Ejercicio 3: PATCH - Actualizar parcialmente post ${id} ---`);
  
  const actualizacionParcial = {
    title: 'Solo actualizando el título'
  };
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(actualizacionParcial),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const post = await response.json();
    console.log('Post actualizado parcialmente:', post);
    
    return post;
  } catch (error) {
    console.log('Error al actualizar post:', error.message);
    return null;
  }
}

setTimeout(() => actualizarPostPatch(2), 4000);

// 4. DELETE: Eliminar un post
async function eliminarPost(id) {
  console.log(`\n--- Ejercicio 4: DELETE - Eliminar post ${id} ---`);
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    console.log('Post eliminado exitosamente');
    console.log('Status:', response.status);
    
    return true;
  } catch (error) {
    console.log('Error al eliminar post:', error.message);
    return false;
  }
}

setTimeout(() => eliminarPost(3), 6000);

// 5. POST: Crear un nuevo usuario
async function crearUsuario() {
  console.log('\n--- Ejercicio 5: POST - Crear nuevo usuario ---');
  
  const nuevoUsuario = {
    name: 'Juan Pérez',
    username: 'juanperez',
    email: 'juan@example.com',
    address: {
      street: 'Calle Principal',
      suite: 'Apt 123',
      city: 'Ciudad',
      zipcode: '12345'
    }
  };
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const usuarioCreado = await response.json();
    console.log('Usuario creado:', usuarioCreado);
    
    return usuarioCreado;
  } catch (error) {
    console.log('Error al crear usuario:', error.message);
    return null;
  }
}

setTimeout(() => crearUsuario(), 8000);

// 6. PUT: Actualizar un usuario
async function actualizarUsuario(id) {
  console.log(`\n--- Ejercicio 6: PUT - Actualizar usuario ${id} ---`);
  
  const usuarioActualizado = {
    id: id,
    name: 'Juan Pérez Actualizado',
    username: 'juanperez_actualizado',
    email: 'juan_actualizado@example.com',
    address: {
      street: 'Nueva Calle',
      suite: 'Apt 456',
      city: 'Nueva Ciudad',
      zipcode: '67890'
    }
  };
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioActualizado),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const usuario = await response.json();
    console.log('Usuario actualizado:', usuario);
    
    return usuario;
  } catch (error) {
    console.log('Error al actualizar usuario:', error.message);
    return null;
  }
}

setTimeout(() => actualizarUsuario(1), 10000);

// 7. PATCH: Actualizar solo el email de un usuario
async function actualizarEmailUsuario(id, nuevoEmail) {
  console.log(`\n--- Ejercicio 7: PATCH - Actualizar email del usuario ${id} ---`);
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: nuevoEmail }),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const usuario = await response.json();
    console.log('Email actualizado:', usuario);
    
    return usuario;
  } catch (error) {
    console.log('Error al actualizar email:', error.message);
    return null;
  }
}

setTimeout(() => actualizarEmailUsuario(2, 'nuevo_email@example.com'), 12000);

// 8. DELETE: Eliminar un usuario
async function eliminarUsuario(id) {
  console.log(`\n--- Ejercicio 8: DELETE - Eliminar usuario ${id} ---`);
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    console.log('Usuario eliminado exitosamente');
    console.log('Status:', response.status);
    
    return true;
  } catch (error) {
    console.log('Error al eliminar usuario:', error.message);
    return false;
  }
}

setTimeout(() => eliminarUsuario(3), 14000);

// 9. Ejemplo con then/catch para POST
console.log('\n--- Ejercicio 9: POST con then/catch ---');
const nuevoTodo = {
  title: 'Comprar leche',
  completed: false,
  userId: 1
};

fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(nuevoTodo),
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(todo => {
    console.log('Todo creado:', todo);
  })
  .catch(error => {
    console.log('Error:', error.message);
  });
