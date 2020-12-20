
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

      theDate.setHours(hour);
      theDate.setMinutes(30);
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

  let half = whole.map((d) => {
    const date = new Date(d);
    date.setMinutes(30);
    return date;
  });

  return [...whole, ...half].filter((date) => date > startDate).sort();

}

const getBooked = (booked) => {
  let dates = [];
  for (let { date, duration } of booked) {
    let theDate = new Date(date)
    let hour = theDate.getHours();
    let min = theDate.getMinutes();
    let time = min == 30 ? hour + 0.5 : hour;
    for (let i = time; i < time + duration; i += 0.5) {
      if (i % 1 == 0) {
        theDate.setHours(i);
        theDate.setMinutes(0);
      } else {
        theDate.setHours(i - 0.5);
        theDate.setMinutes(30);
      }
      dates.push(new Date(theDate));
    }
  }
  return dates;

}

export const getAvailableDates = (booked, open, start, end) => {
  let bookedDates = stringifyDates(getBooked(booked));
  let allDates = getDatesBetweenDates(start, end, open);
  return allDates.filter((i) => (!bookedDates.includes(i.toString())));
}

export const stringifyDates = (dates) => (dates.map((i) => i.toString()));
