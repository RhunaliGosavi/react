import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "../RTRX/RepPrimaryList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent,DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import CustomPagination from "../../Common/CustomPagination";
import Notification from "../../Common/Notification";
import Modal from "../../Common/Modal";
const pageLimit=15;
const pageSort="1";
const sortorder="desc";
class RepPrimaryAuditing extends React.Component {
    constructor() {
        super();
 
        this.state = {
          
            pageOfItems: [],
            loader:false,
            inputValue: "",
            submittedData:[],
            checkedItems:[],
            checkedItemsId:[],
            currentPage:1,
           
         };

   
    }
    handleModalCloseClick=(modelId)=> {
      
        let getmodelId= modelId && modelId.target ? modelId.target.id : "showImportModal1";
        if(getmodelId){
          this.setState({ [getmodelId]:false })
        }
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
 
  
    }
    onClickShowCommentPopup=(e)=>{
        e.preventDefault();
        let res = e.target.id.split("_");
        this.setState({
            ["comments_popup"+res[1]]: true
        })
    }
    componentWillMount=() =>{
        document.title = 'Rep Primary Audit'
    }
    componentDidMount=()=>{
           
        //if(!this.props.RefPrimaryFilteredResult.length){
         
            this.props.dispatch({
                type:"GET_REP_PRIMARY_AUDIT_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder}
            })
            this.props.dispatch({
                type:"GET_REP_PRIMARY_FILTER_RESULT",
            })
        //}
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
        let reviewer=""
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        
         this.props.dispatch({
            type: 'REP_PRIMARY_AUDIT_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [npi,firstName,lastName,status,reviewer,checkboxFilter],data:this.state.checkedItemsId}
        })
        
    }
   
    handleInput(e){
        this.setState({[e.target.name]: e.target.checked})
        let str =e.target.id;
        let res = str.split("_");
        
        let obj={"id":res[res.length-1],"reviewd_by_ds":localStorage.fullname}
        if(e.target.checked){
            this.state.checkedItems.push(e.target.name);
            this.state.submittedData.push(obj);
            this.state.checkedItemsId.push(res[1]);
            
         
        }else{
            var arrayDaya =[...this.state.checkedItems];
            var submittedData =[...this.state.submittedData];
            var arrayDataId =[...this.state.checkedItemsId];
            const index = arrayDaya.indexOf(str);
            if (index > -1) {
                arrayDaya.splice(index, 1);
                arrayDataId.splice(index, 1);
             }
           /****remove from array on uncheck****/
            const indexToRemoveElement = submittedData.findIndex((e) => e.id == res[1]);
            if(indexToRemoveElement >-1){
                submittedData.splice(indexToRemoveElement, 1);
            }
            /***************************************/
            this.setState({checkedItems:arrayDaya,submittedData:submittedData,checkedItemsId:arrayDataId})
        }
       
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
    
        this.props.dispatch({
            type:"REVERT_REP_PRIMARY_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,data:this.state.checkedItemsId}
            
        });

     
 
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
     
        if(this.props.TestingAuditRevertResult!="" ) {
         
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_REP_PRIMARY_REVERT_RESULT_STATE",
               
            });
        }
       
        
        
    }

    
     onPageChanged = data => {
       
        this.setState({currentPage:data.currentPage});
        let npi=this.dropDownListObject.value
        let firstName= this.dropDownListObjectFirstName.value
        let lastName=this.dropDownListObjectLastName.value
        let status=this.dropDownListObjectStatus.value
        let reviewer=""
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        this.props.dispatch({
            type:"GET_REP_PRIMARY_AUDIT_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder,value: [npi,firstName,lastName,status,reviewer,checkboxFilter],data:this.state.checkedItemsId}
        })
    
      }
      revertAllRecords=()=>{

        let npi=this.dropDownListObject.value
        let firstName= this.dropDownListObjectFirstName.value
        let lastName=this.dropDownListObjectLastName.value
        let status=this.dropDownListObjectStatus.value
        let reviewer=""
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        this.props.dispatch({
            type:"REVERT_REP_PRIMARY_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [npi,firstName,lastName,status,reviewer,checkboxFilter],data:this.state.checkedItemsId,revrtAll:true}
            
        });
    }
  
    switchToRepPrimary =(e)=>{
     

        if(!e.target.checked){
            
            this.props.history.push("rep-primary");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObject.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.npi : [];
        this.dropDownListObjectFirstName.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.firstname : [];
        this.dropDownListObjectLastName.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.lastname : [];
        this.dropDownListObjectStatus.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.status : [];
       // this.dropDownListObjectReviewer.value=this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.reviewd_by_ds : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"]
    }
    render() {
       
        let products= this.props.RefPrimaryFilteredResult;
        
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={2}/>
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Rep Primary Audit</h2>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" checked onChange={(e)=>this.switchToRepPrimary(e)}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="note-text">{ConstVal.auditRevertMessage}</div>
                    </div>
                   
                </div>
              
            </div>
           
           

            {this.props.loader && <div className="Dataloader" >
                <img className="login-logo" src={ConstVal.deployment+"/assets/img/ajax-loader.gif"} />
             </div>	
            }


            {/***  Tabs ***/}

           {/***  <div className="container main margin-l-ipad col-lg-11 col-11 cont-div">****/}
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
                                    fields={this.fields} placeholder="Select Market Name" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
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
                        {/****<div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 ml-md-2 ml-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.RepPrimaryFilter ? this.props.RepPrimaryFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>****/}
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-ts-id-zip mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>
                        <div className=" row col-xl-1  col-lg-1 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                            <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                            <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                        </div>
                    </div>
               </div>
                   
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped table-responsive ref-preffered-table ">
                       
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
                        <List  handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} auditFlag={"1"}  onChangeInput={e => { this.handleInput(e)}}  item={this.state.item}  list={products} props={this.state} />
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                        
                    </tbody>
                </table>
               
                    <ToastContainer />
                   
                    { products.length ? <CustomPagination totalRecords={this.props.RepPrimaryListTotaltal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                   
                </div>
            
                { products.length ? (!this.props.loader ? 
                <div className="btn-align row">
                    <div className=""><button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Revert</button></div>
                    <div className=" ml-2"><button type="button" className="btn btn-primary btn-bg" onClick={this.revertAllRecords}>Revert All</button></div>
                </div>
             : "") : ""}
     
            </div> 
              
           </>
        );
    }
}



function mapStateToProps(state) {
    
    return {
        loader:state['RepPrimaryAuditingReducer']['loader'] || false,
        RefPrefferedList:state['RepPrimaryAuditingReducer']['REP_PRIMARY_AUDIT_RESULT'] || [],
        RefPrimaryFilteredResult:state['RepPrimaryAuditingReducer']['filteredRepPrimaryAudit'] || [],
        RepPrimaryFilter:state['RepPrimaryReducer']['REP_PRIMARY_FILTER_RESULT'] || [],
        RepPrimaryListTotaltal:state['RepPrimaryAuditingReducer']['REP_PRIMARY_TOTAL'] || [],
        TestingAuditRevertResult:state['RepPrimaryAuditingReducer']['REVERT_REP_PRIMARY_RESULT'] || [],
        
        
    };
}

export default connect(mapStateToProps)(RepPrimaryAuditing);
