import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { login } from '../../features/authSlice';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { LoginService } from '../../services/LoginService';
import { login } from '../../slices/login.slice';
import { AppDispatch, RootState, store } from '../../app/store';
import "../../assets/css/Login.css";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.svg";
import useAuth from '../../hooks/UseAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { setSession } from "../../services/AuthService";
import Footer from './Footer';

export interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const { login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const message = useSelector((state: RootState) => state.loginReducer.message);
  const isAuthenticated = useSelector((state: RootState) => state.loginReducer.isAuthenticated);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: LoginData = { email: inputUsername, password: inputPassword };
    const res: any = await LoginService.userAuthetication(userData, dispatch);
    ////console.log("Login res: ", res);
    if (res["status"] === 200 || res["status"] === 201) {
      dispatch(login({
        isAuthenticated: true,
        message: res["data"]["message"]
      }));

    } else {
      dispatch(login({
        isAuthenticated: false,
        message: res?.["response"]?.["data"]?.["message"] ||
          "Something went wrong! Please try after sometime"
      }));
    }
  };

  const processDashBardRequests = async () => {
    const user = await LoginService.getuserProfile();
    delete user.password;
    setSession(user, jsCookie.get("authToken") || "");
    navigate(redirectPath(search));
  }

  useEffect(() => {
    const token = jsCookie.get('authToken');
    ////console.log("After login: ", token, isAuthenticated);
    if (isAuthenticated && token) {
      processDashBardRequests();
    }
  }, [isAuthenticated]);

  const redirectPath = (search: any) => {
    const match = search.match(/redirect=(.*)/);
    const redirect = match?.[1];
    return redirect ? decodeURIComponent(redirect) : '/console';
  }

  const handlePassword = () => {
    ////console.log("Trying to reset password...!");
  };
  const handleSignup = () => {
    ////console.log("Trying to register...!");
    navigate('/signup');
  };
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  return (
    // <div style={{ marginTop: `${(windowHeight / 2) - 200}px`, "display": "flex", "justifyContent": "center" }} className='Login'>
    //   <Container fluid='md' style={{ "width": "400px", "backgroundColor": "#f7f7f7", borderRadius: 10 }}>
    //     <Row className="justify-content-md-center">
    //       <Col xs={12} md={12}>
    //         <h3 className="text-center">Login</h3>
    //         { message ? <h4 style={{color: "red"}} className="text-center"> {message} </h4> : null}
    //         <Form onSubmit={handleSubmit}>
    //           <Form.Group controlId="formEmail">
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control
    //               type="email"
    //               placeholder="Enter email"
    //               value={email}
    //               onChange={(e: any) => setEmail(e.target.value)}
    //               required
    //             />
    //           </Form.Group>
    //           <Form.Group controlId="formPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control
    //               type="password"
    //               placeholder="Password"
    //               value={password}
    //               onChange={(e: any) => setPassword(e.target.value)}
    //               required
    //             />
    //           </Form.Group>
    //           <Button variant="primary" type="submit" className="mt-3">
    //             Login
    //           </Button>
    //         </Form>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className='sign-in_card'>
        {/* Overlay */}
        <div className="sign-in__backdrop"></div>
        {/* Form */}
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          {/* Header */}
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Sign In</div>
          {/* ALert */}
          {show ? (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              Incorrect username or password.
            </Alert>
          ) : (
            <div />
          )}
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={inputUsername}
              placeholder="Username"
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="checkbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          {!isLoading ? (
            <Button className="w-100" variant="primary" type="submit">
              Log In
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Logging In...
            </Button>
          )}
          <div className='row'>
            <div className="col justify-content-start">
              <Button
                className="text-muted px-0"
                variant="link"
                onClick={handleSignup}
              >
                Signup
              </Button>
            </div>
            <div className="col justify-content-end">
              <Button
                className="text-muted px-0"
                variant="link"
                onClick={handlePassword}
              >
                Forgot password?
              </Button>
            </div>
          </div>
        </Form>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Login;