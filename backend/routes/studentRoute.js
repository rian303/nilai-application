const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// GET all students
router.get("/", async (req, res) => {
  const { murid, kelas } = req.query;

  try {
    const getMurid = await Student.findOne({
      nama: { $regex: murid, $options: "i" },
      kelas,
    });
    if (!getMurid) {
      return res.status(400).json({
        message: `Nama siswa tidak ditemukan. Mohon periksa kembali nama & kelas.`,
      });
    }

    return res.status(200).json(getMurid);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "[-] Internal Server Error Code: 500" });
  }
});

// POST new student
// router.post("/", async (req, res) => {
//   const newStudent = new Student(req.body);
//   await newStudent.save();
//   res.status(201).json(newStudent);
// });

module.exports = router;
