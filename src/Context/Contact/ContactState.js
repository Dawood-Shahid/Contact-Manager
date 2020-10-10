import React, { useReducer, useContext } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import AuthContext from '../Auth/authContext';
import Axios from 'axios';
import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../Types';


const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };

    const authContext = useContext(AuthContext);
    const { userID } = authContext;

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const getContacts = () => {
        Axios.get(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}.json`)
            .then(res => {
                // console.log(res.data)
                const contactArr = [];
                for (let key in res.data) {
                    contactArr.push(res.data[key]);
                }
                // console.log(contactArr);
                dispatch({ type: GET_CONTACTS, payload: contactArr });
                // for (let index of contactArr) {
                    // console.log(index)
                // }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const addContact = contact => {
        const id = Math.floor(Math.random() * 10000);
        contact.id = id;
        contact.userID = userID;

        Axios.post(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}.json`, contact)
            .then(res => {
                // console.log(res.config.data);
                dispatch({ type: ADD_CONTACT, payload: res.config.data });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: CONTACT_ERROR, payload: err });
            });

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

    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
                getContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
