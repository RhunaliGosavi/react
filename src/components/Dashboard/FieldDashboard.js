import axios from "axios";
import React, { Component } from "react"
import {connect} from "react-redux"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar";
import * as ConstVal from "../../Constants"
import {withRouter,Redirect} from "react-router-dom"
import moment from "moment";


const { tableau } = window;

class FieldDashboard extends Component {
    constructor(){
        super();
        
        this.state={

            tableauViz:"",
            token:"",
        
        }
    }
    componentWillMount=() =>{
        document.title = 'Field Dashboard'
    }

    getCurrentSheet=(currentSheet)=>{

        var  workbook =this.state.tableaueViz.getWorkbook();
        var   activeSheet = workbook.getActiveSheet();
        console.log("workbook: ", workbook);
        console.log("activeSheet: ", activeSheet,"current sheet",currentSheet);
        workbook.activateSheetAsync(currentSheet);

    }

    componentDidMount=()=>{
        if(ConstVal.LOCALENV){
            return false; //only for local env
        }
         /******check login */
         this.props.dispatch({
            type: 'CHECK_JWT_REQUEST',
        });
         /******check login */
        var tableaueReportVizDiv = document.getElementById('tableaueReport');
        var tableaueVizURL = null;
        var   tableaueViz = null;
		var tableaueDisplayOptions =
		{
			width:'100%',
			height: '100vh',
			hideToolbar: false,
			hideTabs: true, 
			onFirstInteractive: function(){
				
				var workbook = tableaueViz.getWorkbook();
	            var activeSheet = workbook.getActiveSheet();
	            console.log("Workboo: ",workbook);
	            console.log("activeSheet", activeSheet);
				console.log('Tableu Exceuted');
               
			}
            };
          var data= axios({
                url: process.env.REACT_APP_API_BASE_URL+'/login',
                dataType: "json",
                async: false
              }).then((response) => {
              
               // var part1 = process.env.REACT_APP_TABLEAU_BASE_URL+'/trusted/';
                //tableaueVizURL = part1+response.data+process.env.REACT_APP_TABLEAU_FIELD_DASHBOARD_URL;
                tableaueVizURL=process.env.REACT_APP_TABLEAU_BASE_URL+process.env.REACT_APP_TABLEAU_FIELD_DASHBOARD_URL
                if(tableaueReportVizDiv != null || tableaueVizURL != null){
                     tableaueViz =new tableau.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
                 }
                 this.setState({tableaueViz:tableaueViz,token:response.data});
                    console.log("component",tableaueViz);
              }, (error) => {
                sessionStorage.clear();
                localStorage.clear();
                location.href=process.env.REACT_APP_LOGOUT_URL;
                console.log(error);
              });
           
            
    
    }

 
render(){
    if(this.state.tableaueViz){
      
        this.state.tableaueViz.addEventListener(tableau.TableauEventName.TAB_SWITCH,  function(a,b){
           
            var elems = document.querySelectorAll(".nav-item");
                [].forEach.call(elems, function(el) {
                  el.classList.remove("active");
                });
            if(a.getNewSheetName() == 'Compliance Detail'){
              
		        //document.getElementsByClassName("nav-item").classList.remove("active");
                document.getElementById("compliance-tab").classList.add("active");
              }
            
            if(a.getNewSheetName() == 'Patient Detail'){
                
                document.getElementById("patient-tab").classList.add("active");
            }
            if(a.getNewSheetName() == 'Movement Detail'){
               
                document.getElementById("movement-tab").classList.add("active");
            }
            if(a.getNewSheetName() == 'Shipment Detail'){
               
                document.getElementById("shipment-tab").classList.add("active");
            }
            if(a.getNewSheetName() == 'HCP Central'){
               
                document.getElementById("hp-central-tab").classList.add("active");
            }
            if(a.getNewSheetName() == 'Patient Central'){
                
                document.getElementById("patient-central-tab").classList.add("active");
            }
	        if( a.getNewSheetName() == 'Field Summary'){
                
                document.getElementById("field-summary").classList.add("active");
            }
    
        })


    }
    
        return (
        <>
           
            <Header />
            <Sidebar activeIndex={1}/>
            <div className="container-fluid main mt-0">
                <div className="row title-row">
                    <h2 className="page-title">Field Dashboard</h2>
                </div>
            </div>	
            
            <div id="tabs">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="field-summary" data-toggle="tab" href="#exec"
                                    role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>this.getCurrentSheet('Field Summary')}>Field Summary</a>
                                    <a className="nav-item nav-link" id="compliance-tab" data-toggle="tab" href="#exec"
                                    role="tab" aria-controls="nav-profile" aria-selected="false" onClick={()=>this.getCurrentSheet('Compliance Detail')}>Compliance</a>
                                    <a className="nav-item nav-link" id="patient-tab" data-toggle="tab" href="#exec"
                                    role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>this.getCurrentSheet('Patient Detail')}>Patient Detail</a>
                                    <a className="nav-item nav-link" id="movement-tab" data-toggle="tab" href="#exec"
                                    role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>this.getCurrentSheet('Movement Detail')}>Movement</a>
                                    <a className="nav-item nav-link" id="shipment-tab" data-toggle="tab" href="#exec"
                                    role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>this.getCurrentSheet('Shipment Detail')}>Shipment</a>
                                    <a className="nav-item nav-link" id="patient-central-tab" data-toggle="tab" href="#exec"
                                    role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>this.getCurrentSheet('Patient Central')}>Patient Central</a> 
                                    <a className="nav-item nav-link" id="hp-central-tab" data-toggle="tab" href="#exec"
                                    role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>this.getCurrentSheet('HCP Central')}>HCP Central</a>

                                </div>
                            </nav>
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="exec" role="tabpanel"
                                aria-labelledby="nav-home-tab">
                                    <div id='tableaueReport' className="tableauiFrame"></div>
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
		jwt_status:state['LoginReducer']['CHECK_JWT_RESPONSE'] || [],
	}
}

export default connect(mapStateToProps)(withRouter(FieldDashboard));

