const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = Schema({
  //Basic Info
  title: String, //Report title
  address: String,
  owner: Schema.Types.ObjectId, //User Owner
  city: String,
  state: String,
  zip: Number,
  // photo: when possible file upload

  //Purchase Info
  purchasePrice: Number,
  ARV: Number,
  closingCosts: Number,
  repairCosts: Number,

  //Loan Details
  downPayment: Number,
  interestRate: Number, //for loan
  lenderFees: Number,
  loanLength: Number,

  //Income
  grossMonthlyRent: Number,
  otherIncome: Number,

  //Fixed Expenses
  electricity: Number,
  waterAndSewer: Number,
  PMI: Number,
  garbage: Number,
  HOA: Number,
  propertyInsurance: Number,
  propertyTax: Number,

  //Variable Expenses
  vacancy: Number,
  repairsAndMaintenance: Number,
  capEx: Number,
  managementFees: Number,

  //Future Assumptions
  incomeGrowth: Number,
  pvGrowth: Number,
  expenseGrowth: Number,
  salesExpenses: Number
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
