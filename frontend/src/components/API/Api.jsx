import axios from 'axios'
import {setAuth} from '../mainComponents/NavMenu'
const URL = 'http://localhost:5000'
let currentUser= ""
 const API = {
  register: async (newUserInfo) => {
    let message
    console.log(newUserInfo)
    await axios
      .post(`${URL}/api/Clint/Clint`, newUserInfo)
      .then((response) => {
        console.log('Not error')
        message = response.data
        console.log(message)
      })
      .catch((err) => {
        console.log("err")
      });
    return message
  },  
  login: async (credential) => {
    const request = axios
      .post(`${URL}/api/Clint/login`, {
        email: credential.email,
        password: credential.password,
        withCredentials: true,
      })
      .then((response) => {
        currentUser =  response.data;
        console.log("res is :",response.data)
        return response.data
      })
      .catch((err) => {
        console.log("Not found client",err)
      });
      console.log("requ",request)
    return request
  },
  logout: async () => {
    let profile;
    await axios
      .get(`/api/Clint/logout`)
      .then((response) => (profile = response))
      .catch((err) => console.log(err));
    return profile;
  },
};
const getAllmintsCompany = () => {
  return axios.get(`${URL}/api/Admin/company`);
};
const newMintsCompany = (info) => {
  return axios.post(`${URL}/api/Admin/company`, info);
};
const deleteCompany = (info) => {
  return axios.delete(`${URL}/api/Admin/company/${info}`);
}
const editCompany=(info,id)=>{
  return axios.put(`${URL}/api/Admin/company/${id}`,info)
}
const addNewAppointment=(info)=>{
  return axios.post(`${URL}/api/Appoints/appointments/`,info)
}
const getAllTechMan = () => {
  return axios.get(`${URL}/api/Admin/TechMan`);
};
const newTechMan = (info) => {
  return axios.post(`${URL}/api/Admin/TechMan`, info);
};
const getClientInfo = (id) => {
  return axios.get(`${URL}/api/Clint/Clint/${id}`);
};
const deleteTechMan=(info)=>{
return axios.delete(`${URL}/api/Admin/TechMan/${info}`);
}
const editTechMan=(info,id)=>{
return axios.put(`${URL}/api/Admin/TechMan/${id}`,info)
}
const TrashAppointments =(id)=>{
  return axios.get(`${URL}/api/Clint/${id}/ComplateAppointments`)
}
const updateClientInfo=(info, id)=>{
  return axios.put(`${URL}/api/Clint/profile/${id}`, info);
} 
const gettAllAppointment=(id)=>{
   return axios.get(`${URL}/api/Clint/${id}/NewAppointments`)
}
const booked=(C_id,A_id)=>{
  return axios.post(`${URL}/api/Clint/clint/${C_id}/${A_id}`)
}
const deleteAppointment=(id)=>{
  return axios.delete(`${URL}/api/Appoints/appointments/${id}`);
}

const CompletedApp=(id)=>{
  return axios.put(`${URL}/api/Clint/clint/${id}`);
}

const rate=(rating,id)=>{
  return axios.put(`${URL}/api/Clint/clint/rate/${id}`,rating)
}

export {API,  getAllmintsCompany , newMintsCompany , deleteCompany , editCompany , getAllTechMan ,newTechMan, deleteTechMan , editTechMan, addNewAppointment, TrashAppointments ,  getClientInfo,
  updateClientInfo , gettAllAppointment , booked , currentUser , deleteAppointment , CompletedApp , rate};