import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"
import moment from "moment";
/*****get zip ter data *****/
function* getPricingGenerator(action){
   
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
            data.append('FLTR-MS-PRODUCT_NAME', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-ACTV_FLG', value[1].join("|"));
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
         
    }
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/pricing/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_PRICING_AUDIT_LIST',payload:result.data})
}
function* listPricingdSaga(){
    yield takeLatest("GET_PRICING_AUDIT_DATA",getPricingGenerator)
} 
/*****end get zip ter data *****/

/*****end get zip terr filter data  *****/
function* getPricingFilterDataGenerator(action){
   
    var data = new FormData();
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);
    data.append('FLTR-GE-REC_UPDATED_TS', Today);
    data.append('FLTR-LT-REC_UPDATED_TS', Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);

    let selectedCheckId = action.payload.data;
    let value = action.payload.value;
       

       if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-PRODUCT_NAME', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-ACTV_FLG', value[1].join("|"));
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
     
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/pricing/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'PRICING_AUDIT_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterPricingSaga(){
    yield takeLatest("PRICING_AUDIT_FILTER_BY_VALUE",getPricingFilterDataGenerator)
} 
/*****end get zip terr filter data *****/
/***revert*****/
function* GetPricingRevertGenerator(action){
   
    var data = new FormData();
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);
    data.append('FLTR-GE-REC_UPDATED_TS', Today);
    data.append('FLTR-LT-REC_UPDATED_TS', Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);
    let selectedCheckId = action.payload.data ;
    if(!action.payload.revrtAll){
      
        data.append('ids',selectedCheckId.join("|"));
    }
    if(action.payload.value){
        let value = action.payload.value;
        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-MS-PRODUCT_NAME', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-ACTV_FLG', value[1].join("|"));
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
         
    }
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/pricing/revert",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REVERT_PRICING_RESPONSE',payload:result.data})
}
function* getPricingRevertSaga(){
    yield takeLatest("REVERT_PRICING_REQUEST",GetPricingRevertGenerator)
} 
/***rever end****/

export default function* PricingAuditingSaga(){

    yield race([getPricingRevertSaga(),getFilterPricingSaga(),listPricingdSaga()])
}