import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const SignUpForm = () => {
    return (
        <div className="pt-5 pb-4 bg-light rounded-lg">

            <h2 className="text-center mb-2">Sign Up</h2>

            <p className="text-center text-secondary">Fill out the following form to sign up</p>

            <Row>

                <Col lg={10} className="mx-auto">

                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="johndoe@gmail.com" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Keep it secret..." />
                        </Form.Group>
                        <Form.Group controlId="repeatPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat it" />
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
