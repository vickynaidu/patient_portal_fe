import { SESSION_URL, SESSIONS_URL } from "../common/api";
import { authenticatedRequest } from "../axios-util";

export const SessionService = {
  getAllSessions: async () => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${SESSIONS_URL}`);
      return res.data;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  },
  getSession: async (id: string) => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${SESSION_URL}?id=${id}`);
      return res.data;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  },
  createSession: async (data: string) => {
    try{
      const res = await authenticatedRequest.post(`${process.env.REACT_APP_API_URL}/${SESSIONS_URL}`, data);
      return res.data;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  }
}
  