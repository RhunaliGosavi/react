
const FILTER_BY_VALUE = "PRICING_FILTER_BY_VALUE";
export default function PricingReducer(state={PRICING_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_PRICING_DATA":
            state={...state}
            
            state['loader']=true
            state['PRICING_RESULT']=null
            state['PRICING_TOTAL']=null
            return state
           

        case "GET_PRICING_LIST":
            state={...state}
            state['loader']=false
            state['PRICING_RESULT']=action.payload ? action.payload.DATA:[]
            state['PRICING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredPricing']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredPricing']=null
            return state
        case "PRICING_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRICING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredPricing']=action.payload ? action.payload.DATA :[]
            return state

       
        case "UPDATE_PRICING_RECORDS_REQUEST":
            state={...state}
            state['loader']=true
            state['UPDATE_PRICING_RECORD_RESULT']=null
            return state

        case "UPDATE_PRICING_RECORDS_RESPONSE":
              state={...state}
              state['loader']=false
              state['PRICING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
              state['UPDATE_PRICING_RECORD_RESULT']=action.payload ? action.payload.DATA:[]
              state['filteredPricing']=action.payload ? action.payload.DATA :[]
              return state
        case "UPDATE_PRICING_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_PRICING_RECORD_RESULT']=""
            return state
         
        case "GET_PRICING_FILTER_RESULT":
          
          state={...state}
          state['loader']=true
          state['PRICING_FILTER_RESULT']=""
          state['PRICING_FILTER_STATUS_RESULT']=""
          return state
        case "GET_PRICING_FILTER_RESPONSE":
           
          state={...state}
          state['loader']=false
          state['PRICING_FILTER_RESULT']=action.payload
          state['PRICING_FILTER_STATUS_RESULT']="success"
          return state   
        case "GET_PRICING_FILTER_STATUS":
        
            state={...state}
          
            state['PRICING_FILTER_STATUS_RESULT']=""
            return state     
        
        case "INSERT_PRICING":
            state={...state}
            state['loader']=true
            state['INSERT_PRICING_RESULT']=null
            return state
        case "INSERT_PRICING_RESPONSE":
            state={...state}
           
            state['loader']=false
            state['INSERT_PRICING_RESULT']=(action.payload && action.payload.MESSAGE) ? action.payload.MESSAGE : "Data Inserted Successfully"
            state['INSERT_PRICING_RESULT_STATUSCODE']=(action.payload && action.payload.MESSAGE) ? 1 : 0
            state['filteredPricing']=action.payload ? action.payload.DATA :[]
            state['PRICING_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]

            return state      
        case "UPDATE_PRICING_INSERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['INSERT_PRICING_RESULT']=null
            state['INSERT_PRICING_RESULT_STATUSCODE']=0
            return state   
            
            
        case "GET_PRODUCT_DETAILS":
            state={...state}
            
            state['product_loader']=true
            state['GET_PRODUCT_RESULT']=null
          
            return state
        

        case "GET_PRODUCT_DETAILS_RESPONSE":
            state={...state}
            state['product_loader']=false
            state['GET_PRODUCT_RESULT']=action.payload 
        return state
        case "UPDATE_PRODUCT_DETAILS_STATE":
            state={...state}
            state['GET_PRODUCT_RESULT']="empty"
            return state
        
        case "GET_INSERT_PRODUCT_DROP":
            state={...state}
            
            state['loader']=true
            state['INSERT_PRODUCT_DROP']=null
          
            return state
        

        case "INSERT_PRODUCT_DROP_RESPONSE":
            state={...state}
            state['loader']=false
            state['INSERT_PRODUCT_DROP']=action.payload 
        return state


      default:return state
    }
    
    
}

  