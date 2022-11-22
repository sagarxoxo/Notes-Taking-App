import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container,Nav,Button } from 'react-bootstrap';
import logo from '../images/logo.png';
import './Navba.css';
import { setLogout } from '../../redux/features/authSlice';

export default function Navba() {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const {user} = useSelector((state) => ({ ...state.auth }));

  const logout = () =>{
    dispatch(setLogout());
    navigate("/");
  }

  return (
    <Navbar collapseOnSelect expand="xxl">
   <Container fluid className="customNav">
    <Navbar.Brand href="/"><img src={logo} className="logoSize" alt="logo" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto navigation">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/">Features</Nav.Link>
        <Nav.Link href="/">About Us</Nav.Link>
        <Nav.Link href="/">Contact Us</Nav.Link>
        {

          user?.result?.email && <Nav.Link href="/notes">My Notes</Nav.Link> }
        {
          user?.result?.email &&
         <Nav.Link href="/createnotes">Create Notes</Nav.Link>

        }
      </Nav>
      {user?.result?.email ? (
        <Nav className="navRight">
          <p>{user.result.name}</p>
          <img src={(user.result.picture) ? user.result.picture : "https://www.w3schools.com/howto/img_avatar.png"} className="rounded-circle profileImg shadow-4"
                 alt="Avatar" />
          <Button className="primaryBtn" onClick={logout}>Logout</Button>
        </Nav>
      ) : 
      (<Nav>
        <Button className="btnChange"><Link to="/login">
            <p>Login</p>
        </Link></Button>
        <Button className="primaryBtn"><Link to="/register">
            <p>Sign Up</p>
        </Link></Button>
        </Nav>)
      }
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}