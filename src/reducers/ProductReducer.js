
const FILTER_BY_VALUE = "PRODUCT_FILTER_BY_VALUE";
export default function ProductReducer(state={PRODUCT_RESULT:[],appliedFilters:[]},action){

    switch (action.type) {
      
    

        case "GET_PRODUCT_DATA":
            state={...state}
            state['loader']=true
            state['PRODUCT_RESULT']=null
            state['PRODUCT_TOTAL']=null
            return state
           

        case "GET_PRODUCT_LIST":
            state={...state}
            state['loader']=false
            state['PRODUCT_RESULT']=action.payload ? action.payload.DATA:[]
            state['PRODUCT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT:[]
            state['filteredProduct']=action.payload ? action.payload.DATA:[]
            
          return state
           
        case FILTER_BY_VALUE:
            state={...state}
            state['loader']=true
            state['filteredProduct']=null
            return state
        case "PRODUCT_FILTER_DATA_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRODUCT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
            state['filteredProduct']=action.payload ? action.payload.DATA :[]
            return state
        
        case "UPDATE_PRODUCT_RECORDS_REQUEST":
            state={...state}
            state['loader']=true
            state['UPDATE_PRODUCT_RECORD_RESULT']=null
            return state

        case "UPDATE_PRODUCT_RECORDS_RESPONSE":
              state={...state}
              state['loader']=false
              state['PRODUCT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
              state['UPDATE_PRODUCT_RECORD_RESULT']=action.payload ? action.payload.DATA:[]
              state['filteredProduct']=action.payload ? action.payload.DATA :[]
              return state
        case "UPDATE_PRODUCT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['UPDATE_PRODUCT_RECORD_RESULT']=""
            return state
         
        case "GET_PRODUCT_FILTER_RESULT":
          state={...state}
          state['PRODUCT_FILTER_RESULT']=""
          return state
        case "GET_FILTER_RESPONSE":
          state={...state}
          state['PRODUCT_FILTER_RESULT']=action.payload
          return state   
          
        case "INSERT_PRODUCT":
            state={...state}
            state['loader']=true
            state['INSERT_PRODUCT_RESULT']=null
            return state
        case "INSERT_PRODUCT_RESPONSE":
            state={...state}
           
            state['loader']=false
            state['INSERT_PRODUCT_RESULT']=action.payload
            state['filteredProduct']=action.payload ? action.payload.DATA :[]
            state['PRODUCT_TOTAL']=action.payload ? action.payload.TOTAL_COUNT :[]
           
            return state      
        case "UPDATE_PRODUCT_INSERT_RESULT_STATE":
            state={...state}
            state['loader']=false
            state['INSERT_PRODUCT_RESULT']=null
            return state    

        case "GET_INSERT_PRODUCT_FILTER_DROP":
            state={...state}
            
            state['loader']=true
            state['INSERT_PRODUCT_FILTER_DROP']=null
            
            return state
        

        case "INSERT_PRODUCT_FILTER_DROP_RESPONSE":
            state={...state}
            state['loader']=false
            state['INSERT_PRODUCT_FILTER_DROP']=action.payload 
        return state
        case "GET_PRODUCT_BRAND_PRODUCT_FILTER":
          
            state={...state}
            state['loader']=true
            state['PRODUCT_BRAND_PRODUCT_FILTER_RESULT']=""
            
            return state
        case "GET_PRODUCT_BRAND_PRODUCT_FILTER_RESPONSE":
            state={...state}
            state['loader']=false
            state['PRODUCT_BRAND_PRODUCT_FILTER_RESULT']=action.payload ? action.payload.DATA["brand_name-product_name"]:[]
           
          
            return state  
        case "GET_MAPPING_PRODUCT_FILTERS":
            state={...state}
            let SelectedBrand=action.payload.SelectedBrand;
            
            let ProductArr=[];
            for(let i=0; i<=SelectedBrand.length;i++ ){
            
                if(action.payload.ProductBrandProductFilter[SelectedBrand[i]]){
                    ProductArr=  [...ProductArr,...action.payload.ProductBrandProductFilter[SelectedBrand[i]]];
                }
            }
            
            let uniqueProduct = ProductArr.filter((c, index) => {
                return ProductArr.indexOf(c) === index;
            });
            
            state['PRODUCT_SELECTED_UNIQUE_PRODUCT']=ProductArr;
            
            return state
            
          
      default:return state
    }
    
    
}

  