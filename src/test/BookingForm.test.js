import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import BookingForm from '../components/Reservation/BookingForm';
import ReservationProvider from '../context/ReservationProvider';
import { ReservationContext } from '../context/ReservationProvider';

// In your test file
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn().mockImplementation(({ children }) => children), // Mock the Link component
}));

describe(' Test Component Rendering',()=>{
  test('BookingForm renders properly', () => {
    const { getByText, getByLabelText } = render(
      <ReservationProvider>
        <BookingForm />
      </ReservationProvider>
    );
    expect(getByText('Book Now')).toBeInTheDocument();
    expect(getByLabelText('Full Name:')).toBeInTheDocument();
    expect(getByLabelText('Email Address:')).toBeInTheDocument();
  });
});


describe( 'Test Make Reservation Triggering',()=>{
  test('Reserve button click triggers reservation', () => {
    // Create a wrapper component that uses the useReservationContext hook
    const mockState ={
      reservationState: { 
        reservationData: {
          name: '',
          email: '',
          phone: '',
          guests: 5, // Update to the correct value
          date: new Date(),
          time: '',
          occasion: ''
        },
        preview: false,
        confirmed: false,
        update: false,
        cancelation: false
      },
      setReservationState: jest.fn() // Mock the setReservationState function
    }
  
    const { getByText,getByLabelText } = render(
      <ReservationContext.Provider value={mockState}>
        <BookingForm />
      </ReservationContext.Provider>
    );
  
  
    const inputName = getByLabelText('Full Name:');
    const inputEmail = getByLabelText('Email Address:');
    const inputPhone = getByLabelText('Phone Number:');
    const inputGuests = getByLabelText('Number of guests:');
    
    // Set values for inputs
    fireEvent.change(inputName, { target: { value: 'John Doe' } });
    fireEvent.change(inputEmail, { target: { value: 'john@example.com' } });
    fireEvent.change(inputPhone, { target: { value: '123-456-7890' } });
    fireEvent.change(inputGuests, { target: { value: 5 } });
    
    fireEvent.click(getByText('Reserve a Table'));
      // Log the actual parameters passed to setReservationState
    const expectedReservationData = {
      type: 'preview',
      reservationData: expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        guests: 5, // Update to the correct value
        date: expect.any(Date),
        time: '17:00',
        occasion: ''
      }),
    };
    
    expect(mockState.setReservationState).toHaveBeenCalledWith(expectedReservationData);
  
  
  });

  test('Reserve button click do not triggers reservation', () => {
    // Create a wrapper component that uses the useReservationContext hook
    const mockState ={
      reservationState: { 
        reservationData: {
          name: '',
          email: '',
          phone: '',
          guests: 5, // Update to the correct value
          date: new Date(),
          time: '',
          occasion: ''
        },
        preview: false,
        confirmed: false,
        update: false,
        cancelation: false
      },
      setReservationState: jest.fn() // Mock the setReservationState function
    }
  
    const { getByText,getByLabelText } = render(
      <ReservationContext.Provider value={mockState}>
        <BookingForm />
      </ReservationContext.Provider>
    );
    fireEvent.click(getByText('Reserve a Table'));
    expect(mockState.setReservationState).not.toHaveBeenCalled();
  
  
  });
});
