let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    // console.log("IronGenerator JS imported successfully!");
  },
  false
);

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});

//=============== Math Equations =================

// let vacancy = 0.05;
// let managementFees = 0.1;
// capEx = 0.05;
// let repairsAndMaintenance = 0.05;
// let principal = 160000; //Figure out
// let interestRate = 5;
// let loanLength = 30

// let grossMonthlyRent = 2200;
// let otherIncome = 100;
// let propertyTax = 100;
// let propertyInsurance = 50;
// let purchasePrice = 200000;

// let downPayment = 40000;
// let repairCosts = 10000;
// let closingCosts = 1500;

//Principal
// function principal() {
//   return purchasePrice - downPayment
// }

// // Total Monthly Income
// function totalMonthlyIncome(grossMonthlyRent, otherIncome) {
//   return grossMonthlyRent + otherIncome;
// }

// // Fixed Monthly Expenses
// function fixedExpenses(
//   electricity,
//   waterAndSewer,
//   PMI,
//   garbage,
//   HOA,
//   propertyInsurance,
//   propertyTax
// ) {
//   return (
//     electricity +
//     waterAndSewer +
//     PMI +
//     garbage +
//     HOA +
//     propertyInsurance +
//     propertyTax
//   );
// }

// // Variable Monthly Expenses
// function variableExpenses(
//   grossMonthlyRent,
//   vacancy,
//   repairsAndMaintenance,
//   capEx,
//   managementFees
// ) {
//   let vacancyExpense = grossMonthlyRent * vacancy;
//   let repairExpense = grossMonthlyRent * repairsAndMaintenance;
//   let capExpenditure = grossMonthlyRent * capEx;
//   let managementExpense = grossMonthlyRent * managementFees;

//   return vacancyExpense + repairExpense + capExpenditure + managementExpense;
// }

// //Total Monthly Expenses
// function totalMonthlyExpenses(variableExpenses, fixedExpenses) {
//   return variableExpenses + fixedExpenses;
// }

// // Monthly Cashflow
// function cashFlow(totalMonthlyIncome, totalMonthlyExpenses) {
//   return totalMonthlyIncome - totalMonthlyExpenses;
// }

// //Operating Income
// function operatingIncome() {
//   let vacancyExpense = grossMonthlyRent * vacancy;
//   return (grossMonthlyRent + otherIncome - vacancyExpense) * 12;
// }

// //OpEx
// function operatingExpenses() {
//   return (
//     (grossMonthlyRent * managementFees +
//       grossMonthlyRent * repairsAndMaintenance +
//       propertyTax +
//       propertyInsurance +
//       misc) *
//     12
//   );
// }

// //NOI
// function netOperatingIncome() {
//   return operatingIncome() - operatingExpenses();
// }

// //Cap Rate
// function capRate() {
//   return netOperatingIncome() / purchasePrice;
// }

// //Cash On Cash Return
// function cashOnCash() {
//   console.log(annualPretaxCashflow());
//   console.log(totalCashNeeded());
//   return (annualPretaxCashflow() / totalCashNeeded()) * 100
// }

// //Total Cash Needed
// function totalCashNeeded() {
//   return downPayment + repairCosts + closingCosts;
// }

// //Annual Pretax Cashflow
// function annualPretaxCashflow() {
//   return operatingIncome() - operatingExpenses() - yearlyPayment()
// }

// //Monthly Debt Service Payment
// function monthlyPayment() {
//   var term = loanLength * 12;
//   var intr = interestRate / 1200;
//   return principal() * intr / (1 - (Math.pow(1 / (1 + intr), term)))
// };

// //Yearly Payment
// function yearlyPayment() {
//   return monthlyPayment() * 12
// }