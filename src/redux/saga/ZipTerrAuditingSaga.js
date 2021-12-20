import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"
import moment from "moment";
/*****get zip ter data *****/
function* getZipTerrGenerator(action){
   
    let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    let Today =moment().format("YYYY-MM-DD");
    let Tomorrow =  moment().add(1, 'days').format("YYYY-MM-DD");
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);

    data.append('FLTR-GE-REC_UPDATED_TS', Today);
    data.append('FLTR-LT-REC_UPDATED_TS',Tomorrow);
    data.append('FLTR-MS-REVIEWD_BY_DS', localStorage.fullname);

    if(action.payload.value){
    
        let selectedCheckId = action.payload.data;
        let value = action.payload.value;
      

        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-MS-ZT_SALES_FORCE_NAME', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-ZT_REGION_NAME', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-ZT_DISTRICT_NAME', value[2].join("|"));
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
            data.append('FLTR-MS-ZT_TERR_NAME', value[5].join("|"));
        }
        if(value[6]!="" && value[6]!=null){
            data.append('FLTR-MS-STATUS', value[6].join("|"));
        }
     
    }
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/zipterr/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_ZIP_TERR_AUDIT_LIST',payload:result.data})
}
function* listZipTerrdSaga(){
    yield takeLatest("GET_ZIP_TERR_AUDIT_DATA",getZipTerrGenerator)
} 
/*****end get zip ter data *****/

/*****end get zip terr filter data  *****/
function* getZipTerrFilterDataGenerator(action){
   
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
        data.append('FLTR-MS-ZT_SALES_FORCE_NAME', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-ZT_REGION_NAME', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-ZT_DISTRICT_NAME', value[2].join("|"));
    }
    /*if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }*/
    if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
     }
     if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     
     if(value[5]!="" && value[5]!=null){
        data.append('FLTR-MS-ZT_TERR_NAME', value[5].join("|"));
     }
     if(value[6]!="" && value[6]!=null){
        data.append('FLTR-MS-STATUS', value[6].join("|"));
    }
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/zipterr/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'ZIP_TERR_AUDIT_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterZipTerrSaga(){
    yield takeLatest("ZIPP_AUDIT_FILTER_BY_VALUE",getZipTerrFilterDataGenerator)
} 
/*****end get zip terr filter data *****/
/***revert*****/
function* GetZipTerrRevertGenerator(action){
   
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
            data.append('FLTR-MS-ZT_SALES_FORCE_NAME', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-ZT_REGION_NAME', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-ZT_DISTRICT_NAME', value[2].join("|"));
        }
        /*if(value[3]!="" && value[3]!=null){
           data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }*/
        if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
         }
         if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
         }
         
         if(value[5]!="" && value[5]!=null){
            data.append('FLTR-MS-ZT_TERR_NAME', value[5].join("|"));
         }
         if(value[6]!="" && value[6]!=null){
            data.append('FLTR-MS-STATUS', value[6].join("|"));
        }
         
    }
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/zipterr/revert",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REVERT_ZIP_TERR_RESPONSE',payload:result.data})
}
function* getZipTerrRevertSaga(){
    yield takeLatest("REVERT_ZIP_TERR_REQUEST",GetZipTerrRevertGenerator)
} 
/***rever end****/

export default function* ZipTerrAuditingSaga(){

    yield race([getZipTerrRevertSaga(),getFilterZipTerrSaga(),listZipTerrdSaga()])
}