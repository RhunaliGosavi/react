import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "../RTRX/ProductForecastList"
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
class ProductForecastAuditing extends React.Component {
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
        document.title = 'Product Forecast Audit'
    }
    
    componentDidMount=()=>{
        
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_MONTH_YEAR_FILTER",
            })
         
            let SelectedYear=(this.dropDownListObjectYear.value && this.dropDownListObjectYear.value.length > 0 )? this.dropDownListObjectYear.value : (this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter): []);

            this.props.dispatch({
                type:"PRODUC_FORECAST_FILTER_MONTH",
                payload:{SelectedYear:SelectedYear,ProductForeYearMonthFilter:this.props.ProductForeYearMonthFilter}
            })
         
        }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let year = this.dropDownListObjectYear.value;
        let month=this.dropDownListObjectMonth.value;
        let brandName = this.dropDownListObjectBrandName.value;
        let reviewdByDs=""
        let status=this.dropDownListObjectStatus.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        
         this.props.dispatch({
            type: 'PRODUCTFORECAST_AUDIT_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [year,brandName,reviewdByDs,checkboxFilter,status,month],data:this.state.checkedItemsId}
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
            type:"REVERT_PRODUCTFORECAST_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,data:this.state.checkedItemsId}
            
        });

      
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
       
        if(this.props.ProductForecastFilterStatus!=""){
            
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_AUDIT_DATA",
                 payload:{pagestart:1,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort}
            })
          
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_FILTER_STATUS",
            
            });
        
        }
     
        if(this.props.ProductForecastAuditRevertResult!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_PRODUCTFORECAST_REVERT_RESULT_STATE",
               
            });
            
        }
    }
   
    onPageChanged = data => {
        let year = this.dropDownListObjectYear.value;
        let month=this.dropDownListObjectMonth.value;
        let brandName = this.dropDownListObjectBrandName.value;
        let reviewdByDs=""
        let status=this.dropDownListObjectStatus.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        this.setState({currentPage:data.currentPage});
        this.props.dispatch({
            type:"GET_PRODUCTFORECAST_AUDIT_DATA",
            payload:{pagestart:data.currentPage,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort,value: [year,brandName,reviewdByDs,checkboxFilter,status,month],data:this.state.checkedItemsId}
        })
      
    }
    revertAllRecords=()=>{

        let year = this.dropDownListObjectYear.value;
        let month=this.dropDownListObjectMonth.value;
        let brandName = this.dropDownListObjectBrandName.value;
        let reviewdByDs=""
        let status=this.dropDownListObjectStatus.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        this.props.dispatch({
            type:"REVERT_PRODUCTFORECAST_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [year,brandName,reviewdByDs,checkboxFilter,status,month],data:this.state.checkedItemsId,revrtAll:true}
            
        });
    }
  
    switchToProductForecast =(e)=>{
       if(!e.target.checked){
           
            this.props.history.push("product-forecast");
          
        }
    }
    refreshFilter=()=>{

        this.dropDownListObjectYear.value=this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter) : [];
        this.dropDownListObjectBrandName.value=this.props.ProductForecastFilter ? this.props.ProductForecastFilter.brand_name : [];
       // this.dropDownListObjectReviewer.value=this.props.ProductForecastFilter ? this.props.ProductForecastFilter.reviewd_by_ds : [];
        this.dropDownListObjectStatus.value=this.props.ProductForecastFilter ? this.props.ProductForecastFilter.status : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
        this.dropDownListObjectMonth.value=this.props.selectMonth ? this.props.selectMonth : []
    }
    getmonth=()=>{
        let SelectedYear=(this.dropDownListObjectYear.value && this.dropDownListObjectYear.value.length > 0 )? this.dropDownListObjectYear.value : (this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter): []);

        this.props.dispatch({
            type:"PRODUC_FORECAST_FILTER_MONTH",
            payload:{SelectedYear:SelectedYear,ProductForeYearMonthFilter:this.props.ProductForeYearMonthFilter}
        })
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
     
        let products= this.props.ProductForecastAuditFilteredResult;
    
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={2}/>
           
        
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Product Forecast Audit</h2>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" checked onChange={(e)=>this.switchToProductForecast(e)}/>
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

            {/****<div className="container main margin-l-ipad col-lg-11 col-11 cont-div">***/}
            <div className="main-div">
            <div className="row no-padding product-filter col-lg-12 col-12">
                    <div className="col-xl-11 col-lg-11 col-md-10 row p-0">
                        <div className="col-xl-2  col-lg-3 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-ts-id select-wrapper-product-fore-year">
                            <span className="drp-lable">Forecast Year</span>
                            
                            <MultiSelectComponent change={this.getmonth} value={this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter) : ""} ref={(scope) => { this.dropDownListObjectYear = scope; }} className="filter-select"  id="year" dataSource={this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter) : ""}
                                    fields={this.fields} placeholder="Select Forecast Month" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                            <span className="drp-lable">Forecast Month</span>
                            
                            <MultiSelectComponent value={this.props.selectMonth? this.props.selectMonth : []} ref={(scope) => { this.dropDownListObjectMonth = scope; }} className="filter-select"  id="year" dataSource={this.props.selectMonth? this.props.selectMonth : ""}
                                    fields={this.fields} placeholder="Select Forecast Month" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-2 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                            <span className="drp-lable">Brand</span>
                            <MultiSelectComponent value={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.brand_name : ""} ref={(scope) => { this.dropDownListObjectBrandName = scope; }} className="filter-select"  id="status" dataSource={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.brand_name : ""}
                                fields={this.fields} placeholder="Select Brand" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        
                        </div>
                 
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                            <span className="drp-lable-testing">Status</span>

                            <MultiSelectComponent value={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.status : ""}
                                fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        {/***<div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 ml-md-2 ml-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>**/}
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-ts-id-zip mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>
                        <div className=" row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                            <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                            <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                        </div>
                    </div>
                   
                      
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped table-responsive ref-preffered-table">
                       
                    <thead className="thead-blue"> 
                        <tr>
                        <th className="text-center sticky-col check-col">#</th>
                            <th className="text-center sticky-col prod-fore-first-col">Forecast Month</th>
                            <th className="text-center sticky-col prod-fore-second-col">Brand ID</th>
                            <th className="text-center sticky-col prod-fore-third-col">Brand</th>
                            <th className="text-center">Fcst TTL<br></br>Actv Patients</th>
                            <th className="text-center">Fcst Gross<br></br>New Patients</th>
                            <th className="text-center">Fcst Net<br></br>New Patients</th>
                            <th className="text-center">Fcst<br></br>Shipments</th>
                            <th className="text-center ">Fcst %<br></br>Patients Shipped</th>
                            <th className="text-center ">Fcst Units</th>
                            <th className="text-center ">Fcst Mgs</th>
                            <th className="text-center ">Fcst Gross</th>
                            <th className="text-center ">Fcst Net</th>
                            <th className="text-center ">LE TTL<br></br>Actv Patients</th>
                            <th className="text-center ">LE Gross<br></br>New Patients</th>
                            <th className="text-center ">LE Net<br></br>New Patients</th>
                            <th className="text-center ">LE<br></br>Shipments</th>
                            <th className="text-center ">LE %<br></br>Patients Shipped</th>
                            <th className="text-center ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE Units&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th className="text-center ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE Mgs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th className="text-center ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE Gross&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th className="text-center ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE Net&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
                           <List onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} auditFlag={"1"}  productDrop={this.props.PricingFilter} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
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
        loader:state['ProductForecastAuditingReducer']['loader'] ||state['PricingReducer']['loader'] || false,
        ProductForecastAuditList:state['ProductForecastAuditingReducer']['PRODUCTFORECAST_AUDIT_RESULT'] || [],
        ProductForecastAuditListTotal:state['ProductForecastAuditingReducer']['PRODUCTFORECAST_AUDIT_TOTAL'] || [],
        ProductForecastAuditFilteredResult:state['ProductForecastAuditingReducer']['filteredProductForecastAuditProducts'] || [],
        ProductForecastFilter:state['ProductForecastReducer']['PRODUCTFORECAST_FILTER_RESULT'] || [],
        ProductForecastAuditRevertResult:state['ProductForecastAuditingReducer']['REVERT_PRODUCTFORECAST_RESULT'] || [],
        ProductForecastFilterStatus:state['ProductForecastReducer']['PRODUCTFORECAST_FILTER_STATUS_RESULT'] || [],
        ProductForeYearMonthFilter:state['ProductForecastReducer']['PRODUCTFORECAST_MONTH_YEAR_FILTER_RESULT'] || [],
        selectMonth:state['ProductForecastReducer']['PRODUCT_FORECAST_SELECTED_MONTH'] || [],
      
    };
}

export default connect(mapStateToProps)(ProductForecastAuditing);
