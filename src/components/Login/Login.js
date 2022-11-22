import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Container,Button } from 'react-bootstrap';
import './Login.css';
import { googleSignIn, login } from "../../redux/features/authSlice";


function Login() {

    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })

    const [formErrors,setFormErrors] = useState({});
    const[isSubmit,setIsSubmit] = useState(false);

    const { error } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

      useEffect(() => {
        error && toast.error(error);
      }, [error]);

    
    const {email, password} = formValue;


    const handleChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    }

    const handleLogin = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValue));
      setIsSubmit(true);

      if (email && password) {
          dispatch(login({ formValue, navigate, toast }));
      }
      notify();

    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }
      }, [formErrors, isSubmit]);

    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username) {
        errors.username = "Username is required!";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
        return errors;
    };

    const notify = () => toast("Wow so easy!");
      //google auth

      const googleSuccess = (response) => {
        const userObj = jwt_decode(response.credential)
        const name = userObj.name;
        const email = userObj.email;
        const picture = userObj.picture;
        const googleId = userObj.sub;

        const result = {name, email, picture, googleId};
        dispatch(googleSignIn({result, navigate, toast}));
      }

      const googleFailure = (response) => {
      }




      
  return (
    
    <Container className="LoginSection">
        <Form 
          noValidate>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label> 
            <Form.Control type="email" placeholder="Enter email" value={email} name="email" onChange={handleChange} />
        </Form.Group>

        <p className="error">{formErrors.email}</p>
        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} name="password"  onChange={handleChange} />
        </Form.Group>
        <p className="error">{formErrors.password}</p>
        <Button className="primaryBtnLogin" type="submit" onClick={handleLogin}>
            Login
        </Button>
        
        
        <div className="googleS">
        <p>------ or ------</p>
       <div className='googleAuthStyle'>
       <GoogleOAuthProvider clientId="986776255028-0elk50ifbusbjn563jet0l9ar4t9kf95.apps.googleusercontent.com">
            <GoogleLogin
          onSuccess={googleSuccess}
          onError={googleFailure}
          
        />

        </GoogleOAuthProvider>
       </div>
        <Link className="sw" to="/register">
            <p>Don't have an account ? Sign Up</p>
        </Link>
        </div>
        </Form>
    </Container>
    
  )
}

export default Login;