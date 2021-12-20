import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"


/*****get Pricing data *****/
function* getPricingGenerator(action){
  
    let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', 'desc');

    if(action.payload.value){
        let selectedCheckId = action.payload.data;
        let value = action.payload.value;
           
    
        if(value[0]!="" && value[0]!=null){
            data.append('FLTR-MS-PRODUCT_NAME', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-ACTV_FLG', value[1].join("|"));
        }
     
        if(value[2]!="" && value[2]!=null){
           data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
        }
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

  
    yield put({type:'GET_PRICING_LIST',payload:result.data})
}
function* listPricingdSaga(){
    yield takeLatest("GET_PRICING_DATA",getPricingGenerator)
} 
/*****end get Pricing data *****/

/*****end get Pricing filter data  *****/
function* getPricingFilterDataGenerator(action){
   
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', 'desc');

    let selectedCheckId = action.payload.data;
    let value = action.payload.value;
       

    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-PRODUCT_NAME', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-ACTV_FLG', value[1].join("|"));
    }
 
    if(value[2]!="" && value[2]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
    }
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
 
    yield put({type:'PRICING_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterPricingSaga(){
    yield takeLatest("PRICING_FILTER_BY_VALUE",getPricingFilterDataGenerator)
} 
/*****end get Pricing filter data *****/


/*****update Pricing data *****/
function* updatePricingGenerator(action){
let data=action.payload.data;
let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
let value = action.payload.Filtervalue;
let obj={};

        if(value[0]!="" && value[0]!=null){
        
            obj['FLTR-MS-PRODUCT_NAME'] = [value[0].join("|")];
        }
        if(value[1]!="" && value[1]!=null){
            obj['FLTR-MS-ACTV_FLG'] = [value[1].join("|")];
        
        }
       if(value[2]!="" && value[2]!=null){
            obj['FLTR-MS-REVIEWD_BY_DS'] = [value[2].join("|")];
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
        url:process.env.REACT_APP_API_BASE_URL+"/pricing/update",
        data:postData,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

       
   
    yield put({type:'UPDATE_PRICING_RECORDS_RESPONSE',payload:result.data})
}
function* updatePricingDataSaga(){
    yield takeLatest("UPDATE_PRICING_RECORDS_REQUEST",updatePricingGenerator)
} 

/*****end update Pricing data *****/

/****FILTER data **********/



    function* filterProductDropGenerator(action){
        
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/product/filters?fields=product_name&fields=product_numb",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
    
        
        yield put({type:'GET_PRODCT_DROPDOWN_FILTER_RESPONSE',payload:result.data ? result.data.DATA : []})
    }
    function* FilterProductDropSaga(){
        yield takeLatest("GET_PRODCT_DROPDOWN_FILTER_RESULT",filterProductDropGenerator)
    } 


    function* filterPricingGenerator(action){
    
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/pricing/filters?fields=product_name&fields=actv_flg&fields=reviewd_by_ds&fields=product_numb",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_PRICING_FILTER_RESPONSE',payload:result.data ? result.data.DATA : []})
    }
    function* FilterPricingSaga(){
        yield takeLatest("GET_PRICING_FILTER_RESULT",filterPricingGenerator)
    } 

    
/***FILTER data **********/

/****Insert PRODUCT****/

function* insertPricingGenerator(action){
    
    let data=action.payload.data;
   // let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
    let pageStart =0;
   // let value = action.payload.Filtervalue;
    /*let obj={};
    
            if(value[0]!="" && value[0]!=null){
            
                obj['FLTR-MS-PRODUCT_NAME'] = [value[0].join("|")];
            }
            if(value[1]!="" && value[1]!=null){
                obj['FLTR-MS-ACTV_FLG'] = [value[1].join("|")];
            
            }
           if(value[2]!="" && value[2]!=null){
                obj['FLTR-MS-REVIEWD_BY_DS'] = [value[2].join("|")];
            }
    */
       let postData= {
            "DATA": data,
            "PAGE": {
                "sortby": action.payload.pageSort,
                "sortorder": "desc",
                "pagesize": action.payload.pageLimit,
                "pagestart":pageStart,
                //"filters": obj
            }
        }

    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/pricing/insert",
        data:postData,
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.jwt}`
        }
    });
   
   
    yield put({type:'INSERT_PRICING_RESPONSE',payload:result.data})
}
function* insertPricingSaga(){
    yield takeLatest("INSERT_PRICING",insertPricingGenerator)
} 
/***insert PRODUCT end***/


/****FILTER data **********/

function* productDetailsGenerator(action){

    let result = yield axios({
        method:"GET",
        url:process.env.REACT_APP_API_BASE_URL+"/pricing/product/"+action.payload,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });
  
    
    yield put({type:'GET_PRODUCT_DETAILS_RESPONSE',payload:result.data ? result.data.DATA : []})
}
function* productDetailsSaga(){
    yield takeLatest("GET_PRODUCT_DETAILS",productDetailsGenerator)
} 


/***FILTER data **********/
/****insert product drop****/

function* insertProductDropGenerator(action){
      
    let result = yield axios({
        method:"GET",
        url:process.env.REACT_APP_API_BASE_URL+"/product/keyvalue?fields=product_numb-product_name",
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });
  
    
    yield put({type:'INSERT_PRODUCT_DROP_RESPONSE',payload:result.data ? result.data.DATA["product_numb-product_name"]:[]})
}
function* InsertProductDropSaga(){
    yield takeLatest("GET_INSERT_PRODUCT_DROP",insertProductDropGenerator)
} 
/***insert product drop end****/
export default function* PricingSaga(){

    yield race([InsertProductDropSaga(),productDetailsSaga(),insertPricingSaga(),FilterProductDropSaga(),getFilterPricingSaga(),FilterPricingSaga(),listPricingdSaga(),updatePricingDataSaga()])
}