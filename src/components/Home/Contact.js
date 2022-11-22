import React from 'react'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  Container,Row, Col,Form, Button } from 'react-bootstrap';
import contactImg from '../images/contact.svg'
import './Home.css';

export default function Contact() {
    return (
      <Container fluid className="contactSec" id="section4">
        <h2>Contact</h2>
      <Row>
        <Col xs={{ order: 'last' }}>
        <div className="contactFormSec">
          <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Full Name" />
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" placeholder="Message"rows={3} />
              </Form.Group>
              <Button className="primaryBtnSecContact">Sumbit</Button>
            </Form>
        </div>
         
        </Col>
        <Col xs={{ order: 'first' }}>
        <div  className="contactImg">
          <img src={contactImg} alt="contact"/>
        </div>
        </Col>
      </Row>
    </Container>
    )
  }

