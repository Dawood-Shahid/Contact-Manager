import React, { useRef, useContext, useEffect } from 'react';
import ContactContext from '../../Context/Contact/contactContext';
import './SearchBar.css';

const SearchBar = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext;

    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''            
        }
    });

    const onChange = e => {
        if (text.current.value !== null) {
            filterContacts(e.target.value);
        }
        else {
            clearFilter();
        }
    };

    return (
        <form className='SearchFrom'>
            <input
                className='SearchInput'
                type='text'
                placeholder='Filter Contacts......'
                onChange={onChange}
                autoComplete='off'
                ref={text}
            />
        </form>
    );
};

export default SearchBar;
