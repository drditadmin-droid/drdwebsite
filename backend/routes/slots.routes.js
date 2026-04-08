const express = require("express");
const router = express.Router();
const db = require("../db");

const SLOT_START_HOUR = 9;
const SLOT_END_HOUR = 17;
const SLOT_INTERVAL_MINUTES = 30;

function generateAllSlots() {
  const slots = [];
  for (let hour = SLOT_START_HOUR; hour < SLOT_END_HOUR; hour++) {
    for (let min = 0; min < 60; min += SLOT_INTERVAL_MINUTES) {
      const hh = String(hour).padStart(2, "0");
      const mm = String(min).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

router.get("/", async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        error: "date query param required (YYYY-MM-DD)"
      });
    }

    const result = await db.query(
      "select to_char(appointment_time, 'HH24:MI') as time from appointments where appointment_date = $1 and status != 'cancelled'",
      [date]
    );

    const booked = new Set(result.rows.map((r) => r.time));
    const allSlots = generateAllSlots();
    const available = allSlots.filter((slot) => !booked.has(slot));

    res.json({
      success: true,
      date,
      slots: available
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
