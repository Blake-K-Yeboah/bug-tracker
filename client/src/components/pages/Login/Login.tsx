import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './LoginForm';
import { Container, Row, Col } from 'react-bootstrap';

const Login = () => {
    return (
        <div className="home">

            <Helmet>

                <title>Bug Tracker - Login</title>

            </Helmet>

            <Container className="h-100">

                <Row className="h-100">

                    <Col lg={3} style={{ top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>

                        <LoginForm />

                    </Col>

                </Row>

            </Container>

        </div>
    )
}

export default Login