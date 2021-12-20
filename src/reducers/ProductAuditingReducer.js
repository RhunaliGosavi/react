
const FILTER_BY_VALUE = "PRODUCT_AUDIT_FILTER_BY_VALUE";
export default function ProductAuditingReducer(state={PRODUCT_AUDIT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_PRODUCT_AUDIT_DATA":
            state={...state}
            state['loader']=true
            state['PRODUCT_AUDIT_RESULT']=null
            state['PRODUCT_AUDIT_TOTAL']=null
            return state
           

        case "GET_PRODUCT_AUDIT_LIST":
            state={...state}
            state['loader']=false
            state['PRODUCT_AUDIT_RESULT']=action.payload ? action.payload.DATA:[]
            state['PRODUCT_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredProductAuditProducts']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredProductAuditProducts']=null
            return state
        case "PRODUCT_AUDIT_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRODUCT_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredProductAuditProducts']=action.payload ? action.payload.DATA :[]
            return state
        case "UPDATE_PRODUCT_AUDIT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_PRODUCT_AUDIT_RECORD_RESULT']=""
            return state
        case "REVERT_PRODUCT_REQUEST":
            state={...state}
            state['loader']=true
            state['filteredProductAuditProducts']=null
            state['REVERT_PRODUCT_RESULT']=null
            return state
        case "REVERT_PRODUCT_RESPONSE":
            state={...state}
            state['loader']=false
            state['REVERT_PRODUCT_RESULT']=action.payload ? action.payload.DATA : []
            state['PRODUCT_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredProductAuditProducts']=action.payload ? action.payload.DATA : []
            return state   
        case "UPDATE_PRODUCT_REVERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['REVERT_PRODUCT_RESULT']=""
            return state
        
      default:return state
    }
    
    
}

