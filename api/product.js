const express = require("express");
const router = express.Router();

const path = require('path');
const app = express();

/**
 * GET product list.
 *
 * @return product list | empty.
 */
app.get("/", async (req, res) => {
    try {
      //res.json({
      //  status: 200,
      //  message: "Get data has successfully",
      //});
      console.log(__dirname);
      console.log(path.dirname(__filename));
      
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  });

module.exports = app;