import React, { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IStoreProps } from '../../../types';
import { inject, observer } from 'mobx-react';
import ErrorAlert from './ErrorAlert';

const SignUpForm = inject('authStore')(observer(({ authStore }: IStoreProps) => {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: "",
        repeatedPassword: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let key: any = e.target.getAttribute('data-key');
        setUserInput({ ...userInput, [key]: e.target.value });

        // Validate value
        switch (key) {

            case 'name':
                if (!e.target.value) {
                    e.target.classList.add('is-invalid');
                } else {
                    e.target.classList.remove('is-invalid');
                }
                break;
            case 'email':
                if (!e.target.value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                    e.target.classList.add('is-invalid');
                } else {
                    e.target.classList.remove('is-invalid');
                    e.target.classList.add('is-valid');
                }
        }

    }

    const [eyeStatus, setEyeStatus] = useState(false);

    const eyeIcon = eyeStatus ? <FaEyeSlash /> : <FaEye />

    const eyeClickHandler = () => {

        // Toggle Eye Status
        setEyeStatus(!eyeStatus);

    }

    let history = useHistory();

    const [serverError, setServerError] = useState(false);

    const signUp = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        axios.post('/api/users/register', userInput).then(res => {
            authStore.setError(null);
            history.push('/login?success=1')
        }).catch(err => {
            if (err.response.status === 400) {
                authStore.setError(null);
                let errors = Object.entries(err.response.data);
                errors.forEach(error => {
                    authStore.setError({ ...authStore.error, [error[0]]: error[1] });
                });
            } else {
                setServerError(true)
            }
        })
    }

    return (
        <div className="pt-5 pb-4 bg-light rounded-lg">

            <h2 className="text-center mb-2">Sign Up</h2>

            <p className="text-center text-secondary">Fill out the following form to sign up</p>

            <Row>

                <Col lg={10} className="mx-auto">

                    <Form onSubmit={signUp}>

                        {authStore.error || serverError ? <ErrorAlert serverError={serverError} /> : ''}

                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" value={userInput.name} onChange={onChange} data-key="name" className={authStore.error && authStore.error.name ? "is-invalid" : ""} />
                            {authStore.error && authStore.error.name ? <div className="invalid-feedback">{authStore.error.name}</div> : ''}
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="johndoe@gmail.com" value={userInput.email} onChange={onChange} data-key="email" className={authStore.error && authStore.error.email ? "is-invalid" : ""} />
                            {authStore.error && authStore.error.email ? <div className="invalid-feedback">{authStore.error.email}</div> : ''}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control type={eyeStatus ? "text" : "password"} placeholder="Keep it secret..." value={userInput.password} onChange={onChange} data-key="password" className={authStore.error && authStore.error.password ? "is-invalid" : ""} />
                                <InputGroup.Append onClick={eyeClickHandler} style={{ cursor: "pointer" }}>
                                    <InputGroup.Text>
                                        {eyeIcon}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                                {authStore.error && authStore.error.password ? <div className="invalid-feedback">{authStore.error.password}</div> : ''}
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control type={eyeStatus ? "text" : "password"} placeholder="Confirm Password" value={userInput.repeatedPassword} onChange={onChange} data-key="repeatedPassword" className={authStore.error && authStore.error.repeatedPassword ? "is-invalid" : ""} />
                                <InputGroup.Append onClick={eyeClickHandler} style={{ cursor: "pointer" }}>
                                    <InputGroup.Text>
                                        {eyeIcon}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                                {authStore.error && authStore.error.repeatedPassword ? <div className="invalid-feedback">{authStore.error.repeatedPassword}</div> : ''}
                            </InputGroup>
                        </Form.Group>
                        <Button variant="info" type="submit" style={{ width: '100%', marginTop: 15, marginBottom: 15 }}>
                            Sign Up
                        </Button>
                        <NavLink to="/login" className="text-info">Already have an account?</NavLink>
                    </Form>

                </Col>

            </Row>

        </div>
    )
}));

export default SignUpForm
