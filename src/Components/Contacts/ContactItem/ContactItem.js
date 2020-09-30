import React, { useContext } from 'react';
import Button from '../../Button/Button';
import ContactContext from '../../../Context/Contact/contactContext';
import './ContactItem.css';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    };

    const onEdit = () => {
        setCurrent(contact);
    };

    return (
        <div className='Item'>
            <h3 style={{ color: 'blue' }}>
                {name}
                <span className={'TypeSpan ' + (type === 'professional' ? 'Professional' : 'Prosonal')} >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='ItemList'>
                {email && (<li>
                    <i className="fas fa-envelope-open-text Icon" />{email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone-square-alt Icon" />{phone}
                </li>)}
            </ul>
            <Button btnType='Success Small' clicked={onEdit} >Edit</Button>
            <Button btnType='Danger Small' clicked={onDelete} >Delete</Button>
            {/* <Button btnType='Large' >Test</Button> */}
        </div>
    );
};

export default ContactItem;
{ }