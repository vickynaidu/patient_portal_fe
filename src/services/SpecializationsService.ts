import { DOCTOR_APPOINTMENTS_URL, DOCTOR_ID_URL, DOCTOR_URL, DOCTORS_SEARCH_URL, SESSION_URL, SPECIALIZATION_URL } from "../common/api";
import { authenticatedRequest } from "../axios-util";
import { Specialization } from "../models/ISpecialization";

export const SpecializationsService = {
  getAllSpecializations: async () => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${DOCTOR_URL}`);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
  getSessionByDoctor: async (docId: string) => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${SESSION_URL}?id=${docId}`);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
  createSpecialization: async (data: {"specialization": string, "start_year": number}) => {
    try{
      const res = await authenticatedRequest.post(`${process.env.REACT_APP_API_URL}/${SPECIALIZATION_URL}`, data);
      return res;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
  searchSpecializations: async (search: string) => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${DOCTORS_SEARCH_URL}/${search}`);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
  getDoctorAppointments: async (id: string, date: string) => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${DOCTOR_APPOINTMENTS_URL}/${id}/${date}`);
      //console.log("Doctor available slots: ", res.data);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
  getDoctorById: async () => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${DOCTOR_ID_URL}`);
      console.log("Doctor available slots: ", res.data);
      return res.data;
    }catch(err: any){
      ////console.log("Error message: ", err);
      return err;
    }
  },
}
  