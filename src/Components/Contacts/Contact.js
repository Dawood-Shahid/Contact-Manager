import React, { Fragment, useContext } from 'react';
import ContactContext from '../../Context/Contact/contactContext';
import ContactItem from './ContactItem/ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;

    return (
        <Fragment>
            {
                contacts.length === 0 ?
                    <h3 style={{ textAlign: 'center', marginTop: '15px' }}>Please add a contact...</h3> :
                    filtered !== null ?
                        filtered.map(contact => <ContactItem key={contact.id} contact={contact} />) :
                        contacts.map(contact => <ContactItem key={contact.id} contact={contact} />)
            }
        </Fragment>
    );
};

export default Contacts;
