const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  calendars: Array,
  created: {type: Date, default: Date.now}
});

const User = mongoose.model("User", CalendarSchema);

module.exports = User;