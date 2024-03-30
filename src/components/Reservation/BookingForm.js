import React, { useState, useEffect } from 'react';
import Button from '../commons/Button/Button';
import fakeAPI from '../../commons/fakeAPI/fakeAPI';
import ReservationData from '../../Model/ReservationData';
import { useReservationContext } from '../../context/ReservationProvider';



function BookingForm() {
  const {reservationState, setReservationState} = useReservationContext();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState(reservationState.reservationData.guests);
  const [occasion, setOccasion] = useState(reservationState.reservationData.occasion);
  const [name, setName] = useState(reservationState.reservationData.name);
  const [email, setEmail] = useState(reservationState.reservationData.email);
  const [isValidEmailState, setIsValidEmailState] = useState(true); 
  const [phone, setPhone] = useState(reservationState.reservationData.phone);
  const [isValidPhone, setIsValidPhone] = useState(true); 
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


  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    setIsValidEmailState(isValidEmail);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) =>{
    const phone = event.target.value;
    setPhone(phone);

    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    const isValidPhone = phoneRegex.test(phone);
    setIsValidPhone(isValidPhone);
  }

  const increaseDecreaseGuests = (input) =>{
    const newNumberOfGuests  = isNaN(guests)? input : parseInt(guests) + input;
    newNumberOfGuests < 0 ? setGuests(0):setGuests(newNumberOfGuests);
  }

  const guestChanged = (event) =>{
    let num = event.target.value;
    if (num === '') {
      setGuests('');
    } else {
      num = parseInt(num.replace(/^0+/, ''));
      setGuests(num);
    }
  }

  const reserveATable = () =>{
    let error = '';
    error += name.length > 5 ? '': 'Name, ';
    error += (isValidEmailState && email!=='')? '' : 'Email, ';
    error += (isValidPhone && phone!=='')? '': 'Phone, ';
    error += guests>0? '': 'Guests';
    console.log('Name: ',name,' Email: ',email, ' Phone: ',phone, 'Guests: ',guests)
    if (error === ''){
      const newData = new ReservationData(name, email, phone, guests, date, time, occasion);
      setReservationState({
        type: 'preview',
        reservationData: newData
      });
    }else{
      console.log(`Check the following inputs: ${error}.`)
    }

  }

  return (
    <section id='BookingForm'>
      <div>
        <h1>Book Now</h1>
      </div>
      <hr/>
      <form onSubmit={(event)=>event.preventDefault()}>
        <div className='formRow'>
          <label htmlFor="res-name">Full Name:</label>
          <input type='text'id='res-name'name='name'value={name} required
              placeholder='Enter your name'
              onChange={handleNameChange}
            />
        </div>
        <div className='formRow'>
          <label htmlFor='res-email'>Email Address:</label>
          <input type='email'id='res-email'name='email'value={email} required
              placeholder='Enter your email address'
              onChange={handleEmailChange}
            />
        </div>
        <div className='formRow'>
          <label htmlFor="res-phone">Phone Number:</label>
          <input type="tel" id="res-phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
          placeholder="123-456-7890" value={phone} onChange={handlePhoneChange} required/>
        </div>
        <div className='formRow'>
          <label htmlFor="guests">Number of guests:</label>
          <div className='incrementGuestsContainer'>
                <button onClick={()=>increaseDecreaseGuests(-1)}>-</button>
                <input value={(guests === '' ) ? 0 : parseInt(guests)}
                 onChange={guestChanged}
                 type="number" id='guests'/>
                <button onClick={()=>increaseDecreaseGuests(1)}>+</button>
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
          <select id="occasion" value={occasion} onChange={(event) =>setOccasion(event.target.value)}>
            <option>None</option>
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
        </div>
        <div className='buttonContainer'>
          <Button title={'Cancel'} 
            colorClass='red' href = {'/'}
            />
          <Button title={'Reserve a Table'} 
            func={reserveATable}
            colorClass=''/>

        </div>
      </form>
    </section>
  );
}

export default BookingForm;