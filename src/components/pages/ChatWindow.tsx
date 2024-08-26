import React, { useEffect, useState } from 'react';
import '../../assets/css/chat-window.css';
import SocketService from '../../services/SocketService';
import { UserData } from '../../models/IUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setSocketState } from '../../slices/socket.slice';
import { ChatService } from '../../services/ChatService';
import { Message } from '../../models/IMessage';

interface UserProps {
    user: UserData | undefined;
}

const ChatWindow: React.FC<UserProps> = ({ user }) => {
    const dispatch: AppDispatch = useDispatch();
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState<string>('');
    const [init, setInit] = useState<boolean>(false);
    const messageReceived = useSelector((state: RootState) => state.socketReducer.messageReceived);

    useEffect(() => {
        getSelectedUserChatHistory(user);
    }, [user]);

    useEffect(() => {
        //console.log("New message received ", messageReceived);
        if(user?.email === messageReceived?.from) {
            setMessages([...messages, { from: 'They', to: "", message: messageReceived ? messageReceived.message : "" }]);
        }
    }, [messageReceived]);

    const getSelectedUserChatHistory = async (user: UserData | undefined) => {
        if(user){
            const userChatHistory = await ChatService.getChatHistoryOfSelectedUser(user._id);
            setMessages(userChatHistory);
        }
    }

    const handleSendMessage = () => {
        if (messageText.trim()) {
            setMessages([...messages, { from: 'You', to: "", message: messageText }]);
            sendMessage();
            setMessageText('');
        }
    };

    const sendMessage = () => {
        // Emit the message to the server
        if (user && user.email) {
            //console.log("User: ", user.email, messageText);
            SocketService.emit("sendMessage", user?.email, messageText);
        }
        setMessageText("");
    };

    const height = window.innerHeight;
    return (
        <div className="chat-window container-fluid d-flex flex-column h-100">
            <div className="chat-header bg-primary text-white p-2">
                Chat with {user?.firstName} {user?.lastName}
            </div>
            <div className="chat-messages flex-grow-1 p-3 overflow-auto" style={{ height: height / 2 }}>
                {messages && messages.length > 0
                    ? messages.map((message, index) => (
                        message.from === user?._id
                            ? <div key={index} className="chat-message parent-flex">
                                <div className='receiver'>
                                <strong>{message.message}</strong>
                                </div>
                            </div> : <div key={index} className="chat-message">
                                <div className='sender'>
                                <strong>{message.message}</strong>
                                </div>
                            </div>
                )) : null}
            </div>
            <div className="chat-input d-flex p-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <button className="btn btn-primary ml-2" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
