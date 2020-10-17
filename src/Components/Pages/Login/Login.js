import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../UI/InputElement/InputElement';
import Button from '../../UI/Button/Button';
import AlertContext from '../../../Context/Alert/alertContext';
import AuthContext from '../../../Context/Auth/authContext';
import './Login.css';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/Contact-Manager/');
        }

        if (error === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            setAlert('Email does not exist.', 'danger');
            clearErrors();
        }
        else if (error === 'The password is invalid or the user does not have a password.') {
            setAlert('Invalid password entered.', 'danger');
            clearErrors();
        }
        else if (error === 'The email address is badly formatted.') {
            setAlert('Invalid email address entered.', 'danger');
            clearErrors();
        }
        else if (error === 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.') {
            setAlert('Network error.', 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const initialState = {
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
        if (user.email.value === '' || user.password.value === '') {
            setAlert('Enter all fields', 'danger');
        }
        else {
            // console.log(`Registration Submit`);
            const data = {
                email: user.email.value,
                password: user.password.value
            };
            // console.log(data.email);
            // console.log(data.password);
            login(data);
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
        <div className='LoginFormContainer'>
            <form className='LoginForm'>
                <h2>Account <span className='LoginSpan'>Login</span></h2>
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
                <Button btnType='Large Primary' clicked={onSubmit}>Login</Button>
            </form>
            <div className='SignUpContainer'>
                <Link className='SignUp' to='/register' >Sign up</Link>
            </div>
        </div>
    );
};

export default Login;
