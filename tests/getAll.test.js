const { getAll } = require("../api/character");

/**
 * Pruebas unitarias para la función getAll.
 */
describe("getAll function", () => {
  /**
   * Debería devolver todos los personajes con el código de estado 200.
   */
  test("should return all characters with status code 200", async () => {
    // Ejecutar la función getAll para obtener todos los personajes
    const response = await getAll();

    // Verificar que la respuesta tenga el código de estado 200 y un cuerpo definido
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});
