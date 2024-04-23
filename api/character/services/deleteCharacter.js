"use strict";
const { dynamoDb } = require("../../utils");

/**
 * Elimina un personaje de Star Wars de la base de datos DynamoDB por su ID.
 * @param {object} event - Datos de la solicitud HTTP.
 * @returns {object} Respuesta HTTP indicando el resultado de la eliminación.
 */
module.exports.deleteCharacter = async (event) => {
  try {
    const characterId = event.pathParameters.id;

    // Verificar si el ID del personaje fue proporcionado en la solicitud
    if (!characterId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "A Character Id is required" }),
      };
    }

    // Construir parámetros para eliminar el personaje de la base de datos
    const params = {
      TableName: "Character",
      Key: {
        id: characterId,
      },
    };

    // Verificar si el personaje existe en la base de datos antes de intentar eliminarlo
    const result = await dynamoDb.get(params).promise();
    if (!result.Item) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Character not found" }),
      };
    }

    // Eliminar el personaje de la base de datos
    await dynamoDb.delete(params).promise();

    // Devolver una respuesta exitosa
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Character deleted successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
