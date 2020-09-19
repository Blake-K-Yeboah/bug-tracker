import React from 'react'

import { FaTimes } from 'react-icons/fa';

const ErrorAlert = ({ message, setShow }: any) => {


    const crossClickHandler = () => {
        setShow(false);
    }

    return (
        <div className="alert alert-error">
            <p className="alert-text">
                {message as string}
            </p>
            <FaTimes className="cross" onClick={crossClickHandler} />
        </div>
    )
}

export default ErrorAlert;
