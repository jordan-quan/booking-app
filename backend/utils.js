
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

exports.getAvailableDates = getAvailableDates;
exports.stringifyDates = stringifyDates;
