const log4js = require("log4js");

const LOG_PATH = "./relative/path/to/your/log/folder";

log4js.configure({
  appenders: {
    access: {
      type: "dateFile",
      filename: `${LOG_PATH}/access.log`,
      pattern: "-yyyy-MM-dd",
      backups: 3,
    },
    debug: {
      type: "dateFile",
      filename: `${LOG_PATH}/debug.log`,
      pattern: "-yyyy-MM-dd",
      backups: 3,
    },
    beeManager: {
      type: "stdout",
    },
  },
  categories: {
    default: { appenders: ["beeManager"], level: "DEBUG" },
    access: { appenders: ["access"], level: "DEBUG" },
    debug: { appenders: ["debug"], level: "DEBUG" },
  },
});

module.exports = {
  access: log4js.getLogger("access"),
  slack: log4js.getLogger("slack"),
  debug: log4js.getLogger("debug"),
  stdout: log4js.getLogger("beeManager"),
  express: log4js.connectLogger(log4js.getLogger("beeManager"), {
    level: log4js.levels.INFO,
  }),
};
