import React, {useReducer} from 'react';
import ReservationData from '../Model/ReservationData';

export const ReservationContext = React.createContext('');

const PREVIEW = 'preview';
const REMOVE_PREVIEW = 'removePreview';
const SUBMIT = 'submit';
const UPDATE = 'update';
const RESET = 'reset';
const CANCEL = 'cancel';
const REMOVE_CANCELATION = 'removeCancelation';

const reserve = (state,action) =>{

    let tempState = {
        reservationData:state.reservationData,
        preview:state.preview,
        confirmed:state.confirmed,
        update: state.update,
        cancelation: state.cancelation
    }

    const operation = action.type;

    switch(operation) {

        case CANCEL:
            tempState.cancelation = true;
            return tempState;
        case REMOVE_CANCELATION:
                tempState.cancelation = false;
                return tempState;

        case RESET:
           return {
                reservationData: new ReservationData(),
                preview: false,
                confirmed:false,
                update:false
        
            };
        case UPDATE:
            tempState.update = true;
            tempState.preview = false;
            return tempState;

        case SUBMIT:
            tempState.reservationData = action.reservationData;
            tempState.preview = true;
            tempState.confirmed = true;
            tempState.update = false;
            return tempState;

        case PREVIEW:
            tempState.reservationData = action.reservationData;
            tempState.preview = true;
            return tempState;
        
        case REMOVE_PREVIEW:
            tempState.preview = false;
            return tempState;

        default:
            return tempState;
    }
}

function ReservationProvider({children}) {
    const initialState = {
        reservationData: new ReservationData(),
        preview: false,
        confirmed:false,
        update:false,
        cancelation:false

    };

    const [reservationState, setReservationState] = useReducer(reserve, initialState);
    const providerState = {
        reservationState, setReservationState
    }

    return (
        <ReservationContext.Provider value={providerState}>
            {children}
        </ReservationContext.Provider>
    )
}

export const useReservationContext = () => React.useContext(ReservationContext);


export default ReservationProvider;