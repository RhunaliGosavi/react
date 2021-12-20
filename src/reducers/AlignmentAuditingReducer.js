
const FILTER_BY_VALUE = "ALIGNMENT_AUDIT_FILTER_BY_VALUE";
export default function AlignmentAuditingReducer(state={ALIGNMENT_AUDIT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
       case "GET_ALIGNMENT_AUDIT_DATA":
            state={...state}
            state['loader']=true
            state['ALIGNMENT_AUDIT_RESULT']=null
            state['ALIGNMENT_AUDIT_TOTAL']=null
            return state
           

        case "GET_ALIGNMENT_AUDIT_LIST":
            state={...state}
            state['loader']=false
            state['ALIGNMENT_AUDIT_RESULT']=action.payload ? action.payload.DATA : []
            state['ALIGNMENT_AUDIT_TOTAL']=action.payload ?  action.payload.TOTAL_COUNT :[]
            state['filteredAlignmentAuditProducts']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredAlignmentAuditProducts']=null
            return state
        case "ALIGNMENT_AUDIT_FILTER_RESPONSE":
            state={...state}
            state['loader']=false
            state['ALIGNMENT_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredAlignmentAuditProducts']=action.payload ? action.payload.DATA : []
            return state
        case "GET_ALIGNMENT_AUDIT_FILTER_RESULT":
          state={...state}
          state['loader']=true
          state['ALIGNMENT_AUDIT_FILTER_RESULT']=""
          return state
        case "GET_ALIGNMENT_AUDIT_FILTER_RESPONSE":
          state={...state}
          state['loader']=false
          state['ALIGNMENT_AUDIT_FILTER_RESULT']=action.payload
          return state  
        case "REVERT_ALIGNMENT_REQUEST":
            state={...state}
            state['loader']=true
            state['filteredAlignmentAuditProducts']=null
            state['REVERT_ALIGNMENT_RESULT']=null
            return state
        case "REVERT_ALIGNMENT_RESPONSE":
            state={...state}
            state['loader']=false
            state['REVERT_ALIGNMENT_RESULT']=action.payload ? action.payload.DATA : []
            state['ALIGNMENT_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredAlignmentAuditProducts']=action.payload ? action.payload.DATA : []
            return state   
        case "UPDATE_ALIGNMENT_REVERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['REVERT_ALIGNMENT_RESULT']=""
            return state
          
      default:return state
    }
    
    
}
