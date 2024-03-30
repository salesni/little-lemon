import React,{useState} from 'react';
import { useReservationContext } from '../../context/ReservationProvider';
import Button from '../commons/Button/Button';
import LoadingScreen from '../commons/LoadingScreen/LoadingScreen';
import fakeAPI from '../../commons/fakeAPI/fakeAPI';

export const title = (reservationState, dataSubmitted)=>{
    let title = '';
    if (reservationState.preview){
        title = 'Confirm Reservation';
    }
    if(reservationState.confirmed && reservationState.preview){
        title = 'Reservation';
    }
    if(reservationState.confirmed && reservationState.preview && reservationState.update){
        title = 'Confirm Update';
    }
    if(dataSubmitted){
        title = 'Congratulations! ✔️'
    }
    if(reservationState.cancelation){
        title = 'Confirm Cancelation';

    }
    return title;
}

export const subTitle =  (reservationState, dataSubmitted)=>{
    let subTitle = '';
    if (reservationState.preview){
        subTitle = 'Please Review that your information is correct.';
    }
    if(reservationState.confirmed && reservationState.preview){
        subTitle = 'Here is your Reservation Information';
    }
    if(dataSubmitted){
        subTitle = 'Your Reservation has been made successfully!'
    }
    if(reservationState.cancelation){
        subTitle = 'Please Review if you want to cancel your reservation.';
    }
    return subTitle;
}

export const footerTitle =  (reservationState, dataSubmitted)=>{
    let footerTitle = 'Is your information correct?';
    if((reservationState.confirmed && reservationState.preview) ||dataSubmitted ){
        footerTitle = 'It is a Pleasure to have you at Little Lemon!'
    }
    if(reservationState.cancelation){
        footerTitle = 'Do you want to cancel your reservation ?';
    }

    return footerTitle;
}

function Confirmation() {
    const {reservationState, setReservationState} = useReservationContext();
    const [loading, setLoading] = useState(false);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const reservationData = Object.keys(reservationState.reservationData).map((input)=>{
        let value = reservationState.reservationData[input] ;
        if(value instanceof Date){
            value = value.toISOString().split('T')[0]
        }
        return( <div className='reservationInputPreview' key={`Input_${input}_Preview`} >
                    <p>{input[0].toUpperCase() + input.slice(1)}</p>
                    <p>{value}</p>
                </div>); 
      });

    const submitData = async () => {
        setLoading(true); // Set loading to true when submitting data
        try {
          const reservationData = await fakeAPI.submitAPI(reservationState.reservationData);
          setReservationState({ type: 'submit', reservationData: reservationData });
          setDataSubmitted(true);
        } catch (error) {
          console.error('Error Submitting the Data :', error);
        } finally {
          setLoading(false); // Set loading to false after submission
        }
      }

    const leftButton = ()=>{
        let button;
        if (reservationState.preview){
            button =  <Button title={'Cancel'} colorClass='red' func={() =>setReservationState({type:'removePreview'})}/>;
        }
        if(reservationState.confirmed && reservationState.preview){
            button = <Button title={'Cancel'} colorClass='red' func={() =>setReservationState({type:'cancel'})}/>;
        }
        if(dataSubmitted || (reservationState.confirmed && reservationState.preview)){
            button = <Button title={'Close'} colorClass='green' href='/'/>;
        }
        if(reservationState.cancelation){
            button = <Button title={'No'} colorClass='green' func={() =>setReservationState({type:'removeCancelation'})}/>;
        }
        return button;
    }

    const rightButton = ()=>{
        let button;
        if (reservationState.preview){
            button =  <Button title={'Proceed to Checkout'} colorClass='' func={submitData}/>;
        }
        if(reservationState.confirmed && reservationState.preview && reservationState.update){
            button =  <Button title={'Confirm Update'} colorClass='' func={submitData}/>;
        }
        if(dataSubmitted || (reservationState.confirmed && reservationState.preview && !reservationState.update)){
            button = <Button title={'Update'} colorClass='' func = {() =>setReservationState({type:'update'})}/>;
        }
        if(reservationState.cancelation){
            button = <Button title={'Yes'} colorClass='red' func={() =>setReservationState({type:'reset'})}/>;
        }
        return button;
    }

    return (
        <section id='ReservationPreview'>
            {loading && <LoadingScreen />} 
            <div>
                <h1>{title(reservationState, dataSubmitted)}</h1>
                <h2> {subTitle(reservationState, dataSubmitted)}</h2>
            </div>
            <hr/>
            <div id='reservationData'>
                {reservationData}
            </div>

            <hr/>
            <h2>{footerTitle(reservationState, dataSubmitted)}</h2>
            <div className='buttonContainer'>
                {leftButton()}
                {rightButton()}
            </div>
        </section>
    )
    }

export default Confirmation