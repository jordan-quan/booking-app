import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as styles from './styles';
const ENDPOINT = "http://192.168.86.246:8080";

const Home = () => {
  const [dates, setDates] = useState({});
  const [theSocket, setSocket] = useState({});

  useEffect(() => {
    var socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('connect', () => {
      console.log(`I'm connected with the back-end`);
    });

    socket.on("view-dates", data => {
      setDates(data);
    });

    setSocket(socket);

  }, []);

  const handleClick = (i) => {
    theSocket.emit('book-date', i);
  }

  return (
    <div style={{ textAlign: "center" }}>
      {Object.keys(dates).length !== 0 ?
        <div>
          <div>{Object.keys(dates)[0]}</div>
          <Month month={dates[Object.keys(dates)[0]]} click={handleClick} />
          <div>{Object.keys(dates)[1]}</div>
          <Month month={dates[Object.keys(dates)[1]]} click={handleClick} />
        </div>
        : <p>Loading...</p>}
    </div>
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
        <div>{d == 0 ? '_' : d}</div>
        <Day times={day[d]} click={click} />
      </div>
    ))
    }
  </styles.Day>
);

const Day = ({ times, click }) => (
  <styles.Time>
    {times.map((t) => (
      <styles.Date onClick={() => { click(t) }} >
        <DateComponent date={t} />
      </styles.Date>
    ))}
  </styles.Time>
)

const Month = ({ month, click }) => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <styles.Calendar>
      {
        days.map((d) => (
          <div>
            <div>{d}</div>
            <Weekday day={month[d]} click={click} />
          </div>
        ))
      }
    </styles.Calendar>
  )

}

export default Home;



