import React from 'react'
import { Link } from "react-router-dom";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  Container,Row, Col, Button } from 'react-bootstrap';
import frontImage from '../images/undrawBook1.svg';
import './Home.css'

export default function FirstSection() {
    return (
    <Container fluid className="containerFirst">
      <Row>
       
        <Col xs={{ order: 'last' }}>
        <div className="firstSec">
          <h1>Take Notes For  Book</h1>
          <p>This site makes the notes taking very simple, so that you can go through the notes any time. </p>
          <Button className="primaryBtnSec"> <Link className="navigate" to="/createnotes">
            <p>Create Notes</p>
        </Link></Button>
        </div>
        </Col>
        <Col xs={{ order: 'first' }}>
        <div className="firstImgSec">
          <img src={frontImage} alt="take notes"/>
        </div>
        </Col>
      </Row>
    </Container>
    )
  }

