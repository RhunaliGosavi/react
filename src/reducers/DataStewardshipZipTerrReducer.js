
const FILTER_BY_VALUE = "ZIPP_FILTER_BY_VALUE";
export default function DataStewardshipZipTerrReducer(state={ZIP_TERR_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_ZIP_TERR_DATA":
            state={...state}
            state['loader']=true
            state['ZIP_TERR_RESULT']=null
            state['ZIP_TERR_TOTAL']=null
            return state
           

        case "GET_ZIP_TERR_LIST":
            state={...state}
            state['loader']=false
            state['ZIP_TERR_RESULT']=action.payload ? action.payload.DATA:[]
            state['ZIP_TERR_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredZipTerrProducts']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredZipTerrProducts']=null
            return state
        case "ZIP_TERR_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['ZIP_TERR_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredZipTerrProducts']=action.payload ? action.payload.DATA :[]
            return state
        case "GET_INSERT_FILTER_RESULT":
            state={...state}
            state['INSERT_FILTER_RESULT']=null
            return state
        case "GET_INSERT_FILTER_RESPONSE":
            state={...state}
            state['INSERT_FILTER_RESULT']=action.payload
            return state
            
               /* let newState = {...state};
                let value = action.payload.value;
                let selectedCheckId = action.payload.data;
                console.log("checked ids",selectedCheckId)
                let statusFilter=[];
                let filteredValues= state.ZIP_TERR_RESULT;
                if(value[0]!="" && value[0]!=null){
                  filteredValues = state.ZIP_TERR_RESULT.filter(product => {
                    
                      if(product.zt_sales_force_name!=null ){
                        
                              return (
                                  //( product.status.includes(value[0]) ) 
                                  value[0].some(el => product.zt_sales_force_name.includes(el))
                              );
                          
                      }
                  });
                }
                if(value[1]!=""){
                  filteredValues = filteredValues.filter(product => {
                      if(product.zt_region_name!=null ){
                          return (
                              ( product.zt_region_name.includes(value[1]) ) 
                            );
                      }
                  });
                }
                
                if(value[2]!="" && value[2]!=null){
                  filteredValues = filteredValues.filter(product => {
                      if(product.zt_district_name!=null ){
                          return (
                             // ( product.reviewd_by_ds.includes(value[2]) ) 
                             value[2].some(el => product.zt_district_name.includes(el))
                            );
                      }
                  });
                }
                if(value[3]!="" && value[3]!=null){
                  filteredValues = filteredValues.filter(product => {
                      if(product.reviewd_by_ds!=null ){
                          return (
                             // ( product.tst_source.includes(value[3]) ) 
                              value[3].some(el => product.reviewd_by_ds.includes(el))
                            );
                      }
                  });
                }
        
             
                  
                if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Checked") ){
                    console.log("inside checked")
                    filteredValues = filteredValues.filter(product => {
                      
                            if(product.id!=null ){
                              console.log("indexOf",selectedCheckId.some(el=> el ==product.id));
                              
                                return (
                                  
                                //  selectedCheckId.some(el => product.id.toString().includes(el))
                                         selectedCheckId.some(el=> el ==product.id)
                                  );
                            }
                    });
                    console.log("inside checked",filteredValues)
                  }
                  console.log("selected value",value[4])
                  if(value[4]!="" && value[4]!=null && value[4].length<2 && value[4].includes("Unchecked") ){
                    filteredValues = filteredValues.filter(product => {
                      if(product.id!=null ){
                            return (
                              
                              //!selectedCheckId.some(el => product.id.toString().includes(el))
                                selectedCheckId.some(el=> el !=product.id)
                            );
                        }
                    });
                   
                  }
              
                let appliedFilters = state.appliedFilters;
          
                if (value) {
                  appliedFilters = addFilterIfNotExists(FILTER_BY_VALUE, appliedFilters);
          
                  newState.filteredZipTerrProducts = filteredValues;
                  newState.filteredCount = newState.filteredZipTerrProducts.length;
                    if(newState.filteredCount >0){
                      newState.filteredPages = Math.ceil(
                        newState.filteredCount / newState.countPerPage
                      );
                    }
                } else {
                 
                  appliedFilters = removeFilter(FILTER_BY_VALUE, appliedFilters);
                  if (appliedFilters.length === 0) {
                    newState.filteredZipTerrProducts = newState.ZIP_TERR_RESULT;
                    newState.filteredCount = newState.filteredZipTerrProducts.length;
                    newState.filteredPages = Math.ceil(
                      newState.filteredCount / newState.countPerPage
                    );
                  }
                }
                return newState;*/


        case "UPDATE_ZIP_TERR_RECORDS_REQUEST":
            state={...state}
            state['loader']=true
            state['UPDATE_ZIP_TERR_RECORD_RESULT']=null
            return state

        case "UPDATE_ZIP_TERR_RECORDS_RESPONSE":
              state={...state}
              state['loader']=false
              state['ZIP_TERR_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
              state['UPDATE_ZIP_TERR_RECORD_RESULT']=action.payload ? action.payload.DATA:[]
              state['filteredZipTerrProducts']=action.payload ? action.payload.DATA :[]
              return state

      case "SORT_RESULT":
            state={...state}
            state['loader']=true
            return state

      case "SORT_RESULT_RESPONSE":
            state={...state}
            state['loader']=false
            state['filteredZipTerrProducts']=action.payload
            return state
      case "UPDATE_ZIP_TERR_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_ZIP_TERR_RECORD_RESULT']=""
            return state
      case "SHOW_LOADER":
            state={...state}
            
            state['loader']=true
            return state
      case "HIDE_LOADER":
            state={...state}
            state['loader']=false
            return state      
      case "UPDATE_EXCEL_DATA":
            state={...state}
            state['loader']=true
            state['UPDATE_RECORD_RESULT']=null
            return state

            
      case "UPDATE_EXCEL_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['ZIP_TERR_RESULT']=action.payload
            state['UPDATE_RECORD_RESULT']=action.payload
            state['filteredZipTerrProducts']=action.payload
            return state   
      case "INSERT_ZIP_TERR":
            state={...state}
            state['loader']=true
            state['INSERT_ZIP_TERR_RESULT']=null
            return state
      case "UINSERT_ZIP_TERR_RESPONSE":
            state={...state}
            state['loader']=false
            state['INSERT_ZIP_TERR_RESULT']=action.payload
            return state      
      case "UPDATE_ZIP_TERR_INSERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['INSERT_ZIP_TERR_RESULT']=null
            return state    
        case "ZIP_TERR_EXPORT":
            state={...state}
            state['loader']=true
            state['ZIP_TERR_EXPORT_RESULT']=null
            return state
        case "ZIP_TERR_EXPORT_RESPONSE":
            state={...state}
            state['loader']=false
            state['ZIP_TERR_EXPORT_RESULT']=action.payload
            return state
        case "ZIP_TERR_EXPORT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['ZIP_TERR_EXPORT_RESULT']=""
            return state    
        case "IMPORT_ZIP_TERR_FILE":
            state={...state}
            state['loader']=true
            state['IMPORT_ZIP_TERR_RESULT']=null
            return state  
        case "ZIP_TERR_IMPORT_RESPONSE":
            state={...state}
            state['loader']=false
            state['IMPORT_ZIP_TERR_RESULT']="success"
            state['ZIP_TERR_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredZipTerrProducts']=action.payload ? action.payload.DATA:[]
            return state  
        case "UPDATE_IMPORT_ZIP_TERR_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['IMPORT_ZIP_TERR_RESULT']=""
            return state
        case "GET_FILTER_RESULT":
          state={...state}
          state['loader']=true
          state['ZIP_TERR_FILTER_RESULT']=""
          return state
        case "GET_FILTER_RESPONSE":
          state={...state}
          state['loader']=false
          state['ZIP_TERR_FILTER_RESULT']=action.payload
          return state     
        case "GET_ZIP_MAPPING_FILTER":
          state={...state}
          state['ZIP_MAPPING_NPI_FILTER_RESULT']=""
          state['ZIP_MAPPING_TESTSOURCE_FILTER_RESULT']=""
          state['ZIP_APPROVED_RECORDS']=""
          return state
        case "GET_ZIP_MAPPING_FILTER_RESPONSE":
          state={...state}
          state['ZIP_MAPPING_NPI_FILTER_RESULT']=action.payload ? action.payload.DATA["tst_source-src_hcp_fn_ln_npi"] :[]
          state['ZIP_MAPPING_TESTSOURCE_FILTER_RESULT']=action.payload ? action.payload.DATA["tst_source-tst_src_id"] :[]
          state['ZIP_APPROVED_RECORDS']=action.payload ? action.payload.DATA["status-tst_src_id"]['Approved'] :[]
          return state
        case "GET_ZIP_TERR_LIST":
          state={...state}
          state['ZIP_TERR_LIST']=""
          
          return state
        case "ZIP_TERR_LIST_RESPONSE":
          state={...state}
          state['ZIP_TERR_LIST']=action.payload ? action.payload : [];
          return state
          case "GET_ZIP_ENABLE_BUTTON_DETAILS":
            state={...state}
            state['loader']=true
            state['ZIP_ENABLE_BUTTON_DETAILS_RESULT']=null
            return state
        case "ZIP_ENABLE_BUTTON_DETAILS_RESPONSE":
            state={...state}
            state['loader']=false
            let zipParams=[];
            let dataLength=action.payload.DATA && action.payload.DATA.length >0 ? action.payload.DATA.length :0;
            for(let i=0;i<dataLength; i++){
              zipParams[action.payload.DATA[i].PARAMETER_KEY]=action.payload.DATA[i].PARAMETER_VALUE
            }
            console.log("zip params****",zipParams)
            state['ZIP_ENABLE_BUTTON_DETAILS_RESULT']=zipParams
            
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
  