import React, { useReducer, useContext } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import AuthContext from '../Auth/authContext';
import Axios from 'axios';
import DB from '../../Config/DB';
import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../Types';


const ContactState = props => {
    const initialState = {
        contacts: [
            // {
            //     id: '01',
            //     name: 'Shahid',
            //     email: 'shahid@gmail.com',
            //     phone: '1111-22-3333',
            //     type: 'personal'
            // }
        ],
        loading: true,
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
                // const key = Object.keys(res.data)
                // console.log(key)
                const contactArr = [];
                // console.log(res.data);
                // let obj = {};
                // obj {
                //     res.data,

                // }
                for (let key in res.data) {
                    // console.log(key);
                    // res.data['id'] = key 
                    // console.log(res.data[key]);                 
                    // obj = res.data[key];         // set the individual obj of contact into the variable
                    // obj['id'] = key;             // set firebase generatrd key as the id of an obj
                    // console.log(obj);

                    contactArr.push(res.data[key]);
                }
                // console.log(contactArr);
                dispatch({ type: GET_CONTACTS, payload: contactArr });
                // for (let index of contactArr) {
                // console.log(index)
                // }
            })
            .catch(err => {
                console.log(err.mesage);
            });
    };

    const addContact = contact => {
        const id = Math.floor(Math.random() * 10000);
        contact.id = id;
        contact.userID = userID;

        Axios.post(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}.json`, contact)
            .then(res => {
                Axios.get(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}.json`)
                    .then(res => {
                        const contactArr = [];
                        let objGetContact = {};
                        for (let key in res.data) {
                            objGetContact = res.data[key];         // set the individual obj of contact into the variable
                            objGetContact['id'] = key;             // set firebase generatrd key as the id of an obj
                            contactArr.push(objGetContact);
                        }
                        // console.log(contactArr)
                        let index = null;
                        contactArr.length === 0 ? index = 0 : index = contactArr.length - 1
                        // console.log(index)
                        Axios.put(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}/${contactArr[index].id}.json`, contactArr[index]);
                    })
                let objPostContact = {};
                objPostContact = JSON.parse(res.config.data);
                dispatch({ type: ADD_CONTACT, payload: objPostContact });
            })
            .catch(err => {
                dispatch({ type: CONTACT_ERROR, payload: err });
            });
    };

    const updateContact = contact => {
        // DB.database().ref(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}/${contact.id}`).update({contact})
        Axios.put(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}/${contact.id}.json`, contact)
            .then(res => {
                dispatch({ type: UPDATE_CONTACT, payload: contact });
            })
            .catch(err => {
                dispatch({ type: CONTACT_ERROR, payload: err });
            });
    };

    const deleteContact = id => {
        Axios.delete(`https://webmobilehybridapp.firebaseio.com/contact-manager/contacts/${userID}/${id}.json`)
            .then(res => {
                dispatch({ type: DELETE_CONTACT, payload: id });
            })
            .catch(err => {
                dispatch({ type: CONTACT_ERROR, payload: err });
            });
    };

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
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
                loading: state.loading,
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
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
