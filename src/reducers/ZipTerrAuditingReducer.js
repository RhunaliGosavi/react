
const FILTER_BY_VALUE = "ZIPP_AUDIT_FILTER_BY_VALUE";
export default function ZipTerrAuditingReducer(state={ZIP_TERR_AUDIT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_ZIP_TERR_AUDIT_DATA":
            state={...state}
            state['loader']=true
            state['ZIP_TERR_AUDIT_RESULT']=null
            state['ZIP_TERR_AUDIT_TOTAL']=null
            return state
           

        case "GET_ZIP_TERR_AUDIT_LIST":
            state={...state}
            state['loader']=false
            state['ZIP_TERR_AUDIT_RESULT']=action.payload ? action.payload.DATA:[]
            state['ZIP_TERR_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredZipTerrAuditProducts']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredZipTerrAuditProducts']=null
            return state
        case "ZIP_TERR_AUDIT_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['ZIP_TERR_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredZipTerrAuditProducts']=action.payload ? action.payload.DATA :[]
            return state
        case "UPDATE_ZIP_TERR_AUDIT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_ZIP_TERR_AUDIT_RECORD_RESULT']=""
            return state
        case "REVERT_ZIP_TERR_REQUEST":
            state={...state}
            state['loader']=true
            state['filteredZipTerrAuditProducts']=null
            state['REVERT_ZIP_TERR_RESULT']=null
            return state
        case "REVERT_ZIP_TERR_RESPONSE":
            state={...state}
            state['loader']=false
            state['REVERT_ZIP_TERR_RESULT']=action.payload ? action.payload.DATA : []
            state['ZIP_TERR_AUDIT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredZipTerrAuditProducts']=action.payload ? action.payload.DATA : []
            return state   
        case "UPDATE_ZIP_TERR_REVERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['REVERT_ZIP_TERR_RESULT']=""
            return state
        
      default:return state
    }
    
    
}

