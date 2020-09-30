import React, { useState, useContext, useEffect } from 'react';
import Button from '../../Button/Button';
import ContactContext from '../../../Context/Contact/contactContext';
import './ContactForm.css';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal' 
            })
        }
    }, [current]);

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
        if (current === null) {
            addContact(contact);
        }
        else {
            updateContact(contact);
        }
        clearCurrent();
    };

    const onClear = () => {
        clearCurrent();
    };

    return (
        <form className='FormContent'>
            <h2>{current ? 'Update Contact' : 'Add Contact'}</h2>
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
            <Button btnType='Large Primary' clicked={onSubmit}>{current ? 'Update' : 'Add'}</Button>
            {current &&
                <Button btnType='Large' clicked={onClear}>Clear</Button>
            }
        </form>
    );
};

export default ContactForm;
