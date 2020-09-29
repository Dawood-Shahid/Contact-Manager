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
        ]
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    return (
        <ContactContext.Provider
            value={{
                contacts : state.contacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
