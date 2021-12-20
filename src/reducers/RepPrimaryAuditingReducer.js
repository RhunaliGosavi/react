
const FILTER_BY_VALUE = "REP_PRIMARY_AUDIT_FILTER_BY_VALUE";
export default function RepPrimaryAuditingReducer(state={REP_PRIMARY_AUDIT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
        case "GET_REP_PRIMARY_AUDIT_DATA":
            state={...state}
            state['loader']=true
            state['REP_PRIMARY_AUDIT_RESULT']=null
            state['REP_PRIMARY_AUDIT_TOTAL']=null
            return state
        case "GET_REP_PRIMARY_AUDIT_LIST":
            state={...state}
            state['loader']=false
            state['REP_PRIMARY_AUDIT_RESULT']=action.payload ? action.payload.DATA : []
            state['filteredRepPrimaryAudit']=action.payload ? action.payload.DATA : []
            state['REP_PRIMARY_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT : []
            
          return state
           
       
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredRepPrimaryAudit']=null
            return state
        case "REP_PRIMARY_AUDIT_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['REP_PRIMARY_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredRepPrimaryAudit']=action.payload ? action.payload.DATA :[]
            return state
        case "REVERT_REP_PRIMARY_REQUEST":
            state={...state}
            state['loader']=true
            state['filteredRepPrimaryAudit']=null
            state['REVERT_REP_PRIMARY_RESULT']=null
            return state
        case "REVERT_REP_PRIMARY_RESPONSE":
            state={...state}
            state['loader']=false
            state['REVERT_REP_PRIMARY_RESULT']=action.payload ? action.payload.DATA : []
            state['REP_PRIMARY_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredRepPrimaryAudit']=action.payload ? action.payload.DATA : []
            return state   
        case "UPDATE_REP_PRIMARY_REVERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['REVERT_REP_PRIMARY_RESULT']=""
            return state
        default:return state
    }
    
    
}


  