import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"
import moment from "moment";

/*****get zip ter data *****/
function* getProductGenerator(action){
   
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
            data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-MARKET_NAME', value[2].join("|"));
        }
       /* if(value[3]!="" && value[3]!=null){
           data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }*/
        if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
         }
         if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
         }
         if(value[5]!="" && value[5]!=null){
            data.append('FLTR-MS-STATUS', value[5].join("|"));
        }
    }
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/product/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_PRODUCT_AUDIT_LIST',payload:result.data})
}
function* listProductdSaga(){
    yield takeLatest("GET_PRODUCT_AUDIT_DATA",getProductGenerator)
} 
/*****end get zip ter data *****/

/*****end get zip terr filter data  *****/
function* getProductFilterDataGenerator(action){
   
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

    let selectedCheckId = action.payload.data;
    let value = action.payload.value;
       

       if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-PRODUCT_NAME', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-MARKET_NAME', value[2].join("|"));
    }
   /* if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }*/
    if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
     }
     if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     if(value[5]!="" && value[5]!=null){
        data.append('FLTR-MS-STATUS', value[5].join("|"));
    }
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/product/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'PRODUCT_AUDIT_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterProductSaga(){
    yield takeLatest("PRODUCT_AUDIT_FILTER_BY_VALUE",getProductFilterDataGenerator)
} 
/*****end get zip terr filter data *****/
/***revert*****/
function* GetProductRevertGenerator(action){
   
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
            data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-MARKET_NAME', value[2].join("|"));
        }
       /* if(value[3]!="" && value[3]!=null){
           data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }*/
        if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
         }
         if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
         }
         if(value[5]!="" && value[5]!=null){
            data.append('FLTR-MS-STATUS', value[5].join("|"));
        }
         
    }
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/product/revert",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REVERT_PRODUCT_RESPONSE',payload:result.data})
}
function* getProductRevertSaga(){
    yield takeLatest("REVERT_PRODUCT_REQUEST",GetProductRevertGenerator)
} 
/***rever end****/

export default function* ProductAuditingSaga(){

    yield race([getProductRevertSaga(),getFilterProductSaga(),listProductdSaga()])
}