import { User } from "../../services/AuthService";
import Jdenticon from "./Jdenticon";


function UserTableRow({ users }: { users: User[] | undefined }): JSX.Element {
    console.log("UsersTableRow users: ", users);
    if (!users) {
        return <></>;
    }

    return (
        <>
            {users.map((user, i) => (
                <tr key={i} className="align-middle">
                    <td>{i}</td>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td><Jdenticon className="" name={user.email} height="32px" width="32px" /></td>

                </tr>
            ))}
        </>
    );
}

export default UserTableRow;