
const FILTER_BY_VALUE = "REP_PRIMARY_FILTER_BY_VALUE";
export default function RepPrimaryReducer(state={REP_REP_PRIMARY_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_REP_PRIMARY_DATA":
            state={...state}
            
            state['loader']=true
            state['REP_PRIMARY_RESULT']=null
            state['REP_PRIMARY_TOTAL']=null
            return state
           

        case "GET_REP_PRIMARY_LIST":
            state={...state}
            state['loader']=false
            state['REP_PRIMARY_RESULT']=action.payload ? action.payload.DATA:[]
            state['REP_PRIMARY_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredRepPrimary']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredRepPrimary']=null
            return state
        case "REP_PRIMARY_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['REP_PRIMARY_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredRepPrimary']=action.payload ? action.payload.DATA :[]
            return state

       
        case "UPDATE_REP_PRIMARY_RECORDS_REQUEST":
            state={...state}
            state['loader']=true
            state['UPDATE_REP_PRIMARY_RECORD_RESULT']=null
            return state

        case "UPDATE_REP_PRIMARY_RECORDS_RESPONSE":
              state={...state}
              state['loader']=false
              state['REP_PRIMARY_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
              state['UPDATE_REP_PRIMARY_RECORD_RESULT']=action.payload ? action.payload.DATA:[]
              state['filteredRepPrimary']=action.payload ? action.payload.DATA :[]
              return state
        case "UPDATE_REP_PRIMARY_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_REP_PRIMARY_RECORD_RESULT']=""
            return state
         
        case "GET_REP_PRIMARY_FILTER_RESULT":
          
          state={...state}
          state['loader']=true
          state['REP_PRIMARY_FILTER_RESULT']=""
          state['REP_PRIMARY_FILTER_STATUS_RESULT']=""
          return state
        case "GET_REP_PRIMARY_FILTER_RESPONSE":
           
          state={...state}
          state['loader']=false
          state['REP_PRIMARY_FILTER_RESULT']=action.payload
          state['REP_PRIMARY_FILTER_STATUS_RESULT']="success"
          return state   
        case "REP_PRIMARY_FILTER_STATUS":
        
            state={...state}
          
            state['REP_PRIMARY_FILTER_STATUS_RESULT']=""
            return state     
        
       default:return state
    }
    
    
}

  