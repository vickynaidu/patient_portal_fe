import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Jdenticon from './Jdenticon';
import '../../assets/css/console-navbar.css';
import logo from '../../assets/images/logo.svg';
import useAuth from '../../hooks/UseAuth';
import { logout } from '../../services/AuthService';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginSession } from '../../slices/login.slice';
import { Message } from '../../models/IMessage';
import { setSocketState } from '../../slices/socket.slice';
import { useEffect, useState } from 'react';
import SocketService from '../../services/SocketService';
import { LoginService } from '../../services/LoginService';
import { setChatState } from '../../slices/chat.slice';
import StatusAlert from './StatusAlert';
import { Alert } from 'react-bootstrap';

const ConsoleNavbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.getSession();
  const messageReceived = useSelector((state: RootState) => state.socketReducer.messageReceived);
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname !== '/console/chat') {
      //console.log("New message received in ConsoleNavbar ", messageReceived);
      setShow(true);
    }
  }, [messageReceived]);

  useEffect(() => {
    const subscribeChat = async () => {
      try {
        const users = await LoginService.getUsers();
        dispatch(setChatState({
          allUsers: users,
          selectedUser: null,
          userChatHistory: []
        }));
        // Handle socket disconnect
        return () => {
          SocketService.disconnect();

          dispatch(setSocketState({
            status: "disconnected",
            messageReceived: null
          }))
        };
      } catch (error) {
        console.error("Failed to connect to WebSocket server:", error);
      };
      subscribeChat();
    }
  }, []);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout();
    ////console.log("Dispatching clearLoginSession");
    dispatch(clearLoginSession({
      isAuthenticated: false,
      message: ""
    }));
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark p-1 shadow">
      <div className="d-flex flex-grow-1">
        <a className="navbar-brand d-flex pt-2" href="/console">
          <img src={logo} alt="console logo" className="navbar-logo" />Admin Console
        </a>
        <div className="w-100 text-right">
          <button className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="dropdown flex-grow-1 text-right" id="navbarDropdown">
          <ul className="navbar-nav ms-auto flex-nowrap">
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle nav-avatar-dropdown"
                id="dropdownMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Jdenticon className="nav-avatar rounded-circle" name={user ? user.email : ""} height="32px" width="32px" />
                {user ? user.firstName : ""} {user ? user.lastName : ""}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu">
                <li>
                  <NavLink className="profile-link" end to='/console/profile'>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      {show ? <Alert className="status-alert" variant='info' show={show} onClose={() => setShow(false)} dismissible>
      New message from <strong className="mx-2">{messageReceived?.from}</strong>
    </Alert> : null}
    </nav>
  );
}

export default ConsoleNavbar;