import { SESSION_URL, SESSIONS_URL } from "../common/api";
import { authenticatedRequest } from "../axios-util";
import { Session } from "../models/ISession";

export const SessionService = {
  getAllSessions: async () => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${SESSIONS_URL}`);
      if(res && res.data && res.data.length > 0) {
        res.data.forEach((row: any) => {
          const doc = row.session_with.doctor;
          row.session_with = `${doc.firstName} ${doc.lastName}`;
        });
      }
      //console.log("all sessions: ", res.data);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
  getSession: async (id: string) => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${SESSION_URL}?id=${id}`);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
  createSession: async (data: Session) => {
    try{
      const res = await authenticatedRequest.post(`${process.env.REACT_APP_API_URL}/${SESSION_URL}`, data);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  }
}
  