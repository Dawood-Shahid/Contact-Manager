import React, { useState } from 'react';
import Input from '../../ImputElement/InputElement';
import Button from '../../Button/Button';
import './Login.css';

const Login = () => {
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
        console.log(`Login Submit`)
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
    );
};

export default Login;
