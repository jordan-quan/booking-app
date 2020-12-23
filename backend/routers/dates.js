const { getAvailableDates, stringifyDates } = require('../utils.js');
const { booked, businessHours } = require('../data.js');
const express = require("express");
const router = express.Router();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

router.get("/getDates", (req, res, next) => {
  let today = new Date();
  let cap = new Date(new Date().setDate(new Date().getDate() + 30));
  let dates = getAvailableDates(booked, businessHours, today, cap);

  let matrix = buildMatrix(today, cap);

  for (let date of dates) {
    let month = monthNames[date.getMonth()];
    let day = weekdays[date.getDay()];
    let num = date.getDate();

    matrix[month][day][num].push(date);
  }
  res.json(matrix);
});



var days = (month, year) => {
  return new Date(year, (month + 1) % 12, 0).getDate();
};

const buildMatrix = (startDate, endDate) => {

  let months = startDate.getMonth() == endDate.getMonth()
    ? [startDate.getMonth()]
    : [{ month: startDate.getMonth(), year: startDate.getFullYear() }, { month: endDate.getMonth(), year: endDate.getFullYear() }]

  let matrix = {};

  for (let { month, year } of months) {
    let numOfDays = days(month, year);
    matrix[monthNames[month]] = { Sunday: {}, Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {} };

    let firstWeekday = new Date(year, month, 1).getDay();


    for (let j = (firstWeekday - 1) % 7; j >= 0; j--) {
      matrix[monthNames[month]][weekdays[j]][0] = [];
    }

    for (let i = 1; i <= numOfDays; i++) {
      matrix[monthNames[month]][weekdays[firstWeekday]][i] = [];
      firstWeekday = (firstWeekday + 1) % 7;
    }
  }

  return matrix;

}

module.exports = router;