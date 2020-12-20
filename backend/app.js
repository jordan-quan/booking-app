
import express from 'express';
import { getAvailableDates, stringifyDates } from './utils.js';
const app = express();

let booked = [
  {
    type: 'blocked',
    date: new Date(2020, 11, 20, 10, 30, 0),
    duration: 2
  },
  {
    type: 'blocked',
    date: new Date(2020, 11, 21, 13, 30, 0),
    duration: 3
  }
]

let businessHours = [10, 11, 13, 14, 15, 16, 17];
let today = new Date();
let cap = new Date(new Date().setDate(new Date().getDate() + 30));


app.get("/getDates", (req, res, next) => {
  res.json(stringifyDates(getAvailableDates(booked, businessHours, today, cap)));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});