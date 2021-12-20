
const FILTER_BY_VALUE = "ALIGNMENT_FILTER_BY_VALUE";
export default function AlignmentReducer(state={ALIGNMENT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_ALIGNMENT_DATA":
            state={...state}
            state['loader']=true
            state['ALIGNMENT_RESULT']=null
            state['ALIGNMENT_TOTAL']=null
            return state
           

        case "GET_ALIGNMENT_LIST":
            state={...state}
            state['loader']=false
            state['ALIGNMENT_RESULT']=action.payload ? action.payload.DATA : []
            state['ALIGNMENT_TOTAL']=action.payload ?  action.payload.TOTAL_COUNT :[]
            state['filteredAlignmentProducts']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredAlignmentProducts']=null
            return state
        case "ALIGNMENT_FILTER_RESPONSE":
            state={...state}
            state['loader']=false
            state['ALIGNMENT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredAlignmentProducts']=action.payload ? action.payload.DATA : []
            return state
        case "UPDATE_ALIGNMENT_REQUEST":
            state={...state}
            state['loader']=true
            state['UPDATE_ALIGNMENT_RECORD_RESULT']=null
            return state

        case "UPDATE_ALIGNMENT_RESPONSE":
              state={...state}
              state['loader']=false
              state['ALIGNMENT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT : []
              state['UPDATE_ALIGNMENT_RECORD_RESULT']=action.payload ? action.payload.DATA :[]
              state['filteredAlignmentProducts']=action.payload ? action.payload.DATA:[]
              return state

      case "SORT_RESULT":
            state={...state}
            state['loader']=true
            return state

      case "SORT_RESULT_RESPONSE":
            state={...state}
            state['loader']=false
            state['filteredAlignmentProducts']=action.payload
            return state
      case "UPDATE_ALIGNMENT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_ALIGNMENT_RECORD_RESULT']=""
            return state
      case "SHOW_LOADER":
            state={...state}
            
            state['loader']=true
            return state
      case "HIDE_LOADER":
            state={...state}
            state['loader']=false
            return state      
     
      
        case "ALIGNMENT_EXPORT":
            state={...state}
            state['loader']=true
            state['ALIGNMENT_EXPORT_RESULT']=null
            return state
        case "ALIGNMENT_EXPORT_RESPONSE":
            state={...state}
            state['loader']=false
            state['ALIGNMENT_EXPORT_RESULT']=action.payload
            return state
        case "ALIGNMENT_EXPORT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['ALIGNMENT_EXPORT_RESULT']=""
            return state    
        case "IMPORT_ALIGNMENT_FILE":
            state={...state}
            state['loader']=true
            state['IMPORT_ALIGNMENT_RESULT']=null
            return state  
        case "ALIGNMENT_IMPORT_RESPONSE":
            state={...state}
            state['loader']=false
            state['IMPORT_ALIGNMENT_RESULT']="success"
            state['ALIGNMENT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT : []
            state['filteredAlignmentProducts']=action.payload ? action.payload.DATA:[]
            return state  
        case "UPDATE_IMPORT_ALIGNMENT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['IMPORT_ALIGNMENT_RESULT']=""
            return state
        case "GET_ALIGNMENT_FILTER_RESULT":
          state={...state}
          state['loader']=true
          state['ALIGNMENT_FILTER_RESULT']=""
          return state
        case "GET_ALIGNMENT_FILTER_RESPONSE":
          state={...state}
          state['loader']=false
          state['ALIGNMENT_FILTER_RESULT']=action.payload
          return state     

        case "INSERT_HCP_ADDRESS":
            state={...state}
            state['loader']=true
            state['INSERT_HCP_ADDRESS_RESULT']=null
            return state
        case "INSERT_HCP_ADDRESS_RESPONSE":
            state={...state}
            state['loader']=false
            state['INSERT_HCP_ADDRESS_RESULT']=action.payload
            return state      
        case "UPDATE_HCP_ADDRESS_INSERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['INSERT_HCP_ADDRESS_RESULT']=null
            return state    
        case "GET_GROUP_REVIEW_FILTER":
        
            state={...state}
            state['loader']=true
            state['GROUP_REVIEW_FILTER_RESULT']=""
            return state
        case "GET_GROUP_REVIEW_FILTER_RESPONSE":
            state={...state}
            state['loader']=false
            state['GROUP_REVIEW_FILTER_RESULT']=action.payload ? action.payload.DATA["group-review_category"]:[]
            return state
        case "GET_MAPPING_REVIEW_FILTERS":
            state={...state}
            let SelectedGroup=action.payload.SelectedGroup;
            let ReviewArr=[];
            for(let i=0; i<=SelectedGroup.length;i++ ){
            
                if(action.payload.GroupReviewFilter[SelectedGroup[i]]){
                    ReviewArr=  [...ReviewArr,...action.payload.GroupReviewFilter[SelectedGroup[i]]];
                }
            }
            
            let uniqueReview = ReviewArr.filter((c, index) => {

                return ReviewArr.indexOf(c) === index;
            });
            
            
            state['SELECTED_UNIQUE_REVIEW']=uniqueReview;
            
            return state
        case "GET_ENABLE_BUTTON_DETAILS":
            state={...state}
            state['loader']=true
            state['ENABLE_BUTTON_DETAILS_RESULT']=null
            return state
        case "ENABLE_BUTTON_DETAILS_RESPONSE":
            state={...state}
            state['loader']=false
            let alignmentParams=[];
            let dataLength=action.payload.DATA && action.payload.DATA.length >0 ? action.payload.DATA.length :0;
            for(let i=0;i<dataLength; i++){
                alignmentParams[action.payload.DATA[i].PARAMETER_KEY]=action.payload.DATA[i].PARAMETER_VALUE
            }
            state['ENABLE_BUTTON_DETAILS_RESULT']=alignmentParams
            
            return state      
          
      default:return state
    }
    
    
}
