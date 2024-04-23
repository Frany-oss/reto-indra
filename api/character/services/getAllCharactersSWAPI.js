"use strict";
const { axios } = require("../../utils");

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
