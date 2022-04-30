/**
 * @swagger
 * components:
 *   schemas:
 *     Meteorology:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 */
const locations = require("./locations");
const hives = require("./hives");
const queens = require("./queens");
const hiveLogs = require("./hiveLogs");

module.exports = {
  locations,
  hives,
  queens,
  hiveLogs,
};
