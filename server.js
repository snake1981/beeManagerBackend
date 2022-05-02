const express = require("express");
const cors = require('cors')
const connectDb = require("./config/db");
const { locations, hives, queens, hiveLogs } = require("./routes/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const logger = require("./modules/logger");
const expressListRoutes = require("express-list-routes");

const app = express();
app.use(logger.express);
logger.stdout.info("Connecting to Database");
connectDb();

app.use(express.json());
app.use(cors())

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "BeeManager REST API",
      description:
        "A REST API built with Express and MongoDB to manage BeeHives.",
    },
  },
  apis: [
    "./routes/locations.js",
    "./routes/hives.js",
    "./routes/queens.js",
    "./routes/hiveLogs.js",
  ],
};

app.use("/api/v1/hives", hives);
app.use("/api/v1/queens", queens);
app.use("/api/v1/locations", locations);
app.use("/api/v1/hiveLogs", hiveLogs);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 5000, () =>
  logger.stdout.info("Up and running 🚀")
);
expressListRoutes(app, { prefix: "/api/v1" });
