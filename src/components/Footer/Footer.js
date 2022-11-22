import React from 'react'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card, Container,Row, Col } from 'react-bootstrap';
import './Footer.css'

export default function Fotter() {
    return (
      <Card.Footer className="text-muted footer">
        <Container fluid>
          <Row>
            <Col lg={10}>
              <div className="footerNavigation">
                <span>Home</span>
                <span>Features</span>
                <span>About Us</span>
                <span>Contact</span>
              </div>
            </Col>
            <Col className="cop" lg={2}>Copyrights 2022 - 2023</Col>
          </Row>
        </Container>
      </Card.Footer>
    )
  }

