let booked = [
  {
    type: 'blocked',
    date: new Date(2020, 11, 20, 10, 00, 0).toString(),
    duration: 2
  },
  {
    type: 'blocked',
    date: new Date(2020, 11, 21, 13, 00, 0).toString(),
    duration: 3
  }
];

let businessHours = [10, 11, 13, 14, 15, 16, 17];


module.exports = {
  booked,
  businessHours
}