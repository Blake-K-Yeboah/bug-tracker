import React from 'react'

const ErrorAlert = ({ message }: any) => {
    return (
        <div className="alert alert-error">
            <p className="alert-text">
                {message as string}
            </p>
        </div>
    )
}

export default ErrorAlert;
