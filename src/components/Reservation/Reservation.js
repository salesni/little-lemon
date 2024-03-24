import React from 'react';
import Header from '../Header';
import Footer from '../Footer/Footer';
import BookingForm from './BookingForm';
import { useReservationContext } from '../../context/ReservationProvider';
import Confirmation from './Confirmation';
import './Reservation.css'


function Reservation() {
  const {reservationState, setReservationState} = useReservationContext();
  return (
    <>
      <Header/>
      <main>
        <article id='reservation'>
          {
            reservationState.preview?
            <Confirmation/>:
            <BookingForm/>
          }
          
        </article>
      </main>
      <Footer/>
    </>
  )
}

export default Reservation;