import { DOCTOR_URL, SPECIALIZATION_URL } from "../common/api";
import { authenticatedRequest } from "../axios-util";

export const SpecializationsService = {
  getAllSpecializations: async () => {
    try{
      const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${DOCTOR_URL}`);
      return res.data;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  },
  // getSession: async (id: string) => {
  //   try{
  //     const res = await authenticatedRequest.get(`${process.env.REACT_APP_API_URL}/${SESSION_URL}?id=${id}`);
  //     return res.data;
  //   }catch(err: any){
  //     console.log("Error message: ", err);
  //     return err;
  //   }
  // },
  createSpecialization: async (data: string) => {
    try{
      const res = await authenticatedRequest.post(`${process.env.REACT_APP_API_URL}/${SPECIALIZATION_URL}`, data);
      return res.data;
    }catch(err: any){
      console.log("Error message: ", err);
      return err;
    }
  }
}
  