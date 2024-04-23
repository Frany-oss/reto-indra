"use strict";

/**
 * Modelo de personaje que representa la estructura de un personaje.
 */
class Character {
  /**
   * Constructor para crear un nuevo objeto Character.
   * @param {Object} data - Objeto de datos que contiene la información del personaje.
   */
  constructor(data) {
    this.name = data.name || null;
    this.height = data.height || null;
    this.mass = data.mass || null;
    this.hair_color = data.hair_color || null;
    this.skin_color = data.skin_color || null;
    this.eye_color = data.eye_color || null;
    this.birth_year = data.birth_year || null;
    this.gender = data.gender || null;
  }

  /**
   * Valida los datos del personaje.
   * @returns {Object|null} Un objeto de error si la validación falla, de lo contrario null.
   */
  validate() {
    const requiredFields = [
      "name",
      "height",
      "mass",
      "hair_color",
      "skin_color",
      "eye_color",
      "birth_year",
      "gender",
    ];
    for (const field of requiredFields) {
      if (!this[field] || typeof this[field] !== "string") {
        return {
          error: `El campo '${field}' es obligatorio y debe ser una cadena de texto.`,
        };
      }
    }
    return null;
  }
}

module.exports = Character;