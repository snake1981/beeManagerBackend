const Location = require("../models/location");
const logger = require("../modules/logger");

async function getAllLocations(search, reqPage, reqLimit) {
  let options = {};

  if (search) {
    options = {
      ...options,
      $or: [{ name: new RegExp(search.toString(), "i") }],
    };
  }

  let total = Location.countDocuments(options);
  let page = parseInt(reqPage) || 1;
  let limit = parseInt(reqLimit) || parseInt(await total);
  let last_page = Math.ceil(parseInt(await total) / limit);
  if (last_page < 1 && total > 0) {
    last_page = 1;
  }

  try {
    const locations = await Location.find(options).limit(limit);
    return {
      success: true,
      data: locations,
      total: (await total).toString(),
      page: (await page).toString(),
      last_page: (await last_page).toString(),
    };
  } catch (err) {
    return { success: false, message: "Locations not found" };
  }
}

async function getLocationById(id) {
  let location;
  try {
    location = await Location.findById(id);
    if (location == null) {
      return { success: false, message: "Cannot find Location" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }

  return {
    success: true,
    data: location,
  };
}

async function addLocation(body) {
  const location = new Location(body);

  try {
    const newLocation = await location.save();
    return {
      success: true,
      data: newLocation,
    };
  } catch (err) {
    return { success: false, message: "Failed to add Location", error: err };
  }
}

async function updateLocation(
  id,
  name = null,
  longitude = null,
  latitude = null,
  comment = null
) {
  let loc;
  try {
    location = await Location.findById(id);
    if (location == null) {
      return { success: false, message: "Cannot find location" };
    }
    if (name != null) {
      location.name = name;
    }
    if (longitude != null) {
      location.longitude = longitude;
    }
    if (latitude != null) {
      location.latitude = latitude;
    }
    if (comment != null) {
      location.comment = comment;
    }
    try {
      const updatedLocation = await location.save();
      return {
        success: true,
        data: updatedLocation,
        message: "Location updated successfully",
      };
    } catch (err) {
      return { sucess: false, message: "Failed to update Location" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function removeLocation(id) {
  let location;
  try {
    location = await Location.findById(id);
    if (location == null) {
      return { success: false, message: "Cannot find location" };
    }

    try {
      await location.remove();
      return {
        success: true,
        message: "Deleted Location",
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  getAllLocations,
  getLocationById,
  addLocation,
  updateLocation,
  removeLocation,
};
