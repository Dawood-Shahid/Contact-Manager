import React, { useContext, useEffect } from 'react';
import Contact from '../../Contacts/Contact';
import ContactForm from '../../Contacts/ContactForm/ContactForm';
import SearchBar from '../../UI/SearchBar/SearchBar';
import AuthContext from '../../../Context/Auth/authContext';
import './Home.css';

const Home = () => {
    const authContext = useContext(AuthContext);

    const { loadUser, userID } = authContext;

    useEffect(() => {
        loadUser(userID);
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
