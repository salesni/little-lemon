import React, { useState, useReducer, useEffect } from 'react';
import Button from '../commons/Button/Button';
import fakeAPI from '../../commons/fakeAPI/fakeAPI';




function BookingForm() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState('');
  const [ocasion, setOcasion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);

  const fetchTimeWithDate = async (date) => {
    try {
      const resultList = await fakeAPI.fetchData(date);
      return resultList;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const dateUpdated = async(date) => {
    const selectedDate = date instanceof Date? date:  new Date();
    const timeList = await fetchTimeWithDate(selectedDate);
    setAvailableTimes(timeList);
    setTime(timeList[0]);
    setDate(selectedDate);
  }

  useEffect(() => {
    dateUpdated(null);
  }, []);

  const handleDateChange = (event) => {
    dateUpdated(event.target.value);
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
              <input type="date" id="res-date" value={date.toISOString().split('T')[0]}
                min={new Date().toISOString().split('T')[0]}
               onChange={handleDateChange} />
            </div>
            <div>
              <label htmlFor="res-time">Choose time:</label>
              <select id="res-time" onChange={(event) =>setTime(event.target.value)}
                value={time}
              >
                {availableTimes.map((timeOption) => (
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