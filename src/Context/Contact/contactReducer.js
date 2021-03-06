import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from '../Types';


export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            // console.log('get contact', action.payload)
            return {
                ...state,
                // contacts: [...state.contacts, action.payload]
                contacts: action.payload,
                loading:false
            };
        case ADD_CONTACT:
            // console.log('add contact reducer ->', action.payload.type);
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: [],
                current: null,
                filtered: null,
                error: null,
                loading: true
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACTS:
            // console.log(`${action.payload} > filterContacts reducer`)
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    // console.log(`${regex} > regex`)
                    // console.log(`${contact.name.match(regex) || contact.email.match(regex)} > comparision`)
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
