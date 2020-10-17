import React, { Fragment, useContext } from 'react';
import ContactContext from '../../Context/Contact/contactContext';
import ContactItem from './ContactItem/ContactItem';
import Spinner from '../UI/Spinner/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, loading } = contactContext;

    let contact;

    if (loading) {
        contact = (
            <Spinner />
        );
    }
    else {
        contact = (
            contacts === null || contacts.length == 0 ?
                <h3 style={{ textAlign: 'center', marginTop: '15px' }}>Please add a contact...</h3> :
                filtered !== null ?
                    (
                        filtered.map(
                            contact => <ContactItem key={contact.id} contact={contact} />
                        )
                    ) :
                    (
                        contacts.map(
                            contact => <ContactItem key={contact.id} contact={contact} />
                        )
                    )
        );
    }

    return (
        <Fragment>
            {contact}
        </Fragment>
    );
};

export default Contacts;
