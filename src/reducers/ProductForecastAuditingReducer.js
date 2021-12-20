
const FILTER_BY_VALUE = "PRODUCTFORECAST_AUDIT_FILTER_BY_VALUE";
export default function ProductForecastAuditingReducer(state={PRODUCTFORECAST_AUDIT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_PRODUCTFORECAST_AUDIT_DATA":
            state={...state}
            state['loader']=true
            state['PRODUCTFORECAST_AUDIT_RESULT']=null
            state['PRODUCTFORECAST_AUDIT_TOTAL']=null
            return state
           

        case "GET_PRODUCTFORECAST_AUDIT_LIST":
            state={...state}
            state['loader']=false
            state['PRODUCTFORECAST_AUDIT_RESULT']=action.payload ? action.payload.DATA:[]
            state['PRODUCTFORECAST_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredProductForecastAuditProducts']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredProductForecastAuditProducts']=null
            return state
        case "PRODUCTFORECAST_AUDIT_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRODUCTFORECAST_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredProductForecastAuditProducts']=action.payload ? action.payload.DATA :[]
            return state  
        case "REVERT_PRODUCTFORECAST_REQUEST":
            state={...state}
            state['loader']=true
            state['filteredProductForecastAuditProducts']=null
            state['REVERT_PRODUCTFORECAST_RESULT']=null
            return state
        case "REVERT_PRODUCTFORECAST_RESPONSE":
            state={...state}
            state['loader']=false
            state['REVERT_PRODUCTFORECAST_RESULT']=action.payload ? action.payload.DATA : []
            state['PRODUCTFORECAST_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredProductForecastAuditProducts']=action.payload ? action.payload.DATA : []
            return state   
        case "UPDATE_PRODUCTFORECAST_REVERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['REVERT_PRODUCTFORECAST_RESULT']=""
            return state
        
      default:return state
    }
    
    
}

