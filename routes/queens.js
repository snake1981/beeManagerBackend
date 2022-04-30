const express = require("express");
const router = express.Router();
require("dotenv").config();

let {
  getAllQueens,
  getQueenById,
  addQueen,
  updateQueen,
  removeQueen,
} = require("../controllers/queenController");

/**
 * @swagger
 * /api/v1/queens:
 *   get:
 *     description: All Queens
 *     tags: [Queens]
 *     responses:
 *       200:
 *         description: Returns all the Queens
 */
router.get("/", async (req, res) => {
  let response = await getAllQueens(
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
 * /api/v1/queens/{id}:
 *   get:
 *     tags: [Queens]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Queen ID.
 *     description: Get a Queen by id
 *     responses:
 *       200:
 *         description: Returns the requested Queen
 */
router.get("/:id", async (req, res) => {
  let response = await getQueenById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /api/v1/queens:
 *   post:
 *     tags: [Queens]
 *     parameters:
 *      - in: body
 *        name: queen
 *        description: New Queen
 *        schema:
 *          type: object
 *          properties:
 *            hiveId:
 *              type: string
 *            number:
 *              type: number
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *            status:
 *              type: string
 *            hatchYear:
 *              type: string
 *            pedigree:
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
    tags: req.body.tags,
    locationId: req.body.locationId,
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
 * /api/v1/queens/{id}:
 *   patch:
 *     tags: [Queens]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Queen ID.
 *      - in: body
 *        name: hive
 *        description: Update Hive
 *        schema:
 *          type: object
 *          properties:
 *            hiveId:
 *              type: string
 *            number:
 *              type: number
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *            status:
 *              type: string
 *            hatchYear:
 *              type: string
 *            pedigree:
 *              type: string
 *            comment:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.patch("/:id", async (req, res) => {
  let hiveId = null,
    number = null,
    tags = null,
    status = null,
    hatchYear = null,
    pedigree = null,
    comment = null;
  if (req.body.hiveId) {
    hiveId = req.body.hiveId;
  }
  if (req.body.tags) {
    tags = req.body.tags;
  }
  if (req.body.number) {
    number = req.body.number;
  }
  if (req.body.status) {
    status = req.body.status;
  }
  if (req.body.hatchYear) {
    hatchYear = req.body.hatchYear;
  }
  if (req.body.pedigree) {
    pedigree = req.body.pedigree;
  }
  if (req.body.comment) {
    comment = req.body.comment;
  }
  let response = await updateHive(
    req.params.id,
    hiveId,
    tags,
    number,
    status,
    hatchYear,
    pedigree,
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
 * /api/v1/queens/{id}:
 *   delete:
 *     tags: [Queens]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Queen ID.
 *     description: Delete a Queen by id
 *     responses:
 *       204:
 *         description: Returns the deleted Queen
 */
router.delete("/:id", async (req, res) => {
  let response = await removeQueen(req.params.id);
  try {
    res.status(204).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;
