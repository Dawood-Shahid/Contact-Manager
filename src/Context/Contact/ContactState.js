import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER
} from '../Types';


const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "abc",
                email: "abc@gmail.com",
                phone: "1111",
                type: "personal"
            },
            {
                id: 2,
                name: "xyz",
                email: "xyz@gmail.com",
                phone: "2222",
                type: "professional"
            },
            {
                id: 3,
                name: "pqr",
                email: "pqr@gmail.com",
                phone: "3333",
                type: "personal"
            }
        ],
        current: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const addContact = contact => {
        const id = Math.floor(Math.random() * 10000);
        contact.id = id;
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
