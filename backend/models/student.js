const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    nama: String,
    kelas: String,
    nilai: Number,
    ujian: Boolean,
  },
  {
    collection: "murid",
  }
);

module.exports = mongoose.model("murid", studentSchema);
