console.log('adf')
console.log('reportID', reportID)

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Management', 'Vacancy', 'Cap Ex', 'HOA', 'Property Tax', 'Repairs', 'PMI', 'Insurance', 'P & I'],
    datasets: [{
      label: 'Expenses',
      backgroundColor: ['#0696b0', '#31bbca', '#f4f136', '#a283b8', '#fd7f7b', '#65b541', '#e137ae', '#c60c4f', '#6daf2c'],
      borderColor: '#f5f5f5',
      data: [managementExpense(reportID), vacancyExpense(reportID), capExpense(reportID), reportID.HOA, reportID.propertyTax, maintenanceExpense(reportID), reportID.PMI, reportID.propertyInsurance, monthlyPayment(reportID)]
    }]
  },
  options: {
    scales: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { animateScale: true },
    },
    legend: {
      position: "right"
    },
    animation: {
      duration: 3000
    },
    title: {
      display: true,
      text: "Monthly Expenses",
      fontSize: 20
    }
  }
})






// ===================== Functions =======================

function managementExpense(reportID) { return reportID.grossMonthlyRent * reportID.managementFees };

function vacancyExpense(reportID) { return reportID.grossMonthlyRent * reportID.vacancy }

function maintenanceExpense(reportID) { return reportID.grossMonthlyRent * reportID.repairsAndMaintenance };

function capExpense(reportID) { return reportID.grossMonthlyRent * reportID.capEx };

//Principal
function principal(reportID) {
  return reportID.purchasePrice - reportID.downPayment;
}

// Total Monthly Income
function totalMonthlyIncome(reportID) {
  return reportID.grossMonthlyRent + reportID.otherIncome;
}

// Fixed Monthly Expenses
function fixedExpenses(reportID) {
  return (
    reportID.electricity +
    reportID.waterAndSewer +
    reportID.PMI +
    reportID.garbage +
    reportID.HOA +
    reportID.propertyInsurance +
    reportID.propertyTax
  );
}

// Variable Monthly Expenses
function variableExpenses(reportID) {
  let vacancyExpense = reportID.grossMonthlyRent * reportID.vacancy;
  let repairExpense = reportID.grossMonthlyRent * reportID.repairsAndMaintenance;
  let capExpenditure = reportID.grossMonthlyRent * reportID.capEx;
  let managementExpense = reportID.grossMonthlyRent * reportID.managementFees;

  return vacancyExpense + repairExpense + capExpenditure + managementExpense;
}

//Total Monthly Expenses
function totalMonthlyExpenses(reportID) {
  return variableExpenses(reportID) + fixedExpenses(reportID);
}

// Monthly Cashflow
function cashFlow(reportID) {
  return totalMonthlyIncome(reportID) - totalMonthlyExpenses(reportID)
}

//Operating Income Monthly
function operatingIncome(reportID) {
  let vacancyExpense = reportID.grossMonthlyRent * reportID.vacancy;
  return reportID.grossMonthlyRent + reportID.otherIncome - vacancyExpense
};

//OpEx Monthly
function operatingExpenses(reportID) {
  return (
    (reportID.grossMonthlyRent * reportID.managementFees +
      reportID.grossMonthlyRent * reportID.repairsAndMaintenance +
      reportID.propertyTax +
      reportID.propertyInsurance)
  );
}

//NOI, needs to be yearly
function netOperatingIncome(reportID) {
  return (operatingIncome(reportID) - operatingExpenses(reportID)) * 12;
}

//Cap Rate
function capRate(reportID) {
  return ((netOperatingIncome(reportID) / reportID.purchasePrice) * 100).toFixed(2);
}

//Cash On Cash Return
function cashOnCash(reportID) {
  return ((annualPretaxCashflow(reportID) / totalCashNeeded(reportID)) * 100).toFixed(2);
}

//Total Cash Needed
function totalCashNeeded(reportID) {
  return reportID.downPayment + reportID.repairCosts + reportID.closingCosts;
}

//Annual Pretax Cashflow
function annualPretaxCashflow(reportID) {
  let vacancyExpense = reportID.grossMonthlyRent * reportID.vacancy;

  return ((reportID.grossMonthlyRent + reportID.otherIncome) - (vacancyExpense + operatingExpenses(reportID) + monthlyPayment(reportID))) * 12;
}

//Monthly Debt Service Payment
function monthlyPayment(reportID) {
  var term = reportID.loanLength * 12;
  var amt = reportID.purchasePrice - reportID.downPayment;
  var intr = reportID.interestRate / 1200;

  return parseInt((amt * (intr * Math.pow((1 + intr), term)) / (Math.pow((1 + intr), term) - 1)).toFixed(2), 10);

};

//Yearly Payment
function yearlyPayment(reportID) {
  return monthlyPayment(reportID) * 12
}