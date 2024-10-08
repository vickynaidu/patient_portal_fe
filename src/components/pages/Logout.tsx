import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';

import useAuth from '../../hooks/UseAuth';

import './auth.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { clearLoginSession } from '../../slices/login.slice';
import SocketService from '../../services/SocketService';
import { setSocketState } from '../../slices/socket.slice';

const Logout: React.FC = () => {
  const title = 'Logout';

  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    ////console.log("Dispatching clearLoginSession");
    dispatch(clearLoginSession({
      isAuthenticated: false,
      message: ""
    }));
    await logout();
    setIsLoading(false);
    SocketService.disconnect();
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <Form noValidate>
          <i className="bi bi-file-lock-fill auth-icon my-4"/>
          <p className="mb-3 fw-normal">Click <strong>Log out</strong> button to log out and navigate back to home.</p>
          <Button className="w-100 btn btn-lg btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleLogout}
          >
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoading} />
            <span className="px-2">Log out</span>
          </Button>
        </Form>
      </main>
    </>
  );
}

export default Logout;