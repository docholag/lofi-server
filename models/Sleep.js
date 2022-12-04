const mongoose = require("mongoose");

const SleepSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Sleep", SleepSchema);
