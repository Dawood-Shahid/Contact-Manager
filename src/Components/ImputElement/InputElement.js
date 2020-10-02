import React, { Fragment } from 'react';
import './InputElement.css';

const Input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <Fragment>
                <label className='Label' > {props.label} </label>
                <input
                    name={props.name}
                    className='InputField'
                    autoComplete='off'
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            </Fragment>;
            break;
        // case ('textarea'):
        //     inputElement = <textarea
        //         className='InputField'
        //         {...props.elementConfig}
        //         value={props.value}
        //         onChange={props.changed}
        //     />;
        //     break;
        // case ('select'):
        //     inputElement = <select
        //         className='InputField'
        //         // value={props.value}
        //         onChange={props.changed}
        //     >
        //         {props.elementConfig.options.map(option => (
        //             <option key={option.value} value={option.value}>
        //                 {option.displayValue}
        //             </option>
        //         ))}
        //     </select>;
        //     break;
        case ('radio'):
            inputElement = <Fragment>
                <label className='radioLabel'>
                    <input
                        name={props.name}
                        autoComplete='off'
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                        checked={props.checked}
                    />
                    {' ' + props.label}
                </label>
            </Fragment>;
            break;
        default:
            inputElement = <Fragment>
                <label className='Label' > {props.label} </label>
                <input
                    className='InputField'
                    autoComplete='off'
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            </Fragment>;
    }

    return (
        <Fragment>
            {inputElement}
        </Fragment>
    );
};

export default Input;