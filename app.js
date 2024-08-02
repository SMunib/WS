const express = require("express");
const { initializeDB } = require("./startup/start");
const http = require("http");
const multer = require("multer");
const upload = multer();
const dotenv = require("dotenv");
dotenv.config();

const app = express();

async function initialize() {
  try {
    await initializeDB(app);

    const server = http.createServer(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(upload.any());
    app.use("/uploads", express.static("uploads"));

    const port = 3002;
    server.listen(port, () =>
      console.log(`Server is running on port: ${port}`)
    );
  } catch (err) {
    console.log("failed to initialize", err);
    process.exit(1);
  }
}

initialize();
