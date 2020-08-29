import React, { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IStoreProps } from '../../../types';
import { inject, observer } from 'mobx-react';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from '../Home/ErrorAlert';
import jwt_decode from 'jwt-decode';

const SignUpForm = inject('authStore')(observer(({ authStore }: IStoreProps) => {

    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let key: any = e.target.getAttribute('data-key');
        setUserInput({ ...userInput, [key]: e.target.value });

        // Validate value
        switch (key) {

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

    let url = new URL(window.location.href);

    let success: any = url.searchParams.get('success');

    const [serverError, setServerError] = useState(false);

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .post("/api/users/login", userInput)
            .then(res => {

                const { token } = res.data;

                let currentDate = new Date();

                currentDate.setMonth(currentDate.getMonth() + 1);

                // Cookie Expires in 1 month
                document.cookie = `jwtToken=${token}; expires=${currentDate}`;

                authStore.setToken(token);

                // Set token to Auth header
                if (token) {
                    // Apply authorization token to every request if logged in
                    axios.defaults.headers.common["Authorization"] = token;
                } else {
                    // Delete auth header
                    delete axios.defaults.headers.common["Authorization"];
                }

                // Decode token to get user data
                const decoded = jwt_decode(token);

                // Set current user
                authStore.setCurrentUser(decoded);

                history.push('/');
            })
            .catch(err => {
                if (err.response.status === 400) {
                    authStore.setError(null);
                    let errors = Object.entries(err.response.data);
                    errors.forEach(error => {
                        authStore.setError({ ...authStore.error, [error[0]]: error[1] });
                    });

                } else {
                    setServerError(true);
                }
            });

    }

    return (
        <div className="pt-5 pb-4 bg-light rounded-lg">

            <h2 className="text-center mb-2">Login</h2>

            <p className="text-center text-secondary">Fill out the following form to login</p>

            <Row>

                <Col lg={10} className="mx-auto">

                    {success === '1' ? <SuccessAlert /> : ''}

                    <Form onSubmit={login}>

                        {authStore.error || serverError ? <ErrorAlert serverError={serverError} /> : ''}

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
                        <Button variant="primary" type="submit" style={{ width: '100%', marginTop: 15, marginBottom: 15 }}>
                            Login
                        </Button>
                        <NavLink to="/" className="text-primary">Dont have an account?</NavLink>
                    </Form>

                </Col>

            </Row>

        </div>
    )
}));

export default SignUpForm
