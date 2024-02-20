import React from 'react';
import chef  from '../../commons/img/restaurant chef B.jpg';
import './About.css'
import Footer from '../Footer/Footer';
import Header from '../Header';


function About() {
  return (
    <>
    <Header/>
        <article id='about'>
            <div id='aboutTexts'>
                <h1>
                    Little Lemon
                </h1>
                <h2>
                    Chicago
                </h2>
                <p>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. 
                </p>
            </div>
                <img id='aboutImage' alt='Restaurant Food' src={chef}></img>
        </article>
    <Footer/>
    </>
  )
}

export default About;