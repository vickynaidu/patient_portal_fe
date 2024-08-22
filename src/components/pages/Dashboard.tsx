import { Helmet } from 'react-helmet';
import Jdenticon from './Jdenticon';
import { SessionService } from '../../services/SessionsService';
import "../../assets/css/Dashboard.css";
import React, { useEffect, useState } from 'react';
import { Session } from '../../models/ISession';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setSessions } from '../../slices/session.slice';
import moment from 'moment';

interface DashboardProps { }

const Dashboard: React.FC = () => {
    const title = 'Dashboard';
    const dispatch: AppDispatch = useDispatch();
    const [pastSessions, setPastSessions] = useState<Session[]>();
    const [futureSessions, setFutureSessions] = useState<Session[]>();
    const allSessions = useSelector((state: RootState) => state.sessionReducer.allSessions);
    const [init, setInit] = useState(false);

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

    useEffect(() => {
        const now = new Date();
        console.log("allSessions in Dashboard: ", allSessions);
        if (allSessions && allSessions.length > 0) {
            const past: Session[] = [];
            const future: Session[] = [];
            allSessions.forEach(session => {
                //console.log(typeof now, typeof session?.session_time);
                if (session && session.session_time && new Date(session.session_time) < now) {
                    console.log("past session at ", session.session_time);
                    past.push(session);

                } else {
                    console.log("future session at ", session.session_time);
                    future.push(session);
                }
            });
            past.sort((a, b) => new Date(b.session_time ? b.session_time : "").getTime() - new Date(a.session_time ? a.session_time : "").getTime());
            setPastSessions(past);
            future.sort((a, b) => new Date(a.session_time ? a.session_time : "").getTime() - new Date(b.session_time ? b.session_time : "").getTime());
            setFutureSessions(future);
        }
    }, [allSessions]);

    const openAppointment = (id: string) => {
        console.log("Appointment details of id: ", id);
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="container" style={{paddingBottom: 10}}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">{title}</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className="card m-2 box">
                                <div className="card-body" style={{ minHeight: 400 }}>
                                    <h5 className="card-title">Appointments</h5>
                                    {futureSessions && futureSessions.length > 0
                                        ? futureSessions.map((session, i) => (
                                            <div className="row g-0 box box-content" onClick={() => openAppointment(session._id)}>
                                                <div className="col-md-4 doc-box">
                                                    <img src={require('../../assets/images/doctor-icon.png')} className="img-fluid rounded-start doc-image" />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                            Date: {session && session.session_time
                                                                ? moment(new Date(session.session_time)).format("MM/DD/YYYY") + ""
                                                                : ""}<br />
                                                            Time: {session && session.session_time
                                                                ? moment(new Date(session.session_time)).format("HH:MM") + ""
                                                                : ""}<br />
                                                            Doctor: {session.session_with}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <p className="card-text">No appointments.</p>}
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className="card m-2 box">
                                <div className="card-body" style={{ minHeight: 400 }}>
                                    <h5 className="card-title">Past Sessions</h5>
                                    {pastSessions && pastSessions.length > 0
                                        ? pastSessions.map((session, i) => (
                                            <div className="row g-0 box box-content" onClick={() => openAppointment(session._id)}>
                                                <div className="col-md-4 doc-box">
                                                    <img src={require('../../assets/images/doctor-icon.png')} className="img-fluid rounded-start doc-image" />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                            Date: {session && session.session_time
                                                                ? moment(new Date(session.session_time)).format("MM/DD/YYYY") + ""
                                                                : ""}<br />
                                                            Time: {session && session.session_time
                                                                ? moment(new Date(session.session_time)).format("HH:MM") + ""
                                                                : ""}<br />
                                                            Doctor: {session.session_with}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <p className="card-text">No past sessions.</p>}
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-4">
                            <div className="card m-2 box">
                                <div className="card-body" style={{ minHeight: 400 }}>
                                    <h5 className="card-title">Message History</h5>
                                    <div className="row g-0 box">
                                        <div className="col-md-4 doc-box">
                                            <img src={require('../../assets/images/doctor-icon.png')} className="img-fluid rounded-start doc-image" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    No message history available!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;