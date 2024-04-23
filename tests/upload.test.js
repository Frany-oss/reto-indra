const { upload } = require("../api/character/services/uploadCharacter");

/**
 * Pruebas unitarias para la función upload.
 */
describe("upload function", () => {
  /**
   * Debería devolver una respuesta exitosa cuando se proporciona una entrada válida.
   */
  test("should return a successful response when valid input is provided", async () => {
    // Mock del evento con datos de entrada válidos
    const mockEvent = {
      body: JSON.stringify({
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
      }),
    };

    // Ejecutar la función upload con el evento mockeado
    const response = await upload(mockEvent);

    // Verificar que la respuesta tenga el código de estado 201 y un cuerpo definido
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
  });

  /**
   * Debería devolver un error con el código de estado 400 cuando se proporciona una entrada inválida.
   */
  test("should return an error with status code 400", async () => {
    // Mock del evento con datos de entrada inválidos (masa no es una cadena de texto)
    const mockEvent = {
      body: JSON.stringify({
        name: "Luke Skywalker",
        height: "172",
        mass: 77,
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
      }),
    };

    // Ejecutar la función upload con el evento mockeado
    const response = await upload(mockEvent);

    // Verificar que la respuesta tenga el código de estado 400 y un cuerpo definido
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
});
