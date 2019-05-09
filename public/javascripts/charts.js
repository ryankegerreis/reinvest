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
      borderColor: 'rgb(0, 0, 0)',
      data: [reportID.managementExpenseRun, reportID.vacancyExpenseRun, reportID.capExRun, reportID.HOA, reportID.propertyTax, reportID.maintenanceExpenseRun, reportID.PMI, reportID.propertyInsurance, reportID.monthlyPaymentRun]
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
      text: "Expenses",
      fontSize: 20
    }
  }
})