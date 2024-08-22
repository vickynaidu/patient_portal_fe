import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import UserTableRow from './UserTableRow';
import useAuth from '../../hooks/UseAuth';
import { User } from '../../services/AuthService';
import { LoginService } from '../../services/LoginService';

const Users: React.FC = () => {
  const title = 'Users';

  const { getUsers } = useAuth();
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        //const allusers = await getUsers();
        const res = await LoginService.getUsers();
        if (isMounted) {
          setUsers(res.data);
        }
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(`failed to load users: ${err}`);   

      }
    })();

    return () => { isMounted = false; };
  }, [getUsers]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center   
 pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{title}</h1>   

          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button type="button" className="btn btn-sm btn-outline-secondary">Create</button>   

              <button type="button" className="btn btn-sm btn-outline-secondary">Remove</button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User ID</th>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Avatar</th>
              </tr>
            </thead>
            <tbody>
              {users && users?.length > 0
                ? <UserTableRow users={users} />
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;