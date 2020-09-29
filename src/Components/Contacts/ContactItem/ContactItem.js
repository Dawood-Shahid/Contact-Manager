import React from 'react';
import Button from '../../Button/Button';
import './ContactItem.css';

const ContactItem = ({ contact }) => {
    const { id, name, email, phone, type } = contact;

    return (
        <div className='Item'>
            <h3 style={{ color: 'blue' }}>
                {name}
                <span className={'TypeSpan ' + (type === 'professional' ? 'Professional' : 'Prosonal')} >
                    {type}
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
            <Button btnType='Success Small' >Edit</Button>
            <Button btnType='Danger Small' >Delete</Button>
            {/* <Button btnType='Large' >Test</Button> */}
        </div>
    );
};

export default ContactItem;
{ }