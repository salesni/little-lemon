import React from 'react';
import Hero from './Hero';
import Highlights from './Highlights';
import Testimonials from './Testimonials';
import Header from '../Header';
import Footer from '../Footer/Footer';

function Main() {
  return (
  <>

      <Header/>
      <main>
          <Hero/>
          <Highlights/>
          <Testimonials/>
      </main>
      <Footer/>
    </>
  )
}

export default Main;