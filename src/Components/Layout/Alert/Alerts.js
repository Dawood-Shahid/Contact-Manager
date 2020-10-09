import React, { useContext } from 'react';
import AlertContext from '../../../Context/Alert/alertContext';
import Modal from '../../UI/Modal/Modal';

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext;

    return (
        alerts.length > 0 && alerts.map(alert => (
            <Modal
                state={true}
                key={alert.id}
                alertClass={alert.type}
            >
                {alert.msg}
            </Modal>
            // <div
            //     key={alert.id}
            //     // className={}
            // >
            //     {alert.msg}
            // </div>    
        ))
    );
};

export default Alerts;
