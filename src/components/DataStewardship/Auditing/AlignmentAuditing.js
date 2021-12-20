import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "../RTRX/AlignmentList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import CustomPagination from "../../Common/CustomPagination";
import Notification from "../../Common/Notification";
import Modal from "../../Common/Modal";
import moment from "moment";
const pageLimit=15;
const pageSort="1";
const sortorder="desc";
class AlignmentAuditing extends React.Component {
    constructor() {
        super();
 
        this.state = {
           
            pageOfItems: [],
            loader:false,
            submittedData:[],
            checkedItems:[],
            checkedItemsId:[],
            currentPage:1,
            sourceName:[]
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
        document.title = 'Alignment Audit'
    }
   componentDidMount=()=>{
           
        //if(!this.props.AlignmentAuditFilteredResult.length){
            this.props.dispatch({
                type:"GET_ENABLE_BUTTON_DETAILS",
            });
            this.props.dispatch({
                type:"GET_ALIGNMENT_AUDIT_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder}
            })
            this.props.dispatch({
                type:"GET_ALIGNMENT_FILTER_RESULT",
            })
           
        //}
        
        
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
       // let reviewdByDs=this.dropDownListObjectReviewer.value;
       let reviewdByDs="";
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        
         this.props.dispatch({
            type: 'ALIGNMENT_AUDIT_FILTER_BY_VALUE',
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [sale,lastQtr,status,reviewdByDs,reviewerCategory,checkboxFilter],data:this.state.checkedItemsId}
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
    revertAllRecords=()=>{

        let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
        //let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewdByDs="";
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        this.props.dispatch({
            type:"REVERT_ALIGNMENT_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [sale,lastQtr,status,reviewdByDs,reviewerCategory,checkboxFilter],data:this.state.checkedItemsId,revrtAll:true}
            
        });
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
    
       /* let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value*/

        this.props.dispatch({
                type:"REVERT_ALIGNMENT_REQUEST",
                payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,data:this.state.checkedItemsId}
                
        });

       
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
        
      
        if(this.props.AlignmentAuditRevertResult!="" ) {
           
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_ALIGNMENT_REVERT_RESULT_STATE",
               
            });
            
        }
      
    }
    
    onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
        let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
//        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewdByDs="";
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        this.props.dispatch({
            type:"GET_ALIGNMENT_AUDIT_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder,value: [sale,lastQtr,status,reviewdByDs,reviewerCategory,checkboxFilter],data:this.state.checkedItemsId}
        })
    
      }
      switchToAlignment =(e)=>{
        

        if(!e.target.checked){
           
            this.props.history.push("alignment");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObject.value=["TRUE","FALSE"];
        this.dropDownListObjectLastQtr.value=["TRUE","FALSE"];
        this.dropDownListObjectStatus.value=this.props.AlignmentAuditFilter ? this.props.AlignmentAuditFilter.status : [];
       // this.dropDownListObjectReviewer.value=this.props.AlignmentFilter ? this.props.AlignmentFilter.reviewd_by_ds : [];
        this.dropDownListObjectReviewerCategory.value=this.props.AlignmentAuditFilter ? this.props.AlignmentAuditFilter.review_category : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
    }
    render() {
     
        let products= this.props.AlignmentAuditFilteredResult;
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={2}/>
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Alignment Audit</h2>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" checked onChange={(e)=>this.switchToAlignment(e)}/>
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

            {/****<div className="container main margin-l-ipad col-lg-11 col-11 cont-div">***/}
            <div className="main-div">
                <div className="row no-padding product-filter col-lg-12 col-12 p-0">
                        <div className="col-xl-2  col-lg-3 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-ts-id select-wrapper-alignment-has-sale">
                            <span className="drp-lable">Has Sales</span>
                         
                            <MultiSelectComponent value={["TRUE","FALSE"] } ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="status" dataSource={["TRUE","FALSE"] }
                                    fields={this.fields} placeholder="Select Sales" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Sales In Last 2 Qtr</span>
                                <MultiSelectComponent value={["TRUE","FALSE"] } ref={(scope) => { this.dropDownListObjectLastQtr = scope; }} className="filter-select"  id="status" dataSource={["TRUE","FALSE"] }
                                    fields={this.fields} placeholder="Select Sales In Last 2 Qtr" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Status</span>
                                <MultiSelectComponent value={this.props.AlignmentAuditFilter ? this.props.AlignmentAuditFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.AlignmentAuditFilter ? this.props.AlignmentAuditFilter.status : ""}
                                    fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                 
                    
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Review Category</span>
                                <MultiSelectComponent value={this.props.AlignmentAuditFilter ? this.props.AlignmentAuditFilter.review_category : ""} ref={(scope) => { this.dropDownListObjectReviewerCategory = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.AlignmentAuditFilter ? this.props.AlignmentAuditFilter.review_category : ""}
                                    fields={this.fields} placeholder="Select Review Category" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
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
                 
                    <div className="p-0 row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                        <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                        <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                    </div>
                    
                </div>
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                <table className="table table-striped table-responsive ref-preffered-table">
                   
                <thead className="thead-blue"> 
                
                    <tr>
                       
                    {this.props.alignmentParams && this.props.alignmentParams.BUTTON_FLAG && this.props.alignmentParams.BUTTON_FLAG.toLowerCase()=="true"  ?  <th  rowSpan="2" className="text-center sticky-col checkbox-col alignment-border-right vertical-align">#</th> : <th  rowSpan="2" className="text-center sticky-col checkbox-col vertical-align"></th>}
                       <th  rowSpan="2" className="text-center sticky-col npi-col alignment-left-border vertical-align">NPI</th>
                       <th  rowSpan="2" className="text-center sticky-col firstname-col vertical-align">First Name</th>
                       <th  rowSpan="2" className="text-center sticky-col lastname-col vertical-align">Last Name</th>
                       <th  rowSpan="2" className="text-center sticky-col zip-col vertical-align alignment-border-right">Customer Master <br></br> Prime ZIP</th>
                       <th  colSpan="6" className="text-center left-border"> {this.props.alignmentParams ? this.props.alignmentParams.CURRENT_QTR : ""}  (Current Quarter)</th>
                       <th  colSpan="6" className="text-center">{ this.props.alignmentParams ? this.props.alignmentParams.NEXT_QTR : ""} (Next Quarter)</th>
                        <th rowSpan="2" className="text-center vertical-align" >Has Sales</th>
                        <th rowSpan="2" className="text-center vertical-align">Sale Date</th>
                        <th rowSpan="2" className="text-center vertical-align" >Sales In Last 2 Qtr</th>
                        <th rowSpan="2" className="text-center vertical-align" >Comments</th>
                        
                        <th rowSpan="2" className="text-center vertical-align" >Review Category</th>
                        <th rowSpan="2" className="text-center vertical-align" >Group</th>
                       <th  rowSpan="2" className="text-center sticky-col al-status-col vertical-align" >Status</th>
                       <th  rowSpan="2" className="text-center sticky-col al-reviewed-by-col vertical-align" >Reviewer</th>
                      
                    </tr>
                    <tr>
                        {/**<th className="text-center curr-qtr curr-qtr-degree">Zip Code</th>**/}
                        <th className="text-center curr-qtr ">Degree</th>
                        <th className="text-center curr-qtr">Prime Zip</th>
                        <th className="text-center curr-qtr">SF1 Terr ID</th>
                        <th className="text-center curr-qtr">SF1 Terr Name</th>
                        <th className="text-center curr-qtr">SF2 Terr ID</th>
                        <th className="text-center curr-qtr">SF2 Terr Name</th>
                        <th className="text-center next-qtr">Degree</th>
                        <th className="text-center next-qtr">Prime Zip</th>
                        <th className="text-center next-qtr">SF1 Terr ID</th>
                        <th className="text-center next-qtr">SF1 Terr Name</th>
                        <th className="text-center next-qtr">SF2 Terr ID</th>
                        <th className="text-center next-qtr" >SF2 Terr Name</th>
                    </tr>
                   
                </thead>
                <tbody>
                { products.length ?
                           <List buttonFlag={this.props.alignmentParams ? this.props.alignmentParams.BUTTON_FLAG : false}  handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} auditFlag={"1"} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                </tbody>
            </table>
            <ToastContainer />
                  
                  { products.length ? <CustomPagination totalRecords={this.props.AlignmentAuditListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
            
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
        loader:state['AlignmentAuditingReducer']['loader'] || false,
        AlignmentAuditListTotal:state['AlignmentAuditingReducer']['ALIGNMENT_AUDIT_TOTAL'] || [],
        AlignmentAuditFilteredResult:state['AlignmentAuditingReducer']['filteredAlignmentAuditProducts'] || [],
        AlignmentAuditFilter:state['AlignmentReducer']['ALIGNMENT_FILTER_RESULT'] || [],
        AlignmentAuditRevertResult:state['AlignmentAuditingReducer']['REVERT_ALIGNMENT_RESULT'] || [],
        alignmentParams:state['AlignmentReducer']['ENABLE_BUTTON_DETAILS_RESULT'] || [],
      };
}

export default connect(mapStateToProps)(AlignmentAuditing);
