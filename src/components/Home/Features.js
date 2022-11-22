import React from 'react'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  Container,Row, Col,Card } from 'react-bootstrap';
import secImg from '../images/undrawfeature.svg';
import notesImg from '../images/Notes.png';
import read from '../images/read.png';
import edit from '../images/edit.png';
import addImage from '../images/Addiamge.png';
import './Home.css'

export default function Features() {
    return (
      <Container fluid className="containerSecond" id="section2">
      <Row>
      <h2 className="top-center">Features</h2>
        <Col>
        <div  className="secImg">
          <img src={secImg} alt="features" />
        </div>
        </Col>
        <Col>
       
        <div className="secondSec">
          <Card>
            <Card.Body>
              <div>
              <img src={notesImg} alt="features" />
                <p>Create Multiple Notes</p>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
            <div>
              <img src={addImage} alt="features" />
                <p>Add Images In Notes</p>
              </div>
           </Card.Body>
          </Card>
          <Card>
            <Card.Body>
            <div>
              <img src={edit} alt="features" />
                <p>Edit Chanegs</p>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body> <div>
              <img src={read} alt="features" />
                <p>Read Anywhere</p>
              </div>
            </Card.Body>
          </Card>
        </div>
        </Col>
      </Row>
    </Container>
    )
  }

