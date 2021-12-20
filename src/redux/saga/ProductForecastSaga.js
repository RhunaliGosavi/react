import React from "react"
import {call,takeLatest,put,race,all, actionChannel,select} from "redux-saga/effects"
import axios from "axios"


/*****get Pricing data *****/
function* getProductForecastGenerator(action){
  
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
            data.append('FLTR-CT-FORECASTYEAR', value[0].join("|"));
        }
        if(value[1]!="" && value[1]!=null){
            data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
        }
        if(value[2]!="" && value[2]!=null){
           data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
        }
        if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Checked") ){
            data.append('FLTR-MS-ID', (selectedCheckId  && selectedCheckId.length >0) ?  selectedCheckId.join("|") : "NO  DATA");
         }
         if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Unchecked") ){
            data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
         }
         if(value[4]!="" && value[4]!=null){
            data.append('FLTR-MS-STATUS', value[4].join("|"));
         }
         
        if(value[5]!="" && value[5]!=null){
            data.append('FLTR-CT-FORECASTMONTH', value[5].join("|"));
         }
        
         
    }
    var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

  
    yield put({type:'GET_PRODUCTFORECAST_LIST',payload:result.data})
}
function* listProductForecastdSaga(){
    yield takeLatest("GET_PRODUCTFORECAST_DATA",getProductForecastGenerator)
} 
/*****end get Pricing data *****/

/*****end get Pricing filter data  *****/
function* getProductForecastFilterDataGenerator(action){
   
    var data = new FormData();
    data.append('pagesize', action.payload.pagelimit);
    data.append('pagestart',"0");
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', 'desc');

    let selectedCheckId = action.payload.data;
    let value = action.payload.value;
      

    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-CT-FORECASTYEAR', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
    }
    if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Checked") ){
        data.append('FLTR-MS-ID', (selectedCheckId  && selectedCheckId.length >0) ?  selectedCheckId.join("|") : "NO  DATA");

     }
     if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-STATUS', value[4].join("|"));
     }
     if(value[5]!="" && value[5]!=null){
        data.append('FLTR-CT-FORECASTMONTH', value[5].join("|"));
     }
   
     
   var result =yield axios({
        method:"POST",
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/data",
        data:data,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
 
    yield put({type:'PRODUCTFORECAST_FILTER_DATA_RESPONSE',payload:result.data})
}
function* getFilterProductForecastSaga(){
    yield takeLatest("PRODUCTFORECAST_FILTER_BY_VALUE",getProductForecastFilterDataGenerator)
} 
/*****end get Pricing filter data *****/


/*****update Pricing data *****/
function* updateProductForecastGenerator(action){
let data=action.payload.data;
let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
let value = action.payload.Filtervalue;
let obj={};

        if(value[0]!="" && value[0]!=null){
        
            obj['FLTR-CT-FORECASTYEAR'] = [value[0].join("|")];
        }
        if(value[1]!="" && value[1]!=null){
            obj['FLTR-MS-BRAND_NAME'] = [value[1].join("|")];
        
        }
       if(value[2]!="" && value[2]!=null){
            obj['FLTR-MS-REVIEWD_BY_DS'] = [value[2].join("|")];
        }
        if(value[4]!="" && value[4]!=null){
            obj['FLTR-MS-STATUS'] = [value[4].join("|")];
        }
        if(value[5]!="" && value[5]!=null){
            obj['FLTR-CT-FORECASTMONTH'] = [value[5].join("|")];
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
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/update",
        data:postData,
        headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });

       
   
    yield put({type:'UPDATE_PRODUCTFORECAST_RECORDS_RESPONSE',payload:result.data})
}
function* updateProductForecastDataSaga(){
    yield takeLatest("UPDATE_PRODUCTFORECAST_RECORDS_REQUEST",updateProductForecastGenerator)
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


    function* filterProductForecastGenerator(action){
    
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/productforecast/filters?fields=forecast_month&fields=brand_name&fields=reviewd_by_ds&fields=status",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_PRODUCTFORECAST_FILTER_RESPONSE',payload:result.data ? result.data.DATA : []})
    }
    function* FilterProductForecastSaga(){
        yield takeLatest("GET_PRODUCTFORECAST_FILTER_RESULT",filterProductForecastGenerator)
    } 
    function* filterYearMonthProductForeGenerator(action){
    
        let result = yield axios({
            method:"GET",
            url:process.env.REACT_APP_API_BASE_URL+"/productforecast/mapping?fields=year-month&fields=brand_id-brand_name",
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            
        });
      
        
        yield put({type:'GET_PRODUCTFORECAST_MONTH_YEAR_FILTER_RESPONSE',payload:result.data })
    }
    function* FilterMonthYearProductForecastSaga(){
        yield takeLatest("GET_PRODUCTFORECAST_MONTH_YEAR_FILTER",filterYearMonthProductForeGenerator)
    } 

    
/***FILTER data **********/

/****Insert PRODUCT****/

function* insertProductForecastGenerator(action){
    
    let data=action.payload.data;
    //let pageStart=(action.payload.pagestart-1) * action.payload.pageLimit;
    let pageStart=0;
    //let value = action.payload.Filtervalue;
    /*let obj={};
    
            if(value[0]!="" && value[0]!=null){
            
                obj['FLTR-CT-FORECASTYEAR'] = [value[0].join("|")];
            }
            if(value[1]!="" && value[1]!=null){
                obj['FLTR-MS-BRAND_NAME'] = [value[1].join("|")];
            
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
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/insert",
        data:postData,
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.jwt}`
        }
    });
   
   
    yield put({type:'INSERT_PRODUCTFORECAST_RESPONSE',payload:result.data})
}
function* insertProductForecastSaga(){
    yield takeLatest("INSERT_PRODUCTFORECAST",insertProductForecastGenerator)
} 
/***insert PRODUCT end***/

/***get export data end***/

function* forecastExportGenerator(action){
    const data = new FormData();
    data.append('pagestart',0);
    data.append('sortby', action.payload.pageSort);
    data.append('sortorder', action.payload.sortorder);
    let selectedCheckId = action.payload.checkedIds;
    let value = action.payload.Filtervalue;
    if(value[0]!="" && value[0]!=null){
        data.append('FLTR-CT-FORECASTYEAR', value[0].join("|"));
    }
    if(value[1]!="" && value[1]!=null){
        data.append('FLTR-MS-BRAND_NAME', value[1].join("|"));
    }
    if(value[2]!="" && value[2]!=null){
       data.append('FLTR-MS-REVIEWD_BY_DS', value[2].join("|"));
    }
    if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Checked") ){
        data.append('FLTR-MS-ID', (selectedCheckId  && selectedCheckId.length >0) ?  selectedCheckId.join("|") : "NO  DATA");

     }
     if(value[3]!="" && value[3]!=null && value[3].length<2 && value[3].includes("Unchecked") ){
        data.append('FLTR-NMS-ID', selectedCheckId.join("|")); 
     }
     if(value[4]!="" && value[4]!=null){
        data.append('FLTR-MS-STATUS', value[4].join("|"));
     }
     if(value[5]!="" && value[5]!=null){
        data.append('FLTR-CT-FORECASTMONTH', value[5].join("|"));
     }
    data.append(
    
      "filename","testFile"
    );

    var result =yield axios({
      method:"POST",
      url:process.env.REACT_APP_API_BASE_URL+"/productforecast/export/csv",
      data:data,
      headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
    });
    
    
    yield put({type:'FORECAST_EXPORT_RESPONSE',payload:result.data})
    }
    function* forecastExportSaga(){
    yield takeLatest("FORECAST_EXPORT",forecastExportGenerator)
    } 
    /***get export data end***/
    /****Import Product forecast**********/

function* importeProdForecastGenerator(action){
    const formData = new FormData();
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
        url:process.env.REACT_APP_API_BASE_URL+"/productforecast/import",
        data:formData,
        config: { 
            headers: {
                'Content-Type': 'multipart/form-data' ,
                'Authorization' : `Bearer ${localStorage.jwt}`
            }
        }
    });
    yield put({type:'PRODUCT_FORECAST_IMPORT_RESPONSE',payload:result.data})
}
function* ImportProdForecastSaga(){
    yield takeLatest("IMPORT_PRODUCT_FORECAST_FILE",importeProdForecastGenerator)
} 
/***Import product forecast**********/
export default function* ProductForecastSaga(){

    yield race([ImportProdForecastSaga(),forecastExportSaga(),FilterMonthYearProductForecastSaga(),insertProductForecastSaga(),FilterProductDropSaga(),getFilterProductForecastSaga(),FilterProductForecastSaga(),listProductForecastdSaga(),updateProductForecastDataSaga()])
}