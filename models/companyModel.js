const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  city: String,
  state: String,
  county: String, // Change from "country" to "county"
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
