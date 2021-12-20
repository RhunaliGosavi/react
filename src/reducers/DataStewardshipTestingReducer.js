
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
export default function DataStewardshipTestingReducer(state={REP_PREFFERD_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_REP_PREFFERD_DATA":
            state={...state}
            state['loader']=true
            state['REP_PREFFERD_RESULT']=null
            state['TESTING_TOTAL']=null
            state['RESET_TESTING_STATUS']=""
            return state
           

        case "GET_REP_PREFFERD_LIST":
            state={...state}
            state['loader']=false
            state['REP_PREFFERD_RESULT']=action.payload ? action.payload.DATA : []
            state['filteredProducts']=action.payload ? action.payload.DATA : []
            state['TESTING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT : []
            state['RESET_TESTING_STATUS']="succ"
            
          return state
           
        case "UPDATE_RESET_TESTING_STATE":
            state={...state}
            state['RESET_TESTING_STATUS']=""
            return state
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredProducts']=null
            return state
        case "TESTING_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['TESTING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredProducts']=action.payload ? action.payload.DATA :[]
            return state
             
        case "UPDATE_SUBMITTED_RECORDS_REQUEST":
            state={...state}
            state['loader']=true
            state['UPDATE_RECORD_RESULT']=null
            return state

      case "UPDATE_SUBMITTED_RECORDS_RESPONSE":
            state={...state}
            state['loader']=false
            state['TESTING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['UPDATE_RECORD_RESULT']=action.payload ? action.payload.DATA:[]
            state['filteredProducts']=action.payload ? action.payload.DATA:[]
            return state

      case "SORT_RESULT":
            state={...state}
            state['loader']=true
            return state

      case "SORT_RESULT_RESPONSE":
              state={...state}
              state['loader']=false
              state['filteredProducts']=action.payload
              return state
      case "UPDATE_UPDATED_RESULT_STATE":
          state={...state}
          state['loader']=false
          state['UPDATE_RECORD_RESULT']=""
          return state
      case "SHOW_LOADER":
          state={...state}
          
          state['loader']=true
          return state
      case "HIDE_LOADER":
          state={...state}
          state['loader']=false
          return state      
      
      case "IMPORT_TESTING_FILE":
          state={...state}
          state['loader']=true
          state['IMPORT_TESTING_RESULT']=null
          return state  
      case "IMPORT_RESPONSE":
          state={...state}
          state['loader']=false
          state['IMPORT_TESTING_RESULT']="success"
         
          state['IMPORT_TESTING_MSG']=action.payload ? action.payload.MESSAGE : "";
          state['IMPORT_TESTING_STATUS']=action.payload ? action.payload.status : "";
          state['filteredProducts']=action.payload ? action.payload.DATA : []
          state['TESTING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT : []
          
          return state  
      case "UPDATE_IMPORT_RESULT_STATE":
          state={...state}
          state['loader']=false
          state['IMPORT_TESTING_RESULT']=""
          return state
      case "GET_REG_DATA":
          state={...state}
          state['loader']=true
          state['REG_RESULT']=null
          return state    
      case "GET_REG_RESPONSE":
          state={...state}
          state['loader']=false
          state['REG_RESULT']=action.payload
          return state
      case "TESTING_EXPORT":
        state={...state}
        state['loader']=true
        state['EXPORT_RESULT']=null
        return state
      case "TESTING_EXPORT_RESPONSE":
        state={...state}
        state['loader']=false
        state['EXPORT_RESULT']=action.payload
        return state
      case "UPDATE_EXPORT_RESULT_STATE":
        state={...state}
        state['loader']=false
        state['EXPORT_RESULT']=""
        return state
      case "GET_TESTING_FILTER_RESULT":
        state={...state}
        state['TESTING_FILTER_RESULT']=""
        return state
      case "GET_TESTING_FILTER_RESULT_RESPONSE":
        state={...state}
        state['TESTING_FILTER_RESULT']=action.payload
        return state     
      case "GET_TESTING_MAPPING_FILTER":
        state={...state}
        state['TESTING_MAPPING_NPI_FILTER_RESULT']=""
        state['TESTING_MAPPING_TESTSOURCE_FILTER_RESULT']=""
        state['TESTING_APPROVED_RECORDS']=""
        return state
      case "GET_TESTING_MAPPING_FILTER_RESPONSE":
        state={...state}
        state['TESTING_MAPPING_NPI_FILTER_RESULT']=action.payload ? action.payload.DATA["tst_source-src_hcp_fn_ln_npi"] :[]
        state['TESTING_MAPPING_TESTSOURCE_FILTER_RESULT']=action.payload ? action.payload.DATA["tst_source-tst_src_id"] :[]
        state['TESTING_APPROVED_RECORDS']=action.payload ? action.payload.DATA["status-tst_src_id"]['Approved'] :[]
        return state   
      case "GET_MAPPING_FILTERS":
          state={...state}

          let selectedNPI=[];
          let selectedTestId=[];
          let SelectedTestSource=action.payload.SelectedTestSource;
          for(let i=0; i<=SelectedTestSource.length;i++ ){
        
              if(action.payload.testingNpiFilter[SelectedTestSource[i]]){
                  selectedNPI=  [...selectedNPI,...action.payload.testingNpiFilter[SelectedTestSource[i]]];
                  selectedTestId=  [...selectedTestId,...action.payload.testingTetsSourceFilter[SelectedTestSource[i]]];
              }
          }

          state['TESTING_SELECTED_NPI']=selectedNPI;
          state['TESTING_SELECTED_TEST_ID']=selectedTestId;
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
  