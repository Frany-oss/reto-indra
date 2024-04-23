"use strict";
const { dynamoDb } = require("../../utils");

/**
 * Obtiene la información de un personaje de Star Wars por su ID desde la base de datos DynamoDB.
 * @param {object} event - Datos de la solicitud HTTP.
 * @returns {object} Respuesta HTTP con la información del personaje.
 */
module.exports.getCharacterById = async (event) => {
  try {
    const characterId = event.pathParameters.id;

    const params = {
      TableName: "Character",
      Key: {
        id: characterId,
      },
    };

    const result = await dynamoDb.get(params).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Character not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
