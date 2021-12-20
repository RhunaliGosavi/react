
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
export default function LoginReducer(state={LOGIN_RESULT:[]},action){

    switch (action.type) {

        case "PROCESS_LOGIN":
            state={...state}
            state['loader']=true
            state['LOGIN_RESULT']=null
            return state
        case "LOGIN_DATA":
            state={...state}
            state['loader']=true
            state['LOGIN_RESULT']=action.payload
            return state
        case "LOGOUT_REQUEST":
            state={...state}
            state['loader']=true
            state['LOGOUT_RESULT']=null
            return state
        case "LOGOUT_STATUS":
           
            state={...state}
            state['loader']=true
            state['LOGOUT_RESULT']=action.payload
            return state
        case "CHANGEPASSWORD_REQUEST":
            state={...state}
            state['loader']=true
            state['CHANGEPASSWORD_RESULT']=null
            return state
        case "CHANGEPASSWORD_STATUS":
            state={...state}
            state['loader']=true
            state['CHANGEPASSWORD_RESULT']=action.payload
            return state  
        case "CHECK_JWT_REQUEST":
            state={...state}
            state['JWT_RESULT']=null
            return state
        case "CHECK_JWT_RESPONSE":
            state={...state}
            state['JWT_RESULT']=action.payload
            return state  
            
        default:return state
    }
    
}

  