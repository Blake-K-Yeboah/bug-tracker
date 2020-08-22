import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorAlert = (props: any) => {
    return (
        <Alert variant="danger">
            {props.serverError ? 'An Error occured on our end. Try Again Later' : 'There was a problem with your submission'}
        </Alert>
    )
}

export default ErrorAlert