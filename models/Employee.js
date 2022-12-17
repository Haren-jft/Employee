const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
  salary: { type: String, required: true }
});
module.exports = mongoose.model("emps", EmployeeSchema);
