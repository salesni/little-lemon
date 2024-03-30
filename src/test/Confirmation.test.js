import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import Confirmation from '../components/Reservation/Confirmation';
import ReservationProvider from '../context/ReservationProvider';
import { ReservationContext } from '../context/ReservationProvider';
import { title, subTitle, footerTitle } from '../components/Reservation/Confirmation';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn().mockImplementation(({ children }) => children), // Mock the Link component
}));

describe(' Test Component Confirmation Rendering',()=>{
  
    // Create a wrapper component that uses the useReservationContext hook
    const mockState ={
      reservationState: { 
        reservationData: {
          name: ' This is a Test',
          email: 'test@tes.com',
          phone: '123-456-7890',
          guests: 5, // Update to the correct value
          date: new Date(),
          time: '17:00',
          occasion: 'Birthday'
        },
        preview: true,
        confirmed: false,
        update: false,
        cancelation: false
      },
      setReservationState: jest.fn() // Mock the setReservationState function
    }
  test('Confirmation renders properly', () => {
    const { getByText, getByLabelText } = render(
      <ReservationContext.Provider value={mockState}>
        <Confirmation />
      </ReservationContext.Provider >
    );
  // Iterate over all parameters in reservationData
  // Iterate over all parameters in reservationData
    for (const param in mockState.reservationState.reservationData) {
      const paramLabel = param[0].toUpperCase() + param.slice(1);
      let paramValue = mockState.reservationState.reservationData[param];

      if(paramValue instanceof Date){
        paramValue = paramValue.toISOString().split('T')[0]
      }
      const paragraphLabel = screen.getByText(paramLabel);
      const valueParagraph = paragraphLabel.nextSibling;
      expect(valueParagraph.textContent).toEqual(paramValue.toString());

    }
  });
});

describe('Title Rendering',()=>{
  test('should return correct title when preview is true', () => {
      const reservationState = {
          preview: true,
          confirmed: false,
          update: false,
          cancelation: false
      };
      const dataSubmitted = false;
      expect(title(reservationState, dataSubmitted)).toBe('Confirm Reservation');
  });
  test('Title should Render Reservation', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: false
    };
    const dataSubmitted = false;
    expect(title(reservationState, dataSubmitted)).toBe('Reservation');
  });
  test('Title should Render Confirm Update', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: true,
        cancelation: false
    };
    const dataSubmitted = false;
    expect(title(reservationState, dataSubmitted)).toBe('Confirm Update');
  });
  test('Title should Render Congratulations! ✔️', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: false
    };
    const dataSubmitted = true;
    expect(title(reservationState, dataSubmitted)).toBe('Congratulations! ✔️');
  });
  test('Title should Render Cancelation', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: true
    };
    const dataSubmitted = true;
    expect(title(reservationState, dataSubmitted)).toBe('Confirm Cancelation');
  });

});

describe('Subtitle Rendering',()=>{
  test('should return correct title when preview is true', () => {
      const reservationState = {
          preview: true,
          confirmed: false,
          update: false,
          cancelation: false
      };
      const dataSubmitted = false;
      expect(subTitle(reservationState, dataSubmitted)).toBe('Please Review that your information is correct.');
  });
  test('Subtitle should Render Here is your Reservation Information', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: false
    };
    const dataSubmitted = false;
    expect(subTitle(reservationState, dataSubmitted)).toBe('Here is your Reservation Information');
  });
  test('Title should Render Your Reservation has been made successfully!', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: false
    };
    const dataSubmitted = true;
    expect(subTitle(reservationState, dataSubmitted)).toBe('Your Reservation has been made successfully!');
  });
  test('Title should Render Please Review if you want to cancel your reservation.', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: true
    };
    const dataSubmitted = true;
    expect(subTitle(reservationState, dataSubmitted)).toBe('Please Review if you want to cancel your reservation.');
  });

});

describe('Footer Tile Rendering', ()=>{
  test('Should Render Is your information correct?', () => {
    const reservationState = {
        preview: true,
        confirmed: false,
        update: false,
        cancelation: false
    };
    const dataSubmitted = false;
    expect(footerTitle(reservationState, dataSubmitted)).toBe('Is your information correct?');
  });
  test('Should Render It is a Pleasure to have you at Little Lemon!', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: false
    };
    const dataSubmitted = false;
    expect(footerTitle(reservationState, dataSubmitted)).toBe('It is a Pleasure to have you at Little Lemon!');
  });
  test('Should Render It is a Pleasure to have you at Little Lemon! 2', () => {
    const reservationState = {
        preview: true,
        confirmed: false,
        update: false,
        cancelation: false
    };
    const dataSubmitted = true;
    expect(footerTitle(reservationState, dataSubmitted)).toBe('It is a Pleasure to have you at Little Lemon!');
  });
  test('Do you want to cancel your reservation ?', () => {
    const reservationState = {
        preview: true,
        confirmed: true,
        update: false,
        cancelation: true
    };
    const dataSubmitted = false;
    expect(footerTitle(reservationState, dataSubmitted)).toBe('Do you want to cancel your reservation ?');
  });

});