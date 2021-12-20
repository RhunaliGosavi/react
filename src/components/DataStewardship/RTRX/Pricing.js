import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "./PricingList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import moment from "moment";
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SampleBase } from '../../Common/sample-base';
import Notification from "../../Common/Notification";
import * as validation from "../../Common/Validations"

const group = [  ];
const pageLimit=15;
const pageSort="1";
class Pricing extends SampleBase {
    constructor(props) {
        super(props);
        this.dateValue = "";
        this.state = {
            exampleItems:  [],
            pageOfItems: [],
            loader:false,
            checkbox: false,
            inputValue: "",
            submittedData:[],
            checkedItems:[],
            checkedItemsId:[],
            
            selectedStartDate:"",
            currentPage:1,
            errors:[],
            showInserModal:"",
            awp_unit:null,
            wac_unit:"",
            start_date:"",
        
           selectedDate:new Date()
        
         };
        

    
    }
    componentWillMount=() =>{
        document.title = 'Pricing'
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
          this.setState({
            awp_unit:"",
            wac_unit:"",
            start_date:"",
          })
          $('.modal.in').modal('hide')
          $('.modal-backdrop').remove()
    
      }


   
        componentDidMount=()=>{
          
        //if(!this.props.PricingFilteredResult.length){
        
            this.props.dispatch({
                type:"GET_PRICING_DATA",
                payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_PRICING_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_INSERT_PRODUCT_DROP",
            })
           
        
           
        //}
        
        
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let ProductName = this.dropDownListObject.value;
        let activeFlag = this.dropDownListObjectActiveFlag.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=""

        
         this.props.dispatch({
            type: 'PRICING_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,pagelimit:pageLimit,value: [ProductName,activeFlag,reviewdByDs,checkboxFilter],data:this.state.checkedItemsId}
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
        if(status=="Submit"){
            status="Pending";
        }
        let obj={"id":parseInt(document.getElementById("id_"+resVariable).innerText),
       
            "mat_run_id":parseInt(document.getElementById("mat_run_id_"+resVariable).innerText),
            "rec_created_ts":document.getElementById("rec_created_ts_"+resVariable).getAttribute('data-reccreatedts'),
            "rec_updated_by":document.getElementById("rec_updated_by_"+resVariable).value,
            "rec_updated_ts":document.getElementById("rec_updated_ts_"+resVariable).innerText,
            "status":status,
            "approved_flag":getApprovedFlag,
            "reviewd_by_ds":localStorage.fullname,
            "awp_unit":document.getElementById("awp_unit_"+resVariable).value,
            "wac_unit":document.getElementById("wac_unit_"+resVariable).value,
            "start_date":startDate ? startDate :  document.getElementById("start_date_"+resVariable).value ,
            "end_date":document.getElementById("end_date_"+resVariable).value,
            "product_numb":document.getElementById("product_numb_"+resVariable).value,
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
    
       
        let ProductName = this.dropDownListObject.value;
        let activeFlag = this.dropDownListObjectActiveFlag.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=""
        let Filtervalue= [ProductName,activeFlag,reviewdByDs,checkboxFilter];
        let checkedIds=this.state.checkedItemsId;
       this.props.dispatch({
            type:"UPDATE_PRICING_RECORDS_REQUEST",
            payload:{data:this.state.submittedData,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
            
       });

    
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
        this.setState({submittedData:[]})
    }

    componentDidUpdate=() =>{
      
       /*  if(this.props.PricingFilterStatus!=""){
            this.props.dispatch({
                type:"GET_PRICING_DATA",
                payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_PRICING_FILTER_STATUS",
            
            });
        
        }*/
   
        if(this.props.PricingUpdateStatus!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_PRICING_RESULT_STATE",
               
            });
           /* this.props.dispatch({
                type:"GET_PRICING_FILTER_RESULT",
            })*/
            
        }

        if(this.props.InsertRes!="" ) {
          
            if(!this.props.InsertResStatusCode){
                
                toast(
                    <Notification msg={this.props.InsertRes} headerText=""></Notification>
                   ,{
                     toastId: "success_notification",
                })
            }else{
             
                toast(
                
                    <Notification msg={this.props.InsertRes} headerText="Warning !"></Notification>
                   ,{
                     toastId: "warning_notification",
                })
               
            }
           // toast("Data Inserted Successfully");
            this.props.dispatch({
                type:"UPDATE_PRICING_INSERT_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_PRICING_FILTER_RESULT",
                })
            
        }
        if(this.props.productDetails ==""){
            
            this.setState({awp_unit:"",wac_unit:"",start_date:""})
        }
        if(this.props.productDetails && this.props.productDetails!="" && this.props.productDetails!="empty"){
            this.setState({awp_unit:this.props.productDetails[0].awp_unit,wac_unit:this.props.productDetails[0].wac_unit,start_date:this.props.productDetails[0].start_date,insert_start_date:""})
            this.props.dispatch({
                type:"UPDATE_PRODUCT_DETAILS_STATE",
            })
            
        }
    }
   
 
    onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
        let ProductName = this.dropDownListObject.value;
        let activeFlag = this.dropDownListObjectActiveFlag.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=""
        this.props.dispatch({
            type:"GET_PRICING_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,value: [ProductName,activeFlag,reviewdByDs,checkboxFilter],data:this.state.checkedItemsId}
        })
      
      }
    
   


    switchToAudit =(e)=>{
        

        if(e.target.checked){
          
            this.props.history.push("pricing-auditing");
            
        }
    }


    hasError(key) {
        
        return this.state.errors.indexOf(key) !== -1;
    }
    InsertPricing=()=>{
     
		var errors = [];
		if (document.getElementById('product_name').value === "") {
			errors.push("product_name");
		}
        if (document.getElementById('awp_unit').value === "") {
			errors.push("awp_unit");
		}
        if (document.getElementById('wac_unit').value === "") {
			errors.push("wac_unit");
		}
        if (document.getElementById('insert_start_date').value === "") {
			errors.push("start_date");
		}
      /*  if (document.getElementById('pricing_status').value === "") {
			errors.push("pricing_status");
		}*/
       		this.setState({
			errors: errors
			});
		
			if (errors.length > 0) {
			return false;
			}
            
            let prodtid_prodname=document.getElementById("product_name").options[document.getElementById("product_name").selectedIndex].text;
            if(prodtid_prodname){
                var getProdname=prodtid_prodname.split('-');
            }
           
            let insetObj = [{
                    "PRODUCT_NUMB":document.getElementById("product_name").value ,
                    "PRODUCT_NAME":getProdname ? getProdname[1] : prodtid_prodname,
                    "AWP_UNIT":document.getElementById("awp_unit").value,
                    "WAC_UNIT":document.getElementById("wac_unit").value,
                    "START_DATE":  moment(document.getElementById('insert_start_date').value).format("YYYY-MM-DD") ,
                    "STATUS":"submit",
                    "REVIEWD_BY_DS":localStorage.fullname,
                    "ACTV_FLG":"NEW"
                   
                }];

                console.log("insert object",insetObj)
           this.setState({ showInserModal:false })
           $('.modal.in').modal('hide')
           $('.modal-backdrop').remove()

           let ProductName = this.dropDownListObject.value;
           let activeFlag = this.dropDownListObjectActiveFlag.value;
           let reviewdByDs=this.dropDownListObjectReviewer.value;
           let checkboxFilter=""
           let Filtervalue= [ProductName,activeFlag,reviewdByDs,checkboxFilter];
           let checkedIds=this.state.checkedItemsId;


           this.props.dispatch({
            type:"INSERT_PRICING",
            payload:{data:insetObj,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
           })          
           
    }
    getProductDetails=(e)=>{
        let val=e.target.value;
        this.props.dispatch({
            type:"GET_PRODUCT_DETAILS",
            payload:val
        })
    }
   
    setValuesForProduct=(e)=>{
        this.setState({[e.target.name]: e.target.value})

    }
    datepickerChange=(e,id)=>{
        this.setState({[id]:moment(e).format('YYYY-MM-DD')})
        let res = id.split("_");
        
        let getApprovedFlag=document.getElementById("status_"+res[res.length-1]).value =="Approved" ? "TRUE" : "FALSE";
        let resVariable=res[res.length-1];
        let status=document.getElementById("status_"+res[res.length-1]).value;
        let obj=this.getObj(resVariable,getApprovedFlag,status,moment(e).format('YYYY-MM-DD'));
       
        const index = this.state.submittedData.findIndex((e) => e.id === obj.id);
        if (index === -1) {
            this.state.submittedData.push(obj);
        } else {
            this.state.submittedData[index] = obj;
        }

       
    }
    refreshFilter=()=>{
           this.dropDownListObject.value=this.props.PricingFilter ? this.props.PricingFilter.product_name : [];
           this.dropDownListObjectActiveFlag.value=this.props.PricingFilter ? this.props.PricingFilter.actv_flg : [];
           this.dropDownListObjectReviewer.value=this.props.PricingFilter ? this.props.PricingFilter.reviewd_by_ds : [];
           
    }
    insertHandleDateChange=(e)=>{
      console.log(moment(e).format('YYYY-MM-DD'),e);
        this.setState({"insert_start_date":moment(e).format('YYYY-MM-DD')});
    }
    render() {
     
        let products= this.props.PricingFilteredResult;
  


        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={0}/>
           
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Pricing</h2>
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
                 
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-pricing-reviewer">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.PricingFilter ? this.props.PricingFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.PricingFilter ? this.props.PricingFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>
                       {/***  <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>***/}
                   {/**** <div className="col-xl-1  col-lg-1 col-md-2 col-sm-6 col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>****/}
                        <div className=" row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                            <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                            <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                        </div>
                   
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped ref-preffered-table pricing-tbl ">
                       
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
                           <List   datepickerChange={this.datepickerChange} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                    </tbody>
                </table>
               
                    <ToastContainer />
                  
                    { products.length ? <CustomPagination totalRecords={this.props.PricingListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                </div>
                
                { products.length ? (!this.props.loader ? 
                   <div className="btn-align row">
                        <div>
                            <button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Update</button>
                        </div>
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleInsertModalShowClick} >Insert</button>
                        </div>
                      
                        
                     
                 </div> 
               : "") : ""}
             {this.state.showInserModal ? (
            <Modal handleModalCloseClick={this.handleModalCloseClick} handleInsertClick={this.InsertPricing} modelId={"showInserModal"} text={"Insert"} classname={" model-list-insert-pricing"}>
           
                <form className="needs-validation">
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="inputEmail4">PRODUCT NUMBER - PRODUCT NAME</label>
                   
                        <select id="product_name" className={ this.hasError("product_name") ? "form-control input-font is-invalid" : "form-control input-font" } onChange={(e)=>{this.getProductDetails(e)}}>
                            <option value="">--Select--</option>
                            {this.props.InsertProductDropFilter && Object.keys(this.props.InsertProductDropFilter).map((key, index) =>{
                                return <option value={key} >{key + " - " + this.props.InsertProductDropFilter[key]}</option>
                            })}
                           
                        </select>
                       
                     {this.props.product_loader ? <span class="spinner-border spinner-border-sm " id="productLoader" role="status" aria-hidden="true"></span> : ""}
                    <div class="invalid-feedback  text-left">Product name is required</div>
                    </div>
                    
                </div>
               
            
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">AWP UNIT</label>
                        <input onChange={this.setValuesForProduct }  type="text"  defaultValue={this.state.awp_unit} className={ this.hasError("awp_unit") ? "form-control input-font is-invalid" : "form-control input-font" } id="awp_unit" placeholder="AWP Unit" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">AWP Unit is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">WAC UNIT</label>
                          <input onChange={this.setValuesForProduct } className={ this.hasError("wac_unit") ? "form-control input-font is-invalid" : "form-control input-font" } type="text" name="wac_unit" id={"wac_unit"} placeholder="WAC Unit"  defaultValue={this.state.wac_unit}  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                          <div class="invalid-feedback  text-left">WAC unit is required</div>
                    </div>
                    
                </div>
                <div className="form-row">
                 <div className="form-group col-md-6 start-date-picker">
                 <label for="inputEmail4">START DATE</label>
                    <div className='control-pane'>
                        <div className='control-section'>
                            <div className='datepicker-control-section'>
                                {/***<DatePickerComponent  allowEdit={false} cssClass={"calendarHeight"} ref={(element) => {this.calendarInstance = element }} value={ this.dateValue ? this.dateValue : (this.state.start_date ? moment(this.state.start_date).toDate() :  moment().toDate()) }   format='yyyy-MM-dd'  placeholder="Start Date"></DatePickerComponent>***/}
                                <MuiPickersUtilsProvider utils={DateFnsUtils} disableEnforceFocus>
                                   
                                        <KeyboardDatePicker
                                            autoOk
                                           
                                            variant="inline"
                                            onChange={(e)=>this.insertHandleDateChange(e)}
                                            value={ this.state.insert_start_date ? this.state.insert_start_date :(this.state.start_date ? moment(this.state.start_date).toDate() :  moment().toDate()) }
                                            views={["date","year", "month"]}
                                            format="yyyy-MM-dd"
                                            id="insert_start_date"
                                            name="insert_start_date"
                                            placeholder="Start Date"
                                            InputProps={{ readOnly: true,disableUnderline: true }}
                                           
                                        />
                                   
                                </MuiPickersUtilsProvider>

                            </div>
                        </div>
                    </div>
                 </div>
                </div>
            </form>
            </Modal>
        ) : null}


            </div> 
         
           </>
        );
    }
}



function mapStateToProps(state) {
    
  
    return {
        loader:state['PricingReducer']['loader'] || false,
        PricingList:state['PricingReducer']['PRICING_RESULT'] || [],
        PricingListTotal:state['PricingReducer']['PRICING_TOTAL'] || [],
        PricingFilteredResult:state['PricingReducer']['filteredPricing'] || [],
        PricingUpdateStatus:state['PricingReducer']['UPDATE_PRICING_RECORD_RESULT'] || [],
        PricingDropdown:state['PricingReducer']['filteredProductDrop'] || [],
        PricingImportStatus:state['PricingReducer']['IMPORT_PRICING_RESULT'] || [],
        PricingFilter:state['PricingReducer']['PRICING_FILTER_RESULT'] || [],
        PricingFilterStatus:state['PricingReducer']['PRICING_FILTER_STATUS_RESULT'] || [],
        InsertRes:state['PricingReducer']['INSERT_PRICING_RESULT'] || [],
        InsertResStatusCode:state['PricingReducer']['INSERT_PRICING_RESULT_STATUSCODE'] || 0,
        productDetails:state['PricingReducer']['GET_PRODUCT_RESULT'] || [],
        product_loader:state['PricingReducer']['product_loader'] || false,
        InsertProductDropFilter:state['PricingReducer']['INSERT_PRODUCT_DROP'] || [],
        awc_unit:state['PricingReducer']['GET_PRODUCT_RESULT'] ? state['PricingReducer']['GET_PRODUCT_RESULT'].awp_unit : ""
        
      
        
     };
}

export default connect(mapStateToProps)(Pricing);
