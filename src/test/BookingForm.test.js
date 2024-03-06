import { render, screen } from "@testing-library/react";
import BookingForm, {initializeTimes, updateTimes} from "../components/Reservation/BookingForm";

test('Renders the BookingForm heading', () => {
    render(<BookingForm />);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
});

describe('initializeTimes function', () => {
    test('should return the correct expected value', () => {
      const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      const times = initializeTimes();
      expect(times).toEqual({ times: expectedTimes });
    });
  });
  
describe('updateTimes function', () => {
    test('should return the same value provided in the state', () => {
        const currentState = { times: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'] };
        const action = { type: 'UPDATE_TIMES' };
        const updatedTimes = updateTimes(currentState, action);
        expect(updatedTimes).toEqual(currentState);
    });
});