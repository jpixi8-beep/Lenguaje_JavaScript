// Ejercicio 60: Petición a OpenWeatherMap
// Tema: Fetch API - OpenWeatherMap
// NOTA: Necesitas obtener una API key gratuita en https://openweathermap.org/api

const API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu API key real

// 1. Obtener clima actual por nombre de ciudad
async function obtenerClimaPorCiudad(ciudad) {
  console.log(`--- Ejercicio 1: Clima actual de ${ciudad} ---`);
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const clima = await response.json();
    console.log('Clima obtenido:', clima);
    
    // Mostrar información del clima
    console.log(`\nClima en ${clima.name}, ${clima.sys.country}:`);
    console.log(`Temperatura: ${clima.main.temp}°C`);
    console.log(`Sensación térmica: ${clima.main.feels_like}°C`);
    console.log(`Humedad: ${clima.main.humidity}%`);
    console.log(`Descripción: ${clima.weather[0].description}`);
    console.log(`Viento: ${clima.wind.speed} m/s`);
    
    return clima;
  } catch (error) {
    console.log('Error al obtener clima:', error.message);
    console.log('Asegúrate de tener una API key válida de OpenWeatherMap');
    return null;
  }
}

// obtenerClimaPorCiudad('Madrid');

// 2. Obtener clima por coordenadas
async function obtenerClimaPorCoordenadas(lat, lon) {
  console.log(`\n--- Ejercicio 2: Clima por coordenadas (${lat}, ${lon}) ---`);
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const clima = await response.json();
    console.log('Clima obtenido:', clima);
    
    console.log(`\nClima en ${clima.name}:`);
    console.log(`Temperatura: ${clima.main.temp}°C`);
    console.log(`Descripción: ${clima.weather[0].description}`);
    
    return clima;
  } catch (error) {
    console.log('Error al obtener clima:', error.message);
    return null;
  }
}

// obtenerClimaPorCoordenadas(40.4168, -3.7038); // Madrid

// 3. Obtener pronóstico de 5 días
async function obtenerPronostico5Dias(ciudad) {
  console.log(`\n--- Ejercicio 3: Pronóstico 5 días para ${ciudad} ---`);
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const pronostico = await response.json();
    console.log('Pronóstico obtenido:', pronostico);
    
    // Mostrar pronóstico para cada 3 horas (cada 8 registros es aproximadamente 1 día)
    console.log(`\nPronóstico para ${ciudad}:`);
    pronostico.list.forEach((item, index) => {
      if (index % 8 === 0) { // Mostrar cada 24 horas aprox
        const fecha = new Date(item.dt * 1000);
        console.log(`\n${fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}:`);
        console.log(`  Temperatura: ${item.main.temp}°C (min: ${item.main.temp_min}°C, max: ${item.main.temp_max}°C)`);
        console.log(`  Descripción: ${item.weather[0].description}`);
      }
    });
    
    return pronostico;
  } catch (error) {
    console.log('Error al obtener pronóstico:', error.message);
    return null;
  }
}

// obtenerPronostico5Dias('Madrid');

// 4. Obtener clima de múltiples ciudades
async function obtenerClimaMultipleCiudades(ciudades) {
  console.log('\n--- Ejercicio 4: Clima de múltiples ciudades ---');
  
  try {
    const promesas = ciudades.map(ciudad => 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`)
        .then(res => {
          if (!res.ok) throw new Error(`Error en ${ciudad}`);
          return res.json();
        })
    );
    
    const resultados = await Promise.all(promesas);
    
    console.log('\nClima de las ciudades:');
    resultados.forEach(clima => {
      console.log(`\n${clima.name}, ${clima.sys.country}:`);
      console.log(`  Temperatura: ${clima.main.temp}°C`);
      console.log(`  Descripción: ${clima.weather[0].description}`);
    });
    
    return resultados;
  } catch (error) {
    console.log('Error al obtener clima de múltiples ciudades:', error.message);
    return null;
  }
}

// obtenerClimaMultipleCiudades(['Madrid', 'Barcelona', 'Valencia']);

// 5. Buscar ciudades por nombre
async function buscarCiudades(query) {
  console.log(`\n--- Ejercicio 5: Buscar ciudades con "${query}" ---`);
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const resultado = await response.json();
    console.log('Ciudades encontradas:', resultado);
    
    if (resultado.count > 0) {
      console.log(`\nSe encontraron ${resultado.count} ciudades:`);
      resultado.list.forEach((ciudad, index) => {
        console.log(`${index + 1}. ${ciudad.name}, ${ciudad.sys.country} - ${ciudad.main.temp}°C`);
      });
    } else {
      console.log('No se encontraron ciudades');
    }
    
    return resultado;
  } catch (error) {
    console.log('Error al buscar ciudades:', error.message);
    return null;
  }
}

// buscarCiudades('San');

// 6. Obtener datos de contaminación del aire
async function obtenerCalidadAire(lat, lon) {
  console.log(`\n--- Ejercicio 6: Calidad del aire en (${lat}, ${lon}) ---`);
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const calidadAire = await response.json();
    console.log('Calidad del aire obtenida:', calidadAire);
    
    const aqi = calidadAire.list[0].main.aqi;
    const descripciones = ['Buena', 'Moderada', 'No saludable para sensibles', 'No saludable', 'Muy no saludable', 'Peligrosa'];
    
    console.log(`\nÍndice de calidad del aire (AQI): ${aqi}`);
    console.log(`Descripción: ${descripciones[aqi - 1]}`);
    
    return calidadAire;
  } catch (error) {
    console.log('Error al obtener calidad del aire:', error.message);
    return null;
  }
}

// obtenerCalidadAire(40.4168, -3.7038); // Madrid

// 7. Ejemplo de uso con manejo de errores y validación
async function obtenerClimaSeguro(ciudad) {
  console.log(`\n--- Ejercicio 7: Obtener clima con validación ---`);
  
  if (!API_KEY || API_KEY === 'TU_API_KEY_AQUI') {
    console.log('Error: Debes configurar tu API key de OpenWeatherMap');
    console.log('Obtén una gratuita en: https://openweathermap.org/api');
    return null;
  }
  
  if (!ciudad || ciudad.trim() === '') {
    console.log('Error: Debes proporcionar un nombre de ciudad válido');
    return null;
  }
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (response.status === 404) {
      console.log(`Error: Ciudad "${ciudad}" no encontrada`);
      return null;
    }
    
    if (response.status === 401) {
      console.log('Error: API key inválida');
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const clima = await response.json();
    console.log(`\n✓ Clima de ${clima.name} obtenido exitosamente`);
    console.log(`  Temperatura: ${clima.main.temp}°C`);
    console.log(`  Descripción: ${clima.weather[0].description}`);
    
    return clima;
  } catch (error) {
    console.log('Error al obtener clima:', error.message);
    return null;
  }
}

// obtenerClimaSeguro('Madrid');

console.log('\n⚠️  IMPORTANTE: Para usar estos ejercicios necesitas una API key de OpenWeatherMap');
console.log('1. Regístrate en https://openweathermap.org/api');
console.log('2. Obtén una API key gratuita');
console.log('3. Reemplaza "TU_API_KEY_AQUI" con tu API key en la línea 4');
console.log('4. Descomenta las llamadas a las funciones que quieras probar');
