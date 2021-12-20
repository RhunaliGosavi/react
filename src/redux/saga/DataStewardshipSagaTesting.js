import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"

/****Import testng**********/



function* importefPrefferdGenerator(action){
    const formData = new FormData();
    
      // Update the formData object
      formData.append(
       "file",action.payload.file
     );
      formData.append(
       "username",localStorage.fullname
      );
      
        formData.append('pagestart',action.payload.pagestart);
        formData.append('sortby', action.payload.pageSort);
        formData.append('sortorder',  action.payload.sortorder);
        formData.append('pagesize',  action.payload.pageLimit);
      
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/importTestingData",
        data:formData,
        config: { 
            headers: {
                'Content-Type': 'multipart/form-data' ,
                'Authorization' : `Bearer ${localStorage.jwt}`
            }
        }
    });
   
    
    yield put({type:'IMPORT_RESPONSE',payload:result.data})
}
function* ImportRefPrefferdSaga(){
    yield takeLatest("IMPORT_TESTING_FILE",importefPrefferdGenerator)
} 
/***Import Testing**********/
/*****get testing data *****/
function* getRefPrefferdGenerator(action){
   let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', action.payload.sortorder);


  
   if(action.payload.value){
    let selectedCheckId = action.payload.data;
    let value = action.payload.value;
    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-STATUS', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-REC_UPDATED_BY', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
    }
    if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-TST_SOURCE', value[3].join("|"));
    }
    if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-TST_SRC_ID', value[4].join("|"));
     }
     if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ? selectedCheckId.join("|") : "NO DATA");
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
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/testing/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });
  if(result){
    yield put({type:'GET_REP_PREFFERD_LIST',payload:result.data})
  }
}
function* listRefPrefferdSaga(){
    yield takeLatest("GET_REP_PREFFERD_DATA",getRefPrefferdGenerator)
} 
/*****end get testing data *****/
/*****update testing data *****/
function* updateRefPrefferdGenerator(action){
    let data=action.payload.data;
    let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
    let value = action.payload.Filtervalue;
    let obj={};
    if(value[0]!="" && value[0]!=null){
    
        obj['FLTR-MS-STATUS'] = [value[0].join("|")];
    }
    if(value[1]!="" && value[1]!=null){
        obj['FLTR-MS-REC_UPDATED_BY'] = [value[1].join("|")];
    
    }
    if(value[2]!="" && value[2]!=null){
        obj['FLTR-MS-REVIEWD_BY_DS'] = [value[2].join("|")];
    }
    if(value[3]!="" && value[3]!=null){
        obj['FLTR-MS-TST_SOURCE'] = [value[3].join("|")];
    }
    if(value[4]!="" && value[4]!=null){
        obj['FLTR-MS-TST_SRC_ID'] = [value[4].join("|")];
    }
    if(value[6]!="" && value[6]!=null){
        obj['FLTR-MS-RULE'] = [value[6].join("|")];
        
    }
    if(value[7]!="" && value[7]!=null){
       
        obj['FLTR-MS-SRC_HCP_FN_LN_NPI'] = [value[7].join("|")];
     }

   let postData= {
        "DATA": data,
        "PAGE": {
            "sortby": action.payload.pageSort,
            "sortorder": action.payload.sortorder,
            "pagesize": action.payload.pageLimit,
            "pagestart":pageStart,
            "filters": obj
        }
    }

    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/testing/update",
        data:postData,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

    
   
    yield put({type:'UPDATE_SUBMITTED_RECORDS_RESPONSE',payload:result.data})
}
function* updateTestingDataSaga(){
    yield takeLatest("UPDATE_SUBMITTED_RECORDS_REQUEST",updateRefPrefferdGenerator)
} 


/****update EXCEL data**********/

/***get reg data*******/
function* getRegGenerator(action){


var result =yield axios({
  method:"POST",
  url:process.env.REACT_APP_API_BASE_URL+"/getNPIData/"+action.payload,
  headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
});


yield put({type:'GET_REG_RESPONSE',payload:result.data})
}
function* getRegSaga(){
yield takeLatest("GET_REG_DATA",getRegGenerator)
} 
/***get export data end***/

function* testingExportGenerator(action){
    const data = new FormData();
    
    // Update the formData object
    let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
   // data.append('pagesize', action.payload.pageLimit);
    data.append('pagestart',0);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', action.payload.sortorder);

    let selectedCheckId = action.payload.checkedIds;
    let value = action.payload.Filtervalue;
    console.log("selectedCheckId",selectedCheckId)
    console.log("valye",value)
    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-STATUS', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-REC_UPDATED_BY', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
    }
    if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-TST_SOURCE', value[3].join("|"));
    }
    if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-TST_SRC_ID', value[4].join("|"));
    }
    if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ? selectedCheckId.join("|") : "NO DATA");

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
    data.append(
    
      "filename","testFile"
    );

    var result =yield axios({
      method:"POST",
      url:process.env.REACT_APP_API_BASE_URL+"/testing/export/csv",
      data:data,
      headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
    
    console.log("REG data log***",result)
    yield put({type:'TESTING_EXPORT_RESPONSE',payload:result.data})
    }
    function* testingExportSaga(){
    yield takeLatest("TESTING_EXPORT",testingExportGenerator)
    } 
    /***get export data end***/

    /****FILTER data **********/
    function* FilterTestSourceMappingGenerator(action){
    
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/testing/mapping?fields=tst_source-tst_src_id&fields=tst_source-src_hcp_fn_ln_npi&fields=status-tst_src_id",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_TESTING_MAPPING_FILTER_RESPONSE',payload:result.data})
    }
    function* FilterTestSourceMappingSaga(){
        yield takeLatest("GET_TESTING_MAPPING_FILTER",FilterTestSourceMappingGenerator)
    }
    function* filterTestingGenerator(action){
      
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/testing/filters?fields=status&fields=rec_updated_by&fields=reviewd_by_ds&fields=tst_source&fields=tst_src_id&fields=comments&fields=src_hcp_fn_ln_npi&fields=Rule",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
        let filteredStatus=[];
        if(result.data.DATA.status){
             filteredStatus=result.data.DATA.status.filter((val)=>{
              if(val!="Rejected" && val!="Approved" ){
                  return val;
              }
            })
        }
        result.data.DATA.filteredStatus=filteredStatus;
      //console.log("filter status",result.data.DATA)
        
        yield put({type:'GET_TESTING_FILTER_RESULT_RESPONSE',payload:result.data ? result.data.DATA : [] })
    }
    function* FilterTestingSaga(){
        yield takeLatest("GET_TESTING_FILTER_RESULT",filterTestingGenerator)
    } 
    
/***FILTER data **********/

/*****end get zip terr filter data  *****/
function* getTestingFilterDataDataGenerator(action){
   
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', action.payload.sortorder);

    let selectedCheckId = action.payload.data;
    console.log("checked ids",selectedCheckId)
    let value = action.payload.value;
    
    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-STATUS', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-REC_UPDATED_BY', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
    }
    if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-TST_SOURCE', value[3].join("|"));
    }
    if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-TST_SRC_ID', value[4].join("|"));
     }
     if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ? selectedCheckId.join("|") : "NO DATA");

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
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/testing/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'TESTING_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterTestingDataSaga(){
    yield takeLatest("FILTER_BY_VALUE",getTestingFilterDataDataGenerator)
} 
/*****end get zip terr filter data *****/
export default function* DataStewardshipTestingSaga(){

    yield race([FilterTestSourceMappingSaga(),getFilterTestingDataSaga(),FilterTestingSaga(),testingExportSaga(),getRegSaga(),listRefPrefferdSaga(),updateTestingDataSaga(),ImportRefPrefferdSaga()])
}
