import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "./RepPrimaryList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import moment from "moment";
//import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../../Common/sample-base';
import Notification from "../../Common/Notification";
const group = [  ];
const pageLimit=15;
const pageSort="1";
class RepPrimary extends SampleBase {
    constructor(props) {
        super(props);
        this.dateValue = "";
        this.state = {
          
            pageOfItems: [],
            loader:false,
            checkbox: false,
            inputValue: "",
            submittedData:[],
            checkedItems:[],
            checkedItemsId:[],
            currentPage:1,
            errors:[],
            showInserModal:"",
       
         };
        

    
    }
    componentWillMount=() =>{
        document.title = 'Rep Primary'
    }
    handleInsertModalShowClick=(e)=> {
        e.preventDefault();
       
        this.setState({
           showInserModal: true
        })
      }
      handleModalCloseClick=(modelId)=> {
          
          let getmodelId= modelId && modelId.target ? modelId.target.id : "showImportModal";
          if(getmodelId){
            this.setState({ [getmodelId]:false })
          }
      
          $('.modal.in').modal('hide')
          $('.modal-backdrop').remove()
    
      }


   
        componentDidMount=()=>{
          
            this.props.dispatch({
                type:"GET_REP_PRIMARY_DATA",
                payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_REP_PRIMARY_FILTER_RESULT",
            })
         
        }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{
        let npi=this.dropDownListObject.value
        let firstName= this.dropDownListObjectFirstName.value
        let lastName=this.dropDownListObjectLastName.value
        let status=this.dropDownListObjectStatus.value
        let reviewer=this.dropDownListObjectReviewer.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        this.props.dispatch({
            type: 'REP_PRIMARY_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,pagelimit:pageLimit,value: [npi,firstName,lastName,status,reviewer,checkboxFilter],data:this.state.checkedItemsId}
        })
        
    }
    
    handleInput(e){
        
       
        this.setState({[e.target.name]: e.target.value})
        if(e.target.name){
        let checkStatusChange=e.target.name;
        
        let res = checkStatusChange.split("_");
        /***on change of status change bg clr****/
        if(res[0]=="status"){
            let element= document.getElementById(e.target.id);
                element.classList.remove("reject-clr")
                element.classList.remove("in-progress-clr")
                element.classList.remove("pending-clr")
                element.classList.remove("approve-clr")
                element.classList.remove("submitted-clr")
                element.classList.remove("new-clr")
            if(element.value=="Approved"){
                element.classList.add("approve-clr");
             }else if(element.value=="Pending"){
                element.classList.add("pending-clr")
            }else if(element.value=="Rejected"){
                element.classList.add("reject-clr")
            }else if(element.value=="In_Progress"){
                element.classList.add("in-progress-clr")
            }
            else if(element.value=="New"){
                element.classList.add("new-clr")
            }else if(element.value=="Submit"){
                element.classList.add("submitted-clr")
            }
        }
    }

        let res = e.target.id.split("_");
        
        let getApprovedFlag=document.getElementById("status_"+res[res.length-1]).value =="Approved" ? "TRUE" : "FALSE";
        let resVariable=res[res.length-1];
        let status=document.getElementById("status_"+res[res.length-1]).value;
        let obj=this.getObj(resVariable,getApprovedFlag,status,'');
        
        const index = this.state.submittedData.findIndex((e) => e.id === obj.id);
        if (index === -1) {
            this.state.submittedData.push(obj);
        } else {
            this.state.submittedData[index] = obj;
        }

    /****on change of checkbox****/
    
    if(res[0]=="check"){
       
        let str=e.target.name;
        if(e.target.checked){
          
            this.state.checkedItems.push(e.target.name);
            this.state.checkedItemsId.push(res[1]);
        }else{
            var arrayDaya =[...this.state.checkedItems];
            var arrayDataId =[...this.state.checkedItemsId];
            const index = arrayDaya.indexOf(str);
            if (index > -1) {
                arrayDaya.splice(index, 1);
                arrayDataId.splice(index, 1);
            }
            /****remove from array on uncheck****/

                const indexToRemoveElement = this.state.submittedData.findIndex((e) => e.id == res[1]);
                if(indexToRemoveElement >-1){
                    this.state.submittedData.splice(indexToRemoveElement, 1);
                }
            /***************************************/
           
            this.setState({checkedItems:arrayDaya,checkedItemsId:arrayDataId})
        }

      
        this.setState({[e.target.name]: e.target.checked})
    }
    /****on chenge of checkbox *****/
       
    }
    getObj=(resVariable,getApprovedFlag,status,startDate)=>{
        let obj={"id":parseInt(document.getElementById("id_"+resVariable).innerText),
       
            "mat_run_id":parseInt(document.getElementById("mat_run_id_"+resVariable).innerText),
            "rec_created_ts":document.getElementById("rec_created_ts_"+resVariable).getAttribute('data-reccreatedts'),
            "rec_updated_by":document.getElementById("rec_updated_by_"+resVariable).value,
            "rec_updated_ts":document.getElementById("rec_updated_ts_"+resVariable).innerText,
            "status":status,
            "approved_flag":getApprovedFlag,
            "reviewd_by_ds":localStorage.fullname,
        };
      return obj;
    }
 
    getSElectedREcords=()=>{
      
        if(!this.state.checkedItems.length ){
            toast(
                
                <Notification msg="Please select at least 1 checkbox to update" headerText="Note !"></Notification>
               ,{
                 toastId: "warning_notification",
            })
            return false;
        }
    
       
        let npi=this.dropDownListObject.value
        let firstName= this.dropDownListObjectFirstName.value
        let lastName=this.dropDownListObjectLastName.value
        let status=this.dropDownListObjectStatus.value
        let reviewer=this.dropDownListObjectReviewer.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        let Filtervalue= [npi,firstName,lastName,status,reviewer,checkboxFilter];
        let checkedIds=this.state.checkedItemsId;
       this.props.dispatch({
            type:"UPDATE_REP_PRIMARY_RECORDS_REQUEST",
            payload:{data:this.state.submittedData,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
            
       });

    
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
      
      
   
        if(this.props.RepPrimaryUpdateStatus!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_REP_PRIMARY_RESULT_STATE",
               
            });
           /* this.props.dispatch({
                type:"GET_REP_PRIMARY_FILTER_RESULT",
            })*/
            
        }

    }
   
 
    onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
        let npi=this.dropDownListObject.value
        let firstName= this.dropDownListObjectFirstName.value
        let lastName=this.dropDownListObjectLastName.value
        let status=this.dropDownListObjectStatus.value
        let reviewer=this.dropDownListObjectReviewer.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        this.props.dispatch({
            type:"GET_REP_PRIMARY_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,value: [npi,firstName,lastName,status,reviewer,checkboxFilter],data:this.state.checkedItemsId}
        })
      
      }
      switchToAudit =(e)=>{
       

        if(e.target.checked){
          
            this.props.history.push("rep-primary-auditing");
          
        }
    }
   


 
    refreshFilter=()=>{
        this.dropDownListObject.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.npi : [];
        this.dropDownListObjectFirstName.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.firstname : [];
        this.dropDownListObjectLastName.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.lastname : [];
        this.dropDownListObjectStatus.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.status : [];
        this.dropDownListObjectReviewer.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.reviewd_by_ds : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"]
    }
    onClickShowCommentPopup=(e)=>{
        e.preventDefault();
        let res = e.target.id.split("_");
        this.setState({
            ["comments_popup"+res[1]]: true
        })
    }
    render() {
     
        let products= this.props.RepPrimaryFilteredResult;
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={0}/>
           
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Rep Primary</h2>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" onChange={(e)=>this.switchToAudit(e)}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="note-text">{ConstVal.auditMessage}</div>
                    </div>
                    
                </div>
              
            </div>
             
            {this.props.loader && <div className="Dataloader" >
                <img className="login-logo" src={ConstVal.deployment+"/assets/img/ajax-loader.gif"} />
             </div>	
            }


            {/***  Tabs ***/}

            {/***<div className="container main margin-l-ipad col-lg-11 col-11 cont-div" >***/}
            <div className="main-div">
            <div className="row no-padding product-filter col-lg-12 col-12">
                    <div className="col-xl-11 col-lg-11 col-md-10 row p-0">
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 pl-0 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-ts-id select-wrapper-product-fore-year">
                            <span className="drp-lable">NPI</span>
                            
                            <MultiSelectComponent value={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.npi : ""} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="Npi" dataSource={this.props.RepPrimaryFilter? this.props.RepPrimaryFilter.npi : ""}
                                    fields={this.fields} placeholder="Select NPI" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">First Name</span>
                                <MultiSelectComponent value={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.firstname : ""} ref={(scope) => { this.dropDownListObjectFirstName = scope; }} className="filter-select"  id="firstName" dataSource={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.firstname : ""}
                                    fields={this.fields} placeholder="Select First Name" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-2 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Last Name</span>
                                <MultiSelectComponent value={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.lastname : ""} ref={(scope) => { this.dropDownListObjectLastName = scope; }} className="filter-select"  id="lastName" dataSource={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.lastname : ""}
                                    fields={this.fields} placeholder="Select Last Name" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                 
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                            <span className="drp-lable-testing">Status</span>

                            <MultiSelectComponent value={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.status : ""}
                                fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 ml-md-2 ml-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-ts-id-zip mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>
                    </div>
                   
                        <div className=" row col-xl-1  col-lg-1 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                            <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                            <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                        </div>
                  
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped  table-responsive ref-preffered-table rep-table-responsive">
                       
                    <thead className="thead-blue"> 
                        <tr>
                            <th className="text-center sticky-col checkbox-col ">#</th>
                            <th className="text-center text-center sticky-col nw-col">Nw Vid V</th>
                            <th className="text-center text-center sticky-col sales-force-col">Salesforce<br></br>Account ID</th>
                            <th className="text-center text-center sticky-col pri-npi-col">NPI</th>
                            <th className="text-center text-center sticky-col pri-firstname-col">First Name</th>
                            <th className="text-center text-center sticky-col pri-lastname-col">Last Name</th>
                            <th className="text-center">SF Primary<br></br>Address ID</th>
                            <th className="text-center">Address 1</th>
                            <th className="text-center">Address 2</th>
                            <th className="text-center ">Address 3</th>
                            <th className="text-center">City</th>
                            <th className="text-center">State</th>
                            <th className="text-center">ZIP</th>
                            <th className="text-center">ZIP4</th>
                            <th className="text-center">Primary Addr<br></br>Override Flag</th>
                            <th className="text-center">Primary Addr<br></br>Override Date</th>
                            <th className="text-center">Rep Primary<br></br>Override Flag</th>
                            <th className="text-center">Comments</th>
                            <th className="text-center sticky-col status-col">Status</th>
                            <th className="text-center reviewed-by-col sticky-col">Reviewer</th>
                            <th className="text-center " style={{"display":"none"}}>Rec_created_ts</th>
                            <th className="text-center" style={{"display":"none"}}>Rec_updated_ts</th>
                            <th className="text-center" style={{"display":"none"}}>Rec_updated_by</th>
                            <th className="text-center" style={{"display":"none"}}>Mat_run_id</th>
                            <th className="text-center" style={{"display":"none"}}>Approved_flag</th>
                           
                        </tr>
                       
                    </thead>
                    <tbody>
                        { products.length ?
                           <List   handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                    </tbody>
                </table>
               
                    <ToastContainer />
                  
                    { products.length ? <CustomPagination totalRecords={this.props.RepPrimaryListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                </div>
                
                { products.length ? (!this.props.loader ? 
                   <div className="btn-align row">
                        <div>
                            <button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Update</button>
                        </div>
                        {/****<div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleInsertModalShowClick} >Insert</button>
                        </div>***/}
                    </div> 
               : "") : ""}
          
            </div> 
         
           </>
        );
    }
}



function mapStateToProps(state) {
   

    return {
        loader:state['RepPrimaryReducer']['loader'] || false,
        RepPrimaryList:state['RepPrimaryReducer']['REP_PRIMARY_RESULT'] || [],
        RepPrimaryListTotal:state['RepPrimaryReducer']['REP_PRIMARY_TOTAL'] || [],
        RepPrimaryFilteredResult:state['RepPrimaryReducer']['filteredRepPrimary'] || [],
        RepPrimaryUpdateStatus:state['RepPrimaryReducer']['UPDATE_REP_PRIMARY_RECORD_RESULT'] || [],
        RepPrimaryFilter:state['RepPrimaryReducer']['REP_PRIMARY_FILTER_RESULT'] || [],
        RepPrimaryFilterStatus:state['RepPrimaryReducer']['REP_PRIMARY_FILTER_STATUS_RESULT'] || [],
        
          
     };
}

export default connect(mapStateToProps)(RepPrimary);
