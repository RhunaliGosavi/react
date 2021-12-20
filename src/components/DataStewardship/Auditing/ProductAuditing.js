import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "../RTRX/ProductList"
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
class ProductAuditing extends React.Component {
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
        document.title = 'Product Audit'
    }
    
    componentDidMount=()=>{
            this.props.dispatch({
                type:"GET_PRODUCT_AUDIT_DATA",
                 payload:{pagestart:1,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_PRODUCT_FILTER_RESULT",
            })
            
          /*  this.props.dispatch({
                type:"GET_INSERT_PRODUCT_FILTER_DROP",
            })*/
            this.props.dispatch({
                type:"GET_PRODUCT_BRAND_PRODUCT_FILTER",
            })
            let SelectedBrand=(this.dropDownListObjectBrandName.value && this.dropDownListObjectBrandName.value.length > 0 ) ? this.dropDownListObjectBrandName.value :(this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter) : []);
            
            this.props.dispatch({
                type:"GET_MAPPING_PRODUCT_FILTERS",
                payload:{SelectedBrand:SelectedBrand,ProductBrandProductFilter:this.props.ProductBrandProductFilter}
            })
         
        }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let ProductName = this.dropDownListObject.value;
        let BrandName = this.dropDownListObjectBrandName.value;
        let MarketName = this.dropDownListObjectMarket.value;
        let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let status=this.dropDownListObjectStatus.value;
        
         this.props.dispatch({
            type: 'PRODUCT_AUDIT_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [ProductName,BrandName,MarketName,"",checkboxFilter,status],data:this.state.checkedItemsId}
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
            const indexId = arrayDataId.indexOf(res[1]);
            if (indexId > -1) {
               arrayDataId.splice(indexId, 1);
            }
           
            if (index > -1) {
                arrayDaya.splice(index, 1);
                
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
            type:"REVERT_PRODUCT_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,data:this.state.checkedItemsId}
            
        });

      
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
        
     
        if(this.props.ProductAuditRevertResult!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_PRODUCT_REVERT_RESULT_STATE",
               
            });
            
        }
    }
   
    onPageChanged = data => {
        let ProductName = this.dropDownListObject.value;
        let BrandName = this.dropDownListObjectBrandName.value;
        let MarketName = this.dropDownListObjectMarket.value;
        let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let status=this.dropDownListObjectStatus.value;
        this.setState({currentPage:data.currentPage});
        this.props.dispatch({
            type:"GET_PRODUCT_AUDIT_DATA",
            payload:{pagestart:data.currentPage,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort,value: [ProductName,BrandName,MarketName,reviewdByDs,checkboxFilter,status],data:this.state.checkedItemsId}
        })
      
    }
    revertAllRecords=()=>{

        let ProductName = this.dropDownListObject.value;
        let BrandName = this.dropDownListObjectBrandName.value;
        let MarketName = this.dropDownListObjectMarket.value;
        let reviewdByDs="";
        let checkboxFilter=this.dropDownListObjectCheckbox.value;
        let status =this.dropDownListObjectStatus.value;
        this.props.dispatch({
            type:"REVERT_PRODUCT_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [ProductName,BrandName,MarketName,reviewdByDs,checkboxFilter,status],data:this.state.checkedItemsId,revrtAll:true}
            
        });
    }
  
    switchToProduct =(e)=>{
       if(!e.target.checked){
           
            this.props.history.push("product");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObjectBrandName.value=this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter ): [];
        this.dropDownListObjectMarket.value=this.props.ProductFilter ? this.props.ProductFilter.market_name : [];
        //this.dropDownListObjectReviewer.value=this.props.ProductFilter ? this.props.ProductFilter.reviewd_by_ds : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
        this.dropDownListObjectStatus.value=this.props.ProductFilter ? this.props.ProductFilter.status : [];
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
    getproduct=()=>{
        
        let SelectedBrand=(this.dropDownListObjectBrandName.value && this.dropDownListObjectBrandName.value.length > 0 ) ? this.dropDownListObjectBrandName.value :(this.props.ProductBrandProductFilter ? Object.keys(this.props.ProductBrandProductFilter) : []);
        this.props.dispatch({
            type:"GET_MAPPING_PRODUCT_FILTERS",
            payload:{SelectedBrand:SelectedBrand,ProductBrandProductFilter:this.props.ProductBrandProductFilter}
        })
    }
    render() {
     
        let products= this.props.ProductAuditFilteredResult;
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={2}/>
           
        
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Product Audit</h2>
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
           

            {this.props.loader && <div className="Dataloader" >
                <img className="login-logo" src={ConstVal.deployment+"/assets/img/ajax-loader.gif"} />
             </div>	
            }


            {/***  Tabs ***/}

            {/***<div className="container main margin-l-ipad col-lg-11 col-11 cont-div">***/}
            <div className="main-div">
            <div className="row no-padding product-filter col-lg-12 col-12">
                        
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
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-product-audit">
                                <span className="drp-lable">Market</span>
                                <MultiSelectComponent value={this.props.ProductFilter ? this.props.ProductFilter.market_name : ""} ref={(scope) => { this.dropDownListObjectMarket = scope; }} className="filter-select"  id="status" dataSource={this.props.ProductFilter ? this.props.ProductFilter.market_name : ""}
                                    fields={this.fields} placeholder="Select Market" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                 
                        {/****<div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.ProductFilter ? this.props.ProductFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.ProductFilter ? this.props.ProductFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>****/}
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-product-audit mb-2 mb-md-2 mb-lg-0">
                                <span className="drp-lable">Status</span>
                                <MultiSelectComponent value={this.props.ProductFilter ? this.props.ProductFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.ProductFilter ? this.props.ProductFilter.status : ""}
                                    fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                            
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-product-audit mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>
                    {/****<div className="col-xl-1  col-lg-1 col-md-2 col-sm-6 col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>***/}
                    <div className="p-0 row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                        <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                        <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                    </div>
                   
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped  ref-preffered-table ">
                       
                    <thead className="thead-blue"> 
                        <tr>
                            <th className="text-center ">#</th>
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
                           <List handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} onClickShowPopup={e => { this.onClickShowCommentPopup(e)}} auditFlag={"1"}  list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
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
        loader:state['ProductAuditingReducer']['loader'] || false,
        ProductAuditList:state['ProductAuditingReducer']['PRODUCT_AUDIT_RESULT'] || [],
        ProductAuditListTotal:state['ProductAuditingReducer']['PRODUCT_AUDIT_TOTAL'] || [],
        ProductAuditFilteredResult:state['ProductAuditingReducer']['filteredProductAuditProducts'] || [],
        ProductFilter:state['ProductReducer']['PRODUCT_FILTER_RESULT'] || [],
        ProductAuditRevertResult:state['ProductAuditingReducer']['REVERT_PRODUCT_RESULT'] || [],
        ProductBrandProductFilter:state['ProductReducer']['PRODUCT_BRAND_PRODUCT_FILTER_RESULT'] || [],
        selectedProduct:state['ProductReducer']['PRODUCT_SELECTED_UNIQUE_PRODUCT'] || [],
       
    };
}

export default connect(mapStateToProps)(ProductAuditing);
