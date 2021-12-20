import React, { Component } from 'react'
import {connect} from "react-redux"
import {withRouter,Redirect} from "react-router-dom"
import './login.css'
import * as ConstVal from "../../Constants"
import axios from "axios"

class LoginWithCredentials extends Component{

	constructor(props) {
		super(props);
	
		this.state = {
		  form_password: "",
		  form_username: "",
		  errors: []
		};
	
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }
	componentWillMount=() =>{
        document.title = 'Login';
    }
	componentDidUpdate=()=>{
		if(typeof this.props.login_status.status!="undefined" && !this.props.login_status.status){
			let element= document.getElementById("usernamePasswordRequired");
			element.classList.remove("hide-error");
		  	document.getElementById("login-loader").classList.add("hide-error");
		}
	
	}
	hasError(key) {
		document.getElementById("usernamePasswordRequired") && document.getElementById("usernamePasswordRequired").classList.add("hide-error");
		//document.getElementById("login-loader") && document.getElementById("login-loader").classList.add("hide-error");
		if(this.state.errors.indexOf(key) !== -1){
			document.getElementById("login-loader") && document.getElementById("login-loader").classList.add("hide-error");	
		}
		return this.state.errors.indexOf(key) !== -1;
	}
	
	handleInputChange(event) {
		var key = event.target.name;
		var value = event.target.value;
		var obj = {};
		obj[key] = value;
		
		this.setState(obj);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		let element= document.getElementById("login-loader");
  			element.classList.remove("hide-error");
		var errors = [];
		if (this.state.form_password === "") {
			errors.push("form_password");
			}
			const expression = /\S+@\S+/;
			var validEmail = expression.test(String(this.state.form_username).toLowerCase());
		
			if (!validEmail) {
			errors.push("form_username");
			}
		
			this.setState({
			errors: errors
			});
		
			if (errors.length > 0) {
			return false;
			} else {
			this.login();
			}
	}
	

   login=()=>{
		let email=document.getElementById('form-username').value;
		let password=document.getElementById('form-password').value;
	    let user = {
			email : email,
			password : password
		};
		
		if(email && password){
			this.props.dispatch({
				type: 'PROCESS_LOGIN',
				payload:user
				
			});
		}
		

   }
 

	render(){
		setTimeout(function() {
			localStorage.removeItem('errorMsg');
		}, 1000);
         if(localStorage.status){

			let details={
				"credentials": {
				  "name": "r.gosavi@saama.com",
				  "password": "gosavir@saama",
				  "site": {
					"contentUrl": "retrophin"
				  }
				}
			  };
			var data= axios({
                url: process.env.REACT_APP_TABLEAU_BASE_URL+'/api/3.14/auth/signin',
				method:"POST",
                data:details,
				headers: {'Content-Type': 'application/json',"Access-Control-Allow-Origin" : "*","Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}
              }).then((response) => {
              console.log("************respose",response, process.env.REACT_APP_TABLEAU_BASE_URL+'/api/3.14/auth/signin')
              }, (error) => {
				console.log("************error",error, process.env.REACT_APP_TABLEAU_BASE_URL+'/api/3.14/auth/signin')
              });
           
            
			return <Redirect to={localStorage.redirect} />
		 }

		return (
			<>

				<video poster={ConstVal.deployment+"/assets/videos/Background-Image.gif"} autoPlay muted loop id="myVideo">
					<source src={ConstVal.deployment+"/assets/videos/19095715-sd.mov"} type="video/mp4"/>
				</video>
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-logo">
							<div><img className="login-logo" src={ConstVal.deployment+"/assets/img/ACE Logo New.png"} /></div>

						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<div className="login-logo-gene pull-right">

							</div>
						</div>

					</div>

				</div>
				<div className="container login-container">

					<div className="row login-row-1 display-flex">

						<div className="col-xs-1 col-sm-2 col-md-3 col-lg-3">
						</div>
						<div className="col-xs-10 col-sm-8 col-md-6 col-lg-6 ">
							<div className="login-col1">
								<div className="pb-3"><img className="ace-login-logo" src={ConstVal.deployment+"/assets/img/Travere_logo.png"} /></div>
								<div id="usernamePasswordRequired" class="hide-error show-error text-center" >Username or Password is Incorrect</div>
								
								{   localStorage.errorMsg  ? <div  class="show-error text-center" >{localStorage.errorMsg}</div>  : "" }
								<div className="login-col2-text">
									<div className="row" style={{textAlign:"center"}}>
										<div className="col-md-2 col-lg-2"></div>
										<div className="col-sm-8 col-md-8 col-lg-8 dual-login">

											{/**  Login Form **/}
											<form role="form"  id="login-form" className="login-form needs-validation" >
												<div class="form-group col-lg-8 offset-lg-2 col-8 offset-2 p-0 ">
												
													<input type="text"  className={ this.hasError("form_username") ? "form-control is-invalid" : "form-control" }  id="form-username" placeholder="Enter username" name="form_username" onChange={this.handleInputChange} required/>
													<div class="invalid-feedback  text-left"> Invalid Username</div>
												</div>
												<div class="form-group col-lg-8 offset-lg-2 col-8 offset-2 p-0 mb-0">
												
													<input type="password"  id="form-password" placeholder="Enter password" name="form_password" className={this.hasError("form_password") ? "form-control is-invalid" : "form-control"}  onChange={this.handleInputChange} required />
													<div class="invalid-feedback  text-left">Invalid Password </div>
												</div>
												<button id="submit" class="btn btn-default log-btn btn-login fadeIn"   onClick={this.handleSubmit}>
													Login
													<span class="spinner-border spinner-border-sm hide-error" id="login-loader" role="status" aria-hidden="true"></span>
												</button>
											</form>
											{/***<a href="/acetab/connect/google?redirectPage=Optha">
												<button type="button" className="btn btn-default btn-login fadeIn">Login</button>
											</a>****/}
										</div>
										<div className="col-md-2 col-lg-2"></div>

									</div> {/** row**/ }
								</div> {/**login-col2-text **/}
							</div>{/**login-col1 ***/}
						</div> {/****  col-xs-10 col-sm-8 col-md-6 col-lg-6 **/}

						<div className="col-xs-1 col-sm-2 col-md-3 col-lg-3">
						</div>

					</div> {/***  login-row-1 ***/}
				</div> {/****  container ****/}
			</>	


		);
	}
}

function mapStateToProps(state) {
	
	return{
		login_status:state['LoginReducer']['LOGIN_RESULT'] || [],
	}
}

export default connect(mapStateToProps)(withRouter(LoginWithCredentials));
