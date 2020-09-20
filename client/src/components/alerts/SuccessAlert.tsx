import React from 'react'

import { FaTimes } from 'react-icons/fa';

const SuccessAlert = ({ message, setShow }: any) => {


    const crossClickHandler = () => {
        setShow(false);
    }

    return (
        <div className="alert alert-success">
            <p className="alert-text">
                {message as string}
            </p>
            <FaTimes className="cross" onClick={crossClickHandler} />
        </div>
    )
}

export default SuccessAlert;
