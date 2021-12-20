import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "../RTRX/ZipTerritoryList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import Notification from "../../Common/Notification";
import axios from "axios"
const group = [  ];
const pageLimit=15;
const pageSort="1";
const sortorder="desc";
class ZipTerritoryAuditing extends React.Component {
    constructor() {
        super();
 
        this.state = {
            exampleItems:  [],
            pageOfItems: [],
            loader:false,
            checkbox: false,
            inputValue: "",
            submittedData:[],
            checkedItems:[],
            switchSort:false,
            checkedItemsId:[],
            showModal: false,
            filename:"",
            showImportModal:"",
            selectedFile:"",
            showInserModal:"",
            exportFileName:"",
            currentPage:1,
            sourceName:[],
            errors:[]
         };
  }


    componentWillMount=() =>{
        document.title = 'Zip Territory Audit'
    }
    
    componentDidMount=()=>{
            this.props.dispatch({
                type:"GET_ZIP_ENABLE_BUTTON_DETAILS",
            });
            this.props.dispatch({
                type:"GET_ZIP_TERR_LIST",
            })
            this.props.dispatch({
                type:"GET_ZIP_TERR_AUDIT_DATA",
                 payload:{pagestart:1,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_FILTER_RESULT",
            })
         
        }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let salesForceName = this.dropDownListObject.value;
        let rigion = this.dropDownListObjectRegion.value;
        let district = this.dropDownListObjectDistrict.value;
        let terrName=this.dropDownListObjectTerrName.value;
       // let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewdByDs='';
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let status=this.dropDownListObjectStatus.value;

        
         this.props.dispatch({
            type: 'ZIPP_AUDIT_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [salesForceName,rigion,district,reviewdByDs,checkboxFilter,terrName,status],data:this.state.checkedItemsId}
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
        let obj=this.getObj(resVariable,getApprovedFlag,status);
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
    getObj=(resVariable,getApprovedFlag,status)=>{
        let obj={"id":parseInt(document.getElementById("id_"+resVariable).innerText),
        
        "zt_zip_code":document.getElementById("zt_zip_code_"+resVariable).innerText,
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
        this.props.dispatch({
            type:"REVERT_ZIP_TERR_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,data:this.state.checkedItemsId}
            
        });

      
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
        
     
        if(this.props.ZipTerrAuditRevertResult!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_ZIP_TERR_REVERT_RESULT_STATE",
               
            });
            
        }
    }
   
    onPageChanged = data => {
        let salesForceName = this.dropDownListObject.value;
        let rigion = this.dropDownListObjectRegion.value;
        let district = this.dropDownListObjectDistrict.value;
        let terrName=this.dropDownListObjectTerrName.value;
       // let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let status=this.dropDownListObjectStatus.value;
        this.setState({currentPage:data.currentPage});
        this.props.dispatch({
            type:"GET_ZIP_TERR_AUDIT_DATA",
            payload:{pagestart:data.currentPage,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort,value: [salesForceName,rigion,district,reviewdByDs,checkboxFilter,terrName,status],data:this.state.checkedItemsId}
        })
      
    }
    revertAllRecords=()=>{

        let salesForceName = this.dropDownListObject.value;
        let rigion = this.dropDownListObjectRegion.value;
        let district = this.dropDownListObjectDistrict.value;
        let terrName=this.dropDownListObjectTerrName.value;
       // let reviewdByDs=this.dropDownListObjectReviewer.value;
       let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let status=this.dropDownListObjectStatus.value;

        this.props.dispatch({
            type:"REVERT_ZIP_TERR_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [salesForceName,rigion,district,reviewdByDs,checkboxFilter,terrName,status],data:this.state.checkedItemsId,revrtAll:true}
            
        });
    }
  
    switchToZipTerr =(e)=>{
       if(!e.target.checked){
           
            this.props.history.push("zip-territory");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObject.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_sales_force_name : [];
        this.dropDownListObjectRegion.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_region_name : [];
        this.dropDownListObjectDistrict.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_district_name : [];
        this.dropDownListObjectTerrName.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_terr_name : [];
        this.dropDownListObjectStatus.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.status : [];
        //this.dropDownListObjectReviewer.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.reviewd_by_ds : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
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
    render() {
     
        let products= this.props.ZipTerrAuditFilteredResult;
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={2}/>
           
        
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Zip Territory Audit</h2>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" checked onChange={(e)=>this.switchToZipTerr(e)}/>
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

            {/***<div className="container main margin-l-ipad col-lg-11 col-11 cont-div">***/}
            <div className="main-div">
            <div className="no-padding product-filter col-lg-12 col-12">
                <div className="row">
                    <div className="col-xl-4 col-lg-11 col-md-11 row pl-0">
                    <div className="col-xl-6  col-lg-2 col-md-3 col-sm-6  col-5  select-wrapper-ts-id select-wrapper-ts-id-zip">
                            <span className="drp-lable">Sales Force</span>
                         
                            <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_sales_force_name : ""} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="status" dataSource={this.props.zipTerrFilter? this.props.zipTerrFilter.zt_sales_force_name : ""}
                                    fields={this.fields} placeholder="Select Sales Force" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-6  col-lg-2 col-md-4 col-sm-6  col-5  select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Region</span>
                                <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_region_name : ""} ref={(scope) => { this.dropDownListObjectRegion = scope; }} className="filter-select"  id="status" dataSource={ this.props.zipTerrFilter ?  this.props.zipTerrFilter.zt_region_name : ""}
                                    fields={this.fields} placeholder="Select Region" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-11 col-md-11 row ">
                    <div className="col-xl-5  col-lg-2 col-md-3 col-sm-6  col-5  select-wrapper select-wrapper-dist-zip">
                                <span className="drp-lable">District</span>
                                <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_district_name : ""} ref={(scope) => { this.dropDownListObjectDistrict = scope; }} className="filter-select"  id="status" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_district_name : ""}
                                    fields={this.fields} placeholder="Select District" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                        <div className="col-xl-7  col-lg-2 col-md-3 col-sm-6  col-5 select-wrapper select-wrapper-terr-zip-audit">
                                <span className="drp-lable">Territory</span>
                                <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_terr_name : ""} ref={(scope) => { this.dropDownListObjectTerrName = scope; }} className="filter-select"  id="terrName" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_terr_name : ""}
                                    fields={this.fields} placeholder="Select Territory" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-11 col-md-11 row ">
                        <div className="col-xl-6  col-lg-3 col-md-3 col-sm-6  col-5  select-wrapper select-wrapper-zip-status-audit">
                                <span className="drp-lable-testing">Status</span>

                                <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.status : ""}
                                    fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                 
                        {/****  <div className="col-xl-6  col-lg-2 col-md-3 col-sm-6  col-5  select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>***/}
                         <div className="col-xl-6  col-lg-6 col-md-6 col-sm-6 col-6 select-wrapper select-wrapper-zip-check-audit mb-2 mb-md-2 mb-lg-0">
                                <span className="drp-lable">Checkbox Filter</span>
                                <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                    fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                                
                            </div>
                        </div>
                  
                        <div className=" row col-xl-1 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="col-lg-6  p-0 pt-3"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                            <div className="col-lg-6  pt-3 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                        </div>
                    </div>
                   
                </div>
 
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped table-responsive ref-preffered-table ">
                       
                    <thead className="thead-blue"> 
                        <tr>
                            {this.props.zipParams && this.props.zipParams.BUTTON_FLAG &&  this.props.zipParams.BUTTON_FLAG.toLowerCase()=="true" ? <th className="text-center sticky-col check-col">#</th> :  <th className="text-center sticky-col checkbox-col"></th>}
                            <th className={ this.props.zipParams && this.props.zipParams.BUTTON_FLAG  && this.props.zipParams.BUTTON_FLAG.toLowerCase()=="true" ? "text-center sticky-col first-col" : "text-center sticky-col first-col zip-left-border"}>Zip Code</th>
                            <th className="text-center">Territory ID</th>
                            <th className="text-center">Territory</th>
                            <th className="text-center">District ID</th>
                            <th className="text-center">District </th>
                            <th className="text-center">Region ID</th>
                            <th className="text-center">Region</th>
                            <th className="text-center">Sales Force ID</th>
                            <th className="text-center">Sales Force Name</th>
                            <th className="text-center">Alignment Quarter</th>
                            <th className="text-center">Alignment Year</th>
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
                           <List   buttonFlag={this.props.zipParams ? this.props.zipParams.BUTTON_FLAG : false} handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} auditFlag={"1"} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} zipTerrIdList={this.props.zipTerrId ? this.props.zipTerrId : [] }/> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                    </tbody>
                </table>
               
                    <ToastContainer />
                  
                    { products.length ? <CustomPagination totalRecords={this.props.ZipTerrAuditListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
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
        zipTerrId:state['DataStewardshipZipTerrReducer']['ZIP_TERR_LIST'] || [],
        loader:state['ZipTerrAuditingReducer']['loader'] || false,
        ZipTerrAuditList:state['ZipTerrAuditingReducer']['ZIP_TERR_AUDIT_RESULT'] || [],
        ZipTerrAuditListTotal:state['ZipTerrAuditingReducer']['ZIP_TERR_AUDIT_TOTAL'] || [],
        ZipTerrAuditFilteredResult:state['ZipTerrAuditingReducer']['filteredZipTerrAuditProducts'] || [],
        zipTerrFilter:state['DataStewardshipZipTerrReducer']['ZIP_TERR_FILTER_RESULT'] || [],
        ZipTerrAuditRevertResult:state['ZipTerrAuditingReducer']['REVERT_ZIP_TERR_RESULT'] || [],
        zipParams:state['DataStewardshipZipTerrReducer']['ZIP_ENABLE_BUTTON_DETAILS_RESULT'] || [],
       

        
      
    };
}

export default connect(mapStateToProps)(ZipTerritoryAuditing);
