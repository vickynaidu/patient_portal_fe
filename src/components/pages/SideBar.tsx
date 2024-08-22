import { NavLink } from 'react-router-dom';
import '../../assets/css/sidebar.css';
import useAuth from '../../hooks/UseAuth';
import { clientUrls, SidebarItem } from '../../common/constants';

const renderUrl = (item: string, i: number) => {
  const navObj: any = clientUrls.find(obj => obj.title === item);
  return (
    navObj
    ? <li key={i} className="nav-item">
      <NavLink className="nav-link" end to={navObj.path}>
        <i className={`bi ${navObj.icon} pe-2`} />
        {navObj.title}
      </NavLink>
    </li>
     : null
  )
}

const Sidebar: React.FC = () => {
  const { getSession } = useAuth();
  const user = getSession();
  const renderUserSideBar = () => {
    const items: string[] = user && user.role ? user.role.privileges : [];
    return (
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {
            items && items.length > 0
              ? items.map((item, i) => renderUrl(item, i))
              : null
          }
        </ul>
      </div>
    )
  };
  const renderAdminSideBar = () => {
    const items: string[] = user && user?.role.name === 'Admin' ? clientUrls.map(url => url.title) : [];
    return (
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {
            items && items.length > 0
              ? items.map((item, i) => renderUrl(item, i))
              : null
          }
        </ul>
      </div>
    )
  };
  console.log("user obj with roles: ", user);
  const isAdmin: boolean = user && user?.role.name === 'Admin' ? true : false;
  return (
    isAdmin ? renderAdminSideBar() : renderUserSideBar()
  );
}

export default Sidebar;
