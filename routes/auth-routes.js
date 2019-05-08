const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();

// User and rooms model
const User = require("../models/user");
const Report = require("../models/report");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });

      newUser.save(err => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

//Login
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/my-reports/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

//Logout
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

//Will show report creation page
authRoutes.get("/report", ensureAuthenticated, (req, res, next) => {
  Report.find({ owner: req.user._id }, (err, myReport) => {
    if (err) {
      return next(err);
    }
    res.render(
      "auth/report"
    );
  });
});

//Posts a new report
//Has all fields within.
authRoutes.post("/report", ensureAuthenticated, (req, res, next) => {
  const newReport = new Report(
    req.body
  );

  //Saves a new report
  newReport.save(err => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/my-reports");
    }
  });
});

//Go to user reports
authRoutes.get("/my-reports", ensureAuthenticated, (req, res, next) => {
  Report.find({ owner: req.user._id }, (err, myReport) => {
    if (err) {
      return next(err);
    }
    console.log("myReport");
    res.render("auth/my-reports", { myReport: myReport });
  });
});

//Report View by ID Page
authRoutes.get("/my-reports/reportid", (req, res, next) => {
  console.log(`Went to report id page`, req.query);
  Report.findOne({ _id: req.query.id }).then(reportID => {
    console.log(3456543245678, reportID);

    let principalRun = principal(reportID)
    reportID.principalRun = principalRun

    let totalMonthlyIncomeRun = totalMonthlyIncome(reportID)
    reportID.totalMonthlyIncomeRun = totalMonthlyIncomeRun

    let fixedExpenseRun = fixedExpenses(reportID);
    reportID.fixedExpenseRun = fixedExpenseRun

    let variableExpensesRun = variableExpenses(reportID)
    reportID.variableExpensesRun = variableExpensesRun

    let totalMonthlyExpensesRun = totalMonthlyExpenses(reportID)
    reportID.totalMonthlyExpensesRun = totalMonthlyExpensesRun

    let cashFlowRun = cashFlow(reportID)
    reportID.cashFlowRun = cashFlowRun

    let operatingIncomeRun = operatingIncome(reportID);
    reportID.operatingIncomeRun = operatingIncomeRun

    let operatingExpensesRun = operatingExpenses(reportID);
    reportID.operatingExpensesRun = operatingExpensesRun

    let netOperatingIncomeRun = netOperatingIncome(reportID);
    reportID.netOperatingIncomeRun = netOperatingIncomeRun

    let capRateRun = capRate(reportID);
    reportID.capRateRun = capRateRun

    let cashOnCashRun = cashOnCash(reportID);
    reportID.cashOnCashRun = cashOnCashRun

    let totalCashNeededRun = totalCashNeeded(reportID);
    reportID.totalCashNeededRun = totalCashNeededRun

    let annualPretaxCashflowRun = annualPretaxCashflow(reportID);
    reportID.annualPretaxCashflowRun = annualPretaxCashflowRun

    let monthlyPaymentRun = monthlyPayment(reportID);
    reportID.monthlyPaymentRun = monthlyPaymentRun

    let yearlyPaymentRun = yearlyPayment(reportID);
    reportID.yearlyPaymentRun = yearlyPaymentRun

    res.render("auth/reportid", reportID);
  });
});

//Keep as Last Route
authRoutes.get("/private", ensureAuthenticated, (req, res) => {
  res.render("private", { user: req.user });
});

//Authentication Function
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = authRoutes;



// ===================== Functions =======================
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

//Operating Income
function operatingIncome(reportID) {
  let vacancyExpense = reportID.grossMonthlyRent * reportID.vacancy;
  return reportID.grossMonthlyRent + reportID.otherIncome - vacancyExpense * 12
};

//OpEx
function operatingExpenses(reportID) {
  return (
    (reportID.grossMonthlyRent * reportID.managementFees +
      reportID.grossMonthlyRent * reportID.repairsAndMaintenance +
      reportID.propertyTax +
      reportID.propertyInsurance +
      reportID.misc) *
    12
  );
}

//NOI
function netOperatingIncome(reportID) {
  return operatingIncome(reportID) - operatingExpenses(reportID);
}

//Cap Rate
function capRate(reportID) {
  return netOperatingIncome(reportID) / reportID.purchasePrice;
}

//Cash On Cash Return
function cashOnCash(reportID) {
  return (annualPretaxCashflow(reportID) / totalCashNeeded(reportID)) * 100
}

//Total Cash Needed
function totalCashNeeded(reportID) {
  return reportID.downPayment + reportID.repairCosts + reportID.closingCosts;
}

//Annual Pretax Cashflow
function annualPretaxCashflow(reportID) {
  return operatingIncome(reportID) - operatingExpenses(reportID) - yearlyPayment(reportID)
}

//Monthly Debt Service Payment
function monthlyPayment(reportID) {
  var term = reportID.loanLength * 12;
  var intr = reportID.interestRate / 1200;
  return principal(reportID) * intr / (1 - (Math.pow(1 / (1 + intr), term)))
};

//Yearly Payment
function yearlyPayment(reportID) {
  return monthlyPayment(reportID) * 12
}
