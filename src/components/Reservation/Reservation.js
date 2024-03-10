import React from 'react';
import Header from '../Header';
import Footer from '../Footer/Footer';
import BookingForm from './BookingForm';
import './Reservation.css'
function Reservation() {
  return (
    <>
      <Header/>
      <main>
        <article id='reservation'>
          <BookingForm/>
          
        </article>
      </main>
      <Footer/>
    </>
  )
}

export default Reservation;