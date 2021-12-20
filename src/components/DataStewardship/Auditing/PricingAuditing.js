import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "../RTRX/PricingList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import Notification from "../../Common/Notification";

const group = [  ];
const pageLimit=15;
const pageSort="1";
const sortorder="desc";
class PricingAuditing extends React.Component {
    constructor() {
        super();
 
        this.state = {
          
            pageOfItems: [],
            loader:false,
            submittedData:[],
            checkedItems:[],
            checkedItemsId:[],
            currentPage:1,
            sourceName:[],
            errors:[]
         };
  }


    componentWillMount=() =>{
        document.title = 'Pricing Audit'
    }
    
    componentDidMount=()=>{
       
            this.props.dispatch({
                type:"GET_PRICING_FILTER_RESULT",
            })
         
         
        }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let ProductName = this.dropDownListObject.value;
        let activeFlag = this.dropDownListObjectActiveFlag.value;
        let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        
         this.props.dispatch({
            type: 'PRICING_AUDIT_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [ProductName,activeFlag,reviewdByDs,checkboxFilter],data:this.state.checkedItemsId}
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
            type:"REVERT_PRICING_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,data:this.state.checkedItemsId}
            
        });

      
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
       
        if(this.props.PricingFilterStatus!=""){
            this.props.dispatch({
                type:"GET_PRICING_AUDIT_DATA",
                 payload:{pagestart:1,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort}
            })
          
            this.props.dispatch({
                type:"GET_PRICING_FILTER_STATUS",
            
            });
        
        }
     
        if(this.props.PricingAuditRevertResult!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_PRICING_REVERT_RESULT_STATE",
               
            });
            
        }
    }
   
    onPageChanged = data => {
        let ProductName = this.dropDownListObject.value;
        let activeFlag = this.dropDownListObjectActiveFlag.value;
        let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        this.setState({currentPage:data.currentPage});
        this.props.dispatch({
            type:"GET_PRICING_AUDIT_DATA",
            payload:{pagestart:data.currentPage,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort,value: [ProductName,activeFlag,reviewdByDs,checkboxFilter],data:this.state.checkedItemsId}
        })
      
    }
    revertAllRecords=()=>{

        let ProductName = this.dropDownListObject.value;
        let activeFlag = this.dropDownListObjectActiveFlag.value;
        let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        this.props.dispatch({
            type:"REVERT_PRICING_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [ProductName,activeFlag,reviewdByDs,checkboxFilter],data:this.state.checkedItemsId,revrtAll:true}
            
        });
    }
  
    switchToProduct =(e)=>{
       if(!e.target.checked){
           
            this.props.history.push("pricing");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObject.value=this.props.PricingFilter ? this.props.PricingFilter.product_name : [];
        this.dropDownListObjectActiveFlag.value=this.props.PricingFilter ? this.props.PricingFilter.actv_flg : [];
        //this.dropDownListObjectReviewer.value=this.props.PricingFilter ? this.props.PricingFilter.reviewd_by_ds : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
    }
    render() {
     
        let products= this.props.PricingAuditFilteredResult;
    
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={2}/>
           
        
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Pricing Audit</h2>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" checked onChange={(e)=>this.switchToProduct(e)}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="note-text">{ConstVal.auditRevertMessage}</div>
                    </div>
                   
                   
                </div>
              
            </div>
           

            {this.props.loader &&  <div className="Dataloader" >
                <img className="login-logo" src={ConstVal.deployment+"/assets/img/ajax-loader.gif"} />
             </div>	
            }


            {/***  Tabs ***/}

            {/***<div className="container main margin-l-ipad col-lg-11 col-11 cont-div">***/}
            <div className="main-div">
            <div className="row no-padding product-filter col-lg-12 col-12 p-0">
                        <div className="col-xl-3  col-lg-3 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-ts-id select-wrapper-pricing-product">
                            <span className="drp-lable">Product</span>
                         
                            <MultiSelectComponent value={this.props.PricingFilter ? this.props.PricingFilter.product_name : ""} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="productName" dataSource={this.props.PricingFilter? this.props.PricingFilter.product_name : ""}
                                    fields={this.fields} placeholder="Select Product" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-pricing-flag">
                                <span className="drp-lable">Active Flag</span>
                                <MultiSelectComponent value={this.props.PricingFilter ? this.props.PricingFilter.actv_flg : ""} ref={(scope) => { this.dropDownListObjectActiveFlag = scope; }} className="filter-select"  id="status" dataSource={this.props.PricingFilter ? this.props.PricingFilter.actv_flg : ""}
                                    fields={this.fields} placeholder="Select Market Name" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                       
                 
                        {/****<div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.PricingFilter ? this.props.PricingFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.PricingFilter ? this.props.PricingFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>****/}
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-pricing-reviewer mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>
                    {/***<div className="col-xl-1  col-lg-1 col-md-2 col-sm-6 col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>***/}
                        <div className=" row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                            <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                            <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                        </div>
                   
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped  ref-preffered-table ">
                       
                    <thead className="thead-blue"> 
                        <tr>
                            <th className="text-left">#</th>
                            <th className="text-left">Product Number</th>
                            <th className="text-left">Product Name</th>
                            <th className="text-left">AWP Unit</th>
                            <th className="text-left">WAC Unit</th>
                            <th className="text-left">Active Flag</th>
                            <th className="text-left">Start Date</th>
                            <th className="text-left">End Date</th>
                            <th className="text-left">Status</th>
                            <th className="text-left">Reviewer</th>
                            <th className="text-center " style={{"display":"none"}}>Rec_created_ts</th>
                            <th className="text-center" style={{"display":"none"}}>Rec_updated_ts</th>
                            <th className="text-center" style={{"display":"none"}}>Rec_updated_by</th>
                            <th className="text-center" style={{"display":"none"}}>Mat_run_id</th>
                            <th className="text-center" style={{"display":"none"}}>Approved_flag</th>
                           
                        </tr>
                       
                    </thead>
                    <tbody>
                    { products.length ?
                           <List auditFlag={"1"}  productDrop={this.props.PricingFilter} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                    </tbody>
                </table>
               
                    <ToastContainer />
                  
                    { products.length ? <CustomPagination totalRecords={this.props.ProductListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
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
        loader:state['PricingAuditingReducer']['loader'] ||state['PricingReducer']['loader'] || false,
        PricingAuditList:state['PricingAuditingReducer']['PRICING_AUDIT_RESULT'] || [],
        PricingAuditListTotal:state['PricingAuditingReducer']['PRICING_AUDIT_TOTAL'] || [],
        PricingAuditFilteredResult:state['PricingAuditingReducer']['filteredPricingAuditProducts'] || [],
        PricingFilter:state['PricingReducer']['PRICING_FILTER_RESULT'] || [],
        PricingAuditRevertResult:state['PricingAuditingReducer']['REVERT_PRICING_RESULT'] || [],
        PricingFilterStatus:state['PricingReducer']['PRICING_FILTER_STATUS_RESULT'] || [],
      
      
    };
}

export default connect(mapStateToProps)(PricingAuditing);
