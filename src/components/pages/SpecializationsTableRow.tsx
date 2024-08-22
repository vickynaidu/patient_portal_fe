import moment from "moment";
import { Session } from "../../models/ISession";
import Jdenticon from "./Jdenticon";
import { MouseEventHandler, SetStateAction } from "react";
import { Specialization } from "../../models/ISpecialization";


function SpecializationsTableRow({ specializations }: { specializations: Specialization[] | undefined }): JSX.Element {
    if (!specializations) {
        return <></>;
    }

    return (
        <>
            {specializations.map((specialization, i) => {
                return (
                    <tr key={i} className="align-middle">
                        <td>{i + 1}</td>
                        <td>{specialization.specialization}</td>
                        <td>{specialization.start_year}</td>
                        <td>
                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" className="btn btn-info">
                                    <i className="bi bi-eye"></i>
                                </button>
                                <button type="button" className={"btn btn-secondary"}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button type="button" className="btn btn-danger">
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

export default SpecializationsTableRow;