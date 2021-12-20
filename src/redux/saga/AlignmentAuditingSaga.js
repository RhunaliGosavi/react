import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"
import moment from "moment";

/*****get alignment data *****/
function* GetAlignmentGenerator(action){
  
    let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);
    data.append('FLTR-GE-REC_UPDATED_TS',Today);
    data.append('FLTR-LT-REC_UPDATED_TS', Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);


    if(action.payload.value){
        let selectedCheckId = action.payload.data;
        
        let value = action.payload.value;
        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-MS-HAS_SALE', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-HAS_SALE_LAST_2_QTR', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-STATUS', value[2].join("|"));
        }
       /* if(value[3]!="" && value[3]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }*/
        if(value[4]!="" && value[4]!=null){
            data.append('FLTR-MS-REVIEW_CATEGORY', value[4].join("|"));
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
        }
    }

    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/alignment/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

 
    yield put({type:'GET_ALIGNMENT_AUDIT_LIST',payload:result.data})
}
function* ListAlignmentSaga(){
    yield takeLatest("GET_ALIGNMENT_AUDIT_DATA",GetAlignmentGenerator)
} 


/*****end get alignment data *****/

/*****end get alignment filter data  *****/
function* GetAlignmentFilterDataGenerator(action){
   
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
        data.append('FLTR-MS-HAS_SALE', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-HAS_SALE_LAST_2_QTR', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-STATUS', value[2].join("|"));
    }
    /*if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }*/
    if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-REVIEW_CATEGORY', value[4].join("|"));
     }
    if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
     }
     if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/alignment/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'ALIGNMENT_AUDIT_FILTER_RESPONSE',payload:result.data})
}
function* getFilterAlignmentSaga(){
    yield takeLatest("ALIGNMENT_AUDIT_FILTER_BY_VALUE",GetAlignmentFilterDataGenerator)
} 
/*****end get alignment filter data *****/
/***revert*****/
function* GetAlignmentRevertGenerator(action){
   
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
            data.append('FLTR-MS-HAS_SALE', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-HAS_SALE_LAST_2_QTR', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-STATUS', value[2].join("|"));
        }
      /*  if(value[3]!="" && value[3]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }*/
        if(value[4]!="" && value[4]!=null){
            data.append('FLTR-MS-REVIEW_CATEGORY', value[4].join("|"));
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
        }
    }
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/alignment/revert",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REVERT_ALIGNMENT_RESPONSE',payload:result.data})
}
function* getAlignmentRevertSaga(){
    yield takeLatest("REVERT_ALIGNMENT_REQUEST",GetAlignmentRevertGenerator)
} 
/***rever end****/

export default function* AlignmentSaga(){

    yield race([getFilterAlignmentSaga(),ListAlignmentSaga(),getAlignmentRevertSaga()])
}