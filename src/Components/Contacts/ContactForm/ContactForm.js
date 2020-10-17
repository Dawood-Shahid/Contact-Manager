import React, { useState, useContext, useEffect } from 'react';
import Button from '../../UI/Button/Button';
import ContactContext from '../../../Context/Contact/contactContext';
import AlertContext from '../../../Context/Alert/alertContext';
import Input from '../../UI/InputElement/InputElement';
import './ContactForm.css';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);
    
    const { addContact, updateContact, clearCurrent, current } = contactContext;
    const { setAlert, clearErrors } = alertContext;

    const initialState = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name',
            },
            value: '',
            label: ''
        },
        email: {
            elementType: 'email',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
            },
            value: '',
            label: ''
        },
        phone: {
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone',
            },
            value: '',
            label: ''
        },
        firstRadio: {
            elementType: 'radio',
            elementConfig: {
                type: 'radio',
            },
            label: 'Personal',
            value: 'personal',
            selected: 'personal'
        },
        secondRadio: {
            elementType: 'radio',
            elementConfig: {
                type: 'radio',
            },
            label: 'Professional',
            value: 'professional',
            selected: ''
        }
    };

    const [contact, setContact] = useState(initialState);

    useEffect(() => {
        if (current !== null) {
            const data = {};
            for (const key in contact) {
                const getState = { ...contact };
                const getProperty = { ...getState[key] };
                if (key === 'firstRadio' || key === 'secondRadio') {
                    if (getProperty.value === current.type) {
                        getProperty.selected = current.type;
                        getState[key] = getProperty;
                    }
                    else {
                        getProperty.selected = '';
                        getState[key] = getProperty;
                    }
                    data[key] = getState[key];
                }
                else {
                    getProperty.value = current[key];
                    getState[key] = getProperty;
                    data[key] = getState[key];
                };
            }
            setContact({
                ...contact,
                name: data.name,
                email: data.email,
                phone: data.phone,
                firstRadio: data.firstRadio,
                secondRadio: data.secondRadio
            });
        }
        else {
            setContact({
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name',
                    },
                    value: '',
                    label: ''
                },
                email: {
                    elementType: 'email',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email',
                    },
                    value: '',
                    label: ''
                },
                phone: {
                    elementType: 'text',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Phone',
                    },
                    value: '',
                    label: ''
                },
                firstRadio: {
                    elementType: 'radio',
                    elementConfig: {
                        type: 'radio',
                    },
                    label: 'Personal',
                    value: 'personal',
                    selected: 'personal'
                },
                secondRadio: {
                    elementType: 'radio',
                    elementConfig: {
                        type: 'radio',
                    },
                    label: 'Professional',
                    value: 'professional',
                    selected: ''
                }
            });
        }
    }, [current, contactContext]);

    const onChange = (e, keyName) => {
        if (keyName === 'firstRadio' || keyName === 'secondRadio') {
            let otherRadio = null;
            if (keyName === 'firstRadio') {
                otherRadio = 'secondRadio';
            }
            else {
                otherRadio = 'firstRadio';
            }

            // set selected value
            const getState1 = { ...contact };
            const getProperty1 = { ...getState1[keyName] };
            getProperty1.selected = e.target.value;
            getState1[keyName] = getProperty1;

            // removing selected value
            const getState2 = { ...contact };
            const getProperty2 = { ...getState2[otherRadio] };
            getProperty2.selected = '';
            getState2[otherRadio] = getProperty2;

            setContact({ ...contact, [keyName]: getState1[keyName], [otherRadio]: getState2[otherRadio] });
        }
        else {
            const updatedInput = { ...contact };
            const updatedField = { ...updatedInput[keyName] };
            updatedField.value = e.target.value;
            updatedInput[keyName] = updatedField;

            setContact({ ...contact, [keyName]: updatedInput[keyName] });
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (contact.name.value === '' || contact.email.value === '' || contact.phone.value === '') {
            setAlert('Enter all fields', 'danger');
            clearErrors();
            // console.log(`Enter all fields`)
        }
        else {
            // console.log(`All fields are entered`)
            const data = {};
            for (let key in contact) {
                if (key === 'name' | key === 'email' | key === 'phone') {
                    // console.log(`${key} > ${contact[key].value}`)
                    data[key] = contact[key].value;
                }
                else if (contact[key].selected !== '') {
                    // console.log(`type > ${contact[key].selected}`)
                    data['type'] = contact[key].selected;
                }
            }
            if (current === null) {
                // console.log(data.type)
                addContact(data);
            }
            else {
                data['id'] = current.id;
                updateContact(data);
            }
            setContact({
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name',
                    },
                    value: '',
                    label: ''
                },
                email: {
                    elementType: 'email',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email',
                    },
                    value: '',
                    label: ''
                },
                phone: {
                    elementType: 'text',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Phone',
                    },
                    value: '',
                    label: ''
                },
                firstRadio: {
                    elementType: 'radio',
                    elementConfig: {
                        type: 'radio',
                    },
                    label: 'Personal',
                    value: 'personal',
                    selected: 'personal'
                },
                secondRadio: {
                    elementType: 'radio',
                    elementConfig: {
                        type: 'radio',
                    },
                    label: 'Professional',
                    value: 'professional',
                    selected: ''
                }
            });
            clearCurrent();
        }
    };

    const onClear = () => {
        clearCurrent();
    };

    const inputArray = [];
    for (let key in contact) {
        inputArray.push({
            id: key,
            config: contact[key]
        });
    }

    return (
        <form className='ContentForm'>
            <h2>{current ? 'Update ' :
                'Add '} <span className='ContactSpan'>Contact</span></h2>
            {inputArray.map(details => (
                <Input
                    key={details.id}
                    name={details.config.elementType}
                    elementType={details.config.elementType}
                    elementConfig={details.config.elementConfig}
                    changed={(e) => onChange(e, details.id)}
                    value={details.config.value}
                    label={details.config.label}
                    checked={details.config.value === details.config.selected}
                />
            ))}
            <Button btnType='Large Primary' clicked={onSubmit}>{current ? 'Update' : 'Add'}</Button>
            {current &&
                <Button btnType='Large' clicked={onClear}>Clear</Button>
            }
        </form>
    );
};

export default ContactForm;
