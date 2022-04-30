const Queen = require("../models/queen.js");

async function getAllQueens(search, reqPage, reqLimit) {
  let options = {};

  if (search) {
    options = {
      ...options,
      $or: [{ name: new RegExp(search.toString(), "i") }],
    };
  }

  let total = Queen.countDocuments(options);
  let page = parseInt(reqPage) || 1;
  let limit = parseInt(reqLimit) || parseInt(await total);
  let last_page = Math.ceil(parseInt(await total) / limit);
  if (last_page < 1 && total > 0) {
    last_page = 1;
  }

  try {
    const queens = await Queen.find(options).limit(limit);
    return {
      success: true,
      data: queens,
      total: (await total).toString(),
      page: (await page).toString(),
      last_page: (await last_page).toString(),
    };
  } catch (err) {
    return { success: false, message: "Queens not found" };
  }
}

async function getQueenById(id) {
  let queen;
  try {
    queen = await Queen.findById(id);
    if (queen == null) {
      return { success: false, message: "Cannot find Queen" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }

  return {
    success: true,
    data: queen,
  };
}

async function addQueen(body) {
  const queen = new Queen(body);

  try {
    const newQueen = await queen.save();
    return {
      success: true,
      data: newQueen,
    };
  } catch (err) {
    return { success: false, message: "Failed to add Queen", error: err };
  }
}

async function updateQueen(
  id,
  hiveId = null,
  tags = null,
  number = null,
  status = null,
  comment = null,
  hatchYear = null,
  pedigree = null
) {
  let hive;
  try {
    queen = await Queen.findById(id);
    if (queen == null) {
      return { success: false, message: "Cannot find Queen" };
    }
    if (hiveId != null) {
      queen.nhiveId = hiveId;
    }
    if (tags != null) {
      queen.tags = tags;
    }
    if (number != null) {
      queen.number = number;
    }
    if (status != null) {
      queen.status = status;
    }
    if (comment != null) {
      queen.comment = comment;
    }
    if (hatchYear != null) {
      queen.hatchYear = hatchYear;
    }
    if (pedigree != null) {
      queen.pedigree = pedigree;
    }

    try {
      const updatedHive = await hive.save();
      return {
        success: true,
        data: updatedHive,
        message: "Hive updated successfully",
      };
    } catch (err) {
      return { sucess: false, message: "Failed to update Location" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function removeQueen(id) {
  let queen;
  try {
    queen = await Queen.findById(id);
    if (queen == null) {
      return { success: false, message: "Cannot find Queen" };
    }

    try {
      await queen.remove();
      return {
        success: true,
        message: "Deleted Queen",
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  getAllQueens,
  getQueenById,
  addQueen,
  updateQueen,
  removeQueen,
};
