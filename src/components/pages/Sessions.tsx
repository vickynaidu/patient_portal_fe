import React, { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SessionTableRow from "./SessionTableRow";
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Session } from '../../models/ISession';
import { SessionService } from '../../services/SessionsService';
import { setSessions } from '../../slices/session.slice';
import { Button, Form, Modal } from 'react-bootstrap';
import { specializationList } from '../../common/constants';
import AutoSuggest from './AutoSuggest';
import { SpecializationsService } from '../../services/SpecializationsService';
import { Specialization } from '../../models/ISpecialization';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { setHours, setMinutes } from 'date-fns';

const SessionsView: React.FC = () => {
    const title = 'Sessions';
    const dispatch: AppDispatch = useDispatch();
    const allSessions = useSelector((state: RootState) => state.sessionReducer.allSessions);
    const [init, setInit] = useState(false);
    const [show, setShow] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [selectedSpec, setSelectedSpec] = useState("");
    const [searchDocList, setSearchDocList] = useState<Specialization[]>([]);
    const [availableDoctors, setAvailableDoctors] = useState<string[]>();
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDoctorAppts, setSelectedDoctorAppts] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

    const handleClose = () => {
        setInit(false);
        setShow(false);
        setIsEditable(!isEditable);
        setSelectedSpec("");
        setAvailableDoctors([]);
        setSelectedDoctor("");
        setSelectedDate(new Date());
        setSelectedTime(new Date());
    };
    const handleShow = () => setShow(true);
    const handleIsEditable = (flag: boolean) => {
        //console.log("handleIsEditable function is called with flag : ", flag);
        handleShow();
        setIsEditable(flag);
    };

    useEffect(() => {
        if (!init)
            callAllSessions();
    });

    const callAllSessions = async () => {
        const allSessions = await SessionService.getAllSessions();
        if(allSessions && allSessions.length > 0) {
            dispatch(setSessions({
                allSessions: allSessions,
                session: null,
                loading: false
            }));
        }
        setInit(true);
    };

    const openAppointment = (id: string) => {
        //console.log("Appointment details of id: ", id);
    };

    const bookAppointment = async () => {
        const nameSplit = selectedDoctor.split(" ");
        const specDoctor = searchDocList.find(doc => doc.doctor.firstName === nameSplit[0] && doc.doctor.lastName === nameSplit[1]);
        const doc = specDoctor ? specDoctor.doctor : null;
        //console.log(specDoctor?._id, selectedDate);
        const payload: Session = {
            _id: "",
            session_with: specDoctor ? specDoctor._id : "",
            is_completed: false,
            session_date: selectedDate,
            session_time: moment(selectedDate).format("HH:mm"),
            meeting_notes: [],
            prescription: []
        };
        //console.log("Book appointment payload: ", payload);
        const res = await SessionService.createSession(payload);
        //console.log("Book Appointment response: ", res);
        handleClose();
    };

    const handleSuggestionSelect = async (suggestion: string) => {
        setSelectedSpec(suggestion);
        const specListWithDocs: Specialization[] = await SpecializationsService.searchSpecializations(suggestion);
        setSearchDocList(specListWithDocs);
        //console.log("Available doctors for ", suggestion, 'are ', availableDoctors);
        if (specListWithDocs && specListWithDocs.length > 0) {
            const doctorList = specListWithDocs.map(doc => `${doc.doctor.firstName} ${doc.doctor.lastName}`);
            await setAvailableDoctors(doctorList);
        }
    };

    const handleDoctorSelect = async (suggestion: string) => {
        setSelectedDoctor(suggestion);
        const nameSplit = suggestion.split(" ");
        const specDoctor = searchDocList.find(doc => doc.doctor.firstName === nameSplit[0] && doc.doctor.lastName === nameSplit[1]);
        const doc = specDoctor ? specDoctor.doctor : null;
        //console.log("Selected doctor: ", doc);
        if (doc) {
            // setSelectedDoctorAppts([]);
            const doctorAppointments = await SpecializationsService.getDoctorAppointments(doc?._id, moment(new Date()).format("YYYY-MM-DD"));
            //console.log("doctorAppointmens: ", doctorAppointments);
            if (doctorAppointments && doctorAppointments.length > 0) {
                const slots: string[] = doctorAppointments.map((slot: string) => slot.split(" ")[1]);
                //console.log("converted slots: ", slots);
                setSelectedDoctorAppts(slots);
            }
            //console.log("Available doctor appointments: ", selectedDoctorAppts);
            callAllSessions();
            //handleClose();
        }
    };

    const handleDateClick = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
        setSelectedDate(date);
        //console.log('Date clicked:', date); // You can replace this with your custom logic
    };

    const filterTimes = (time: Date) => {
        const injectedTimes = selectedDoctorAppts.map((slot: string) => setHours(setMinutes(new Date(), parseInt(slot.split(":")[1])), parseInt(slot.split(":")[0])));
        return injectedTimes.some(
            injectedTime =>
                injectedTime.getHours() === time.getHours() &&
                injectedTime.getMinutes() === time.getMinutes()
        );
    };
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="container-fluid">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
                            <SessionTableRow sessions={allSessions} handleIsEditable={handleIsEditable} />
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Specializations</Form.Label>
                        <AutoSuggest suggestions={specializationList} onSuggestionSelect={handleSuggestionSelect} />
                    </Form.Group>
                    {availableDoctors && availableDoctors.length > 0
                        ? <Form.Group>
                            <Form.Label>Select Doctor</Form.Label>
                            <AutoSuggest suggestions={availableDoctors} onSuggestionSelect={handleDoctorSelect} />
                        </Form.Group>
                        : null}
                    {selectedDoctor
                        ? <Form.Group>
                            <Form.Label>Select Date and Time</Form.Label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateClick}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={1440}
                                injectTimes={selectedDoctorAppts.map((slot: string) => setHours(setMinutes(new Date(), parseInt(slot.split(":")[1])), parseInt(slot.split(":")[0])))}
                                filterTime={filterTimes}
                                dateFormat="MMMM d, yyyy"
                                className="form-control"
                            />
                        </Form.Group>
                        : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={bookAppointment}>
                        Book Appointment
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SessionsView;
