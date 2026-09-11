// Ejercicio 57: Async/await con error handling
// Tema: Async/await con error handling (getUser API)

// 1. Función getUser(id) que simula una llamada a API
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 5) {
        resolve({
          id: id,
          nombre: `Usuario ${id}`
        });
      } else {
        reject('Usuario no encontrado');
      }
    }, 2000);
  });
}

// 2. Usar async/await con try/catch para llamar a getUser
async function buscarUsuario(id) {
  console.log(`--- Buscando usuario con id: ${id} ---`);
  
  try {
    const usuario = await getUser(id);
    console.log('Usuario encontrado:', usuario);
    return usuario;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

// 3. Probar con diferentes IDs
buscarUsuario(1); // Éxito
buscarUsuario(3); // Éxito
buscarUsuario(5); // Error
buscarUsuario(10); // Error

// 4. Versión con manejo más detallado de errores
async function buscarUsuarioConDetalles(id) {
  console.log(`\n--- Buscando usuario ${id} con detalles ---`);
  
  try {
    console.log('Iniciando búsqueda...');
    const usuario = await getUser(id);
    console.log('Búsqueda exitosa:', usuario);
    console.log(`Bienvenido, ${usuario.nombre}!`);
    return usuario;
  } catch (error) {
    console.log('Error durante la búsqueda:', error);
    console.log('Por favor, verifica el ID e intenta nuevamente.');
    return null;
  } finally {
    console.log('Búsqueda finalizada');
  }
}

setTimeout(() => buscarUsuarioConDetalles(2), 7000);
setTimeout(() => buscarUsuarioConDetalles(6), 10000);

// 5. Múltiples llamadas a getUser en paralelo
async function buscarMultiplesUsuarios(ids) {
  console.log('\n--- Buscando múltiples usuarios ---');
  
  try {
    const promesas = ids.map(id => getUser(id));
    const usuarios = await Promise.all(promesas);
    console.log('Usuarios encontrados:', usuarios);
    return usuarios;
  } catch (error) {
    console.log('Error al buscar usuarios:', error);
    return [];
  }
}

setTimeout(() => buscarMultiplesUsuarios([1, 2, 3, 4]), 14000);

// 6. Buscar usuarios con Promise.allSettled (maneja errores individuales)
async function buscarUsuariosConAllSettled(ids) {
  console.log('\n--- Buscando usuarios con allSettled ---');
  
  const promesas = ids.map(id => getUser(id));
  const resultados = await Promise.allSettled(promesas);
  
  resultados.forEach((resultado, index) => {
    if (resultado.status === 'fulfilled') {
      console.log(`ID ${ids[index]}:`, resultado.value);
    } else {
      console.log(`ID ${ids[index]}: Error -`, resultado.reason);
    }
  });
}

setTimeout(() => buscarUsuariosConAllSettled([1, 5, 2, 6, 3]), 18000);

// 7. Función que reintenta la búsqueda
async function buscarUsuarioConReintento(id, maxReintentos = 3) {
  console.log(`\n--- Buscando usuario ${id} con reintentos ---`);
  
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      console.log(`Intento ${intento}/${maxReintentos}...`);
      const usuario = await getUser(id);
      console.log('Usuario encontrado:', usuario);
      return usuario;
    } catch (error) {
      console.log(`Intento ${intento} fallido:`, error);
      if (intento === maxReintentos) {
        console.log('Se agotaron los reintentos');
        return null;
      }
    }
  }
}

setTimeout(() => buscarUsuarioConReintento(7, 3), 24000);

// 8. Función que busca usuario y luego sus "posts" (simulado)
function getUserPosts(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, titulo: 'Post 1 del usuario', userId: id },
        { id: 2, titulo: 'Post 2 del usuario', userId: id }
      ]);
    }, 1000);
  });
}

async function buscarUsuarioConPosts(id) {
  console.log(`\n--- Buscando usuario ${id} con sus posts ---`);
  
  try {
    const usuario = await getUser(id);
    console.log('Usuario:', usuario);
    
    const posts = await getUserPosts(usuario.id);
    console.log('Posts del usuario:', posts);
    
    return { usuario, posts };
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

setTimeout(() => buscarUsuarioConPosts(4), 30000);
