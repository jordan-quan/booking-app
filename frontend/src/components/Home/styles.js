import styled from 'styled-components';

export const Date = styled.div`
  background: #6cd44c;
  border-radius: 7px;
  padding: 5px;
  text-align: center;
  //padding-left: 15px;
  margin: 10px 0px;
  flex-basis: 200px;
  color: white;
  box-shadow: 0px 2px 6px -3px #027902ad;
  cursor: pointer;
`;

export const WeekdayTitle = styled.div`
    color: grey;
    width: 100%;
    text-align: center;
    margin: auto;
   
`

export const Day = styled.div`
margin: 0px 5px;
`;

export const Time = styled.div`
`;

export const Container = styled.div`
display: flex;
width: fit-content;
margin: 100px auto;
border-radius: 8%;
background: white;
box-shadow: 0px 0px 70px -20px #0000003d;
justify-content: center;
`

export const Popover = styled.div`

    margin-left: 10px;
    padding: 10px 20px;
    display: inline-block;
    border-radius: 15px;
    position: relative;
  	width: 200px;
  	height: auto;
    background-color: white;
    box-shadow: 0px 0px 30px 0px #00000017;
    
    :after{
      	content: ' ';
      	position: absolute;
      	width: 0;
      	height: 0;
        left: -20px;
      	right: auto;
        top: 50%;
      	bottom: auto;
        border: 12px solid;
      	border-color: white white transparent transparent;
    }


`

export const CalendarHeader = styled.div`
display: flex;
justify-content: space-between;
padding: 0px 5px 20px 15px;
`

export const MonthSwitcher = styled.div`
font-size: 25px;
color: #6cd44c;
display: flex;

`

export const PopoverTitle = styled.div`
padding: 5px 0px;
font-weight: bold;
`

export const MonthTitle = styled.div`
font-size: 30px;
font-weight: bold;
`;

export const Chevron = styled.div`
margin: 0px 5px;
color: ${({ disabled }) => disabled ? 'lightgrey' : '#6cd44c'};
cursor: ${({ disabled }) => disabled ? 'arrow' : 'pointer'};
`

export const ClickableDay = styled.div`
height: 40px;
width: 40px;
margin: 10px auto;
display: flex;
flex-direction: column;
justify-content: center;
border-radius: 50%;
text-align: center;
background: #6cd44c;
color: white;
cursor: pointer;
box-shadow: 0px 1px 10px -4px #027902ad;
`

export const UnclickableDay = styled.div`
    height: 40px;
    width: 40px;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    text-align: center;
`


export const Calendar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  flex-basis: 30%;
  height: 100%;
  padding: 30px;
  width: 100%;
`;

export const SpinnerWrapper = styled.div`
  flex-basis: 30%;
  padding: 30px;
  width: 100%;
  display: flex;
  margin: 200px auto;
  justify-content: center;
`;





