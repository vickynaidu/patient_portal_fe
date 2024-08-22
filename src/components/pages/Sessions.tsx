import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SessionTableRow from "./SessionTableRow";
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Session } from '../../models/ISession';
import { SessionService } from '../../services/SessionsService';
import { setSessions } from '../../slices/session.slice';
import { Button, Modal } from 'react-bootstrap';

const SessionsView: React.FC = () => {
    const title = 'Sessions';
    const dispatch: AppDispatch = useDispatch();
    const allSessions = useSelector((state: RootState) => state.sessionReducer.allSessions);
    const [init, setInit] = useState(false);
    const [show, setShow] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const handleClose = () => {
        setShow(false);
        setIsEditable(!isEditable);
    };
    const handleShow = () => setShow(true);
    const handleIsEditable = (flag: boolean) => {
        console.log("handleIsEditable function is called with flag : ", flag);
        handleShow();
        setIsEditable(flag);
    };

    useEffect(() => {
        if (!init)
            callAllSessions();
    });

    const callAllSessions = async () => {
        const allSessions = await SessionService.getAllSessions();
        dispatch(setSessions({
            allSessions: allSessions,
            session: null,
            loading: false
        }));
        setInit(true);
    }

    const openAppointment = (id: string) => {
        console.log("Appointment details of id: ", id);
    }
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
                        <button type="button" className="btn btn-sm btn-primary" onClick={() => handleIsEditable(true)}>Create</button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Doc Name</th>
                                <th scope="col">Avatar</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <SessionTableRow sessions={allSessions} handleIsEditable={handleIsEditable}/>
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

export default SessionsView;
