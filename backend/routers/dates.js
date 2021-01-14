const { getAvailableDates, buildMatrix, weekdays, monthNames } = require('../utils.js');
const { businessHours } = require('../data.js');
const express = require("express");
const router = express.Router();
let Booking = require('../models/booking.model');
let SessionType = require('../models/sessiontype.model');
let nodemailer = require('nodemailer');

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

let mailOptions = {
  from: 'jordanquan5@gmail.com',
  subject: 'Appointment Booked',
  text: 'Your appointment was booked successfully'
};



router.post("/bookDate", async (req, res, next) => {

  try {
    if (Object.keys(req.body).length === 4) {

      let results = await Booking.find({ email: req.body.email });

      if (results.length > 3) {
        throw new Error('There is a limit of 3 appointments at a time')
      }

      let { value, duration } = await SessionType.findOne({ value: req.body.type });
      let { name, time, email } = req.body;
      let date = new Booking({ email, type: value, date: time, duration });

      await date.save();

      mailOptions.to = email;

      await transporter.sendMail(mailOptions);
      res.status(200).send('OK');

    } else {
      throw new Error("incorrect object")
    }
  } catch (e) {
    next(e);
  }

});

router.get("/getTypes", (req, res, next) => {
  SessionType.find()
    .then(types => {
      res.json(types)
    })
    .catch(err => res.status(400).json(err))
});


router.get("/getDates", (req, res, next) => {
  let today = new Date();
  let cap = new Date(new Date().setDate(new Date().getDate() + 30));

  Booking.find()
    .then(bookings => {
      let dates = getAvailableDates(bookings, businessHours, today, cap);
      let { matrix, years } = buildMatrix(today, cap);
      for (let date of dates) {
        let month = monthNames[date.getMonth()];
        let day = weekdays[date.getDay()];
        let num = date.getDate();

        matrix[month][day][num].push(date);
      }
      res.json({ matrix, years });
    })
    .catch(err => res.status(400).json(err))
});

router.use((err, req, res, next) => {
  //(Note: it's highly recommended to add in your favorite logger here :)
  res.status(500)
  res.send({ error: err.message })
})

// router.get("/getDates", (req, res, next) => {
//   let today = new Date();
//   let cap = new Date(new Date().setDate(new Date().getDate() + 30));
//   let dates = getAvailableDates(booked, businessHours, today, cap);

//   let { matrix, years } = buildMatrix(today, cap);

//   for (let date of dates) {
//     let month = monthNames[date.getMonth()];
//     let day = weekdays[date.getDay()];
//     let num = date.getDate();

//     matrix[month][day][num].push(date);
//   }
//   res.json({ matrix, years });
// });


module.exports = router;