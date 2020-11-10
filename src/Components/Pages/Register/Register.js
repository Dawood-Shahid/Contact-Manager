import React, { useState, useContext, useEffect } from 'react';
import Input from '../../UI/InputElement/InputElement';
import Button from '../../UI/Button/Button';
import AlertContext from '../../../Context/Alert/alertContext';
import AuthContext from '../../../Context/Auth/authContext';
import './Register.css';

const Registration = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/Contact-Manager/');
        }

        if (error == 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.') {
            setAlert('Network error.', 'danger');
            clearErrors();
        }
        else if (error == 'The email address is already in use by another account.') {
            setAlert('The email address is already in use.', 'danger');
            clearErrors();
        }
        else if (error == 'Password should be at least 6 characters') {
            setAlert('Password should be at least 6 characters.', 'danger');
            clearErrors();
        }
        else if (error == 'The email address is badly formatted.') {
            setAlert('Invalid email address.', 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const initialState = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your Name',
            },
            value: '',
            label: 'Name'
        },
        email: {
            elementType: 'email',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your Email Address',
            },
            value: '',
            label: 'Email Address'
        },
        password: {
            elementType: 'password',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter your Password',
            },
            value: '',
            label: 'Password'
        },
        password2: {
            elementType: 'password',
            elementConfig: {
                type: 'password',
                placeholder: 'Re-enter your Password',
            },
            value: '',
            label: 'Conform Password'
        }
    };

    const [user, setUser] = useState(initialState);

    const onChange = (e, keyName) => {
        const updatedInput = { ...user };
        const updatedField = { ...updatedInput[keyName] };
        updatedField.value = e.target.value;
        updatedInput[keyName] = updatedField;

        setUser({ ...user, [keyName]: updatedInput[keyName] });

    };

    const onSubmit = e => {
        e.preventDefault();
        if (user.name.value === '' || user.email.value === '' || user.password.value === '') {
            setAlert('Enter all fields', 'danger');
            clearErrors();
        }
        else if (user.password.value !== user.password2.value) {
            setAlert('Password does not match', 'danger');
            clearErrors();
        }
        else {
            // console.log(`Registration Submit`);
            const data = {
                name: user.name.value,
                email: user.email.value,
                password: user.password.value
            };
            // console.log(data.email);
            // console.log(data.password);
            register(data);
        }
    };

    const inputArray = [];
    for (let key in user) {
        // console.log(user[key])
        inputArray.push({
            id: key,
            config: user[key]
        });
    }
    // console.log(inputArray);

    return (
        <form className='RegisterForm'>
            <h2>Account <span className='RegisterSpan'>Register</span></h2>
            {inputArray.map(details => (
                <Input
                    key={details.id}
                    name={details.config.elementType}
                    elementType={details.config.elementType}
                    elementConfig={details.config.elementConfig}
                    changed={(e) => onChange(e, details.id)}
                    value={details.config.value}
                    label={details.config.label}
                />
            ))}
            <Button btnType='Large Primary' clicked={onSubmit}>Register</Button>
        </form>
    );
};

export default Registration;
