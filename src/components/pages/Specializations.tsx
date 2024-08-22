import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import UserTableRow from './UserTableRow';
import useAuth from '../../hooks/UseAuth';
import { User } from '../../services/AuthService';
import { LoginService } from '../../services/LoginService';
import { Specialization } from '../../models/ISpecialization';
import { SpecializationsService } from '../../services/SpecializationsService';
import SpecializationsTableRow from './SpecializationsTableRow';
import { Button, Modal } from 'react-bootstrap';

const Specializations: React.FC = () => {
  const title = 'Specializations';

  const { getUsers } = useAuth();
  const [specialization, setSpecialization] = useState<Specialization[] | undefined>();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    //setIsEditable(!isEditable);
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        //const allusers = await getUsers();
        const res = await SpecializationsService.getAllSpecializations();
        if (isMounted) {
          setSpecialization(res.data);
        }
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(`failed to load Specialization: ${err}`);

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
              <button type="button" className="btn btn-sm btn-primary" on-click={() => setShow(true)}>Create</button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Specializations</th>
                <th scope="col">Starting Year</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {specialization && specialization?.length > 0
                ? <SpecializationsTableRow specializations={specialization} />
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Specializations;