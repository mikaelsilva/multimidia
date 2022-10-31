const express = require("express");
const router = express.Router();
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
    console.log('APENAS UM TESTE')
    res.render('index.ejs');
    
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = app;