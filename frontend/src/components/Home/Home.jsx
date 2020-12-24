import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Spinner from 'react-bootstrap/Spinner';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { io } from "socket.io-client";
import * as styles from './styles';
const ENDPOINT = "http://192.168.86.246:8080";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Home = () => {
  const [dates, setDates] = useState({});
  const [years, setYears] = useState({});
  const [theSocket, setSocket] = useState({});
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    var socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('connect', () => {
      console.log(`I'm connected with the back-end`);
    });

    socket.on("view-dates", data => {
      let { matrix, years } = data;
      setDates(matrix);
      setYears(years);
    });

    setSocket(socket);

  }, []);

  const handleClick = (i) => {
    theSocket.emit('book-date', i);
  }

  return (
    Object.keys(dates).length !== 0 ?
      <styles.Container>
        <Carousel activeIndex={slide} controls={false} indicators={false} slide={false}>
          {Object.keys(dates).map((k) => (
            <Carousel.Item interval={false}>
              <styles.CalendarWrapper>
                <styles.CalendarHeader>
                  <styles.MonthTitle>{k + ' ' + years[k]}</styles.MonthTitle>
                  <styles.MonthSwitcher>
                    <styles.Chevron disabled={slide === 0}>
                      <FaChevronLeft onClick={() => { if (slide !== 0) return setSlide(slide - 1) }} />
                    </styles.Chevron>
                    <styles.Chevron disabled={slide === 1}>
                      <FaChevronRight onClick={() => { if (slide !== 1) return setSlide(slide + 1) }} />
                    </styles.Chevron>
                  </styles.MonthSwitcher>
                </styles.CalendarHeader>
                <Month month={dates[k]} click={handleClick} />
              </styles.CalendarWrapper>
            </Carousel.Item>)
          )}
        </Carousel>
      </styles.Container>
      : <styles.SpinnerWrapper>
        <Spinner style={{ width: 100, height: 100 }} animation="border" />
      </styles.SpinnerWrapper>
  );
}

const DateComponent = ({ date }) => {
  let d = new Date(date);
  return <div>{d.toLocaleTimeString()}</div>
}

const Weekday = ({ day, click }) => (
  <styles.Day>
    { Object.keys(day).map((d) => (
      <div>
        <Day times={day[d]} day={d == 0 ? '_' : d} click={click} />
      </div>
    ))
    }
  </styles.Day>
);

const getDateString = (date) => {
  let d = new Date(date);
  return `${weekdays[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`
}

const Day = ({ times, day, click }) => {

  let time = times[0];

  let popover = (
    <styles.Popover>
      <styles.PopoverTitle>Choose a time</styles.PopoverTitle>
      <styles.Time>
        {times.map((t) => (
          <styles.Date onClick={() => { click(t) }} >
            <DateComponent date={t} />
          </styles.Date>
        ))}
      </styles.Time>
    </styles.Popover>
  );





  return time ? (
    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
      <styles.ClickableDay>{day}</styles.ClickableDay>
    </OverlayTrigger>
  ) : (<styles.UnclickableDay>{day}</styles.UnclickableDay>)
}

const Month = ({ month, click }) => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <styles.Calendar>
      {
        days.map((d) => (
          <div>
            <styles.WeekdayTitle>{d.substr(0, 2)}</styles.WeekdayTitle>
            <Weekday day={month[d]} click={click} />
          </div>
        ))
      }
    </styles.Calendar>
  )

}

export default Home;



