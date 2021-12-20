import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"


/*****get zip ter data *****/
function* getZipTerrGenerator(action){
   
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
            data.append('FLTR-MS-ZT_SALES_FORCE_NAME', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-ZT_REGION_NAME', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
            data.append('FLTR-MS-ZT_DISTRICT_NAME', value[2].join("|"));
        }
        if(value[3]!="" && value[3]!=null){
        data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
        }
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
        if(value[7]!="" && value[7]!=null){
            data.append('FLTR-MS-ZT_ZIP_CODE', value[7]);
        }
    }

    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/zipterr/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_ZIP_TERR_LIST',payload:result.data})
}
function* listZipTerrdSaga(){
    yield takeLatest("GET_ZIP_TERR_DATA",getZipTerrGenerator)
} 
/*****end get zip ter data *****/

/*****end get zip terr filter data  *****/
function* getZipTerrFilterDataGenerator(action){
   
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder',  action.payload.sortorder);

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
    if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }
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
    if(value[7]!="" && value[7]!=null){
        data.append('FLTR-MS-ZT_ZIP_CODE', value[7]);
    }
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/zipterr/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'ZIP_TERR_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterZipTerrSaga(){
    yield takeLatest("ZIPP_FILTER_BY_VALUE",getZipTerrFilterDataGenerator)
} 
/*****end get zip terr filter data *****/


/*****update zip terr data *****/
function* updateZipTerrGenerator(action){
let data=action.payload.data;
let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
let value = action.payload.Filtervalue;
let obj={};

        if(value[0]!="" && value[0]!=null){
        
            obj['FLTR-MS-ZT_SALES_FORCE_NAME'] = [value[0].join("|")];
        }
        if(value[1]!="" && value[1]!=null){
            obj['FLTR-MS-ZT_REGION_NAME'] = [value[1].join("|")];
        
        }
        if(value[2]!="" && value[2]!=null){
            obj['FLTR-MS-ZT_DISTRICT_NAME'] = [value[2].join("|")];
        }
        if(value[3]!="" && value[3]!=null){
            obj['FLTR-MS-REVIEWD_BY_DS'] = [value[3].join("|")];
        }
        if(value[5]!="" && value[5]!=null){
            obj['FLTR-MS-ZT_TERR_NAME'] = [value[5].join("|")];
        }
        if(value[6]!="" && value[6]!=null){
            obj['FLTR-MS-STATUS'] = [value[6].join("|")];
           
        }
        if(value[7]!="" && value[7]!=null){
            obj['FLTR-MS-ZT_ZIP_CODE'] = [value[7]]
           
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
        url:process.env.REACT_APP_API_BASE_URL+"/zipterr/update",
        data:postData,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

       
   
    yield put({type:'UPDATE_ZIP_TERR_RECORDS_RESPONSE',payload:result.data})
}
function* updateZipTerrDataSaga(){
    yield takeLatest("UPDATE_ZIP_TERR_RECORDS_REQUEST",updateZipTerrGenerator)
} 

/*****end update zip terr data *****/

/****Insert zip terr****/

function* insertZipTerrGenerator(action){
    
   
     var result =yield axios({
         method:"POST",
         url:process.env.REACT_APP_API_BASE_URL+"/zipterr/insert",
         data:action.payload,
         headers: {
             'Content-Type': 'application/json',
             "Authorization" : `Bearer ${localStorage.jwt}`
         }
     });
    
    
     yield put({type:'UINSERT_ZIP_TERR_RESPONSE',payload:result.data})
 }
 function* insertZipTerrSaga(){
     yield takeLatest("INSERT_ZIP_TERR",insertZipTerrGenerator)
 } 
/***insert zip terr end***/

/***get export data end***/

function* zipTerrExportGenerator(action){
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
        data.append('FLTR-MS-ZT_SALES_FORCE_NAME', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-ZT_REGION_NAME', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-ZT_DISTRICT_NAME', value[2].join("|"));
    }
    if(value[3]!="" && value[3]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[3].join("|"));
    }
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
    if(value[7]!="" && value[7]!=null){
        data.append('FLTR-MS-ZT_ZIP_CODE', value[7]);
    }
    data.append(
    
      "filename","testFile"
    );

    var result =yield axios({
      method:"POST",
      url:process.env.REACT_APP_API_BASE_URL+"/zipterr/export/csv",
      data:data,
      headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
    
    yield put({type:'ZIP_TERR_EXPORT_RESPONSE',payload:result.data})
    }
    function* zipTerrExportSaga(){
    yield takeLatest("ZIP_TERR_EXPORT",zipTerrExportGenerator)
    } 
    /***get export data end***/
    /****Import **********/
    function* importZipTerrGenerator(action){
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
            url:process.env.REACT_APP_API_BASE_URL+"/zipterr/import",
            data:formData,
            config: { headers: {'Content-Type': 'multipart/form-data' ,"Authorization" : `Bearer ${localStorage.jwt}`}}
        });
    
        
        yield put({type:'ZIP_TERR_IMPORT_RESPONSE',payload:result.data})
    }
    function* ImportzipTerrSaga(){
        yield takeLatest("IMPORT_ZIP_TERR_FILE",importZipTerrGenerator)
    } 

/***Import **********/
/****FILTER data **********/
    function* filterZipTerrGenerator(action){
      
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/zipterr/filters?fields=zt_alignment_year&fields=zt_alignment_qtr&fields=zt_sales_force_id&fields=zt_sales_force_name&fields=reviewd_by_ds&fields=zt_region_name&fields=zt_district_name&fields=zt_terr_name&fields=status&fields=zt_zip_code",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
       
       
        yield put({type:'GET_FILTER_RESPONSE',payload:result.data ? result.data.DATA : []})
    }
    function* FilterZipTerrSaga(){
        yield takeLatest("GET_FILTER_RESULT",filterZipTerrGenerator)
    } 


    function* insertFilterZipTerrGenerator(action){
      
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/zipterr/mapping?fields=zt_sales_force_id-zt_sales_force_name",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_INSERT_FILTER_RESPONSE',payload:result.data ? result.data.DATA["zt_sales_force_id-zt_sales_force_name"]:[]})
    }
    function* InsertFilterZipTerrSaga(){
        yield takeLatest("GET_INSERT_FILTER_RESULT",insertFilterZipTerrGenerator)
    } 

    function* getZipTerrIdGenerator(action){
      
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/zipterr/terr/all",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
       
       
        yield put({type:'ZIP_TERR_LIST_RESPONSE',payload:result.data.DATA ? Object.keys(result.data.DATA) : []})
    }
    
    function* getZipTerrIdSaga(){
        yield takeLatest("GET_ZIP_TERR_LIST",getZipTerrIdGenerator)
    } 
/***FILTER data **********/
/*****get button enabled details *****/

function* enableZippButtonGenerator(action){
        
    let result = yield axios({
        method:"GET",
        url:process.env.REACT_APP_API_BASE_URL+"/zipterr/parameters",
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });

    yield put({type:'ZIP_ENABLE_BUTTON_DETAILS_RESPONSE',payload:result.data })
}
function* enableZippButtonSaga(){
    yield takeLatest("GET_ZIP_ENABLE_BUTTON_DETAILS",enableZippButtonGenerator)
} 
/*****get button enabled details end*****/



export default function* DataStewardshipZipTerrSaga(){

    yield race([enableZippButtonSaga(),getZipTerrIdSaga(),InsertFilterZipTerrSaga(),getFilterZipTerrSaga(),FilterZipTerrSaga(),ImportzipTerrSaga(),zipTerrExportSaga(),insertZipTerrSaga(),listZipTerrdSaga(),updateZipTerrDataSaga()])
}