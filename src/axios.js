import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { logoutAgent } from "./redux/slices/agentSlice";
import { config } from "./constants";

// axios instance
const instance = axios.create({
  baseURL: `${config.SERVER_URL}/api/v1/`,
});

const AxiosInterceptor = ({ children }) => {
const dispatch = useDispatch()

  useEffect(() => {

    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      // console.log("errInterceptor");
      if (error.response.status === 401) {
        dispatch(logoutAgent())
        redirect("/login")
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
