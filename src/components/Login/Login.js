import React, { Component } from 'react'
import {connect} from "react-redux"
import {withRouter,Redirect} from "react-router-dom"
import './login.css'
import * as ConstVal from "../../Constants"

class Login extends Component{

	constructor(props) {
		super(props);
    } 
	componentDidMount=()=>{
	    this.props.dispatch({
            type: 'PROCESS_LOGIN',
            payload:{email:"",password:""}
            
        });
       
	}

	render(){
	
		if(localStorage.status){
			
		   return <Redirect to={localStorage.redirect} />
		}
		return null
	
   }
}

function mapStateToProps(state) {
	
	return{
		login_status:state['LoginReducer']['LOGIN_RESULT'] || [],
	}
}

export default connect(mapStateToProps)(withRouter(Login));
