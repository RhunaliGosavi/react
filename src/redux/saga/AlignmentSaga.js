import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"


/*****get alignment data *****/
function* GetAlignmentGenerator(action){
  
    let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);

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
        if(value[3]!="" && value[3]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }
        if(value[4]!="" && value[4]!=null){
            data.append('FLTR-MS-REVIEW_CATEGORY', value[4].join("|"));
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
            data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
        }
        if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
        }
        if(value[6]!="" && value[6]!=null){
            data.append('FLTR-MS-GROUP', value[6].join("|"));
        }
        if(value[7]!="" && value[7]!=null){
            data.append('FLTR-MS-CM_NPI', value[7]);
        }
     
    }
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/alignment/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_ALIGNMENT_LIST',payload:result.data})
}
function* ListAlignmentSaga(){
    yield takeLatest("GET_ALIGNMENT_DATA",GetAlignmentGenerator)
} 
/*****end get alignment data *****/

/*****end get alignment filter data  *****/
function* GetAlignmentFilterDataGenerator(action){
   
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);

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
    if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }
    if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-REVIEW_CATEGORY', value[4].join("|"));
     }
    if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
     }
     if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     if(value[6]!="" && value[6]!=null){
        data.append('FLTR-MS-GROUP', value[6].join("|"));
    }
    if(value[7]!="" && value[7]!=null){
        data.append('FLTR-MS-CM_NPI', value[7]);
    }
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/alignment/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'ALIGNMENT_FILTER_RESPONSE',payload:result.data})
}
function* getFilterAlignmentSaga(){
    yield takeLatest("ALIGNMENT_FILTER_BY_VALUE",GetAlignmentFilterDataGenerator)
} 
/*****end get alignment filter data *****/


/*****update alignment data *****/
function* UpdateAlignmentGenerator(action){
let data=action.payload.data;
let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
let value = action.payload.Filtervalue;
let obj={};

        if(value[0]!="" && value[0]!=null){
        
            obj['FLTR-MS-HAS_SALE'] = [value[0].join("|")];
        }
        if(value[1]!="" && value[1]!=null){
            obj['FLTR-MS-HAS_SALE_LAST_2_QTR'] = [value[1].join("|")];
        
        }
        if(value[2]!="" && value[2]!=null){
            obj['FLTR-MS-STATUS'] = [value[2].join("|")];
        }
        if(value[3]!="" && value[3]!=null){
            obj['FLTR-MS-REVIEWD_BY_DS'] = [value[3].join("|")];
        }
        if(value[4]!="" && value[4]!=null){
            obj['FLTR-MS-REVIEW_CATEGORY'] = [value[4].join("|")];
        }
        if(value[6]!="" && value[6]!=null){
            obj['FLTR-MS-GROUP'] = [value[6].join("|")];
        }

        if(value[7]!="" && value[7]!=null){
            obj['FLTR-MS-CM_NPI'] = [value[7]];
        }
      
       

   let postData= {
        "DATA": data,
        "PAGE": {
            "sortby": action.payload.pageSort,
            "sortorder":  action.payload.sortorder,
            "pagesize": action.payload.pageLimit,
            "pagestart":pageStart,
            "filters": obj
        }
    }

    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/alignment/update",
        data:postData,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

       
   
    yield put({type:'UPDATE_ALIGNMENT_RESPONSE',payload:result.data})
}
function* UpdateAlignmentDataSaga(){
    yield takeLatest("UPDATE_ALIGNMENT_REQUEST",UpdateAlignmentGenerator)
} 

/*****end update alignment data *****/


/***get export data end***/

function* AlignmentExportGenerator(action){
    const data = new FormData();
    
    // Update the formData object
    let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
  //  data.append('pagesize', action.payload.pageLimit);
    data.append('pagestart',0);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);

    let selectedCheckId = action.payload.checkedIds;
    let value = action.payload.Filtervalue;
       

    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-HAS_SALE', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-HAS_SALE_LAST_2_QTR', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-STATUS', value[2].join("|"));
    }
    if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }
    if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-REVIEW_CATEGORY', value[4].join("|"));
     }
    if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Checked") ){
        data.append('FLTR-MS-ID',(selectedCheckId && selectedCheckId.length > 0) ?   selectedCheckId.join("|") : "NO DATA");
     }
     if(value[5]!="" && value[5]!=null && value[5].length<2 && value[5].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     if(value[6]!="" && value[6]!=null){
        data.append('FLTR-MS-GROUP', value[6].join("|"));
    }
    if(value[7]!="" && value[7]!=null){
        data.append('FLTR-MS-CM_NPI', value[7]);
    }

    data.append(
    
      "filename","testFile"
    );

    var result =yield axios({
      method:"POST",
      url:process.env.REACT_APP_API_BASE_URL+"/alignment/export/csv",
      data:data,
      headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
    
    yield put({type:'ALIGNMENT_EXPORT_RESPONSE',payload:result.data})
    }
    function* AlignmentExportSaga(){
    yield takeLatest("ALIGNMENT_EXPORT",AlignmentExportGenerator)
    } 
    /***get export data end***/
    /****Import **********/
    function* importAlignmentGenerator(action){
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
            url:process.env.REACT_APP_API_BASE_URL+"/alignment/import",
            data:formData,
            config: { headers: {'Content-Type': 'multipart/form-data',"Authorization" : `Bearer ${localStorage.jwt}` }}
            
        });
    
        
        yield put({type:'ALIGNMENT_IMPORT_RESPONSE',payload:result.data})
    }
    function* ImportAlignmentSaga(){
        yield takeLatest("IMPORT_ALIGNMENT_FILE",importAlignmentGenerator)
    } 

/***Import **********/
/****FILTER data **********/

    function* filterGroupReviewGenerator(action){
        
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/alignment/mapping?fields=group-review_category",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
    
        yield put({type:'GET_GROUP_REVIEW_FILTER_RESPONSE',payload:result.data })
    }
    function* FilterGroupReviewSaga(){
        yield takeLatest("GET_GROUP_REVIEW_FILTER",filterGroupReviewGenerator)
    } 

    function* filterAlignmentGenerator(action){
      
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/alignment/filters?fields=has_sale&fields=has_sale_last_2_qtr&fields=status&fields=reviewd_by_ds&fields=review_category&fields=group",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_ALIGNMENT_FILTER_RESPONSE',payload:result.data.DATA})
    }
    function* FilterAlignmentSaga(){
        yield takeLatest("GET_ALIGNMENT_FILTER_RESULT",filterAlignmentGenerator)
    } 


    
    
    
/***FILTER data **********/


/****hcp add terr****/

function* insertHcpAddGenerator(action){
    
   
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/alignmenthcpaddress/update",
        data:action.payload,
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.jwt}`
        }
    });
   
   
    yield put({type:'INSERT_HCP_ADDRESS_RESPONSE',payload:result.data})
}
function* insertHcpAddTerrSaga(){
    yield takeLatest("INSERT_HCP_ADDRESS",insertHcpAddGenerator)
} 
/***insert hcp add end***/

/*****get button enabled details *****/

function* enableButtonGenerator(action){
        
    let result = yield axios({
        method:"GET",
        url:process.env.REACT_APP_API_BASE_URL+"/alignment/parameters",
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });

    yield put({type:'ENABLE_BUTTON_DETAILS_RESPONSE',payload:result.data })
}
function* enableButtonSaga(){
    yield takeLatest("GET_ENABLE_BUTTON_DETAILS",enableButtonGenerator)
} 
/*****get button enabled details end*****/


export default function* AlignmentSaga(){

    yield race([enableButtonSaga(),insertHcpAddTerrSaga(),getFilterAlignmentSaga(),FilterAlignmentSaga(),ImportAlignmentSaga(),AlignmentExportSaga(),ListAlignmentSaga(),UpdateAlignmentDataSaga(),FilterGroupReviewSaga()])
}