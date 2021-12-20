
const FILTER_BY_VALUE = "TESTING_AUDIT_FILTER_BY_VALUE";
export default function DataStewardshipAuditingReducer(state={TESTING_AUDIT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
        case "GET_TESTING_AUDIT_DATA":
            state={...state}
            state['loader']=true
            state['TESTING_AUDIT_RESULT']=null
            state['TESTING_AUDIT_TOTAL']=null
            state['filteredAuditProducts']=null
            return state
        case "GET_TESTING_AUDIT_LIST":
            state={...state}
            state['loader']=false
            state['TESTING_AUDIT_RESULT']=action.payload ? action.payload.DATA : []
            state['filteredAuditProducts']=action.payload ? action.payload.DATA : []
            state['TESTING_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT : []
            
          return state
           
       
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredAuditProducts']=null
            return state
        case "TESTING_AUDIT_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['TESTING_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredAuditProducts']=action.payload ? action.payload.DATA :[]
            return state
        case "REVERT_TESTING_REQUEST":
            state={...state}
            state['loader']=true
            state['filteredAuditProducts']=null
            state['REVERT_TESTING_RESULT']=null
            return state
        case "REVERT_TESTING_RESPONSE":
            state={...state}
            state['loader']=false
            state['REVERT_TESTING_RESULT']=action.payload ? action.payload.DATA : []
            state['TESTING_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredAuditProducts']=action.payload ? action.payload.DATA : []
            return state   
        case "UPDATE_TESTING_REVERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['REVERT_TESTING_RESULT']=""
            return state
        default:return state
    }
    
    
}

function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index === -1) appliedFilters.push(filter);
  
    return appliedFilters;
  }
  
  function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
  }
  