// Ejercicio 61: Petición a PokéAPI
// Tema: Fetch API - PokéAPI

// 1. Obtener información de un Pokémon por nombre o ID
async function obtenerPokemon(nombreOId) {
  console.log(`--- Ejercicio 1: Obtener Pokémon "${nombreOId}" ---`);
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreOId}`);
    
    if (!response.ok) {
      throw new Error(`Pokémon no encontrado: ${response.status}`);
    }
    
    const pokemon = await response.json();
    console.log('Pokémon obtenido:', pokemon);
    
    // Mostrar información relevante
    console.log(`\nInformación de ${pokemon.name}:`);
    console.log(`ID: ${pokemon.id}`);
    console.log(`Nombre: ${pokemon.name}`);
    console.log(`Altura: ${pokemon.height / 10} m`);
    console.log(`Peso: ${pokemon.weight / 10} kg`);
    console.log(`Tipos: ${pokemon.types.map(t => t.type.name).join(', ')}`);
    console.log(`HP: ${pokemon.stats[0].base_stat}`);
    console.log(`Ataque: ${pokemon.stats[1].base_stat}`);
    console.log(`Defensa: ${pokemon.stats[2].base_stat}`);
    
    // Mostrar sprite frontal
    console.log(`Sprite: ${pokemon.sprites.front_default}`);
    
    return pokemon;
  } catch (error) {
    console.log('Error al obtener Pokémon:', error.message);
    return null;
  }
}

obtenerPokemon('pikachu');

// 2. Obtener lista de Pokémon con paginación
async function obtenerListaPokemon(limit = 20, offset = 0) {
  console.log(`\n--- Ejercicio 2: Lista de Pokémon (limit: ${limit}, offset: ${offset}) ---`);
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const datos = await response.json();
    console.log(`Total de Pokémon: ${datos.count}`);
    console.log(`Pokémon en esta página: ${datos.results.length}`);
    
    console.log('\nLista de Pokémon:');
    datos.results.forEach((pokemon, index) => {
      console.log(`${offset + index + 1}. ${pokemon.name} (URL: ${pokemon.url})`);
    });
    
    return datos;
  } catch (error) {
    console.log('Error al obtener lista:', error.message);
    return null;
  }
}

setTimeout(() => obtenerListaPokemon(10, 0), 2000);

// 3. Obtener tipos de Pokémon
async function obtenerTiposPokemon() {
  console.log('\n--- Ejercicio 3: Obtener tipos de Pokémon ---');
  
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const tipos = await response.json();
    console.log('Tipos obtenidos:', tipos);
    
    console.log('\nLista de tipos:');
    tipos.results.forEach((tipo, index) => {
      console.log(`${index + 1}. ${tipo.name}`);
    });
    
    return tipos;
  } catch (error) {
    console.log('Error al obtener tipos:', error.message);
    return null;
  }
}

setTimeout(() => obtenerTiposPokemon(), 4000);

// 4. Obtener Pokémon de un tipo específico
async function obtenerPokemonPorTipo(tipo) {
  console.log(`\n--- Ejercicio 4: Pokémon de tipo "${tipo}" ---`);
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const datosTipo = await response.json();
    console.log(`Tipo: ${datosTipo.name}`);
    console.log(`Cantidad de Pokémon de este tipo: ${datosTipo.pokemon.length}`);
    
    console.log('\nPrimeros 10 Pokémon de este tipo:');
    datosTipo.pokemon.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.pokemon.name}`);
    });
    
    return datosTipo;
  } catch (error) {
    console.log('Error al obtener Pokémon por tipo:', error.message);
    return null;
  }
}

setTimeout(() => obtenerPokemonPorTipo('fire'), 6000);

// 5. Obtener información de habilidades de un Pokémon
async function obtenerHabilidadesPokemon(nombrePokemon) {
  console.log(`\n--- Ejercicio 5: Habilidades de "${nombrePokemon}" ---`);
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const pokemon = await response.json();
    
    console.log(`Habilidades de ${pokemon.name}:`);
    pokemon.abilities.forEach((habilidad, index) => {
      console.log(`${index + 1}. ${habilidad.ability.name}`);
      console.log(`   Es oculta: ${habilidad.is_hidden ? 'Sí' : 'No'}`);
    });
    
    return pokemon;
  } catch (error) {
    console.log('Error al obtener habilidades:', error.message);
    return null;
  }
}

setTimeout(() => obtenerHabilidadesPokemon('charizard'), 8000);

// 6. Obtener cadena de evolución de un Pokémon
async function obtenerCadenaEvolucion(nombrePokemon) {
  console.log(`\n--- Ejercicio 6: Cadena de evolución de "${nombrePokemon}" ---`);
  
  try {
    // Primero obtener el Pokémon para obtener la URL de la especie
    const responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    
    if (!responsePokemon.ok) {
      throw new Error(`Error HTTP: ${responsePokemon.status}`);
    }
    
    const pokemon = await responsePokemon.json();
    
    // Luego obtener la especie
    const responseEspecie = await fetch(pokemon.species.url);
    const especie = await responseEspecie.json();
    
    // Finalmente obtener la cadena de evolución
    const responseEvolucion = await fetch(especie.evolution_chain.url);
    const cadenaEvolucion = await responseEvolucion.json();
    
    console.log('Cadena de evolución obtenida');
    
    // Función recursiva para extraer la cadena
    function extraerEvoluciones(cadena) {
      const evoluciones = [];
      
      function recorrer(cadenaActual) {
        if (cadenaActual.species) {
          evoluciones.push(cadenaActual.species.name);
        }
        
        if (cadenaActual.evolves_to && cadenaActual.evolves_to.length > 0) {
          cadenaActual.evolves_to.forEach(ev => recorrer(ev));
        }
      }
      
      recorrer(cadena);
      return evoluciones;
    }
    
    const evoluciones = extraerEvoluciones(cadenaEvolucion.chain);
    console.log(`\nCadena de evolución de ${nombrePokemon}:`);
    evoluciones.forEach((evo, index) => {
      console.log(`${index + 1}. ${evo}`);
    });
    
    return cadenaEvolucion;
  } catch (error) {
    console.log('Error al obtener cadena de evolución:', error.message);
    return null;
  }
}

setTimeout(() => obtenerCadenaEvolucion('bulbasaur'), 10000);

// 7. Obtener estadísticas detalladas de un Pokémon
async function obtenerEstadisticasPokemon(nombrePokemon) {
  console.log(`\n--- Ejercicio 7: Estadísticas detalladas de "${nombrePokemon}" ---`);
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const pokemon = await response.json();
    
    console.log(`\nEstadísticas de ${pokemon.name}:`);
    pokemon.stats.forEach((stat) => {
      const nombreStat = {
        'hp': 'Puntos de Salud',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defensa Especial',
        'speed': 'Velocidad'
      };
      console.log(`${nombreStat[stat.stat.name] || stat.stat.name}: ${stat.base_stat}`);
    });
    
    return pokemon;
  } catch (error) {
    console.log('Error al obtener estadísticas:', error.message);
    return null;
  }
}

setTimeout(() => obtenerEstadisticasPokemon('mewtwo'), 12000);

// 8. Buscar Pokémon con múltiples peticiones en paralelo
async function buscarMultiplesPokemon(listaNombres) {
  console.log('\n--- Ejercicio 8: Búsqueda múltiple de Pokémon ---');
  
  try {
    const promesas = listaNombres.map(nombre => 
      fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(res => {
          if (!res.ok) throw new Error(`Error en ${nombre}`);
          return res.json();
        })
    );
    
    const resultados = await Promise.all(promesas);
    
    console.log('\nInformación de los Pokémon:');
    resultados.forEach(pokemon => {
      console.log(`\n${pokemon.name}:`);
      console.log(`  Tipos: ${pokemon.types.map(t => t.type.name).join(', ')}`);
      console.log(`  HP: ${pokemon.stats[0].base_stat}`);
      console.log(`  Ataque: ${pokemon.stats[1].base_stat}`);
    });
    
    return resultados;
  } catch (error) {
    console.log('Error al buscar múltiples Pokémon:', error.message);
    return null;
  }
}

setTimeout(() => buscarMultiplesPokemon(['pikachu', 'bulbasaur', 'charmander']), 14000);

// 9. Obtener información de una ubicación
async function obtenerUbicacion(id) {
  console.log(`\n--- Ejercicio 9: Ubicación ${id} ---`);
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/location/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const ubicacion = await response.json();
    console.log('Ubicación obtenida:', ubicacion);
    
    console.log(`\nNombre: ${ubicacion.name}`);
    console.log(`Región: ${ubicacion.region.name}`);
    console.log(`Áreas: ${ubicacion.areas.length}`);
    
    return ubicacion;
  } catch (error) {
    console.log('Error al obtener ubicación:', error.message);
    return null;
  }
}

setTimeout(() => obtenerUbicacion(1), 16000);

// 10. Obtener generaciones de Pokémon
async function obtenerGeneraciones() {
  console.log('\n--- Ejercicio 10: Generaciones de Pokémon ---');
  
  try {
    const response = await fetch('https://pokeapi.co/api/v2/generation');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const generaciones = await response.json();
    console.log('Generaciones obtenidas:', generaciones);
    
    console.log('\nLista de generaciones:');
    generaciones.results.forEach((gen, index) => {
      console.log(`${index + 1}. ${gen.name}`);
    });
    
    return generaciones;
  } catch (error) {
    console.log('Error al obtener generaciones:', error.message);
    return null;
  }
}

setTimeout(() => obtenerGeneraciones(), 18000);
