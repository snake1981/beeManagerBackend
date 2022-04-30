const express = require("express");
const router = express.Router();
require("dotenv").config();

let {
  getAllHiveLogs,
  getHiveLogById,
  addHiveLog,
  updateHiveLog,
  removeHiveLog,
} = require("../controllers/hiveLogController");

/**
 * @swagger
 * /api/v1/hiveLogs:
 *   get:
 *     description: All HiveLogs
 *     tags: [HiveLogs]
 *     responses:
 *       200:
 *         description: Returns all the HiveLogs
 */
router.get("/", async (req, res) => {
  let response = await getAllHiveLogs(
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
 * /api/v1/hiveLogs/{id}:
 *   get:
 *     tags: [HiveLogs]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The HiveLog ID.
 *     description: Get a HiveLog by id
 *     responses:
 *       200:
 *         description: Returns the requested HiveLog
 */
router.get("/:id", async (req, res) => {
  let response = await getHiveLogById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /api/v1/hiveLogs:
 *   post:
 *     tags: [HiveLogs]
 *     parameters:
 *      - in: body
 *        name: hiveLog
 *        description: New HiveLog
 *        schema:
 *          type: object
 *          properties:
 *            beeHiveId:
 *              type: string
 *            annotation:
 *              type: string
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *            date:
 *              type: string
 *            queenSpoted:
 *              type: boolean
 *            steadily:
 *              type: number
 *            frames:
 *              type: object
 *            food:
 *              type: array
 *              items:
 *                type: object
 *            meteorology:
 *              type: array
 *              items:
 *                type: object
 *            varroa:
 *              type: object
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  let body = {
    beeHiveId: req.body.beeHiveId,
    tags: req.body.tags,
    annotation: req.body.annotation,
    date: req.body.date,
    queenSpoted: req.body.queenSpoted,
    steadily: req.body.steadily,
    frames: req.body.frames,
    food: req.body.food,
    meteorology: req.body.meteorology,
    varroa: req.body.varroa,
  };
  let response = await addHiveLog(body);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/v1/hiveLogs/{id}:
 *   patch:
 *     tags: [HiveLogs]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The HiveLog ID.
 *      - in: body
 *        name: hiveLog
 *        description: Update HiveLog
 *        schema:
 *          type: object
 *          properties:
 *            beeHiveId:
 *              type: string
 *            annotation:
 *              type: string
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *            date:
 *              type: string
 *            queenSpoted:
 *              type: boolean
 *            steadily:
 *              type: number
 *            frames:
 *              type: object
 *            food:
 *              type: array
 *              items:
 *                type: object
 *            meteorology:
 *              type: object
 *
 *            varroa:
 *              type: object
 *     responses:
 *       201:
 *         description: Created
 */
router.patch("/:id", async (req, res) => {
  let beeHiveId = null,
    tags = null,
    annotation = null,
    date = null,
    queenSpoted = null,
    steadily = null,
    frames = null,
    food = null,
    meteorology = null,
    varroa = null;
  if (req.body.beeHiveId) {
    beeHiveId = req.body.beeHiveId;
  }
  if (req.body.tags) {
    tags = req.body.tags;
  }
  if (req.body.annotation) {
    annotation = req.body.annotation;
  }
  if (req.body.date) {
    date = req.body.date;
  }
  if (req.body.steadily) {
    steadily = req.body.steadily;
  }
  if (req.body.frames) {
    frames = req.body.frames;
  }
  if (req.body.queenSpoted) {
    queenSpoted = req.body.queenSpoted;
  }
  if (req.body.food) {
    food = req.body.food;
  }
  if (req.body.meteorology) {
    meteorology = req.body.meteorology;
  }
  if (req.body.varroa) {
    varroa = req.body.varroa;
  }
  let response = await updateHiveLog(
    req.params.id,
    beeHiveId,
    tags,
    annotation,
    steadily,
    frames,
    queenSpoted,
    food,
    meteorology,
    varroa
  );

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /api/v1/hiveLogs/{id}:
 *   delete:
 *     tags: [HiveLogs]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The hiveLog ID.
 *     description: Delete a hiveLog by id
 *     responses:
 *       200:
 *         description: Returns the requested HiveLog
 */
router.delete("/:id", async (req, res) => {
  let response = await removeHiveLog(req.params.id);
  try {
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;
