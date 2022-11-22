import React, {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';

import '../../../../node_modules/react-quill/dist/quill.snow.css';
import '../../../../node_modules/react-toastify/dist/react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  Container,Row, Col, Button, Form } from 'react-bootstrap';
import './CreateNotes.css';
import { getNotes, createNotes, updateNote } from '../../../redux/features/notesSlice';
import laoding from '../../images/loading.png';

export default function CreateNotes() {

    const [show, setShow] = useState('');
    const [notesData, setNotesData] = useState({
        user: '',
        title: '',
        author: '',
        selectedFile: '',
    });

    const {title, author} = notesData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => ({ ...state.auth }));
    const {notes, loading} = useSelector((state) => ({ ...state.notes }));
    const {id} = useParams();
  
    const userEmail = user?.result?.email;

    useEffect(() => {
      if(id) {
        const singleNote = notes.find((note) => note._id === id);
          setNotesData({...singleNote});
          setShow(singleNote.fullnotes);
      }
    }, [id, notes]);

    useEffect(() => {
      dispatch(getNotes());
    }, [dispatch]);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setNotesData({...notesData, [name]: value})
    }

   function handleSubmit(e) {
    e.preventDefault();

    const variables = {
        ...notesData,
        user: userEmail,
        fullnotes: show,
    }

    if(!id){
      dispatch(createNotes({ variables, navigate, toast }));
    }
    else{
      dispatch(updateNote({ id, variables, navigate, toast }));
    }
   }
  
  return (
    <Container fluid  className="crContainer">
    <Row>
    {!loading ? (
    !user &&
    <Col lg={12}>
      <div className="noLoginDeisgn">
        <h2>First Login To View Notes</h2>
        <div> <Button className="btnChange"><Link to="/login">
            <p>Login</p>
        </Link></Button>
        <Button className="primaryBtn"><Link to="/register">
            <p>Sign Up</p>
        </Link></Button>
        <Link to="/" className='vi'>
            <p>Visit Homepage</p>
        </Link>
         </div>
        
      </div>
    </Col>
    ) : (<LoadingScreen
      loading={true}
      bgColor='#f1f1f1'
      spinnerColor='#2E4EE9'
      textColor='#676767'
      text='Wait a sec your data is laoding'
    >  </LoadingScreen>) }
    <Col lg={12}>
      <h2 className="title">{id ? "Update Notes" : "Add Notes"}</h2>
      </Col>
        <Col xs={12} lg={8}>
            <div className="editorSection">
            <div>
              <ReactQuill className="shadow-sm" theme="snow" style={{ height: "100%", marginTop: '1rem', display: 'flex', flexDirection: 'column'}}
                value={show || ''}

                modules={{
                  toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }], [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'align': []}],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', "video","image", "code-block"],
                    ['clean']
                    ],
                    }}
                    formats={[
                      'header', 'font', 'size',
                      'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background',
                      'list', 'bullet', 'indent', 'link', 'video', 'image', "code-block", "align"
                    ]}
                    
                    onChange={(val) => {
                      setShow(val)
                    }}
              />
            </div>
            </div>
        </Col>
        <Col xs={12} lg={4}>
            <div className="infoSection">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Book Title" 
                    value={title || ''} 
                    name="title" 
                    onChange={handleChange}
                     />
                    <Form.Label>Author:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Author Name" 
                    value={author || ''} 
                    name="author" 
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image:</Form.Label>
                    <FileBase type="file" 
                     multiple={false} 
                     onDone={({ base64 }) => setNotesData({ ...notesData, selectedFile: base64 })} />
                    
                </Form.Group>
                <Button className="primaryBtnCR" onClick={handleSubmit}>{id ? "Update " : "Save"}</Button>
                </Form>
                <div></div>
            </div>
        </Col>
        
    </Row>

    </Container>
  )
}