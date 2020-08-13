import React, { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpForm = () => {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: "",
        repeatedPassword: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    }

    const [eyeStatus, setEyeStatus] = useState(false);

    const eyeIcon = eyeStatus ? <FaEyeSlash /> : <FaEye />

    const eyeClickHandler = () => {

        // Toggle Eye Status
        setEyeStatus(!eyeStatus);

    }

    return (
        <div className="pt-5 pb-4 bg-light rounded-lg">

            <h2 className="text-center mb-2">Sign Up</h2>

            <p className="text-center text-secondary">Fill out the following form to sign up</p>

            <Row>

                <Col lg={10} className="mx-auto">

                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" value={userInput.name} onChange={onChange} id="name" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="johndoe@gmail.com" value={userInput.email} onChange={onChange} id="email" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control type={eyeStatus ? "text" : "password"} placeholder="Keep it secret..." value={userInput.password} onChange={onChange} id="password" />
                                <InputGroup.Append onClick={eyeClickHandler} style={{ cursor: "pointer" }}>
                                    <InputGroup.Text>
                                        {eyeIcon}
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control type={eyeStatus ? "text" : "password"} placeholder="Confirm Password" value={userInput.repeatedPassword} onChange={onChange} id="repeatedPassword" />
                                <InputGroup.Append onClick={eyeClickHandler} style={{ cursor: "pointer" }}>
                                    <InputGroup.Text>
                                        {eyeIcon}
                                    </InputGroup.Text>
                                </InputGroup.Append>
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
}

export default SignUpForm
