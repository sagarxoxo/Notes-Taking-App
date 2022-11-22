import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  Container,Row, Col } from 'react-bootstrap';
import LoadingScreen from 'react-loading-screen';

import { getNote } from '../../../redux/features/notesSlice';
import './SingleNotes.css';
import laoding from '../../images/loading.png';

function SingleNotes() {

    const {note , loading} = useSelector((state) => ({ ...state.notes }));
    const {user} = useSelector((state) => ({ ...state.auth }));
    const userEmail = user?.result?.email;
    const { id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNote(id));
      },[id, dispatch])

    return (
        
            <Container>
            <Row>
                <Col lg="2"></Col>
                <Col lg="8">
                {!loading ? (
                    note.user === userEmail ?
                    (<div className='singleNotsSection'>
                        {note.selectedFile && <img src={note.selectedFile} alt="Thumbnail Book" className="thubmnailImg" />}
                        <h1 className="notesTitleStyle">{note.title}</h1>
                        <p className="authorNameStyle">{note.author}</p>
                        <br></br>
                        <div className="descStyle" dangerouslySetInnerHTML={{ __html: note.fullnotes}} /> 
                    </div>) :
                    (
                        <div className="warning">
                            <h2>You are not Authrozied to View this Page</h2>
                        </div>
                       
                    )
                     ) : (<LoadingScreen
                        loading={true}
                        bgColor='#f1f1f1'
                        spinnerColor='#2E4EE9'
                        textColor='#676767'
                        text='Wait a sec your data is laoding'
                      >  </LoadingScreen>)}
                    
                </Col>
                <Col lg="2"></Col>
            </Row>
        </Container>
    )
}

export default SingleNotes;