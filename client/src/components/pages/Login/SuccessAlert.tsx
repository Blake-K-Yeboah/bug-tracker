import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const SuccessAlert = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                Account created successfully!
            </Alert>
        );
    } else {
        return (<></>)
    }
}

export default SuccessAlert