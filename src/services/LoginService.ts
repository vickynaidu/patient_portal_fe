import axios from "axios";
import jsCookie from 'js-cookie';
import { LoginData } from "../models/ILogin";
import { LOGIN_URL, PROFILE_URL, REGISTER_URL, USERS_URL } from "../common/api";
import { authenticatedRequest } from "../axios-util";
import { UserData } from "../models/IUser";
//import { AppDispatch } from "../../app/store";

export const LoginService = {
  userAuthetication: async (user: LoginData, dispatch: any) => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/${LOGIN_URL}`, user);
      console.log("Login res: ", res.data);
      jsCookie.set('token', res.data.token);
      return res;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  },
  addUser: async (user: UserData) => {
    try{
      console.log("Requested data: ", user);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/${REGISTER_URL}`, user);
      console.log("User created successfully: ", res.data);
      return res;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  },
  getUsers: async () => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${USERS_URL}`);
      console.log("getUsers res: ", res.data);
      return res;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  },
  getuserProfile: async () => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${PROFILE_URL}`);
      console.log("User profile data: ", res);
      delete res.data.password;
      return res.data;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  }
}
  