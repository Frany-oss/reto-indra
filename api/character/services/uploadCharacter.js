"use strict";

const uuid = require("uuid");
const { dynamoDb } = require("../../utils");

const Character = require("../entities/character.entity");

/**
 * Maneja la carga de un nuevo personaje de Star Wars a la base de datos.
 * @param {object} event - Datos de la solicitud HTTP.
 * @returns {object} Respuesta HTTP con el resultado de la carga del personaje.
 */
module.exports.uploadCharacter = async (event) => {
  try {
    console.log(event.body);
    const requestBody = JSON.parse(event.body);

    // Crear a un nuevo CHaracter
    const character = new Character(requestBody);

    // Validar data del Character
    const validationError = character.validate();
    if (validationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: validationError }),
      };
    }

    // Generar un UUID para el identificador del personaje
    const characterId = uuid.v4();

    // Preparar los datos para guardar en DynamoDB
    const params = {
      TableName: "Character",
      Item: {
        id: characterId,
        nombre: requestBody.name,
        altura: requestBody.height,
        peso: requestBody.mass,
        colorPelo: requestBody.hair_color,
        colorPiel: requestBody.skin_color,
        colorOjos: requestBody.eye_color,
        fechaNacimiento: requestBody.birth_year,
        genero: requestBody.gender,
      },
    };

    console.log(params);

    // Guardar el personaje en la base de datos
    await dynamoDb.put(params).promise();

    // Devolver una respuesta exitosa
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Character saved successfully",
        characterId: characterId,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
