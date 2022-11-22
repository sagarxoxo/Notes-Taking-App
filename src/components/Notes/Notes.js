import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Container,Row, Col, Button } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import createImg from '../images/Create.png';
import './Notes.css';
import laoding from '../images/loading.png';
import { getNotes,deleteNote } from '../../redux/features/notesSlice';

export default function Notes() {

  const {user} = useSelector((state) => ({ ...state.auth }));
  const {notes, loading} = useSelector((state) => ({ ...state.notes }));
  const userEmail = user?.result?.email;
  const dispatch = useDispatch();

  console.log(notes);
  
  useEffect(() => {
     dispatch(getNotes());
  },[dispatch])


  const handleDelete = (id) => {
   
      dispatch(deleteNote(id));
      setTimeout(() => {  window.location.reload() }, 1400);
  }

  return (
    (
    <Container fluid className="notesConatiner">
      {notes == null ?  
      (
        <div class="notesConatiner container-fluid">
          <div class="noLoginDeisgn"><h2>First Login To View Notes</h2>
          </div>
        </div>
      ) :
      
      <Row>
        <Col  xs={12} lg="3">
        <div className="crtn">
        <Link to="/createnotes">
        <div className="createNewCard">
            <img src={createImg} alt="newbook"/>
            <p>Create New Note</p>
          </div>
        </Link>
        </div>
        </Col>

        { !loading ? notes.map((item, index) => 
        item.user === userEmail && <Col xs={12} lg="3" key={index}>
           <div className="bookCard" >
              {item.selectedFile ? 
              <img src={item.selectedFile} alt="book" /> : 
              <div className="noImg"><h1>No Image</h1></div>}
              <div className="topRightDelete">
                <BsFillTrashFill className="BSIcon" onClick={() => handleDelete(item._id)}></BsFillTrashFill>
              </div>
              <div className="innerCard">
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <div className="cardBtns">
                <Button><Link to={`/editnotes/${item._id}`}>Edit</Link></Button>
                  <Button><Link to={`/notes/${item._id}`}>View Notes</Link></Button>
                </div>
              </div>
            </div> 
        </Col>
        ) : 
        <LoadingScreen
          loading={true}
          bgColor='#f1f1f1'
          spinnerColor='#2E4EE9'
          textColor='#676767'
          text='Wait a sec your data is laoding'
        >  </LoadingScreen>
        } 
      </Row>
    }
    
    </Container>)
  )
}