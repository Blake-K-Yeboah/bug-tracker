import React, { useState } from 'react'

// Import React icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Import Mobx Inject and Observer
import { inject, observer } from 'mobx-react';

// Import Store Type
import { IStoreProps } from '../../../types';
import ErrorAlert from '../../alerts/ErrorAlert';

let SignUpForm = ({ authStore }: IStoreProps) => {

    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: '',
        repeatedPassword: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setUserInput({ ...userInput, [e.target.id]: e.target.value });

    }

    const [passwordType, setPasswordType] = useState('password');


    const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent Form Submission
        e.preventDefault();

        // Reset Error Value
        authStore.setError(false);

        // Validate Field Values
        Object.values(userInput).forEach((value: string) => {
            if (value.trim() === '') {
                authStore.setError(true);
                setAlertShow(true);
            }
        });

        if (!authStore.error) {

            // Make Request

        }
    }

    const [alertShow, setAlertShow] = useState(authStore.error);

    return (
        <div className="sign-up-form-container">

            <h1 className="title">Sign Up</h1>

            <p className="sub-text">Fill out the following form to sign up</p>

            <form className="sign-up-form" onSubmit={signUpHandler}>

                {alertShow ? <ErrorAlert message="There was an error with your submission" setShow={setAlertShow} /> : ''}

                <div className="form-group">

                    <label htmlFor="name" className="input-label">Name</label>

                    <input type="text" className="input" placeholder="John Doe" id="name" value={userInput.name} onChange={onChange} />

                </div>

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

                    <label htmlFor="repeatedPassword" className="input-label">Repeat Password</label>

                    <input type="password" className="input" placeholder="Repeat it" id="repeatedPassword" value={userInput.repeatedPassword} onChange={onChange} />

                </div>

                <div className="form-group">

                    <button className="submit-btn" type="submit">

                        Sign Up

                    </button>

                </div>

                <NavLink to="/login" className="link">Already have an account?</NavLink>

            </form>

        </div >
    )

}

// Inject Authstore in component
SignUpForm = inject("authStore")(observer(SignUpForm));

export default SignUpForm;
