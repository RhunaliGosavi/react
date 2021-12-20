import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"
import moment from "moment";

/*****get rep primary data *****/
function* getRefPrefferdGenerator(action){
   let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
 
    if(action.payload.value){
        var selectedCheckId = action.payload.data;
      
        var value = action.payload.value;
       
    }
    data= getFilters(value,selectedCheckId,action.payload.pagelimit,pageStart,action.payload.pageSort,data)
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/repprimary/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });
  if(result){
    yield put({type:'GET_REP_PRIMARY_AUDIT_LIST',payload:result.data})
  }
}
function* listRepPrimarySaga(){
    yield takeLatest("GET_REP_PRIMARY_AUDIT_DATA",getRefPrefferdGenerator)
} 
/*****end get rep primary data *****/
/*****end get rep primary filter data  *****/
function* getTestingFilterDataDataGenerator(action){
   
    var data = new FormData();
   
    let selectedCheckId = action.payload.data;
    
    let value = action.payload.value;
    
    data= getFilters(value,selectedCheckId,action.payload.pagelimit,0,action.payload.pageSort,data)
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/repprimary/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REP_PRIMARY_AUDIT_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterRepPrimaryDataSaga(){
    yield takeLatest("REP_PRIMARY_AUDIT_FILTER_BY_VALUE",getTestingFilterDataDataGenerator)
} 
/*****end get rep primary filter data *****/
/***revert*****/
function* GetRepPrimaryRevertGenerator(action){
   
    var data = new FormData();
   
    let selectedCheckId = action.payload.data ;
    
    if(!action.payload.revrtAll){
      data.append('ids',selectedCheckId.join("|"));
    }
    if(action.payload.value){
        var value = action.payload.value;
       
    }
    data= getFilters(value,selectedCheckId,action.payload.pagelimit,0,action.payload.pageSort,data)
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/repprimary/revert",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REVERT_REP_PRIMARY_RESPONSE',payload:result.data})
}
function* getRepPrimaryRevertSaga(){
    yield takeLatest("REVERT_REP_PRIMARY_REQUEST",GetRepPrimaryRevertGenerator)
} 
/***rever end****/
function getFilters(value,selectedCheckId,pagelimit,pageStart,pageSort,data){
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    
    data.append('pagesize', pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', pageSort);
    data.append('sortorder', 'desc');
    data.append('FLTR-GE-REC_UPDATED_TS', Today);
    data.append('FLTR-LT-REC_UPDATED_TS', Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);

   if(value){
        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-MS-NPI', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-FIRSTNAME', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-LASTNAME', value[2].join("|"));
        }
        if(value[3]!="" && value[3]!=null){
            data.append('FLTR-MS-STATUS', value[3].join("|"));
        }
        if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[4].join("|"));
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
        }
    }
    return data;
}

export default function* RepPrimaryAuditingSaga(){

    yield race([getRepPrimaryRevertSaga(),getFilterRepPrimaryDataSaga(),listRepPrimarySaga()])
}