import axios from "axios"
const url =import.meta.env.VITE_API_URL;
const API=axios.create({
    baseURL: `${url}`
});

API.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token");
    if(token){req.headers.Authorization=`Bearer ${token}`;}
    return req;
});

export default API;