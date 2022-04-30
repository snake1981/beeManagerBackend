const HiveLog = require("../models/hiveLog.js");

async function getAllHiveLogs(search, reqPage, reqLimit) {
  let options = {};

  if (search) {
    options = {
      ...options,
      $or: [{ name: new RegExp(search.toString(), "i") }],
    };
  }

  let total = HiveLog.countDocuments(options);
  let page = parseInt(reqPage) || 1;
  let limit = parseInt(reqLimit) || parseInt(await total);
  let last_page = Math.ceil(parseInt(await total) / limit);
  if (last_page < 1 && total > 0) {
    last_page = 1;
  }

  try {
    const hiveLogs = await HiveLog.find(options).limit(limit);
    return {
      success: true,
      data: hiveLogs,
      total: (await total).toString(),
      page: (await page).toString(),
      last_page: (await last_page).toString(),
    };
  } catch (err) {
    return { success: false, message: "HiveLogs not found" };
  }
}

async function getHiveLogById(id) {
  let hiveLog;
  try {
    hiveLog = await HiveLog.findById(id);
    if (hiveLog == null) {
      return { success: false, message: "Cannot find HiveLog" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }

  return {
    success: true,
    data: hiveLog,
  };
}

async function addHiveLog(body) {
  const hiveLog = new HiveLog(body);

  try {
    const newHiveLog = await hiveLog.save();
    return {
      success: true,
      data: newHiveLog,
    };
  } catch (err) {
    return { success: false, message: "Failed to add HiveLog", error: err };
  }
}

async function updateHiveLog(
  id,
  beeHiveId = null,
  tags = null,
  annotation = null,
  date = null,
  queenSpoted = null,
  steadily = null,
  frames = null,
  food = null,
  meteorology = null,
  varroa = null
) {
  let hiveLog;
  try {
    hiveLog = await HiveLog.findById(id);
    if (hiveLog == null) {
      return { success: false, message: "Cannot find HiveLog" };
    }
    if (beeHiveId != null) {
      hiveLog.beeHiveId = beeHiveId;
    }
    if (tags != null) {
      hiveLog.tags = tags;
    }
    if (annotation != null) {
      hiveLog.annotation = annotation;
    }
    if (date != null) {
      hiveLog.date = date;
    }
    if (queenSpoted != null) {
      hiveLog.queenSpoted = queenSpoted;
    }
    if (steadily != null) {
      hiveLog.steadily = steadily;
    }
    if (frames != null) {
      hiveLog.frames = frames;
    }
    if (food != null) {
      hiveLog.food = food;
    }
    if (meteorology != null) {
      hiveLog.meteorology = meteorology;
    }
    if (varroa != null) {
      hiveLog.varroa = varroa;
    }

    try {
      const updatedHiveLog = await hiveLog.save();
      return {
        success: true,
        data: updatedHiveLog,
        message: "HiveLog updated successfully",
      };
    } catch (err) {
      return { sucess: false, message: "Failed to update HiveLog" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function removeHiveLog(id) {
  let hiveLog;
  try {
    hiveLog = await HiveLog.findById(id);
    if (hiveLog == null) {
      return { success: false, message: "Cannot find HiveLog" };
    }

    try {
      await hiveLog.remove();
      return {
        success: true,
        message: "Deleted HiveLog",
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  getAllHiveLogs,
  getHiveLogById,
  addHiveLog,
  updateHiveLog,
  removeHiveLog,
};
