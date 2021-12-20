
const FILTER_BY_VALUE = "PRICING_AUDIT_FILTER_BY_VALUE";
export default function PricingAuditingReducer(state={PRICING_AUDIT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_PRICING_AUDIT_DATA":
            state={...state}
            state['loader']=true
            state['PRICING_AUDIT_RESULT']=null
            state['PRICING_AUDIT_TOTAL']=null
            return state
           

        case "GET_PRICING_AUDIT_LIST":
            state={...state}
            state['loader']=false
            state['PRICING_AUDIT_RESULT']=action.payload ? action.payload.DATA:[]
            state['PRICING_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredPricingAuditProducts']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredPricingAuditProducts']=null
            return state
        case "PRICING_AUDIT_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRICING_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredPricingAuditProducts']=action.payload ? action.payload.DATA :[]
            return state  
        case "REVERT_PRICING_REQUEST":
            state={...state}
            state['loader']=true
            state['filteredPricingAuditProducts']=null
            state['REVERT_PRICING_RESULT']=null
            return state
        case "REVERT_PRICING_RESPONSE":
            state={...state}
            state['loader']=false
            state['REVERT_PRICING_RESULT']=action.payload ? action.payload.DATA : []
            state['PRICING_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredPricingAuditProducts']=action.payload ? action.payload.DATA : []
            return state   
        case "UPDATE_PRICING_REVERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['REVERT_PRICING_RESULT']=""
            return state
        
      default:return state
    }
    
    
}

