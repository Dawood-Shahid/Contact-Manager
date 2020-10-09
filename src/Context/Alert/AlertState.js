import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../Types';


const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setAlert = (msg, type, timeout = 5000) => {
        const id = Math.floor(Math.random() * 10000);
        state.id = id;
        dispatch({ type: SET_ALERT, payload: { id, msg, type } });

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id });
        }, timeout);
    };

    return (
        <AlertContext.Provider
            value={{
                alerts: state, 
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
