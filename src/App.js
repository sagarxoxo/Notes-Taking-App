import React,{useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navba';
import Notes from './components/Notes/Notes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateNotes from './components/Notes/CreateNotes/CreateNotes';
import './App.css'
import { setUser } from './redux/features/authSlice';
import SingleNotes from './components/Notes/SingleNotes/SingleNotes';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App(){

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(setUser(user));
  }, [dispatch])
  
  const {user } = useSelector((state) => ({ ...state.auth }));

  return (
    
  <BrowserRouter>
    <Container fluid>
      <Navbar />
        <Routes>
        {!user && <Route path="/login" exact element={<Login/>}/>}
        {!user && <Route path="/register" exact element={<Register/>}/> }
        <Route path="/" exact element={<Home/>}/>
        <Route path="/notes" exact element={<Notes/>}/>
        <Route path="/notes/:id" exact element={<SingleNotes/>}/>
        <Route path="/editnotes/:id" exact element={<CreateNotes />}/>
        <Route path="/createnotes" exact element={<CreateNotes/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Container>
  </BrowserRouter>
  
  );
}

export default App;