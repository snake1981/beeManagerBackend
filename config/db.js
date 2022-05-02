const mongoose = require("mongoose");
const logger = require("../modules/logger");
require("dotenv").config();

const connectDB = async () => {
  try {
    logger.stdout.debug("URI", process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.stdout.trace(conn);
    logger.stdout.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.stdout.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
