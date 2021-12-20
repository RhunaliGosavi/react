import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "./ProductList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import Notification from "../../Common/Notification";
import * as validation from "../../Common/Validations"
const group = [  ];
const pageLimit=15;
const pageSort="1";
class Product extends React.Component {
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
            checkedItemsId:[],
            showInserModal:"",
            currentPage:1,
            errors:[],
            //selectProduct:[],
        
         };

    
    }
    componentWillMount=() =>{
        document.title = 'Product'
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
           
        //if(!this.props.ProductFilteredResult.length){
            this.props.dispatch({
                type:"GET_PRODUCT_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_PRODUCT_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_PRODUCT_BRAND_PRODUCT_FILTER",
            })
            if(!this.props.ProductInsertPopupFilter.length){
                this.props.dispatch({
                    type:"GET_INSERT_PRODUCT_FILTER_DROP",
                })
            }

            let SelectedBrand=(this.dropDownListObjectBrandName.value && this.dropDownListObjectBrandName.value.length > 0 ) ? this.dropDownListObjectBrandName.value :(this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter) : []);
            
            this.props.dispatch({
                type:"GET_MAPPING_PRODUCT_FILTERS",
                payload:{SelectedBrand:SelectedBrand,ProductBrandProductFilter:this.props.ProductBrandProductFilter}
            })
              
        //}
        
        
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let ProductName = this.dropDownListObject.value;
        let BrandName = this.dropDownListObjectBrandName.value;
        let MarketName = this.dropDownListObjectMarket.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value;
        let status=this.dropDownListObjectStatus.value;

        
         this.props.dispatch({
            type: 'PRODUCT_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,pagelimit:pageLimit,value: [ProductName,BrandName,MarketName,reviewdByDs,checkboxFilter,status],data:this.state.checkedItemsId}
        })
        
    }
    
    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
       /* if(e.target.name){
        let checkStatusChange=e.target.name;
        
        let res = checkStatusChange.split("_");
       
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
    }*/

        let res = e.target.id.split("_");
        
 // let getApprovedFlag=document.getElementById("status_"+res[res.length-1]).value =="Approved" ? "TRUE" : "FALSE";
        let getApprovedFlag="TRUE" ;
        let resVariable=res[res.length-1];
        //let status=document.getElementById("status_"+res[res.length-1]).value;
        let status="Approved";
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
        "comments":document.getElementById("comments_"+resVariable).value,
        "mat_run_id":parseInt(document.getElementById("mat_run_id_"+resVariable).innerText),
        "rec_created_ts":document.getElementById("rec_created_ts_"+resVariable).getAttribute('data-reccreatedts'),
        "rec_updated_by":document.getElementById("rec_updated_by_"+resVariable).value,
        "rec_updated_ts":document.getElementById("rec_updated_ts_"+resVariable).innerText,
        "status":status,
        "approved_flag":getApprovedFlag,
        "reviewd_by_ds":localStorage.fullname,
        "product_name":document.getElementById("product_name_"+resVariable).value,
        "brand_name":document.getElementById("brand_name_"+resVariable).value,
        "units_per_bottle":document.getElementById("units_per_bottle_"+resVariable).value,
        //"rtrx_id":document.getElementById("rtrx_id_"+resVariable).value,
        "market_id":document.getElementById("market_id_"+resVariable).value,
        "data_source":document.getElementById("data_source_"+resVariable).value,
        "market_name":document.getElementById("market_name_"+resVariable).value,
        "brand_id":document.getElementById("brand_id_"+resVariable).value,
        "mg_conversion":document.getElementById("mg_conversion_"+resVariable).value,
        "rtrx_productid":document.getElementById("rtrx_productid_"+resVariable).value,
        "formulation":document.getElementById("formulation_"+resVariable).value,
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
        let BrandName = this.dropDownListObjectBrandName.value;
        let MarketName = this.dropDownListObjectMarket.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let status=this.dropDownListObjectStatus.value;
        let Filtervalue= [ProductName,BrandName,MarketName,reviewdByDs,checkboxFilter,status];
        let checkedIds=this.state.checkedItemsId;
       this.props.dispatch({
            type:"UPDATE_PRODUCT_RECORDS_REQUEST",
            payload:{data:this.state.submittedData,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
            
       });

    
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
        
        if(this.props.ProductUpdateStatus!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_PRODUCT_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_PRODUCT_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_PRODUCT_BRAND_PRODUCT_FILTER",
            })
            
        }
     
        if(this.props.InsertRes!="" ) {
          
            toast(
                <Notification msg="Data Inserted Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_PRODUCT_INSERT_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_PRODUCT_FILTER_RESULT",
                })
            this.props.dispatch({
                type:"GET_PRODUCT_BRAND_PRODUCT_FILTER",
            })
            
        }
        
        
    }
   
 
    onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
        let ProductName = this.dropDownListObject.value;
        let BrandName = this.dropDownListObjectBrandName.value;
        let MarketName = this.dropDownListObjectMarket.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let status=this.dropDownListObjectStatus.value;
       
        this.props.dispatch({
            type:"GET_PRODUCT_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,value: [ProductName,BrandName,MarketName,reviewdByDs,checkboxFilter,status],data:this.state.checkedItemsId}
        })
      
      }
      switchToAudit =(e)=>{
        

        if(e.target.checked){
            
            this.props.history.push("testing-auditing");
          
        }
    }
    InsertProduct=()=>{
        
        var errors = [];
        if(document.getElementById('brand-Name').value==""){
            errors.push("brand-Name");
        }
       
        if(document.getElementById('brand-Name').value=="New"){
            if (document.getElementById('brand_name').value === "") {
                errors.push("brand_name");
            }

            if (document.getElementById('brand_id').value === "") {
                errors.push("brand_id");
            }
        }
        if(document.getElementById('market-Name').value==""){
            errors.push("market-Name");
        }
	
        if(document.getElementById('market-Name').value=="New"){
            if (document.getElementById('market_id').value === "") {
                errors.push("market_id");
            }
            if (document.getElementById('market_name').value === "") {
                errors.push("market_name");
            }
        }

        
		if (document.getElementById('product_name').value === "") {
			errors.push("product_name");
		}
       
        if (document.getElementById('units_per_bottle').value === "") {
			errors.push("units_per_bottle");
		}
        if (document.getElementById('comments').value === "") {
			errors.push("comments");
		}
       /* if (document.getElementById('rtrx_id').value === "") {
			errors.push("rtrx_id");
		}
     
        if (document.getElementById('data_source').value === "") {
			errors.push("data_source");
		}*/
       
       
        if (document.getElementById('mg_conversion').value === "") {
			errors.push("mg_conversion");
		}
        if (document.getElementById('rtrx_productid').value === "") {
			errors.push("rtrx_productid");
		}
        if (document.getElementById('formulation').value === "") {
			errors.push("formulation");
		}
        if (document.getElementById('product_numb').value === "") {
			errors.push("product_numb");
		}
			
		
			this.setState({
			errors: errors
			});
		
			if (errors.length > 0) {
			return false;
			}
        var brandName=document.getElementById("brand_name").value;
        var brandId=document.getElementById("brand_id").value;
        if(document.getElementById('brand-Name').value!="New"){
            var brandId=document.getElementById("brand-Name").value ;
            var brandName=document.getElementById("brand-Name").options[document.getElementById("brand-Name").selectedIndex].text ;
        }


        var marketName=document.getElementById("market_name").value;
        var marketId=document.getElementById("market_id").value;
        if(document.getElementById('market-Name').value!="New"){
            var marketId=document.getElementById("market-Name").value ;
            var marketName=document.getElementById("market-Name").options[document.getElementById("market-Name").selectedIndex].text ;
        }
        

        let currentdate = new Date();
        let insetObj = [{
           
                    "PRODUCT_NAME":document.getElementById("product_name").value ,
                    "BRAND_NAME":brandName,
                    "UNITS_PER_BOTTLE":document.getElementById("units_per_bottle").value,
                    "COMMENTS":document.getElementById("comments").value,
                   // "RTRX_ID":document.getElementById("rtrx_id").value,
                    "MARKET_ID":marketId,
                    "DATA_SOURCE":document.getElementById("data_source").value,
                    "MARKET_NAME":marketName,
                    "BRAND_ID":brandId,
                    "MG_CONVERSION":document.getElementById("mg_conversion").value,
                    "RTRX_PRODUCTID":document.getElementById("rtrx_productid").value,
                    "FORMULATION":document.getElementById("formulation").value,
                    "PRODUCT_NUMB":document.getElementById("product_numb").value,
                    "REC_CREATED_TS":currentdate.toISOString(),
                    "REC_UPDATED_TS":currentdate.toISOString(),
                    "REC_UPDATED_BY":"INTERFACE",
                    "STATUS":"APPROVED",
                    "APPROVED_FLAG":"TRUE",
                    "REVIEWD_BY_DS":localStorage.fullname,
                    "COMMENTS":document.getElementById("comments").value,

             
           }];

           
           this.setState({ showInserModal:false })
           $('.modal.in').modal('hide')
           $('.modal-backdrop').remove()


           let ProductName = this.dropDownListObject.value;
           let BrandName = this.dropDownListObjectBrandName.value;
           let MarketName = this.dropDownListObjectMarket.value;
           let reviewdByDs=this.dropDownListObjectReviewer.value;
           let checkboxFilter=this.dropDownListObjectCheckbox.value
           let status=this.dropDownListObjectStatus.value;
           let Filtervalue= [ProductName,BrandName,MarketName,reviewdByDs,checkboxFilter,status];
           let checkedIds=this.state.checkedItemsId;
        
           this.props.dispatch({
            type:"INSERT_PRODUCT",
            payload:{data:insetObj,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
           })
          
           
    }
    hasError(key) {
   
            return this.state.errors.indexOf(key) !== -1;
        }

    switchToAudit =(e)=>{
      

        if(e.target.checked){
           
            this.props.history.push("product-auditing");
            
        }
    }

    getBrandDetails=(e)=>{
           let Brandvalue =e.target.value;
           
           document.getElementById('brand_name_div').style.display="none";
           document.getElementById('brand_id_div').style.display="none";
           if( Brandvalue=="New"){
              
            document.getElementById('brand_name_div').style.display="block";
            document.getElementById('brand_id_div').style.display="block";
           }
    }
    getMarketDetails=(e)=>{
        let Brandvalue =e.target.value;
        
        document.getElementById('market_name_div').style.display="none";
        document.getElementById('market_id_div').style.display="none";
        if( Brandvalue=="New"){
           
         document.getElementById('market_name_div').style.display="block";
         document.getElementById('market_id_div').style.display="block";
        }
 }

    refreshFilter=()=>{
        this.dropDownListObjectBrandName.value=this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter ): [];
        this.dropDownListObjectMarket.value=this.props.ProductFilter ? this.props.ProductFilter.market_name : [];
        this.dropDownListObjectReviewer.value=this.props.ProductFilter ? this.props.ProductFilter.reviewd_by_ds : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
        this.dropDownListObjectStatus.value=this.props.ProductFilter ? this.props.ProductFilter.status : [];
    }
    showCommentPopup=(e)=>{
        
        e.preventDefault();
        let res = e.target.id.split("_");
        this.setState({
            ["comments_popup"+res[1]]: true
        })
          
    }

    getproduct=()=>{
        
        let SelectedBrand=(this.dropDownListObjectBrandName.value && this.dropDownListObjectBrandName.value.length > 0 ) ? this.dropDownListObjectBrandName.value :(this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter) : []);
        this.props.dispatch({
            type:"GET_MAPPING_PRODUCT_FILTERS",
            payload:{SelectedBrand:SelectedBrand,ProductBrandProductFilter:this.props.ProductBrandProductFilter}
        })


            /*let ProductArr=[];

            for(let i=0; i<=SelectedBrand.length;i++ ){
            
                if(this.props.ProductBrandProductFilter[SelectedBrand[i]]){
                    ProductArr=  [...ProductArr,...this.props.ProductBrandProductFilter[SelectedBrand[i]]];
                }
            }
            let uniqueProduct = ProductArr.filter((c, index) => {
                return ProductArr.indexOf(c) === index;
            });
       
            this.setState({selectProduct:uniqueProduct})*/
        }
    render() {
     
        let products= this.props.ProductFilteredResult;
    
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={0}/>
           
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Product</h2>
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

            {/****<div className="container main margin-l-ipad col-lg-11 col-11 cont-div">***/}
            <div className="main-div">
                
                <div className="row no-padding product-filter col-lg-12 col-12 pl-2">
                        <div className="pl-0 col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Brand</span>
                                <MultiSelectComponent change={this.getproduct} value={this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter) : ""} ref={(scope) => { this.dropDownListObjectBrandName = scope; }} className="filter-select"  id="brandName" dataSource={this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter) : ""}
                                    fields={this.fields} placeholder="Select Brand" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                        <div className="pl-0 col-xl-3  col-lg-3 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-ts-id select-wrapper-product">
                            <span className="drp-lable">Product</span>
                         
                            <MultiSelectComponent  value={this.props.selectedProduct ? this.props.selectedProduct : []} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="productName" dataSource={this.props.selectedProduct ? this.props.selectedProduct : ""}
                                    fields={this.fields} placeholder="Select Product" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Market</span>
                                <MultiSelectComponent value={this.props.ProductFilter ? this.props.ProductFilter.market_name : ""} ref={(scope) => { this.dropDownListObjectMarket = scope; }} className="filter-select"  id="status" dataSource={this.props.ProductFilter ? this.props.ProductFilter.market_name : ""}
                                    fields={this.fields} placeholder="Select Market" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                 
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.ProductFilter ? this.props.ProductFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.ProductFilter ? this.props.ProductFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                        <span className="drp-lable">Status</span>
                                <MultiSelectComponent value={this.props.ProductFilter ? this.props.ProductFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.ProductFilter ? this.props.ProductFilter.status : ""}
                                    fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>
                        <div style={{"display":"none"}} className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-ts-id-zip mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>
                    {/****<div className="col-xl-1  col-lg-1 col-md-2 col-sm-6 col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>****/}
                    <div className="p-0 row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                        <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                        <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                    </div>
                   
                </div>
            
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped  ref-preffered-table  product-tbl">
                       
                    <thead className="thead-blue"> 
                        <tr>
                            {/***<th className="text-center ">#</th>***/}
                            {/***<th className="text-center">Rtrx Id</th>**/}
                            <th className="text-center">Brand ID</th>
                            <th className="text-center">Brand Name</th>
                            <th className="text-center">RTRX Product ID</th>
                            <th className="text-center ">Product Name</th>
                            <th className="text-center ">Product Number</th>
                            <th className="text-center">Market Name</th>
                            <th className="text-center">Market ID</th>
                            <th className="text-center">Units Per Bottle</th>
                            <th className="text-center">Mg Conversion</th>
                            <th className="text-center ">Formulation</th>
                            <th className="text-center">Data Source</th>
                            <th className="text-center">Comments</th>
                            {/***<th className="text-center ">Status</th>***/}
                            <th className="text-center">Submitted By</th>
                            <th className="text-center " style={{"display":"none"}}>Rec_created_ts</th>
                            <th className="text-center" style={{"display":"none"}}>Rec_updated_ts</th>
                            <th className="text-center" style={{"display":"none"}}>Rec_updated_by</th>
                            <th className="text-center" style={{"display":"none"}}>Mat_run_id</th>
                            <th className="text-center" style={{"display":"none"}}>Approved_flag</th>
                           
                        </tr>
                       
                    </thead>
                    <tbody>
                        { products.length ?
                           <List handleModalCloseClick={this.handleModalCloseClick}  Modal={Modal}  onClickShowPopup={e => { this.showCommentPopup(e)}} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                    </tbody>
                </table>
               
                    <ToastContainer />
                  
                    { products.length ? <CustomPagination totalRecords={this.props.ProductListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                </div>
                
                { products.length ? (!this.props.loader ? 
                   <div className="btn-align row">
                        {/***<div>
                            <button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Update</button>
                        </div>****/}
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleInsertModalShowClick} >Add</button>
                        </div>
                        
                     
                 </div> 
               : "") : ""}
             {this.state.showInserModal ? (
            <Modal handleModalCloseClick={this.handleModalCloseClick} handleInsertClick={this.InsertProduct} modelId={"showInserModal"} text={"Add Product"} classname={"model-list-insert-product"}>
            
                <form className="needs-validation">
                <div className="product-title">Product Details</div>
                <div className="form-row">
                    
                    <div className="form-group col-md-6">
                         <label for="fileName">RTRX PRODUCT ID</label>
                        <input type="text" className={ this.hasError("rtrx_productid") ? "form-control input-font is-invalid" : "form-control input-font" } id="rtrx_productid" placeholder="RTRX Product ID" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}} />
                        <div class="invalid-feedback  text-left"> RTRX product ID is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="fileName">PRODUCT NUMBER</label>
                        <input type="text" className={ this.hasError("product_numb") ? "form-control input-font is-invalid" : "form-control input-font" } id="product_numb" placeholder="Product Number" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}  />
                        <div class="invalid-feedback  text-left"> Product number is required</div>
                   </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="fileName">PRODUCT NAME</label>
                        <input type="text" className={ this.hasError("product_name") ? "form-control input-font is-invalid" : "form-control input-font" } id="product_name" placeholder="Product Name" />
                        <div class="invalid-feedback  text-left">Product name is required</div>
                    </div>
                   
                </div>
                <div className="product-title">Brand Details</div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="fileName"> &nbsp;&nbsp;</label>
                        <select id="brand-Name" className={ this.hasError("brand-Name") ? "form-control input-font is-invalid" : "form-control input-font" } onChange={(e)=>{this.getBrandDetails(e)}}>
                            <option value="">--Select--</option>
                            {this.props.ProductInsertPopupFilter && Object.keys(this.props.ProductInsertPopupFilter['brand_id-brand_name']).map((key, index) =>{
                                return <option value={key} >{this.props.ProductInsertPopupFilter['brand_id-brand_name'][key]}</option>
                            })}
                            <option value="New">New</option>
                           
                        </select>
                        <div class="invalid-feedback  text-left">Brand name is required</div>
                    </div>
                    <div className="form-group col-md-6" id="brand_id_div" style={{"display":"none"}}>
                         <label for="fileName">BRAND ID</label>
                        <input type="text" className={ this.hasError("brand_id") ? "form-control input-font is-invalid" : "form-control input-font" } id="brand_id" placeholder="Brand ID" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Brand ID is required</div>
                    </div>   
                  <div className="form-group col-md-6" id="brand_name_div" style={{"display":"none"}}>
                        <label for="fileName">BRAND NAME</label>
                       <input type="text" className={ this.hasError("brand_name") ? "form-control input-font is-invalid" : "form-control input-font" } id="brand_name" placeholder="Brand Name" />
                       <div class="invalid-feedback  text-left">Brand name is required</div>
                   </div>
                   
                </div>
                <div className="product-title">Market Details</div>
                   
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="fileName"> &nbsp;&nbsp;</label>
                        <select id="market-Name" className={ this.hasError("market-Name") ? "form-control input-font is-invalid" : "form-control input-font" } onChange={(e)=>{this.getMarketDetails(e)}}>
                            <option value="">--Select--</option>
                            {this.props.ProductInsertPopupFilter && Object.keys(this.props.ProductInsertPopupFilter['market_id-market_name']).map((key, index) =>{
                                return <option value={key} >{this.props.ProductInsertPopupFilter['market_id-market_name'][key]}</option>
                            })}
                            <option value="New">New</option>
                           
                        </select>
                        <div class="invalid-feedback  text-left">Market name is required</div>
                    </div>
                    <div className="form-group col-md-6" style={{"display":"none"}} id="market_id_div">
                        <label for="fileName">MARKET ID</label>
                       <input type="text" className={ this.hasError("market_id") ? "form-control input-font is-invalid" : "form-control input-font" } id="market_id" placeholder="Market ID" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Market ID is required</div>
                    </div>
                    <div className="form-group col-md-6" id="market_name_div" style={{"display":"none"}}>
                        <label for="fileName">MARKET NAME</label>
                        <input type="text" className={ this.hasError("market_name") ? "form-control input-font is-invalid" : "form-control input-font" } id="market_name" placeholder="Market Name" />
                        <div class="invalid-feedback  text-left">Market name is required</div>
                    </div>
                    
                   
                </div>
                <div className="product-title">Other Details</div>
                <div className="form-row">
                   <div className="form-group col-md-6">
                        <label for="fileName">UNITS PER BOTTLE</label> 
                        <input type="text" className={ this.hasError("units_per_bottle") ? "form-control input-font is-invalid" : "form-control input-font" } id="units_per_bottle" placeholder="Units Per Bottle" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Units Per Bottle is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="fileName">MG CONVERSION</label>
                        <input type="text" className={ this.hasError("mg_conversion") ? "form-control input-font is-invalid" : "form-control input-font" } id="mg_conversion" placeholder="Mg Conversion" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}} />
                        <div class="invalid-feedback  text-left">Mg conversion is required</div>
                    </div>
                </div>
                <div className="form-row">
                    
                    <div className="form-group col-md-6">
                        <label for="fileName">FORMULATION</label>
                        <input type="text" className={ this.hasError("formulation") ? "form-control input-font is-invalid" : "form-control input-font" } id="formulation" placeholder="Formulation" />
                        <div class="invalid-feedback  text-left">Formulation is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="fileName">DATA SOURCE</label>
                        <input type="Text" className={ this.hasError("data_source") ? "form-control input-font is-invalid" : "form-control input-font" } id="data_source" placeholder="Data Source"/>
                        {/***<div class="invalid-feedback  text-left"> Data source is required</div>***/}
                    </div>
                </div>
                <div className="form-row">
                    
                    {/***<div className="form-group col-md-6">
                        <label for="fileName">RTRX ID</label>
                        <input type="text" className={ this.hasError("rtrx_id") ? "form-control input-font is-invalid" : "form-control input-font" } id="rtrx_id" placeholder="RTRX ID"/>
                       
                    </div>***/}
                    <div className="form-group col-md-12">
                        <label for="inputPassword4">COMMENT</label>
                        <textarea type="text" className={ this.hasError("comments") ? "form-control input-font is-invalid" : "form-control input-font" } id="comments" placeholder="Comment"/>
                        <div class="invalid-feedback  text-left">Comment is required</div>
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
        loader:state['ProductReducer']['loader'] || false,
        ProductList:state['ProductReducer']['PRODUCT_RESULT'] || [],
        ProductListTotal:state['ProductReducer']['PRODUCT_TOTAL'] || [],
        ProductFilteredResult:state['ProductReducer']['filteredProduct'] || [],
        ProductUpdateStatus:state['ProductReducer']['UPDATE_PRODUCT_RECORD_RESULT'] || [],
        exportResult:state['ProductReducer']['PRODUCT_EXPORT_RESULT'] || [],
        ProductImportStatus:state['ProductReducer']['IMPORT_PRODUCT_RESULT'] || [],
        ProductFilter:state['ProductReducer']['PRODUCT_FILTER_RESULT'] || [],
        InsertRes:state['ProductReducer']['INSERT_PRODUCT_RESULT'] || [],
        ProductInsertPopupFilter:state['ProductReducer']['INSERT_PRODUCT_FILTER_DROP'] || [],
        ProductBrandProductFilter:state['ProductReducer']['PRODUCT_BRAND_PRODUCT_FILTER_RESULT'] || [],
        selectedProduct:state['ProductReducer']['PRODUCT_SELECTED_UNIQUE_PRODUCT'] || [],
     };
}

export default connect(mapStateToProps)(Product);
