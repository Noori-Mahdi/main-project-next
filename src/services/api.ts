import axios,{AxiosError, InternalAxiosRequestConfig} from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers:{'content-Type':'application/json'}
});

const apiInterceptor = async(request:InternalAxiosRequestConfig) =>{
    const token = localStorage.getItem('token');
    if(token){
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
}

const errorInterceptor = async(axiosError: AxiosError) => {
    return Promise.reject(axiosError)
};

api.interceptors.request.use(apiInterceptor);

api.interceptors.response.use((res) => res,errorInterceptor)