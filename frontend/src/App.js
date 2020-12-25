import React from "react";
import Calendar from "components/Calendar/Calendar.jsx";



const App = () =>
  (
    <Calendar onSelectDate={(date) => console.log("From selectDate function: " + date)} />
  );

export default App;
