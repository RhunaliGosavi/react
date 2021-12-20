import React, { Component } from "react";
import PropTypes from "prop-types";
import Testing from "./DataStewardship/Testing";
import ZipTerritory from "./DataStewardship/RTRX/ZipTerritory";

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (


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
                           
                        </div>
                    </nav>
                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="exec" role="tabpanel"
                            aria-labelledby="nav-home-tab">

                           <Testing></Testing>
                        </div>
                        <div className="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="nav-profile-tab">
                           <ZipTerritory></ZipTerritory>
                        </div>
                       
                    </div>

                </div>
            </div>
        </div>
    </div> 
    
    );
  }
}

export default Tab;