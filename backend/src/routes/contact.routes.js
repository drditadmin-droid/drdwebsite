const express = require("express");
const router = express.Router();
const supabase = require("../config/db");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          message
        }
      ]);

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
