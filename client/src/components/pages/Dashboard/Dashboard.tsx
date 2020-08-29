import React from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../layout/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {

    return (
        <>

            <Helmet>

                <title>BugTracker - Dashboard</title>

            </Helmet>

            <Container fluid>

                <Row>

                    <Col xs={2}>

                        <Sidebar />

                    </Col>

                    <Col xs={10}>

                        <h1> Content Goes Here</h1>

                    </Col>

                </Row>

            </Container>
        </>
    )
}

export default Dashboard