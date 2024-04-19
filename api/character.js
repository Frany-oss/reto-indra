"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");
const axios = require("axios");

AWS.config.setPromisesDependency(require("bluebird"));
AWS.config.update({ region: "us-east-1" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Maneja la carga de un nuevo personaje de Star Wars a la base de datos.
 * @param {object} event - Datos de la solicitud HTTP.
 * @returns {object} Respuesta HTTP con el resultado de la carga del personaje.
 */
module.exports.upload = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);

    // Validar los campos de entrada
    const camposRequeridos = [
      "name",
      "height",
      "mass",
      "hair_color",
      "skin_color",
      "eye_color",
      "birth_year",
      "gender",
    ];
    for (const campo of camposRequeridos) {
      if (typeof requestBody[campo] !== "string") {
        console.error("Validation Failed");
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: `El campo '${campo}' es obligatorio y debe ser una cadena de texto.`,
          }),
        };
      }
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

/**
 * Obtiene la información de un personaje de Star Wars por su ID desde la base de datos DynamoDB.
 * @param {object} event - Datos de la solicitud HTTP.
 * @returns {object} Respuesta HTTP con la información del personaje.
 */
module.exports.getById = async (event) => {
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

/**
 * Obtiene la información de todos los personajes de Star Wars almacenados en la base de datos DynamoDB.
 * @returns {object} Respuesta HTTP con la lista de personajes.
 */
module.exports.getAll = async () => {
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

/**
 * Obtiene la información de todos los personajes de Star Wars desde la API SWAPI.
 * @returns {object} Respuesta HTTP con la lista de personajes obtenidos.
 */
module.exports.getAllCharactersFromSWAPI = async () => {
  try {
    // Realizar una solicitud HTTP GET a la URL de SWAPI
    const response = await axios.get("https://swapi.py4e.com/api/people");

    // Extraer los personajes de la respuesta
    const characters = response.data.results;

    // Devolver los personajes obtenidos
    return {
      statusCode: 200,
      body: JSON.stringify(characters),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
