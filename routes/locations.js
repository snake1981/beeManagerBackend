const express = require("express");
const router = express.Router();
require("dotenv").config();

let {
  getAllLocations,
  getLocationById,
  addLocation,
  updateLocation,
  removeLocation,
} = require("../controllers/locationController");

/**
 * @swagger
 * /api/v1/locations:
 *   get:
 *     description: All Locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: Returns all the Locations
 */
router.get("/", async (req, res) => {
  let response = await getAllLocations(
    req.query.s,
    req.query.page,
    req.query.limit
  );
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   get:
 *     tags: [Locations]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Location ID.
 *     description: Get a Location by id
 *     responses:
 *       200:
 *         description: Returns the requested Location
 */
router.get("/:id", async (req, res) => {
  let response = await getLocationById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /api/v1/locations:
 *   post:
 *     tags: [Locations]
 *     parameters:
 *      - in: body
 *        name: location
 *        description: New Location
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            latitute:
 *              type: string
 *            longitute:
 *              type: string
 *            comment:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  let body = {
    name: req.body.name,
    longitute: req.body.longitute,
    latitute: req.body.latitute,
    comment: req.body.comment,
  };
  let response = await addLocation(body);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   patch:
 *     tags: [Locations]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Location ID.
 *      - in: body
 *        name: location
 *        description: Update Location
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            latitute:
 *              type: string
 *            longitute:
 *              type: string
 *            comment:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.patch("/:id", async (req, res) => {
  let name = null,
    latitute = null,
    longitute = null,
    comment = null;
  if (req.body.name) {
    name = req.body.name;
  }
  if (req.body.longitute) {
    longitute = req.body.longitute;
  }
  if (req.body.latitute) {
    latitute = req.body.latitute;
  }
  if (req.body.comment) {
    comment = req.body.comment;
  }

  let response = await updateLocation(
    req.params.id,
    name,
    longitute,
    latitute,
    comment
  );

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   delete:
 *     tags: [Locations]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The location ID.
 *     description: Delete a Location by id
 *     responses:
 *       204:
 *         description: no response
 */
router.delete("/:id", async (req, res) => {
  let response = await removeLocation(req.params.id);
  try {
    res.status(204).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;
