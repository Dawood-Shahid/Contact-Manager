import React, { useState, useContext } from 'react';
import Button from '../../Button/Button';
import ContactContext from '../../../Context/Contact/contactContext';
import './ContactForm.css';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    };

    return (
        <form className='FormContent'>
            <h2>Add Contact</h2>
            <input
                type='text'
                name='name'
                onChange={onChange}
                value={name}
                placeholder='Name'
                autoComplete='off'
            />
            <input
                type='email'
                name='email'
                onChange={onChange}
                value={email}
                placeholder='Email'
                autoComplete='off'
            />
            <input
                type='text'
                name='phone'
                onChange={onChange}
                value={phone}
                placeholder='Phone'
                autoComplete='off'
            />
            <div>
                <h5 style={{ lineHeight: '18px' }}>Contact Type</h5>
                <label className='radioLabel'>
                    <input
                        type='radio'
                        name='type'
                        onChange={onChange}
                        value='personal'
                        checked={type === 'personal'}
                    /> Personal
                </label>
                <label className='radioLabel'>
                    <input
                        type='radio'
                        name='type'
                        onChange={onChange}
                        value='professional'
                        checked={type === 'professional'}
                    /> Professional
                </label>
            </div>
            <Button btnType='Large' clicked={onSubmit}>Add</Button>
        </form>
    );
};

export default ContactForm;
