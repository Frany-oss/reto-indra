const { getById } = require("../api/character/services/getById");

/**
 * Pruebas unitarias para la función getById.
 */
describe("getById function", () => {
  /**
   * Debería devolver los datos del personaje con el código de estado 200 cuando se proporciona un ID válido.
   */
  test("should return character data with status code 200 when valid id is provided", async () => {
    // Mock del evento con un ID válido
    const mockEvent = {
      pathParameters: {
        id: "3df56948-ec60-4caa-9877-6b60f04a6f1d",
      },
    };

    // Ejecutar la función getById con el evento mockeado
    const response = await getById(mockEvent);

    // Verificar que la respuesta tenga el código de estado 200 y un cuerpo definido
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  /**
   * Debería devolver un error 404 con el código de estado 404 cuando se proporciona un ID inválido.
   */
  test("should return 404 error with status code 404 when invalid id is provided", async () => {
    // Mock del evento con un ID inválido
    const mockEvent = {
      pathParameters: {
        id: "3df56948-ec60-4caa-9874-6b63j04adf1d",
      },
    };

    // Ejecutar la función getById con el evento mockeado
    const response = await getById(mockEvent);

    // Verificar que la respuesta tenga el código de estado 404 y un cuerpo definido
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
});
