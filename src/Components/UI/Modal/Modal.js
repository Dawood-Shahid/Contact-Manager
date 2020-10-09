import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = (props) => {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.state !== this.props.state || nextProps.children !== this.props.children;
    // }
//  console.log(props.alertClass)
    return (
        <Fragment>
            <Backdrop show={props.state} />
            <div className={`Modal ${props.alertClass}`}>
                {props.children}
            </div>
        </Fragment>
    );
};

export default Modal;