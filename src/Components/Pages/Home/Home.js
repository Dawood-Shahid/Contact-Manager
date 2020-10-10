import React, { useContext, useEffect } from 'react';
import Contact from '../../Contacts/Contact';
import ContactForm from '../../Contacts/ContactForm/ContactForm';
import SearchBar from '../../UI/SearchBar/SearchBar';
import AuthContext from '../../../Context/Auth/authContext';
import ContactContext from '../../../Context/Contact/contactContext';
import './Home.css';

const Home = () => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { loadUser, userID } = authContext;
    const { getContacts } = contactContext;

    useEffect(() => {
        loadUser(userID);
        getContacts();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='Container'>
            <div className='FormContainer'>
                <ContactForm />
            </div>
            <div>
                <SearchBar />
                <div className='ContactContainer'>
                    <Contact />
                </div>
            </div>
        </div>
    );
};

export default Home;
