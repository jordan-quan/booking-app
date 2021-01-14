import React, { useState, useEffect } from "react";
import Calendar from "components/Calendar/Calendar.jsx";
import { TextField, Select, MenuItem, Button, InputLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as styles from './styles';
import axios from 'axios';
import { API } from 'config.js';

const Form = () => {

  let history = useHistory();

  let [time, setTime] = useState('');
  let [type, setType] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [nameError, setNameError] = useState('');
  let [emailError, setEmailError] = useState('');
  let [timeError, setTimeError] = useState('');
  let [types, setTypes] = useState([]);
  let [bookingError, setBookingError] = useState('');

  useEffect(() => {
    axios.get(API + '/getTypes')
      .then(({ data }) => { setType(data[0].value); setTypes(data); })
      .catch((err) => console.log(err))
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();

    if (time === '') {
      setTimeError('Please select a timeslot');
    }

    if (name === '') {
      setNameError('Please enter your name');
    }

    if (email === '') {
      setEmailError('Please enter an email');
    }

    if (name !== '' && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) && time !== '') {
      axios.post(API + '/bookDate', { name, time, email, type })
        .then((res) => {
          console.log('hello');
          console.log(res);
          history.push("/success");
        })
        .catch((err) => {
          setBookingError(err.response.data.error);
        })
    }
  }

  return (
    <>
      { bookingError !== '' ? <div>{bookingError}</div> : <div></div>}
      { type !== '' ? <form autocomplete="chrome-off">
        <styles.FormWrapper>
          <styles.TextWrapper>
            <TextField
              label="Name"
              type="text"
              autocomplete="chrome-off"
              value={name}
              error={nameError !== "" && nameError !== "valid"}
              helperText={nameError !== "" && nameError !== "valid" ? nameError : ""}
              onBlur={() => {
                if (name === '') {
                  setNameError('Please enter your name');
                } else {
                  setNameError('valid');
                }
              }}
              onChange={(ele) => setName(ele.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onBlur={() => {
                if (email === '') {
                  setEmailError('Please enter an email');
                } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
                  setEmailError('Invalid email');
                } else {
                  setEmailError('valid');
                }
              }}
              onChange={(ele) => setEmail(ele.target.value)}
              error={emailError !== "" && emailError !== "valid"}
              helperText={emailError !== "" && emailError !== "valid" ? emailError : ''}
            />
            <styles.SelectWrapper>
              <InputLabel shrink id="type-select-label">Age</InputLabel>
              <Select
                value={type}
                labelId="type-select-label"
                onChange={(ele) => setType(ele.target.value)}
              >
                {
                  types.map(({ value, displayText }) => <MenuItem value={value}>{displayText}</MenuItem>)
                }
              </Select>
            </styles.SelectWrapper>
            <div>{timeError}</div>
            <styles.ButtonWrapper>
              <Button type="submit" variant="contained" color="primary" disableElevation onClick={onSubmit} >
                Book Appointment
          </Button>
            </styles.ButtonWrapper>
          </styles.TextWrapper>
          <Calendar onSelectDate={(date) => { setTime(date); setTimeError(''); }} />
        </styles.FormWrapper>
      </form> : <div></div>}
    </>
  )
};

export default Form;
