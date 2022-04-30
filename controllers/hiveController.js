const Hive = require("../models/hive");

async function getAllHives(search, reqPage, reqLimit) {
  let options = {};

  if (search) {
    options = {
      ...options,
      $or: [{ name: new RegExp(search.toString(), "i") }],
    };
  }

  let total = Hive.countDocuments(options);
  let page = parseInt(reqPage) || 1;
  let limit = parseInt(reqLimit) || parseInt(await total);
  let last_page = Math.ceil(parseInt(await total) / limit);
  if (last_page < 1 && total > 0) {
    last_page = 1;
  }

  try {
    const hives = await Hive.find(options).limit(limit);
    return {
      success: true,
      data: hives,
      total: (await total).toString(),
      page: (await page).toString(),
      last_page: (await last_page).toString(),
    };
  } catch (err) {
    return { success: false, message: "Hives not found" };
  }
}

async function getHiveById(id) {
  let hive;
  try {
    hive = await Hive.findById(id);
    if (hive == null) {
      return { success: false, message: "Cannot find Hive" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }

  return {
    success: true,
    data: hive,
  };
}

async function addHive(body) {
  const hive = new Hive(body);

  try {
    const newHive = await hive.save();
    return {
      success: true,
      data: newHive,
    };
  } catch (err) {
    return { success: false, message: "Failed to add Hive", error: err };
  }
}

async function updateHive(
  id,
  name = null,
  status = null,
  locationId = null,
  tags = null,
  comment = null,
  queens = null
) {
  let hive;
  try {
    hive = await Hive.findById(id);
    if (hive == null) {
      return { success: false, message: "Cannot find Hive" };
    }
    if (name != null) {
      hive.name = name;
    }
    if (locationId != null) {
      hive.locationId = locationId;
    }
    if (tags != null) {
      hive.tags = tags;
    }
    if (comment != null) {
      hive.comment = comment;
    }
    if (status != null) {
      hive.status = status;
    }
    if (queens != null) {
      hive.queens = queens;
    }
    try {
      const updatedHive = await hive.save();
      return {
        success: true,
        data: updatedHive,
        message: "Hive updated successfully",
      };
    } catch (err) {
      return { sucess: false, message: "Failed to update Hive", error: err };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function removeHive(id) {
  let hive;
  try {
    hive = await Hive.findById(id);
    if (hive == null) {
      return { success: false, message: "Cannot find hive" };
    }

    try {
      await hive.remove();
      return {
        success: true,
        message: "Deleted Hive",
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  getAllHives,
  getHiveById,
  addHive,
  updateHive,
  removeHive,
};
