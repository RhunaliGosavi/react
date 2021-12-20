import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"


/*****get Product data *****/
function* getProductGenerator(action){
  
    let pageStart=(action.payload.pagestart-1) * action.payload.pagelimit;
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', 'desc');
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/product/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_PRODUCT_LIST',payload:result.data})
}
function* listProductdSaga(){
    yield takeLatest("GET_PRODUCT_DATA",getProductGenerator)
} 
/*****end get Product data *****/

/*****end get Product filter data  *****/
function* filterBrandProductProductGenerator(action){
    
    let result = yield axios({
        method:"GET",
        url:process.env.REACT_APP_API_BASE_URL+"/product/mapping?fields=brand_name-product_name",
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });
  
    
    yield put({type:'GET_PRODUCT_BRAND_PRODUCT_FILTER_RESPONSE',payload:result.data })
}
function* FilterBrandProductProductSaga(){
    yield takeLatest("GET_PRODUCT_BRAND_PRODUCT_FILTER",filterBrandProductProductGenerator)
} 


function* getProductFilterDataGenerator(action){
   
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
        data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-MARKET_NAME', value[2].join("|"));
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
        data.append('FLTR-MS-STATUS', value[5].join("|"));
     }
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/product/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'PRODUCT_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterProductSaga(){
    yield takeLatest("PRODUCT_FILTER_BY_VALUE",getProductFilterDataGenerator)
} 
/*****end get Product filter data *****/


/*****update Product data *****/
function* updateProductGenerator(action){
let data=action.payload.data;
let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
let value = action.payload.Filtervalue;
let obj={};

        if(value[0]!="" && value[0]!=null){
        
            obj['FLTR-MS-PRODUCT_NAME'] = [value[0].join("|")];
        }
        if(value[1]!="" && value[1]!=null){
            obj['FLTR-MS-BRAND_NAME'] = [value[1].join("|")];
        
        }
        if(value[2]!="" && value[2]!=null){
            obj['FLTR-MS-MARKET_NAME'] = [value[2].join("|")];
        }
        if(value[3]!="" && value[3]!=null){
            obj['FLTR-MS-REVIEWD_BY_DS'] = [value[3].join("|")];
        }
        if(value[5]!="" && value[5]!=null){
            obj['FLTR-MS-STATUS'] = [value[5].join("|")];
            
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
        url:process.env.REACT_APP_API_BASE_URL+"/product/update",
        data:postData,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

       
   
    yield put({type:'UPDATE_PRODUCT_RECORDS_RESPONSE',payload:result.data})
}
function* updateProductDataSaga(){
    yield takeLatest("UPDATE_PRODUCT_RECORDS_REQUEST",updateProductGenerator)
} 

/*****end update Product data *****/

/***get export data end***/

function* productExportGenerator(action){
    const data = new FormData();
    
    // Update the formData object
    let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
  //  data.append('pagesize', action.payload.pageLimit);
    data.append('pagestart',pageStart);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', 'desc');

    let selectedCheckId = action.payload.checkedIds;
    let value = action.payload.Filtervalue;
       

    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-MS-PRODUCT_NAME', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
        data.append('FLTR-MS-MARKET_NAME', value[2].join("|"));
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
        data.append('FLTR-MS-STATUS', value[5].join("|"));
     }

    data.append(
    
      "filename","testFile"
    );

    var result =yield axios({
      method:"POST",
      url:process.env.REACT_APP_API_BASE_URL+"/product/export/csv",
      data:data,
      headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
    
    yield put({type:'PRODUCT_EXPORT_RESPONSE',payload:result.data})
    }
    function* ProductExportSaga(){
    yield takeLatest("PRODUCT_EXPORT",productExportGenerator)
    } 
    /***get export data end***/
    /****Import **********/
    function* importProductGenerator(action){
        const formData = new FormData();
        
        // Update the formData object
        formData.append(
            "file",action.payload
        );
        formData.append(
            "username",localStorage.fullname
        );
        var result =yield axios({
            method:"POST",
            url:process.env.REACT_APP_API_BASE_URL+"/product/import",
            data:formData,
            config: { headers: {'Content-Type': 'multipart/form-data' ,"Authorization" : `Bearer ${localStorage.jwt}`}}
        });
    
      
        yield put({type:'PRODUCT_IMPORT_RESPONSE',payload:result.data})
    }
    function* ImportProductSaga(){
        yield takeLatest("IMPORT_PRODUCT_FILE",importProductGenerator)
    } 

/***Import **********/
/****FILTER data **********/
    function* filterProductGenerator(action){
      
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/product/filters?fields=product_name&fields=brand_name&fields=market_name&fields=reviewd_by_ds&fields=status",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_FILTER_RESPONSE',payload:result.data ? result.data.DATA : []})
    }
    function* FilterProductSaga(){
        yield takeLatest("GET_PRODUCT_FILTER_RESULT",filterProductGenerator)
    } 

    
/***FILTER data **********/
/****Insert PRODUCT****/

function* insertProductGenerator(action){
    let data=action.payload.data;
    //let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
    let pageStart=0;
   // let value = action.payload.Filtervalue;
    /*let obj={};

        if(value[0]!="" && value[0]!=null){
        
            obj['FLTR-MS-PRODUCT_NAME'] = [value[0].join("|")];
        }
        if(value[1]!="" && value[1]!=null){
            obj['FLTR-MS-BRAND_NAME'] = [value[1].join("|")];
        
        }
        if(value[2]!="" && value[2]!=null){
            obj['FLTR-MS-MARKET_NAME'] = [value[2].join("|")];
        }
        if(value[3]!="" && value[3]!=null){
            obj['FLTR-MS-REVIEWD_BY_DS'] = [value[3].join("|")];
        }*/

   let postData= {
        "DATA": data,
        "PAGE": {
            "sortby": action.payload.pageSort,
            "sortorder": "desc",
            "pagesize": action.payload.pageLimit,
            "pagestart":pageStart,
           // "filters": obj
        }
    }
   
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/product/insert",
        data:postData,
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.jwt}`
        }
    });
   
   
    yield put({type:'INSERT_PRODUCT_RESPONSE',payload:result.data})
}
function* insertProductSaga(){
    yield takeLatest("INSERT_PRODUCT",insertProductGenerator)
} 
/***insert PRODUCT end***/


/****insert product drop****/

function* insertProductDropGenerator(action){
      
    let result = yield axios({
        method:"GET",
        url:process.env.REACT_APP_API_BASE_URL+"/product/keyvalue?fields=brand_id-brand_name&fields=market_id-market_name",
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
        
    });
  
    
    yield put({type:'INSERT_PRODUCT_FILTER_DROP_RESPONSE',payload:result.data ? result.data.DATA:[]})
}
function* InsertProductFilterDropSaga(){
    yield takeLatest("GET_INSERT_PRODUCT_FILTER_DROP",insertProductDropGenerator)
} 
/***insert product drop end****/
export default function* ProductSaga(){

    yield race([FilterBrandProductProductSaga(),InsertProductFilterDropSaga(),insertProductSaga(),getFilterProductSaga(),FilterProductSaga(),ImportProductSaga(),ProductExportSaga(),listProductdSaga(),updateProductDataSaga()])
}