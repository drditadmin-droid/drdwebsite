const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const {
      full_name,
      phone,
      email,
      service_id,
      appointment_date,
      appointment_time,
      notes
    } = req.body;

    if (!full_name || !phone)
      return res.status(400).json({
        success: false,
        error: "name and phone required"
      });

    let patientResult = await db.query(
      "select id from patients where phone = $1",
      [phone]
    );

    let patientId;

    if (patientResult.rows.length === 0) {
      const newPatient = await db.query(
        "insert into patients (full_name, phone, email) values ($1,$2,$3) returning id",
        [full_name, phone, email]
      );

      patientId = newPatient.rows[0].id;
    } else {
      patientId = patientResult.rows[0].id;
    }

    const result = await db.query(
      `insert into appointments (
        patient_id,
        service_id,
        appointment_date,
        appointment_time,
        notes
      ) values ($1,$2,$3,$4,$5)
      returning id`,
      [
        patientId,
        service_id,
        appointment_date,
        appointment_time,
        notes
      ]
    );

    res.status(201).json({
      success: true,
      appointment_id: result.rows[0].id
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        error: "time slot already booked"
      });
    }

    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { date } = req.query;

    const result = await db.query(
      `select
        a.id,
        p.full_name,
        p.phone,
        s.name as service,
        a.appointment_time,
        a.status
      from appointments a
      join patients p on p.id = a.patient_id
      join services s on s.id = a.service_id
      where a.appointment_date = $1
      order by a.appointment_time`,
      [date]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
