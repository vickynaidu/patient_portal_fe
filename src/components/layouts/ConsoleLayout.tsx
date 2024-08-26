import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Footer';
import ConsoleNavbar from '../pages/ConsoleNavbar';
import Sidebar from '../pages/SideBar';
import useAuth from '../../hooks/UseAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import jsCookie from 'js-cookie';

const ConsoleLayout: React.FC = () => {
  //const auth = useAuth();
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.loginReducer.isAuthenticated);
  const token = jsCookie.get("authToken");

  if (isAuthenticated || token) {
    return (
      <>
        <ConsoleNavbar />
        <div className="container-fluid">
          <div className="row">
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
              <Sidebar />
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{paddingBottom: 10}}>
              <Outlet />
              <Footer />
            </main>
          </div>
        </div>
      </>
    );
  }

  return <Navigate to={`/login?redirect=${encodeURIComponent(pathname)}`} replace />;
};

export default ConsoleLayout;