import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form, Container,Button, Row, Col } from 'react-bootstrap';
import './Register.css';
import { register } from '../../redux/features/authSlice';

function Register() {

    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const {firstName, lastName, email, password,confirmPassword} = formValue;

    const [formErrors,setFormErrors] = useState({});
    const[isSubmit,setIsSubmit] = useState(false);

    const { error } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      error && toast.error(error);
    }, [error]);



    const handleChange = (e) => {
      let {name, value} = e.target;
      setFormValue({...formValue, [name]: value})
    };

    const handleLogin = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValue));
      setIsSubmit(true);

      if (password !== confirmPassword) {
        return toast.error("Password should match");
      }
      if (email && password && firstName && lastName && confirmPassword) {
        dispatch(register({ formValue, navigate, toast }));
      }
    }

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          // console.log(formValue);
        }
      }, [formErrors, isSubmit, formValue]);

      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.firstName) {
          errors.firstName = "First Name is required!";
        } 

        if (!values.lastName) {
            errors.lastName = "Last Name is required!";
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

        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password does not match";
          }

        return errors;
      };

  return (
    <Container className="SignupSection">
        <Form onSubmit={handleLogin}
          noValidate>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" value={firstName} name="firstName" onChange={handleChange} />
            <p className="error">{formErrors.firstName}</p>
            </Form.Group>
          
            <Form.Group as={Col} controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" value={lastName} name="lastName" onChange={handleChange}/>
            <p className="error">{formErrors.lastName}</p>
            </Form.Group>
            
        </Row>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} name="email" onChange={handleChange} />
            <p className="error">{formErrors.email}</p>
        </Form.Group>
        
        <Row className="mb-3">
            <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} name="password" onChange={handleChange}/>
            <p className="error">{formErrors.password}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="cpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={confirmPassword} name="confirmPassword" onChange={handleChange}/>
            <p className="error">{formErrors.confirmPassword}</p>
            </Form.Group>
            
        </Row>
        
        <Button className="primaryBtnLogin" type="submit">
            Register
        </Button>
        
        <div>
        <Link className="sw" to="/login">
            <p>Already have an account ? Sign In</p>
        </Link>
        </div>
        
        </Form>
        
    </Container>
  )
}

export default Register;