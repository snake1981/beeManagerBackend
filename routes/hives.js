const express = require("express");
const router = express.Router();
require("dotenv").config();

let {
  getAllHives,
  getHiveById,
  addHive,
  updateHive,
  removeHive,
} = require("../controllers/hiveController");

/**
 * @swagger
 * /api/v1/hives:
 *   get:
 *     description: All Hives
 *     tags: [Hives]
 *     responses:
 *       200:
 *         description: Returns all the Hives
 */
router.get("/", async (req, res) => {
  let response = await getAllHives(
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
 * /api/v1/hives/{id}:
 *   get:
 *     tags: [Hives]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Hive ID.
 *     description: Get a Hive by id
 *     responses:
 *       200:
 *         description: Returns the requested Hive
 */
router.get("/:id", async (req, res) => {
  let response = await getHiveById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /api/v1/hives:
 *   post:
 *     tags: [Hives]
 *     parameters:
 *      - in: body
 *        name: hive
 *        description: New Location
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            locationId:
 *              type: string
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *            status:
 *              type: string
 *            queens:
 *              type: array
 *              items:
 *                type: string
 *            comment:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  let body = {
    name: req.body.name,
    tags: req.body.tags,
    locationId: req.body.locationId,
    status: req.body.status,
    queens: req.body.queens,
    comment: req.body.comment,
  };
  let response = await addHive(body);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/v1/hives/{id}:
 *   patch:
 *     tags: [Hives]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Hive ID.
 *      - in: body
 *        name: hive
 *        description: Update Hive
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *            locationId:
 *              type: string
 *            queens:
 *              type: array
 *              items:
 *                type: string
 *            comment:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.patch("/:id", async (req, res) => {
  let name = null;
  let status = null;
  let tags = null;
  let locationId = null;
  let queens = null;
  let comment = null;
  if (req.body.name) {
    name = req.body.name;
  }
  if (req.body.status) {
    status = req.body.status;
  }
  if (req.body.tags) {
    tags = req.body.tags;
  }
  if (req.body.locationId) {
    locationId = req.body.locationId;
  }
  if (req.body.queens) {
    queens = req.body.queens;
  }
  if (req.body.comment) {
    comment = req.body.comment;
  }
  let response = await updateHive(
    req.params.id,
    name,
    status,
    locationId,
    tags,
    comment,
    queens
  );

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/v1/hives/{id}:
 *   delete:
 *     tags: [Hives]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The hive ID.
 *     description: Delete a hive by id
 *     responses:
 *       204:
 *         description: empty response
 */
router.delete("/:id", async (req, res) => {
  let response = await removeHive(req.params.id);
  try {
    res.status(204).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;
