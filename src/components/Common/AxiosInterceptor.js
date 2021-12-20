import React from "react"
import axios from 'axios';
import {Redirect} from "react-router-dom"
const AxiosInterceptor =  axios.interceptors.response.use((response) => {

      
      if (response.data.status === 203) {
        localStorage.clear();
        localStorage.setItem("errorMsg","Invalid User Name Or Password");
        return window.location.href = process.env.REACT_APP_BASE_URL
      }
      return response;
    }, (error) => {
       console.log("******error",error)
        if (error.response.data.status === 401) {
          console.log("ERROR CODE >>>>>>>401")
            localStorage.clear();
            localStorage.setItem("errorMsg","Your session is expired");
            if(process.env.REACT_APP_LOGOUT_URL){
              return location.href=process.env.REACT_APP_LOGOUT_URL;
            }else{
              return window.location.href = process.env.REACT_APP_BASE_URL
            }
        }
        if (error.response.status === 404) {
            localStorage.clear();
           /* if(process.env.REACT_APP_LOGOUT_URL){
              return location.href=process.env.REACT_APP_LOGOUT_URL;
            }else{
              return window.location.href = process.env.REACT_APP_BASE_URL
            }*/
            
        }
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    });

    axios.interceptors.request.use(function(config) {
      const token = localStorage.jwt;

      if ( token != null ) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    
      return config;
    }, function(err) {
      return Promise.reject(err);
    });

export default AxiosInterceptor;
