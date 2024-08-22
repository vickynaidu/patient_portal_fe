import { NavLink, useNavigate } from 'react-router-dom';
import Jdenticon from './Jdenticon';
import '../../assets/css/console-navbar.css';
import logo from '../../assets/images/logo.svg';
import useAuth from '../../hooks/UseAuth';
import { logout } from '../../services/AuthService';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { clearLoginSession } from '../../slices/Login.slice';

const ConsoleNavbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.getSession();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout();
    console.log("Dispatching clearLoginSession");
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
    </nav>
  );
}

export default ConsoleNavbar;