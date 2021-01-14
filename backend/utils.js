
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDatesBetweenDates = (startDate, endDate, open) => {
  let dates = getAvailableToday(startDate, open);
  //to avoid modifying the original date
  const theDate = new Date(startDate)
  theDate.setDate(theDate.getDate() + 1);
  theDate.setSeconds(0);
  theDate.setMilliseconds(0);

  while (theDate < endDate) {
    for (let hour of open) {
      theDate.setHours(hour);
      theDate.setMinutes(0);
      dates.push(new Date(theDate));
    }
    theDate.setDate(theDate.getDate() + 1)
  }
  return dates
}

const getAvailableToday = (startDate, openHours) => {

  let whole = openHours.map((hour) => {
    const date = new Date(startDate);
    date.setHours(hour);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  })

  return whole.filter((date) => date > startDate).sort();

}

const getBooked = (booked) => {
  let dates = [];
  for (let { date, duration } of booked) {
    let theDate = new Date(date)
    let hour = theDate.getHours();
    for (let i = hour; i < hour + duration; i++) {
      theDate.setHours(i);
      theDate.setMinutes(0);
      dates.push(new Date(theDate));
    }
  }
  return dates;

}

const getAvailableDates = (booked, open, start, end) => {
  let bookedDates = stringifyDates(getBooked(booked));
  let allDates = getDatesBetweenDates(start, end, open);
  return allDates.filter((i) => (!bookedDates.includes(i.toString())));
}

const stringifyDates = (dates) => (dates.map((i) => i.toString()));

const days = (month, year) => {
  return new Date(year, (month + 1) % 12, 0).getDate();
};

const buildMatrix = (startDate, endDate) => {

  let months = startDate.getMonth() == endDate.getMonth()
    ? [startDate.getMonth()]
    : [{ month: startDate.getMonth(), year: startDate.getFullYear() }, { month: endDate.getMonth(), year: endDate.getFullYear() }]

  let matrix = {};
  let years = {};

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

    years[monthNames[month]] = year;
  }

  return { matrix, years };

}

exports.buildMatrix = buildMatrix;
exports.getAvailableDates = getAvailableDates;
exports.monthNames = monthNames;
exports.weekdays = weekdays;
