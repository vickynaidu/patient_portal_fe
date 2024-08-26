import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import UserTableRow from './UserTableRow';
import useAuth from '../../hooks/UseAuth';
import { User } from '../../services/AuthService';
import { LoginService } from '../../services/LoginService';
import { Specialization } from '../../models/ISpecialization';
import { SpecializationsService } from '../../services/SpecializationsService';
import SpecializationsTableRow from './SpecializationsTableRow';
import { Button, Form, Modal } from 'react-bootstrap';
import { specializationList } from '../../common/constants';

const Specializations: React.FC = () => {
  const title = 'Specializations';

  const { getUsers } = useAuth();
  const [specializations, setSpecializations] = useState<Specialization[]>();
  const [show, setShow] = useState(false);
  const [spec, setSpec] = useState<string>("");
  const [startYear, setStartYear] = useState<string>("");
  const handleClose = () => {
    setShow(false);
    //setIsEditable(!isEditable);
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      getAllSpecializations();
    })();

    return () => { isMounted = false; };
  }, [getUsers]);

  const getAllSpecializations = async () => {
    try {
      //const allusers = await getUsers();
      const res = await SpecializationsService.getAllSpecializations();
      ////console.log("Specialization res: ", res);
      setSpecializations(res);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(`failed to load Specialization: ${err}`);

    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ////console.log("Handle submit called: ", spec, startYear);
    const res = await SpecializationsService.createSpecialization({"specialization": spec, "start_year": parseInt(startYear)});
    ////console.log("create res: ", res);
    if(res.status === 200 || res.status === 201) {
      ////console.log("Specialization added successfully");
      getAllSpecializations();
    }
  };

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
              <Button className="btn btn-sm btn-primary" onClick={() => setShow(true)}>
                Create
              </Button>
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
              {specializations && specializations?.length > 0
                ? <SpecializationsTableRow specializations={specializations} />
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Specialization">
              <Form.Label>Select Specialization</Form.Label>
              <Form.Select required aria-label="Default select example" name='spec' onChange={(e) => setSpec(e.target.value)}>
                <option key={0} value="">Select Specialization</option>
                {specializationList.map((spec, i) => <option value={spec} key={i+1}>{spec}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="start_year">
              <Form.Label>Enter starting year</Form.Label>
              <Form.Control required type="number" placeholder="Start year" name="start_year" onChange={(e) => setStartYear(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Specializations;