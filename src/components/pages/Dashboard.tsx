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
import SocketService from '../../services/SocketService';
import useAuth from '../../hooks/UseAuth';
import { setSocketState } from '../../slices/socket.slice';
import { Message } from '../../models/IMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, ListGroup } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { ChatService } from '../../services/ChatService';
import { setChatState } from '../../slices/chat.slice';
import { UserData } from '../../models/IUser';
import { SpecializationsService } from '../../services/SpecializationsService';
import { LoginService } from '../../services/LoginService';

interface DashboardProps { }

const localizer = momentLocalizer(moment);

const Dashboard: React.FC = () => {
    const title = 'Dashboard';
    const dispatch: AppDispatch = useDispatch();
    const [pastSessions, setPastSessions] = useState<Session[]>();
    const [futureSessions, setFutureSessions] = useState<Session[]>();
    const [events, setEvents] = useState<CalenderEvent[]>([]);
    const allSessions = useSelector((state: RootState) => state.sessionReducer.allSessions);
    const allUsers = useSelector((state: RootState) => state.chatReducer.allUsers);
    const { getSession } = useAuth();
    const user = getSession();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    interface CalenderEvent {
        title: string,
        start: Date,
        end: Date
    }
    
    useEffect(() => {
        const connectSocket = async () => {
            try {
                callAllSessions();
                const socket = await SocketService.connect();
                dispatch(setSocketState({
                    status: "connected",
                    messageReceived: null
                }));
                await socket.emit('register', user?.email);
                // Handle socket disconnect
                SocketService.on('receiveMessage', (payload: Message) => {
                    //console.log("ReceiveMessage: ", payload, "user on page: ", pathname);
                    dispatch(setSocketState({
                        messageReceived: payload,
                        status: "connected"
                    }));
                });
                return () => {
                    SocketService.disconnect();
                };
            } catch (error) {
                console.error("Failed to connect to WebSocket server:", error);
            }
        };
        connectSocket();
    }, []);

    const callAllSessions = async () => {
        const allSessions = await SessionService.getAllSessions();
        dispatch(setSessions({
            allSessions: allSessions,
            session: null,
            loading: false
        }));
        if(allSessions && allSessions.length > 0) {
            const doctor = await SpecializationsService.getDoctorById();
            const patient = user && user.role && user.role.name === "User"
                ? user
                : await LoginService.getuserProfile();
            allSessions.forEach((session: Session) => {
                console.log("Session: ", session);
                const title = user && user._id && patient._id
                    ? `Appointment with Dr. ${doctor.firstName} ${doctor.lastName}`
                    : `Appointment with ${patient.firstName} ${patient.lastName}`;
                const start = session.session_date
                    ? new Date(session.session_date)
                    : new Date();
                start.setHours(parseInt(session.session_time.split(":")[0]));
                start.setMinutes(parseInt(session.session_time.split(":")[1]));
                console.log("Start: ", start);
                const end = user && user.slotDuration
                    ? new Date(start.getTime() + (doctor.slotDuration & 60 * 1000))
                    : new Date(start.getTime() + (30 * 60 * 1000));
                console.log("end: ", doctor.slotDuration, end);
                const newEvent = {title, start, end};
                // console.log("new event: ", newEvent);
                setEvents([...events, {title, start, end}]);
                console.log("All events: ", events);
            });
            // console.log("All session events as per calender: ", events);
        }
        const users = await ChatService.getSelfChatHistoryUsers(user);
        //console.log("allUsers: ", allUsers);
        dispatch(setChatState({
            allUsers: users ? users : [],
            selectedUser: null,
            userChatHistory: []
        }))
    }

    useEffect(() => {
        const now = new Date();
        ////console.log("allSessions in Dashboard: ", allSessions);
        if (allSessions && allSessions.length > 0) {
            const past: Session[] = [];
            const future: Session[] = [];
            allSessions.forEach(session => {
                //////console.log(typeof now, typeof session?.session_time);
                if (session && session.session_time && new Date(session.session_time) < now) {
                    ////console.log("past session at ", session.session_time);
                    past.push(session);

                } else {
                    ////console.log("future session at ", session.session_time);
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
        ////console.log("Appointment details of id: ", id);
    }

    const onClickOfUser = (user: UserData) => {
        //console.log("Selected user: ", user);
        navigate('/console/chat', { state: user });
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="container" style={{ paddingBottom: 10 }}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">{title}</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 w-90">
                            <Col md={12} className="p-4">
                                <h4>Calendar</h4>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                />
                            </Col>
                        </div>

                        <div className="col-xs-12 col-sm-4">
                            <h4>Message History</h4>
                            {allUsers && allUsers.length > 0
                                ? <ListGroup className="w-100">
                                    {allUsers.map((item, index) => (
                                        item._id !== user?._id ? <ListGroup.Item
                                            key={index}
                                            action
                                            onClick={() => onClickOfUser(item)}
                                        >
                                            {item.firstName} {item.lastName}
                                        </ListGroup.Item> : null
                                    ))}
                                </ListGroup>
                                : null}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;