import React from 'react'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  Container,Row, Col } from 'react-bootstrap';
import './Home.css';

export default function About() {
    return (
      <Container fluid className="aboutSec" id="section3">
        <Row>
          <Col>
            <h2>About Us</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                <br/> <br/>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Col>
        </Row>
      </Container>
    )
  }

