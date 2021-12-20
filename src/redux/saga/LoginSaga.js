import React from "react"
import {takeLatest,put,race} from "redux-saga/effects"
import axios from "axios"
import AxiosInterceptor from "../../components/Common/AxiosInterceptor"
import * as ConstVal from "../../Constants"

function* loginGenerator(action){
   
    var body = new FormData();
    body.append("email", action.payload.email);
    body.append("password", action.payload.password);


    var result =yield axios({
        method: 'post',
        url: process.env.REACT_APP_API_BASE_URL+'/LoginAuthentication',
        data: body,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        });
      
    if(result.data && result.data.status){
        switch (result.data.group) {
      
            case "FIELD":
                localStorage.setItem("redirect","/field-dashboard");
                localStorage.setItem("menu","field");
                break;
            case "REVENUE":
                localStorage.setItem("redirect","/executive-dashboard");
                localStorage.setItem("menu","revenue");
                break;
            case "NON-REVENUE":
                localStorage.setItem("redirect","/executive-dashboard");
                localStorage.setItem("menu","non-revenue");
                break;
            case "ACE":
                localStorage.setItem("redirect","/executive-dashboard");
                localStorage.setItem("menu","ace");
                break;
            case "RTRX DS":
                localStorage.setItem("menu","rtrx-ds");
                break;
            case "Veeva DS":
                localStorage.setItem("menu","veeva-ds");
                break;
            case "Testing DS":
                localStorage.setItem("menu","testing-ds");
                break;
            case "GLOBAL":
                
                localStorage.setItem("redirect","/executive-dashboard");
                localStorage.setItem("menu","global");
                break;
           
          }
          /*****role access ****/
        /****only for UAT disable dashboard****/
         ConstVal.IS_UAT ? localStorage.setItem("redirect","/Testing") :""
        /****end only for UAT disable dashboard****/

          if( result.data.username){

                let userName=result.data.username;
                //userName= userName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                let FullName = userName.replace('.', ' ');
                FullName= FullName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                let getFirstName = userName.split('.');
                let FirstName = getFirstName[0];
                FirstName= FirstName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                
            localStorage.setItem("fullname",FullName);
            localStorage.setItem("firstname",FirstName);
            localStorage.setItem("email",result.data.userEmail);
          // localStorage.setItem("email",result.data.username);
            localStorage.setItem("username",result.data.username);
            localStorage.setItem("status",result.data.status);
           
          }
          localStorage.setItem("errorMsg","");
          
          localStorage.setItem("jwt",result.data.jwt);
    }
    
    yield put({type:'LOGIN_DATA',payload:result.data})
}
function* loginProcessSaga(){
   
    yield takeLatest("PROCESS_LOGIN",loginGenerator)
} 
/*****logout******/
function* logoutGenerator(action){
    var body = new FormData();
    body.append("email", localStorage.email);
        var result =yield axios({
        method: 'post',
        url: process.env.REACT_APP_API_BASE_URL+'/logoutUser',
        data: body,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        });

        console.log("logout request",result)
    if(result){
        localStorage.clear();
    }
    
    yield put({type:'LOGOUT_STATUS',payload:result.data})
}


function* logoutProcessSaga(){
   
    yield takeLatest("LOGOUT_REQUEST",logoutGenerator)
} 
/*****logout******/
/*****change password******/
function* changePasswordGenerator(action){
    let body = new FormData();
    let pass=action.payload;
    body.append("password", pass);
    body.append("name", localStorage.username);
        var result =yield axios({
        method: 'post',
        url: process.env.REACT_APP_API_BASE_URL+'/changePwd',
        data: body,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        });
   
    
    yield put({type:'CHANGEPASSWORD_STATUS',payload:result.data})
}


function* changePasswordProcessSaga(){
   
    yield takeLatest("CHANGEPASSWORD_REQUEST",changePasswordGenerator)
} 
/*****change password******/
/*****checkJwtTockenValidation*** */
function* checkJWTSagaGenerator(action){
   
        var result =yield axios({
        method: 'GET',
        url: process.env.REACT_APP_API_BASE_URL+'/checkOktaSession',
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        });
   
        console.log("inside check jwt >>>>")
    yield put({type:'CHECK_JWT_RESPONSE',payload:result.data})
}


function* checkJWTSaga(){
   console.log("in reducer >>> jwt")
    yield takeLatest("CHECK_JWT_REQUEST",checkJWTSagaGenerator)
} 
/*****checkJwtTockenValidation end*** */
export default function* LoginSaga(){

    yield race([checkJWTSaga(),loginProcessSaga(),logoutProcessSaga(),changePasswordProcessSaga()])
}