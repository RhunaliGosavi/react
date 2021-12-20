import React from "react"
import {useDispatch,connect} from "react-redux"
import {withRouter,NavLink,Redirect} from "react-router-dom"
import * as ConstVal from "../../Constants"
import Countdown from 'react-countdown';
import { useState, useEffect } from "react";
import SessionTimeoutModal from '../Common/SessionTimeoutModal';
import IdleTimer  from  'react-idle-timer/dist/modern'
import { useIdleTimer }  from  'react-idle-timer/dist/modern'
import Modal from './Modal';
function Header(props) {
    /***jwt token refresh timeout**** */
    const getLocalStorageValue = (s) => localStorage.getItem(s);
    
    const [showSessionTimeoutModal, setShowSessionTimeoutModal] = useState(false);
    const [timeoutData, setData] = useState(
        { date: Date.now(), delay: parseInt(process.env.REACT_APP_JWT_REFRESH_TIMER) } //60 seconds
      );
    const wantedDelay = parseInt(process.env.REACT_APP_JWT_REFRESH_TIMER); //60 s
    useEffect(() => {
        const savedDate = getLocalStorageValue("end_date");
        if (savedDate != null && !isNaN(savedDate)) {
          const currentTime = Date.now();
          const delta = parseInt(savedDate, 10) - currentTime;
    
          //Do you reach the end?
          if (delta > wantedDelay) {
            //Yes we clear uour saved end date
            if (localStorage.getItem("end_date").length > 0)
              localStorage.removeItem("end_date");
          } else {
            //No update the end date  
            setData({ date: currentTime, delay: delta });
          }
        }
      }, []);

    /***jwt token refresh timeout**** */
    const dispatch = useDispatch();

    let logout=()=>{
        
        sessionStorage.clear();
        localStorage.clear();
        dispatch({
            type:"LOGOUT_REQUEST"
        })
        if(process.env.REACT_APP_LOGOUT_URL){
            location.href=process.env.REACT_APP_LOGOUT_URL;
          }else{
            props.history.push(process.env.REACT_APP_BASE_URL);
        }
        
   }
  if(!localStorage.email){
        console.log("header email null")
        return <Redirect to={process.env.REACT_APP_BASE_URL} />
    }
    const handleModalCloseClick=(modelId)=> {
        
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
        logout();
    }
    const handleOKBtnClick=()=>{
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
        logout();
    }
    
    const handleOnActive = event => {
        console.log('user is active', event)
        console.log('time remaining', getRemainingTime())
      }
    
      const handleOnAction = event => {
       // console.log('user did something', event)
      }
    
    const handleOnIdle = event => {
      console.log("idle time")
      
        setShowSessionTimeoutModal(true)
        
        //location.reload();
    }
    const refreshTimeout=process.env.REACT_APP_REFRESH_TIMER;

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout:refreshTimeout,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
    onAction: handleOnAction,
        debounce: 500
      })
  return (
     
    <>

        <header>
             
        

            {/**<nav className="navbar navbar-expand-md navbar-light fixed-top bg-blue custom-nav">**/}
            <nav className="navbar navbar-expand-md navbar-light  custom-nav pad-top">
               {/***  <a className="navbar-brand" href="home.html">
                    <img className="saama-logo" src="/assets/img/Saama-Logo-White.png" />
                </a>**/}
                <div className="col-lg-5 offset-lg-5 col-md-6 offset-md-4 col-6 offset-1"><img  src={ConstVal.deployment+"/assets/img/Travere_logo.png"} /></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                   
                   
                        <form className="form-inline my-2 my-lg-0 offset-lg-5 offset-md-0 col-md-12 col-11 offset-1 form-custom" >
                            {/***<input className="form-control searchbox" type="text" placeholder="Search" aria-label="Search"/>***/}
                            
                            <ul className="navbar-nav mr-auto navbar-light">
                                <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle nav-cust-link dropdownToggleCustom" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={ConstVal.deployment+"/assets/img/user-icon-4.png"} className="user-icon"/>&nbsp;<span id="firstname" >{localStorage.firstname}</span>
                                </a>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-r-cust" aria-labelledby="navbarDropdown">
                                        <a id="fullName" className="disabled dropdown-item" href="#">Hello <span id="user-name">{localStorage.fullname}</span></a>
                                        <div className="dropdown-divider"></div>
                                        {/***<a className="dropdown-item" href="profile.html"><i className="fa fa-user fa-profile" aria-hidden="true"></i> My Profile</a>***/}
                                       {/*<NavLink to="/ChangePassword" className="dropdown-item"> <i className="fa fa-lock fa-profile" aria-hidden="true" ></i> Change Password</NavLink>*/}
                                        <a  className="dropdown-item cursor-add" onClick={ ()=>logout() }><i className="fa fa-sign-out fa-profile" aria-hidden="true"></i> Logout</a>
                                    </div> 
                                        
                                </li>
                            </ul>
                        
                        </form>
                    
                </div>
            </nav>
        </header>
        {showSessionTimeoutModal ?  <SessionTimeoutModal handleModalCloseClick={handleModalCloseClick} handleOKBtnClick={handleOKBtnClick} modelId={"showExecutiveModal"} text={"Session Timeout"} classname={"session-timeout-popup"}> </SessionTimeoutModal> : ""}
       
        
    </>	
  );
}

export default connect(function(state,action){
    
    return{
        logout_status:state['LoginReducer']['LOGIN_RESULT'] || [],
    }
 
 })(withRouter(Header))


