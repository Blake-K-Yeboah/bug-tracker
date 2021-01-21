import React from 'react'

// Import Icons
import { FaTimes } from 'react-icons/fa';

// Props Interface
interface PropsI {
    message: string,
    setShow: (show: boolean) => void
}

const ErrorAlert = ({ message, setShow }: PropsI) => {

    // Handle Close Button Click
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
