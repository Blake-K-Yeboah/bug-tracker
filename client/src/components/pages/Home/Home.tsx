import React from 'react';
import { Helmet } from 'react-helmet';
import SignUpForm from './SignUpForm';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="home">

            <Helmet>

                <title>Bug Tracker - Home</title>

            </Helmet>

            <Container className="h-100">

                <Row className="h-100">

                    <Col lg={3} style={{ top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>

                        <SignUpForm />

                    </Col>

                </Row>

            </Container>

        </div>
    )
}

export default Home