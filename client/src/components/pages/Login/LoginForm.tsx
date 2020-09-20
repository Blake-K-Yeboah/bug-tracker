import React, { useState } from 'react'

// Import React icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Import NavLink Component
import { NavLink } from 'react-router-dom';

// Import Mobx Inject and Observer
import { inject, observer } from 'mobx-react';

// Import Store Type
import { IStoreProps } from '../../../types';

// Import Error Alert Component
import ErrorAlert from '../../alerts/ErrorAlert';
import SuccessAlert from '../../alerts/SuccessAlert';

// Import useHistory hook
import { useHistory } from 'react-router-dom';

let LoginForm = ({ authStore }: IStoreProps) => {

    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setUserInput({ ...userInput, [e.target.id]: e.target.value });

    }

    const [passwordType, setPasswordType] = useState('password');

    //let history = useHistory();

    // Set Error Function to not have to repeat both lines of code
    const setError = (bool: boolean) => {
        authStore.setError(bool);
        setErrorAlertShow(bool);
    }

    const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent Form Submission
        e.preventDefault();

        // Reset Error Value
        setError(false);

        // Validate Field Values
        Object.values(userInput).forEach((value: string) => {
            if (value.trim() === '') {
                setError(true);
            }
        });

        if (!authStore.error) {

            // Make Request

        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const success: boolean = urlParams.get('success') === "1" ? true : false;

    const [errorAlertShow, setErrorAlertShow] = useState(authStore.error);
    const [successAlertShow, setSuccessAlertShow] = useState(success);

    return (
        <div className="form-container">

            <h1 className="title">Login</h1>

            <p className="sub-text">Fill out the following form to login</p>

            <form className="form" onSubmit={loginHandler}>

                {errorAlertShow ? <ErrorAlert message="There was an error with your submission" setShow={setErrorAlertShow} /> : ''}

                {successAlertShow ? <SuccessAlert message="Account successfully created" setShow={setSuccessAlertShow} /> : ''}

                <div className="form-group">

                    <label htmlFor="email" className="input-label">Email</label>

                    <input type="email" className="input" placeholder="johndoe@gmail.com" id="email" value={userInput.email} onChange={onChange} />

                </div>

                <div className="form-group">

                    <label htmlFor="password" className="input-label">Password</label>

                    <input type={passwordType} className="input" placeholder="Keep it secret" id="password" value={userInput.password} onChange={onChange} />

                    {passwordType === "password" ? <FaEye className="eye-icon" onClick={() => { setPasswordType("text") }} /> : <FaEyeSlash className="eye-icon" onClick={() => { setPasswordType("password") }} />}

                </div>

                <div className="form-group">

                    <button className="submit-btn" type="submit">

                        Login

                    </button>

                </div>

                <NavLink to="/" className="link">Dont have an account?</NavLink>

            </form>

        </div >
    )

}

// Inject Authstore in component
LoginForm = inject("authStore")(observer(LoginForm));

export default LoginForm;
