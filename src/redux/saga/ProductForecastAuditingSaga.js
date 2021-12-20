import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"
import moment from "moment";
/*****get product forecast data *****/
function* getProductForecastGenerator(action){
   
    let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);

    data.append('FLTR-GE-REC_UPDATED_TS', Today);
    data.append('FLTR-LT-REC_UPDATED_TS', Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);

    if(action.payload.value){
    
        let selectedCheckId = action.payload.data;
        let value = action.payload.value;
        
        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-CT-FORECASTYEAR', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
        }
     
       /* if(value[3]!="" && value[3]!=null){
           data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }*/
        if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
         }
         if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
         }
        if(value[4]!="" && value[4]!=null){
           data.append('FLTR-MS-STATUS', value[4].join("|"));
        }
           if(value[4]!="" && value[4]!=null){
           data.append('FLTR-MS-STATUS', value[4].join("|"));
        }
        if(value[5]!="" && value[5]!=null){
            data.append('FLTR-CT-FORECASTMONTH', value[5].join("|"));
         }
         
    }
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_PRODUCTFORECAST_AUDIT_LIST',payload:result.data})
}
function* listProductForecastSaga(){
    yield takeLatest("GET_PRODUCTFORECAST_AUDIT_DATA",getProductForecastGenerator)
} 
/*****end get product forecast data *****/

/*****end get product forecast filter data  *****/
function* getProductForecastFilterDataGenerator(action){
   
    var data = new FormData();
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);
    data.append('FLTR-GE-REC_UPDATED_TS',Today);
    data.append('FLTR-LT-REC_UPDATED_TS', Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);

    let selectedCheckId = action.payload.data;
    let value = action.payload.value;
       

       if(value[0]!="" && value[0]!=null){
        data.append('FLTR-CT-FORECASTYEAR', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
    }
 
   /* if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }*/
    if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
     }
     if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-STATUS', value[4].join("|"));
     }
     if(value[5]!="" && value[5]!=null){
        data.append('FLTR-CT-FORECASTMONTH', value[5].join("|"));
     }
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'PRODUCTFORECAST_AUDIT_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterProductForecastSaga(){
    yield takeLatest("PRODUCTFORECAST_AUDIT_FILTER_BY_VALUE",getProductForecastFilterDataGenerator)
} 
/*****end get product forecast filter data *****/
/***revert*****/
function* GetProductForecastRevertGenerator(action){
   
    var data = new FormData();
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);
    data.append('FLTR-GE-REC_UPDATED_TS', Today);
    data.append('FLTR-LT-REC_UPDATED_TS',Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);
    let selectedCheckId = action.payload.data ;
    if(!action.payload.revrtAll){
      
        data.append('ids',selectedCheckId.join("|"));
    }
    if(action.payload.value){
        let value = action.payload.value;
        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-CT-FORECASTYEAR', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
        }
     
       /* if(value[3]!="" && value[3]!=null){
           data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }*/
        if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
         }
         if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
         }
         if(value[4]!="" && value[4]!=null){
            data.append('FLTR-MS-STATUS', value[4].join("|"));
         }
         if(value[5]!="" && value[5]!=null){
            data.append('FLTR-CT-FORECASTMONTH', value[5].join("|"));
         }
    }
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/revert",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REVERT_PRODUCTFORECAST_RESPONSE',payload:result.data})
}
function* getProductForecastRevertSaga(){
    yield takeLatest("REVERT_PRODUCTFORECAST_REQUEST",GetProductForecastRevertGenerator)
} 
/***rever end****/

export default function* ProductForecastAuditingSaga(){

    yield race([getProductForecastRevertSaga(),getFilterProductForecastSaga(),listProductForecastSaga()])
}