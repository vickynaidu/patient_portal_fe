import moment from "moment";
import { Session } from "../../models/ISession";
import Jdenticon from "./Jdenticon";
import { MouseEventHandler, SetStateAction } from "react";


function SessionTableRow({ sessions, handleIsEditable }: { sessions: Session[] | undefined, handleIsEditable: any }): JSX.Element {
    if (!sessions) {
        return <></>;
    }

    const handleEditable = (flag: boolean) => handleIsEditable(flag);

    return (
        <>
            {sessions.map((session, i) => {
                const date = moment(session.session_time).format("MM/DD/YYYY");
                const time = moment(session.session_time).format("HH:MM");
                const isPast = moment(session.session_time).isBefore();
                return (
                    <tr key={i} className="align-middle">
                        <td>{i + 1}</td>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td>{session.session_with}</td>
                        <td><Jdenticon className="" name={session.session_with} height="32px" width="32px" /></td>
                        <td>
                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" className="btn btn-info" onClick={() => handleEditable(!isPast)}>
                                    <i className="bi bi-eye"></i>
                                </button>
                                <button type="button" className={"btn btn-secondary"} disabled={isPast ? true : false} onClick={() => handleEditable(!isPast)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button type="button" className="btn btn-danger" disabled={isPast ? true : false} onClick={() => handleEditable(!isPast)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>

                    </tr>
                )
            })}
        </>
    );
}

export default SessionTableRow;