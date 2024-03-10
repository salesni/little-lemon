import React, { useState, useReducer } from 'react';
import Button from '../commons/Button/Button';

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
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, initializeTimes());

  const handleDateChange = (event) => {
    setDate(event.target.value);
    dispatchTimes({ type: UPDATE_TIMES }); // Dispatch state change when date is changed
  };

  return (
    <section id='BookingForm'>
      <div>
        <h1>Book Now</h1>
      </div>
      <hr/>
      <form>
        <div className='formRow'>
          <label htmlFor="res-name">Full Name:</label>
          <input type='text'id='res-name'name='name'value={name} required
              placeholder='Enter your name'
            />
        </div>
        <div className='formRow'>
          <label htmlFor='res-email'>Email Address:</label>
          <input type='email'id='res-email'name='email'value={email} required
              placeholder='Enter your email address'
            />
        </div>
        <div className='formRow'>
          <label for="res-phone">Phone Number:</label>
          <input type="tel" id="res-phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
          placeholder="123-456-7890" required/>
        </div>
        <div className='formRow'>
          <label htmlFor="guests">Number of guests:</label>
          <div className='incrementGuestsContainer'>
                <button onClick={()=>(-1)}>-</button>
                <input type="number" id='guests'/>
                <button onClick={()=>(1)}>+</button>
            </div>
        </div>
        <div className='formRow'>
          <div className='dateInputs'>
            <div>
              <label htmlFor="res-date">Choose date:</label>
              <input type="date" id="res-date" value={date} onChange={handleDateChange} />
            </div>
            <div>
              <label htmlFor="res-time">Choose time:</label>
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
            </div>
          </div>
        </div>
        <div className='formRow'>
          <label htmlFor="occasion">Occasion:</label>
          <select id="occasion">
            <option>None</option>
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
        </div>
        <div className='buttonContainer'>
          <Button title={'Cancel'} 
          colorClass='red'/>
          <Button title={'Reserve a Table'} 
          colorClass=''/>

        </div>
      </form>
    </section>
  );
}

export default BookingForm;