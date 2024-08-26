import React, { useEffect, useState } from "react";
import SocketService from "../../services/SocketService";
import '../../assets/css/chat.css';
import { LoginService } from "../../services/LoginService";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setChatState } from "../../slices/chat.slice";
import { NavLink, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { UserData } from "../../models/IUser";
import { Helmet } from "react-helmet";
import ChatWindow from "./ChatWindow";
import useAuth from "../../hooks/UseAuth";

const Chat: React.FC = () => {
  const title = 'Messaging';
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.chatReducer.allUsers);
  const { getSession } = useAuth();
  const user = getSession();
  const location = useLocation();

  // if(location.state) {
  //   setSelectedUser(location.state);
  // }

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await LoginService.getUsers();
      dispatch(setChatState({
        allUsers: users.data,
        selectedUser: null,
        userChatHistory:[]
      }));
    }
    getAllUsers();
  }, []);

  useEffect(() => {setSelectedUser(location.state)}, [location.state]);

  // const sendMessage = () => {
  //   if (message.trim()) {
  //     // Emit the message to the server
  //     SocketService.emit("messageToServer", message);
  //     setMessage("");
  //   }
  // };

  const onClickOfUser = (user: UserData) => {
    //console.log("Selected user: ", user);
    setSelectedUser(user);
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container-fluid h-100">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{title}</h1>
        </div>
        <div className="row h-100"> {/* Add h-100 to ensure the row takes full height */}
          <div className="col-md-6 left-column"> {/* First column */}
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
          <div className="col-md-6 right-column"> {/* Second column */}
            {selectedUser ? <ChatWindow user={selectedUser}/> : null}
          </div>
        </div>
      </div>
      {/* <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Chat;
