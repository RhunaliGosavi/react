import axios from "axios";
import React, { Component } from "react"
import {connect} from "react-redux"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar";
import * as ConstVal from "../../Constants"
import {withRouter,Redirect} from "react-router-dom"
import moment from "moment";

const { tableau } = window;

class VeevaDashboard extends Component {

    constructor(){
        super();
    }
    componentWillMount=() =>{
        document.title = 'Veeva Dashboard'
    }
    
    getCurrentSheet=(id,part2)=>{
        var tableaueReportVizDiv = document.getElementById(id);
        this.getTableaueSheet(part2,tableaueReportVizDiv);
        

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
        this.getTableaueSheet('PatientLead',tableaueReportVizDiv);
    
    }


    getTableaueSheet=(part2,tableaueReportVizDiv)=>{

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
                //console.log("get response",response);

               
                //var part1 = process.env.REACT_APP_TABLEAU_BASE_URL+'/trusted/';
                //tableaueVizURL = part1+response.data+process.env.REACT_APP_TABLEAU_VEEVA_DASHBOARD_URL+part2
                tableaueVizURL = process.env.REACT_APP_TABLEAU_BASE_URL+process.env.REACT_APP_TABLEAU_VEEVA_DASHBOARD_URL+part2
                if(tableaueReportVizDiv != null || tableaueVizURL != null){
                     tableaueViz =new tableau.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
                 }
               
                    console.log("component",tableaueViz);
              }, (error) => {
                sessionStorage.clear();
                localStorage.clear();
                location.href=process.env.REACT_APP_LOGOUT_URL;
                console.log(error);
              });
 
    }

render(){
    return (
        <>
           
            <Header />
            <Sidebar activeIndex={1}/>
            <div className="container-fluid main mt-0" >
                <div className="row title-row">
                    <h2 className="page-title">Veeva Dashboard</h2>
                
                </div>
            </div>	
            {/***  Tabs ***/}
            <div id="tabs">
                <div className="container-fluid">
                
                    <div className="row">
                        <div className="col-md-12">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="patient-lead" data-toggle="tab" href="#exec"
                                        role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>this.getCurrentSheet('tableaueReport','PatientLead')}>Patient Lead</a>
                                    <a className="nav-item nav-link" id="prospective-patient" data-toggle="tab" href="#sales"
                                        role="tab" aria-controls="prospective-patient" aria-selected="false"  onClick={()=>this.getCurrentSheet('tableaueProspectivePatient','ProspectivePatient')}>Prospective Patient</a>
                                    <a className="nav-item nav-link" id="sent-emails" data-toggle="tab" href="#shipments"
                                        role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>this.getCurrentSheet('tableaueSentEmails','SentEmail')}>Sent Emails</a>
                                    <a className="nav-item nav-link" id="call-reporting" data-toggle="tab" href="#patient"
                                        role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>this.getCurrentSheet('tableaueCallReporting','CallReporting')}>Call Reporting</a>
                                </div>
                            </nav>
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="exec" role="tabpanel"
                                    aria-labelledby="nav-home-tab">

                                    <div id='tableaueReport' className="tableauiFrame"></div>
                                </div>
                                <div className="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <div id='tableaueProspectivePatient' className="tableauiFrame"></div>
                                </div>
                                <div className="tab-pane fade" id="shipments" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <div id='tableaueSentEmails' className="tableauiFrame"></div>
                                </div>
                                <div className="tab-pane fade" id="patient" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div id='tableaueCallReporting' style={{width: "100%"}}></div>
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

export default connect(mapStateToProps)(VeevaDashboard);

