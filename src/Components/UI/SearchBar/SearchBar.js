import React, { useState, useContext } from 'react';
import ContactContext from '../../../Context/Contact/contactContext';
import Input from '../../UI/ImputElement/InputElement';
import './SearchBar.css';

const SearchBar = () => {
    const contactContext = useContext(ContactContext);
    const [input, setInput] = useState({
        search: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Filter Contacts......',   
            },
            value: ''
        }
    });

    const { filterContacts, clearFilter } = contactContext;

    const onChange = e => {
        if (e.target.value !== null) {
            const updatedinput = { ...input };
            const updatedField = { ...updatedinput.search };
            updatedField.value = e.target.value;
            // updatedinput.search = updatedField;

            setInput({ ...input, search: updatedField });
            filterContacts(e.target.value);
        }
        else {
            clearFilter();
        }
    };

    const inputArray = [];
    for (let key in input) {
        inputArray.push({
            id: key,
            config: input[key]
        });
    }

    // console.log(inputArray);
    // console.log(inputArray.config)

    return (
        <form className='SearchFrom'>
            {inputArray.map(details => (
                <Input
                    key={details.id}
                    name={details.id}
                    elementType={details.config.elementType}
                    elementConfig={details.config.elementConfig}
                    value={details.config.value}
                    changed={onChange}
                />
                // <input
                //     className='SearchInput'
                //     key={details.id}
                //     type='text'
                //     placeholder={details.inputConfig.elementConfig.placeholder}
                //     onChange={onChange}
                //     autoComplete='off'
                //     value={details.inputConfig.value}
                // />
            ))}
        </form>
    );
};

export default SearchBar;
