const { deleteCharacter } = require("../api/character/services/deleteCharacter");

const dynamoDb = {
  delete: jest.fn(),
  get: jest.fn(),
};

/**
 * Pruebas unitarias para la función deleteCharacter.
 */
describe("deleteCharacter function", () => {
  /**
   * Debería eliminar un personaje con un ID válido y devolver el código de estado 200.
   */
  test("should delete character with status code 200 when valid id is provided", async () => {
    // Mock del evento HTTP con un ID válido proporcionado
    const mockEvent = {
      pathParameters: {
        id: "ba89583b-9601-4716-811d-e6f58a5cca74",
      },
    };

    // Mock de DynamoDB.delete para simular la eliminación exitosa del personaje
    jest.spyOn(dynamoDb, "delete").mockReturnValue({
      promise: jest.fn().mockResolvedValue(),
    });

    // Mock de DynamoDB.get para simular la existencia del personaje con el ID proporcionado
    jest.spyOn(dynamoDb, "get").mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Item: { id: "ba89583b-9601-4716-811d-e6f58a5cca74" },
      }),
    });

    // Ejecutar la función deleteCharacter con el evento mockeado
    const response = await deleteCharacter(mockEvent);

    // Verificar que la respuesta tenga el código de estado 200 y un cuerpo definido
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  /**
   * Debería devolver un error 500 con el código de estado 500 cuando no se proporciona ningún ID.
   */
  test("should return 500 error with status code 400 when no id is provided", async () => {
    // Mock del evento HTTP sin ningún ID proporcionado
    const mockEvent = {};

    // Ejecutar la función deleteCharacter con el evento mockeado
    const response = await deleteCharacter(mockEvent);

    // Verificar que la respuesta tenga el código de estado 500 y un cuerpo definido
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeDefined();
  });

  /**
   * Debería devolver un error 400 con el código de estado 400 cuando no se encuentra ningún personaje con el ID proporcionado.
   */
  test("should return 400 error with status code 400 when character is not found", async () => {
    // Mock del evento HTTP con un ID de personaje que no existe
    const mockEvent = {
      pathParameters: {
        id: "d80eb9c0-707f-49c2-8b04-5613d91fea03",
      },
    };

    // Mock de DynamoDB.get para simular que no se encuentra ningún personaje con el ID proporcionado
    jest.spyOn(dynamoDb, "get").mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });

    // Ejecutar la función deleteCharacter con el evento mockeado
    const response = await deleteCharacter(mockEvent);

    // Verificar que la respuesta tenga el código de estado 400 y un cuerpo definido
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
});
