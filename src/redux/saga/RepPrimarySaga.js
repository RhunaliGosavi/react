import React from "react"
import {takeLatest,put,race} from "redux-saga/effects"
import axios from "axios"
/*****get PRep Primary data *****/
function* getRepPrimaryGenerator(action){
  
    let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var selectedCheckId="";
    var value="";
    var data = new FormData();
    if(action.payload.value){
         selectedCheckId = action.payload.data;
         value = action.payload.value;
    }
    data=getFilters(value,selectedCheckId,action.payload.pagelimit,pageStart,action.payload.pageSort,data)
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/repprimary/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });


    yield put({type:'GET_REP_PRIMARY_LIST',payload:result.data})
}
function* listRepPrimarySaga(){
    yield takeLatest("GET_REP_PRIMARY_DATA",getRepPrimaryGenerator)
} 

function getFilters(value,selectedCheckId,pagelimit,pageStart,pageSort,data){

    
    data.append('pagesize', pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', pageSort);
    data.append('sortorder', 'desc');

   if(value!=""){
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
/*****end get PRep Primary data *****/

/*****end get Rep Primary filter data  *****/
function* getPricingFilterDataGenerator(action){
   
    let selectedCheckId = action.payload.data;
    let value = action.payload.value;
    var data = new FormData();
    data=getFilters(value,selectedCheckId,action.payload.pagelimit,0,action.payload.pageSort,data)
   
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/repprimary/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'REP_PRIMARY_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterRepPrimarySaga(){
    yield takeLatest("REP_PRIMARY_FILTER_BY_VALUE",getPricingFilterDataGenerator)
} 
/*****end get rep primary filter data *****/


/*****update rep primary data *****/
function* updatePricingGenerator(action){
let data=action.payload.data;
let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
let value = action.payload.Filtervalue;
let obj={};

        if(value[0]!="" && value[0]!=null){
        
            obj['FLTR-MS-NPI'] = [value[0].join("|")];
        }
        if(value[1]!="" && value[1]!=null){
            obj['FLTR-MS-FIRSTNAME'] = [value[1].join("|")];
        
        }
       if(value[2]!="" && value[2]!=null){
            obj['FLTR-MS-LASTNAME'] = [value[2].join("|")];
        }

        if(value[3]!="" && value[3]!=null){
            obj['FLTR-MS-STATUS'] = [value[3].join("|")];
        }
        if(value[4]!="" && value[4]!=null){
            obj['FLTR-MS-REVIEWD_BY_DS'] = [value[4].join("|")];
        }

   let postData= {
        "DATA": data,
        "PAGE": {
            "sortby": action.payload.pageSort,
            "sortorder": "desc",
            "pagesize": action.payload.pageLimit,
            "pagestart":pageStart,
            "filters": obj
        }
    }

    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/repprimary/update",
        data:postData,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

       
   
    yield put({type:'UPDATE_REP_PRIMARY_RECORDS_RESPONSE',payload:result.data})
}
function* updateRepPrimaryDataSaga(){
    yield takeLatest("UPDATE_REP_PRIMARY_RECORDS_REQUEST",updatePricingGenerator)
} 

/*****end update Rep Primary data *****/

/****FILTER data **********/

    function* filterPricingGenerator(action){
    
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/repprimary/filters?fields=firstname&fields=lastname&fields=status&fields=npi&fields=reviewd_by_ds",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_REP_PRIMARY_FILTER_RESPONSE',payload:result.data ? result.data.DATA : []})
    }
    function* FilterRepPrimarySaga(){
        yield takeLatest("GET_REP_PRIMARY_FILTER_RESULT",filterPricingGenerator)
    } 

    
/***FILTER data **********/


export default function* RepPrimarySaga(){

    yield race([getFilterRepPrimarySaga(),FilterRepPrimarySaga(),listRepPrimarySaga(),updateRepPrimaryDataSaga()])
}