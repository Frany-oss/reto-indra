"use strict";
const { dynamoDb } = require("../../utils");

/**
 * Obtiene la información de todos los personajes de Star Wars almacenados en la base de datos DynamoDB.
 * @returns {object} Respuesta HTTP con la lista de personajes.
 */
module.exports.getAllCharacters = async () => {
  try {
    const params = {
      TableName: "Character",
    };

    const result = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
