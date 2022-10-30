const express = require("express");
const router = express.Router();

/**
 * GET product list.
 *
 * @return product list | empty.
 */

router.get("/", async (req, res) => {
  try {
    res.render('index.ejs')
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;