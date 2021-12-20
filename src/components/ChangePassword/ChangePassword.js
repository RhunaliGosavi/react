import React, { Component } from "react"
import {connect} from "react-redux"
import {withRouter,Redirect} from "react-router-dom"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar";
import './changePassword.css';


class ChangePassword extends Component{
    constructor(props) {
		super(props);
	
		this.state = {
		  new_password: "",
		  confirm_password: "",
          errors: [],
          disable:true
		};
	
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }
    hasError(key) {
		return this.state.errors.indexOf(key) !== -1;
	}
	
	handleInputChange(event) {
      
		var key = event.target.name;
		var value = event.target.value;
		var obj = {};
        obj[key] = value;
        if(document.getElementById('PasswordNew').value!= '' && document.getElementById('ConfirmPassword').value != '' ){
            this.setState({disable:false});
        }
		
		this.setState(obj);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var errors = [];
	
        if (document.getElementById('PasswordNew').value!= '' && document.getElementById('ConfirmPassword').value != '' && document.getElementById('PasswordNew').value != document.getElementById('ConfirmPassword').value) {
            errors.push("confirm_password");
            errors.push("new_password");
        }
		
        this.setState({
            errors: errors
        });
    
        if (errors.length > 0) {
             return false;
        } else {
            this.changePassword();
        }
    }
    
    changePassword=()=>{
        let password=document.getElementById('PasswordNew').value;
		this.props.dispatch({
			type: 'CHANGEPASSWORD_REQUEST',
			payload:password
	    });
    }
	
  
render(){
  
  return (
    <>
        <Header />
        <Sidebar />
        		
        {/***  Tabs ***/}
        <div id="tabs" className="form-margin hide-scroll">
            <div className="container-fluid">
            
               { this.props.change_password_status.status && <div className="alert alert-success alert-dismissible col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-9 offset-2 text-center " id="success-msg" >
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong >Password changed successfully</strong> 
                </div>}
                <div className="row">
                    <div className="col-md-12">
                        <div className="row justify-content-md-center">
                            <div className="col-lg-4 offset-lg-0 col-md-6 offset-md-0 col-11 offset-1">
                                <span className="anchor" id="formChangePassword"></span>
                                <div className="card card-outline-secondary">
                                    <div className="card-header change-password-header">
                                        <h3 className="mb-0">Change Password</h3>
                                    </div>
                                    <div className="card-body">
                                    <form action="" id="change-password-form" className="needs-validation" noValidate>
                                        
                                        <div className="form-group">
                                            New Password<input type="password" id="PasswordNew"  name="new_password" className={ this.hasError("new_password") ? "form-control is-invalid" : "form-control" }  onChange={this.handleInputChange} required />
                                            <div className="invalid-feedback">Password must be same as confirm password</div>
                                        </div>
                                        <div className="form-group">
                                            Confirm Password<input type="password" id="ConfirmPassword"  className={this.hasError("confirm_password") ? "form-control is-invalid" : "form-control"} onChange={this.handleInputChange} name="confirm_password" required />
                                            
                                            <div id="cPwdInvalid" className="invalid-feedback">Password must be same as new password</div>
                                        </div>
                                        <div className="form-group col-lg-10 offset-lg-3 col-md-11 offset-md-3 col-12 offset-2" >
                                            <button type="submit" id="submitBtn" className="btn btn-default log-btn btn-login fadeIn"  disabled={this.state.disable ? 'disabled' : null} onClick={this.handleSubmit}>
                                                Submit
                                                <span className="spinner-border spinner-border-sm hide-error" id="login-loader" role="status" aria-hidden="true"></span>
                                            </button>
                                        
                                        </div>
                                        </form>                      
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</>
  );
    }
}

function mapStateToProps(state) {
    
	return{
		change_password_status:state['LoginReducer']['CHANGEPASSWORD_RESULT'] || [],
	}
}

export default connect(mapStateToProps)(withRouter(ChangePassword));


