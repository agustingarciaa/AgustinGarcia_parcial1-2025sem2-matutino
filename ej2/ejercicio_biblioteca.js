/**
 * EJERCICIO DE PARCIAL: SISTEMA DE GESTIÓN DE BIBLIOTECA UNIVERSITARIA
 *
 * OBJETIVO: Implementar un sistema que permita gestionar los préstamos de libros
 * en una biblioteca universitaria, aplicando conceptos avanzados de manipulación
 * de objetos y arrays en JavaScript.
 *
 * INSTRUCCIONES:
 * 1. Analiza la estructura de datos proporcionada
 * 2. Implementa todas las funciones requeridas
 * 3. Prueba tus funciones con los datos de ejemplo y los casos de prueba proporcionados
 * 4. NO modifiques la estructura base de los objetos, solo añade las funcionalidades solicitadas
 */

// Importamos los datos desde el archivo JSON usando ES6 import
import bibliotecaData from "./datos_biblioteca.json" assert { type: "json" };

// Creamos una copia de los datos para trabajar con ellos
const biblioteca = { ...bibliotecaData };

/**
 * FUNCIONES A IMPLEMENTAR:
 */

/**
 * 1. Función para prestar un libro
 *
 * Implementa una función que gestione el proceso de préstamo de un libro a un estudiante.
 * Deberás realizar las validaciones necesarias y actualizar los registros correspondientes.
 *
 * @param {number} idLibro - ID del libro a prestar
 * @param {number} idEstudiante - ID del estudiante que pide prestado
 * @param {string} fechaPrestamo - Fecha del préstamo (formato YYYY-MM-DD)
 * @return {boolean|string} - true si se realizó el préstamo, mensaje de error si no
 */
function prestarLibro(idLibro, idEstudiante, fechaPrestamo) {
  const libro = biblioteca.libros.find((l) => l.id === idLibro);
  if (!libro) {
    return "Error: El libro con ID " + idLibro + " no existe";
  }

  if (!libro.disponible) {
    return "Error: El libro '" + libro.titulo + "' no está disponible";
  }

  const estudiante = biblioteca.estudiantes.find((e) => e.id === idEstudiante);
  if (!estudiante) {
    return "Error: El estudiante con ID " + idEstudiante + " no existe";
  }

  const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(fechaPrestamo);
  if (!fechaValida) {
    return "Error: Formato de fecha inválido. Use YYYY-MM-DD";
  }

  libro.disponible = false;
  libro.prestamos.push({
    estudiante: estudiante.nombre,
    fechaPrestamo: fechaPrestamo,
    fechaDevolucion: null,
  });

  estudiante.librosActuales.push(idLibro);

  return true;
}

/**
 * 2. Función para buscar libros
 *
 * Desarrolla una función de búsqueda flexible que permita encontrar libros
 * según diversos criterios como título, autor, categoría y disponibilidad.
 *
 * @param {object} criterios - Objeto con los criterios de búsqueda
 * @return {array} - Array con los libros que cumplen los criterios
 */
function buscarLibros(criterios) {
  let librosEncontrados = biblioteca.libros;

  if (criterios.titulo) {
    librosEncontrados = librosEncontrados.filter((libro) =>
      libro.titulo.toLowerCase().includes(criterios.titulo.toLowerCase())
    );

    if (criterios.autor) {
      librosEncontrados = librosEncontrados.filter((libro) =>
        libro.autor.toLowerCase().includes(criterios.autor.toLowerCase())
      );
    }

    if (criterios.categoria) {
      librosEncontrados = librosEncontrados.filter(
        (libro) =>
          libro.categoria.toLowerCase() === criterios.categoria.toLowerCase()
      );
    }

    if (criterios.disponible !== undefined) {
      librosEncontrados = librosEncontrados.filter(
        (libro) => libro.disponible === criterios.disponible
      );
    }

    if (criterios.añoPublicacion) {
      librosEncontrados = librosEncontrados.filter(
        (libro) => libro.añoPublicacion === criterios.añoPublicacion
      );
    }

    if (criterios.añoDesde) {
      librosEncontrados = librosEncontrados.filter(
        (libro) => libro.añoPublicacion >= criterios.añoDesde
      );
    }

    if (criterios.añoHasta) {
      librosEncontrados = librosEncontrados.filter(
        (libro) => libro.añoPublicacion <= criterios.añoHasta
      );
    }

    return librosEncontrados;
  }

  /**
   * 3. Función para devolver un libro
   *
   * @param {number} idLibro - ID del libro a devolver
   * @param {number} idEstudiante - ID del estudiante que devuelve
   * @param {string} fechaDevolucion - Fecha de devolución (formato YYYY-MM-DD)
   * @return {boolean|string} - true si se realizó la devolución, mensaje de error si no
   */
  function devolverLibro(idLibro, idEstudiante, fechaDevolucion) {
    //  Buscar el libro
    const libro = biblioteca.libros.find((l) => l.id === idLibro);
    if (!libro) {
      return "Error: El libro con ID " + idLibro + " no existe";
    }

    //  Buscar el estudiante
    const estudiante = biblioteca.estudiantes.find(
      (e) => e.id === idEstudiante
    );
    if (!estudiante) {
      return "Error: El estudiante con ID " + idEstudiante + " no existe";
    }

    //  Verificar que el estudiante tenga el libro
    const tieneLibro = estudiante.librosActuales.includes(idLibro);
    if (!tieneLibro) {
      return "Error: El estudiante no tiene prestado este libro";
    }

    //  Actualizar el estado del libro
    libro.disponible = true;

    //  Buscar el préstamo activo y actualizarlo
    const prestamoActivo = libro.prestamos.find(
      (p) => p.estudiante === estudiante.nombre && p.fechaDevolucion === null
    );
    if (prestamoActivo) {
      prestamoActivo.fechaDevolucion = fechaDevolucion;
    }

    //  Remover el libro de la lista del estudiante
    const index = estudiante.librosActuales.indexOf(idLibro);
    estudiante.librosActuales.splice(index, 1);

    return true;
  }

  /**
   * 4. Función para obtener estadísticas de la biblioteca
   *
   * @return {object} - Objeto con estadísticas de la biblioteca
   */
  function obtenerEstadisticas() {
    const totalLibros = biblioteca.libros.length;
    const librosDisponibles = biblioteca.libros.filter(
      (l) => l.disponible
    ).length;
    const librosPrestados = totalLibros - librosDisponibles;

    const categorias = {};
    biblioteca.libros.forEach((libro) => {
      if (categorias[libro.categoria]) {
        categorias[libro.categoria]++;
      } else {
        categorias[libro.categoria] = 1;
      }
    });

    const autoresPopulares = {};
    biblioteca.libros.forEach((libro) => {
      const totalPrestamos = libro.prestamos.length;
      if (autoresPopulares[libro.autor]) {
        autoresPopulares[libro.autor] += totalPrestamos;
      } else {
        autoresPopulares[libro.autor] = totalPrestamos;
      }
    });

    return {
      totalLibros,
      librosDisponibles,
      librosPrestados,
      porcentajeDisponibilidad:
        ((librosDisponibles / totalLibros) * 100).toFixed(2) + "%",
      librosPorCategoria: categorias,
      autoresPopulares,
    };
  }
}

// Preubas:

console.log("📊 ESTADÍSTICAS INICIALES:");
console.log(obtenerEstadisticas());
console.log("\n" + "=".repeat(60) + "\n");

console.log("🔍 PROBANDO BÚSQUEDAS:");
console.log("Libros de programación disponibles:");
console.log(buscarLibros({ categoria: "Programación", disponible: true }));

console.log("\nLibros de John Doe:");
console.log(buscarLibros({ autor: "John Doe" }));

console.log("\nLibros publicados desde 2021:");
console.log(buscarLibros({ añoDesde: 2021 }));

console.log("\n" + "=".repeat(60) + "\n");

console.log("Prestando libro ID 1 a estudiante ID 4:");
console.log(prestarLibro(1, 4, "2025-09-15"));

console.log("\nPrestando libro ID 2 (ya prestado):");
console.log(prestarLibro(2, 1, "2025-09-15"));

console.log("\nPrestando libro inexistente:");
console.log(prestarLibro(999, 1, "2025-09-15"));
