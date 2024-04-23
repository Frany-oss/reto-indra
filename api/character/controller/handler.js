"use strict";

/**
 * Controlador para la gestión de personajes de Star Wars.
 */

const services = {
  uploadCharacter: require("../services/uploadCharacter"),
  getCharacterById: require("../services/getById"),
  getAllCharacters: require("../services/getAllCharacters"),
  deleteCharacter: require("../services/deleteCharacter"),
  getAllCharactersFromSWAPI: require("../services/getAllCharactersSWAPI"),
};

/**
 * Función Factory para crear métodos del controlador dinámicamente.
 * @param {string} methodName - Nombre del método del servicio.
 * @returns {Function} Método del controlador.
 */
const createControllerMethod = (methodName) => async (event) => {
  try {
    return await services[methodName][methodName](event);
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

exports.uploadCharacter = createControllerMethod("uploadCharacter");
exports.getCharacterById = createControllerMethod("getCharacterById");
exports.getAllCharacters = createControllerMethod("getAllCharacters");
exports.deleteCharacter = createControllerMethod("deleteCharacter");
exports.getAllCharactersFromSWAPI = createControllerMethod(
  "getAllCharactersFromSWAPI"
);
