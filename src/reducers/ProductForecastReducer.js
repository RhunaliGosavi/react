
const FILTER_BY_VALUE = "PRODUCTFORECAST_FILTER_BY_VALUE";
export default function ProductForecastReducer(state={PRODUCTFORECAST_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_PRODUCTFORECAST_DATA":
            state={...state}
           
            state['loader']=true
            state['PRODUCTFORECAST_RESULT']=null
            state['PRODUCTFORECAST_TOTAL']=null
            return state
           

        case "GET_PRODUCTFORECAST_LIST":
            state={...state}
            state['loader']=false
            state['PRODUCTFORECAST_RESULT']=action.payload ? action.payload.DATA:[]
            state['PRODUCTFORECAST_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredProductForecast']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredProductForecast']=null
            return state
        case "PRODUCTFORECAST_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRODUCTFORECAST_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredProductForecast']=action.payload ? action.payload.DATA :[]
            return state

       
        case "UPDATE_PRODUCTFORECAST_RECORDS_REQUEST":
            state={...state}
            state['loader']=true
            state['UPDATE_PRODUCTFORECAST_RECORD_RESULT']=null
            return state

        case "UPDATE_PRODUCTFORECAST_RECORDS_RESPONSE":
              state={...state}
              state['loader']=false
              state['PRODUCTFORECAST_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
              state['UPDATE_PRODUCTFORECAST_RECORD_RESULT']=action.payload ? action.payload.DATA:[]
              state['filteredProductForecast']=action.payload ? action.payload.DATA :[]
              return state
        case "UPDATE_PRODUCTFORECAST_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_PRODUCTFORECAST_RECORD_RESULT']=""
            return state
         
        case "GET_PRODUCTFORECAST_FILTER_RESULT":
          
          state={...state}
          state['loader']=true
          state['PRODUCTFORECAST_FILTER_RESULT']=""
          state['PRODUCTFORECAST_FILTER_STATUS_RESULT']=""
          return state
        case "GET_PRODUCTFORECAST_FILTER_RESPONSE":
           
          state={...state}
          state['loader']=false
          state['PRODUCTFORECAST_FILTER_RESULT']=action.payload
          state['PRODUCTFORECAST_FILTER_STATUS_RESULT']="success"
          return state   
          case "GET_PRODUCTFORECAST_MONTH_YEAR_FILTER":
          
            state={...state}
            state['loader']=true
            state['PRODUCTFORECAST_MONTH_YEAR_FILTER_RESULT']=""
            state['PRODUCTFORECAST_BRAND_FILTER_RESULT']=""
            return state
          case "GET_PRODUCTFORECAST_MONTH_YEAR_FILTER_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRODUCTFORECAST_MONTH_YEAR_FILTER_RESULT']=action.payload ? action.payload.DATA["year-month"]:[]
            state['PRODUCTFORECAST_BRAND_FILTER_RESULT']=action.payload ? action.payload.DATA["brand_id-brand_name"]:[]
          
            return state  


          
        case "GET_PRODUCTFORECAST_FILTER_STATUS":
        
            state={...state}
          
            state['PRODUCTFORECAST_FILTER_STATUS_RESULT']=""
            return state     
        
        case "INSERT_PRODUCTFORECAST":
            state={...state}
            state['loader']=true
            state['INSERT_PRODUCTFORECAST_RESULT']=null
            return state
        case "INSERT_PRODUCTFORECAST_RESPONSE":
            state={...state}
            
            state['loader']=false
            state['INSERT_PRODUCTFORECAST_RESULT']=action.payload
            state['filteredProductForecast']=action.payload ? action.payload.DATA.DATA :[]
            state['FORECAST_INSERT_MSG']=action.payload ? action.payload.MESSAGE :""
            state['PRODUCTFORECAST_TOTAL']=action.payload ? action.payload.DATA.TOTAL_COUNT :[]
            return state      
        case "UPDATE_PRODUCTFORECAST_INSERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['INSERT_PRODUCTFORECAST_RESULT']=null
            return state    
        case "FORECAST_EXPORT":
            state={...state}
            state['loader']=true
            state['FORECAST_EXPORT_RESULT']=null
            return state
      case "FORECAST_EXPORT_RESPONSE":
            state={...state}
            state['loader']=false
            state['FORECAST_EXPORT_RESULT']=action.payload
            return state
      case "FORECAST_UPDATE_EXPORT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['FORECAST_EXPORT_RESULT']=""
            return state   
        case "IMPORT_PRODUCT_FORECAST_FILE":
            state={...state}
            state['loader']=true
            state['IMPORT_PRODUCT_FORECAST_RESULT']=null
            return state  
        case "PRODUCT_FORECAST_IMPORT_RESPONSE":
            state={...state}
            state['loader']=false
            state['IMPORT_PRODUCT_FORECAST_RESULT']="success"
            state['PRODUCTFORECAST_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredProductForecast']=action.payload ? action.payload.DATA:[]

            state['IMPORT_PRODUCT_FORECAST_MSG']=action.payload ? action.payload.MESSAGE : "";
            state['IMPORT_PRODUCT_FORECAST_STATUS']=action.payload ? action.payload.status : "";


            return state  
        case "PRODUCT_FORECAST_UPDATE_IMPORT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['IMPORT_PRODUCT_FORECAST_RESULT']=""
            return state 
        case "PRODUC_FORECAST_FILTER_MONTH":
            state={...state}
            let monthArr=[];
            let SelectedYear=action.payload.SelectedYear;
   
            for(let i=0; i<=SelectedYear.length;i++ ){
            
                if(action.payload.ProductForeYearMonthFilter[SelectedYear[i]]){
                    monthArr=  [...monthArr,...action.payload.ProductForeYearMonthFilter[SelectedYear[i]]];
                }
            }
            let uniqueMonth = monthArr.filter((c, index) => {
                return monthArr.indexOf(c) === index;
            });

            state['PRODUCT_FORECAST_SELECTED_MONTH']=uniqueMonth;
            
            return state
      default:return state
    }
    
    
}

  