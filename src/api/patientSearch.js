import axios from "axios";
import { baseURL } from "../common/constant";

export const patientSearchApi = async (payload) => {
  return await axios.post(`${baseURL}/api/patientSearch`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
