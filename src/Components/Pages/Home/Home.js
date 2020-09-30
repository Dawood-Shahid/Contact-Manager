import React from 'react';
import Contact from '../../Contacts/Contact';
import ContactForm from '../../Contacts/ContactForm/ContactForm';
import SearchBar from '../../SearchBar/SearchBar'
import './Home.css';

const Home = () => {
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
