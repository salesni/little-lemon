import React, { useState, useReducer } from 'react';

const SELECT_TIME = 'SELECT_TIME';
const UPDATE_TIMES = 'UPDATE_TIMES';

const selectTime = (state, action) => {
  switch (action.type) {
    case SELECT_TIME:
      return {
        ...state,
        selectedTime: action.selectedTime,
      };
    default:
      return state;
  }
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case UPDATE_TIMES:
      return {
        ...state,
        times: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      };
    default:
      return state;
  }
};

export const initializeTimes = () => ({
  times: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
});

function BookingForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useReducer(selectTime, { selectedTime: '17:00' });
  const [guests, setGuests] = useState('');
  const [ocasion, setOcasion] = useState('');

  
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, initializeTimes());

  const handleDateChange = (event) => {
    setDate(event.target.value);
    dispatchTimes({ type: UPDATE_TIMES }); // Dispatch state change when date is changed
  };

  return (
    <section id='BookingForm'>
      <div  id='menuHeaders'>
        <h1>Book Now</h1>
      </div>
      <hr/>
      <form>
        <label htmlFor="res-date">Choose date</label>
        <input type="date" id="res-date" value={date} onChange={handleDateChange} />
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          onChange={(event) =>
            setTime({ type: SELECT_TIME, times: event.target.value })
          }
          value={time.selectedTime}
        >
          {availableTimes.times.map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>
        <label htmlFor="guests">Number of guests</label>
        <input type="number" placeholder="1" min="1" max="10" id="guests" />
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion">
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        <input type="submit" value="Make Your reservation" />
      </form>
    </section>
  );
}

export default BookingForm;