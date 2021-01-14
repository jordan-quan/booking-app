import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Carousel from 'react-bootstrap/Carousel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Spinner from 'react-bootstrap/Spinner';

import { BsFillClockFill as ClockIcon } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import * as styles from './styles';
import { API } from 'config.js';

const Calendar = ({ onSelectDate }) => {
  const [dates, setDates] = useState({});
  const [years, setYears] = useState({});
  const [slide, setSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    var socket = io(API, { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('connect', () => {
      console.log(`I'm connected with the back-end`);
    });

    socket.on("view-dates", data => {
      let { matrix, years } = data;
      setDates(matrix);
      setYears(years);
    });

  }, []);

  const handleClick = (i) => {
    setSelectedDate(i.toString());
    onSelectDate(i);
  }

  return (
    Object.keys(dates).length !== 0 ?
      <styles.Container>
        <Carousel activeIndex={slide} controls={false} indicators={false} slide={false}>
          {Object.keys(dates).map((k, i) => (
            <Carousel.Item key={i} data-interval={false}>
              <styles.CalendarWrapper>
                <styles.CalendarHeader>
                  <styles.MonthTitle>{k + ' ' + years[k]}</styles.MonthTitle>
                  <styles.MonthSwitcher>
                    <styles.Chevron disabled={slide === 0}>
                      <FaChevronLeft onClick={() => { if (slide !== 0) return setSlide(slide - 1) }} />
                    </styles.Chevron>
                    <styles.Chevron disabled={slide === 1 || Object.keys(dates).length <= 1}>
                      <FaChevronRight onClick={() => { if (slide !== 1 && Object.keys(dates).length > 1) return setSlide(slide + 1) }} />
                    </styles.Chevron>
                  </styles.MonthSwitcher>
                </styles.CalendarHeader>
                <Month month={dates[k]} click={handleClick} selected={selectedDate} />
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

const DateComponent = ({ date, selected, onChange, index }) => {
  return <styles.Radio>
    <input type="radio" id={index} value={date.toLocaleTimeString()} onChange={() => onChange(date)} checked={selected.toString() === date.toString()} />
    <label htmlFor={index}>{date.toLocaleTimeString()}</label>
  </styles.Radio>
}

const Weekday = ({ day, click, selected }) => (
  <styles.Day>
    { Object.keys(day).map((d, i) => (
      <div key={i}>
        <Day times={day[d]} day={parseInt(d) === 0 ? '-' : d} click={click} selected={selected} />
      </div>
    ))
    }
  </styles.Day>
);

const Day = ({ times, day, click, selected }) => {

  let time = times[0];

  let popover = (
    <styles.Popover>
      <styles.PopoverHeader>
        <ClockIcon />
        <styles.PopoverTitle>pick a time</styles.PopoverTitle>
      </styles.PopoverHeader>
      <div>
        {times.map((t, i) => {
          let d = new Date(t);
          return <styles.Date key={i}>
            <DateComponent index={i} date={d} onChange={click} selected={selected} />
          </styles.Date>
        })}
      </div>
    </styles.Popover>
  );

  return time ? (
    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
      <styles.ClickableDay booked={() => {
        let picked = new Date(selected);
        let timeDate = new Date(time);
        return (timeDate.getMonth() === picked.getMonth()) && (timeDate.getDate() === picked.getDate());
      }}>{day}</styles.ClickableDay>
    </OverlayTrigger>
  ) : (<styles.UnclickableDay>{day}</styles.UnclickableDay>)
}

const Month = ({ month, click, selected }) => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <styles.Calendar>
      {
        days.map((d, i) => (
          <div key={i}>
            <styles.WeekdayTitle>{d.substr(0, 2)}</styles.WeekdayTitle>
            <Weekday day={month[d]} click={click} selected={selected} />
          </div>
        ))
      }
    </styles.Calendar>
  )

}

export default Calendar;



