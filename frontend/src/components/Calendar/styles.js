import styled, { keyframes } from 'styled-components';

export const Date = styled.div`
  text-align: center;
  margin: 10px 0px;
  flex-basis: 150px;
  cursor: pointer;
`;

const RadioStyle = {
  checkedColor: 'rgb(106 212 76)',
  borderColor: 'black',
  size: '20px',
  checkedSize: '10px',
  rippleSize: '5px'
}

const ripple = keyframes`
  {
    0% {
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.0);
    }
    50% { 
      box-shadow: 0px 0px 0px ${RadioStyle.rippleSize} rgba(0, 0, 0, 0.1);
    }
    100% {
      box-shadow: 0px 0px 0px ${RadioStyle.rippleSize} rgba(0, 0, 0, 0);
    }
  }
`;

export const Radio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input[type="radio"] {
      display: none;
      &:checked + label:before {
          border-color: ${RadioStyle.checkedColor};
          animation: ${ripple} 0.2s ease-in-out forwards;   
      }
      &:checked + label:after {
          transform: scale(1);
      }
  }
  
  label {
      display: inline-block;
      min-height: ${RadioStyle.size};
      position: relative;
      padding-left: 35px;
      margin: 0px;
      align-text: center;
      cursor: pointer;

      &:before, &:after {
        margin: 3px 0px;
          position: absolute;            
          content: '';  
          border-radius: 50%;
          transition: all .3s ease;
          transition-property: transform, border-color;
      }

      &:before {
          
          left: 0;
          top: 0;
          width: ${RadioStyle.size};
          height: ${RadioStyle.size};
          border: 2px solid ${RadioStyle.borderColor};
      }
      &:after {
        
          top: calc(${RadioStyle.size} / 2 - ${RadioStyle.checkedSize} / 2);
          left: calc(${RadioStyle.size} / 2 - ${RadioStyle.checkedSize} / 2);
          width:${RadioStyle.checkedSize};
          height:${RadioStyle.checkedSize};
          transform: scale(0);
          background:${RadioStyle.checkedColor};
      }
  }
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

export const Container = styled.div`
display: flex;
width: fit-content;
// margin: 100px auto;
border-radius: 8%;
background: white;
box-shadow: 0px 0px 70px -20px #0000003d;
justify-content: center;
`

export const PopoverHeader = styled.div`
display: flex;
flex-direction: row;
margin: 10px 0px 20px 0px;

svg{
  margin: auto 0px;
  margin-right: 14px;
  font-size: 25px;
  color: rgb(106 212 76);
}
`

export const PopoverTitle = styled.div`
font-size: 14px;
margin-top: 2px;
font-weight: bold;
`

export const Popover = styled.div`
    margin-left: 10px;
    padding: 10px 20px;
    font-size: 16px;
    display: inline-block;
    border-radius: 15px;
    position: relative;
  	width: fit-content;
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

export const MonthSwitcher = styled.div`
font-size: 25px;
color: #6cd44c;
display: flex;

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
background: ${({ booked }) => booked() ? '#258e07eb' : '#6cd44c'};
color: white;
cursor: pointer;
box-shadow: ${({ booked }) => booked() ? '0px 1px 10px -4px #023c02a8' : '0px 1px 10px -4px #027902ad'};
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

export const CalendarHeader = styled.div`
display: flex;
justify-content: space-between;
padding: 0px 5px 20px 15px;
`

export const SpinnerWrapper = styled.div`
  flex-basis: 30%;
  padding: 30px;
  margin: 120px;
  display: flex;
`;





