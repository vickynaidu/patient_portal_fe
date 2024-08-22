import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer';
import MainNavbar from '../pages/MainNavBar';

const MainLayout: React.FC = () => {
  return (
    <>
      {/* <MainNavbar /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;