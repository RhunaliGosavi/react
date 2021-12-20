import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"
import moment from "moment";

/*****get testing data *****/
function* getRefPrefferdGenerator(action){
   let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    if(action.payload.value){
        var selectedCheckId = action.payload.data;
        
        var value = action.payload.value;
        
        
    }
    data= getFilter(value,data,selectedCheckId,action,pageStart)
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/testing/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });
  if(result){
    yield put({type:'GET_TESTING_AUDIT_LIST',payload:result.data})
  }
}
function* listRefPrefferdSaga(){
    yield takeLatest("GET_TESTING_AUDIT_DATA",getRefPrefferdGenerator)
} 
/*****end get testing data *****/
/*****end get testing filter data  *****/
function* getTestingFilterDataDataGenerator(action){
   
    var data = new FormData();
   
    let selectedCheckId = action.payload.data;
    
    let value = action.payload.value;
    
    data= getFilter(value,data,selectedCheckId,action,0)
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/testing/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'TESTING_AUDIT_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterTestingDataSaga(){
    yield takeLatest("TESTING_AUDIT_FILTER_BY_VALUE",getTestingFilterDataDataGenerator)
} 
/*****end get testing filter data *****/
/***revert*****/
function* GetTestingRevertGenerator(action){
   
    var data = new FormData();
   
    let selectedCheckId = action.payload.data ;
    let selectedSrcId =action.payload.srcid;
    
    if(!action.payload.revrtAll){
      data.append('ids',selectedCheckId.join("|"));
      data.append('srcids',selectedSrcId.join("|"));
      
      
    }
    if(action.payload.value){
        var value = action.payload.value;
       
    }
    data= getFilter(value,data,selectedCheckId,action,0)
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/testing/revert",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REVERT_TESTING_RESPONSE',payload:result.data})
}
function* getTestingRevertSaga(){
    yield takeLatest("REVERT_TESTING_REQUEST",GetTestingRevertGenerator)
} 
/***rever end****/

function getFilter(value,data,selectedCheckId,action,pageStart){
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', action.payload.sortorder);
    data.append('FLTR-GE-REC_UPDATED_TS', Today);
    data.append('FLTR-LT-REC_UPDATED_TS', Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);
    if(value){
        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-MS-STATUS', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-REC_UPDATED_BY', value[1].join("|"));
        }

        if(value[3]!="" && value[3]!=null){
        data.append('FLTR-MS-TST_SOURCE', value[3].join("|"));
        }
        if(value[4]!="" && value[4]!=null){
            data.append('FLTR-MS-TST_SRC_ID', value[4].join("|"));
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0)  ? selectedCheckId.join("|") : "NO DATA");
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
        }
        if(value[6]!="" && value[6]!=null){
            data.append('FLTR-MS-RULE', value[6].join("|"));
        }
        if(value[7]!="" && value[7]!=null){
            data.append('FLTR-MS-SRC_HCP_FN_LN_NPI', value[7].join("|"));
         }
    }
    return data;
}

export default function* DataStewardshipAuditingSaga(){

    yield race([getTestingRevertSaga(),getFilterTestingDataSaga(),listRefPrefferdSaga()])
}