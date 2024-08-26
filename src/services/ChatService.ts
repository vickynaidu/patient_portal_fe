import { CHAT_HISTORY_URL, CHAT_URL, DOCTOR_APPOINTMENTS_URL, DOCTOR_URL, DOCTORS_SEARCH_URL, SPECIALIZATION_URL } from "../common/api";
import { authenticatedRequest } from "../axios-util";
import { Specialization } from "../models/ISpecialization";
import { Message } from "../models/IMessage";
import useAuth from "../hooks/UseAuth";
import { LoginService } from "./LoginService";
import { UserData } from "../models/IUser";
import { User } from "./AuthService";

export const ChatService = {
    getChatHistoryOfSelectedUser: async (toId: string): Promise<Message[]> => {
        try {
            const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${CHAT_HISTORY_URL}/${toId}`);
            const chatHistory: Message[] = [];
            if (res && res.data) {
                res.data.forEach((chat: any) => {
                    chatHistory.push({
                        from: chat.sender_id,
                        to: chat.receiver_id,
                        message: chat.content
                    })
                });
            }
            return chatHistory;
        } catch (err: any) {
            ////console.log("Error message: ", err);
            return err;
        }
    },
    getSelfChatHistoryUsers: async (user: User | null): Promise<UserData[]> => {
        try {
            const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${CHAT_URL}`);
            //console.log("Self chat history: ", res);
            const allUsers = await LoginService.getUsers();
            const filteredUsers: UserData[] = [];
            if (res && res.data) {
                res.data.forEach((chat: any) => {
                    //console.log("chat: ", chat);
                    let userId = "";
                    if(user && user._id === chat.sender_id) {
                        userId = chat.receiver_id;
                    } else {
                        userId = chat.sender_id;
                    }
                    const fu = allUsers.data.find((u: User) => u._id === userId);
                    if(fu && !filteredUsers.find(f => user && f._id !== user._id))
                        filteredUsers.push(fu);
                });
            }
            //console.log("filteredUsers: ", filteredUsers);
            return filteredUsers;
        } catch (err: any) {
            ////console.log("Error message: ", err);
            return err;
        }
    }
}
