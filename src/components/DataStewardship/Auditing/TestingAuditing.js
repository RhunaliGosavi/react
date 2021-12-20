import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "../List"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent,DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import CustomPagination from "../../Common/CustomPagination";
import Notification from "../../Common/Notification";
import Modal from "../../Common/Modal";
import { Query } from '@syncfusion/ej2-data';

const pageLimit=15;
const pageSort="1";
const sortorder="desc";
class TestingAuditing extends React.Component {
    constructor() {
        super();
        this.checkFields = { text: 'Name', value: 'Value' };
        this.state = {
          
            pageOfItems: [],
            loader:false,
            inputValue: "",
            submittedData:[],
            checkedItems:[],
            checkedItemsId:[],
            currentPage:1,
            srcIds:[]
           
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
    componentWillMount=() =>{
        document.title = 'Testing Audit'
    }
    componentDidMount=()=>{
           
        //if(!this.props.RefPrefferedFilteredResult.length){
         
            this.props.dispatch({
                type:"GET_TESTING_AUDIT_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder}
            })
            this.props.dispatch({
                type:"GET_TESTING_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_TESTING_MAPPING_FILTER",
            })
        //}
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let status = this.dropDownListObject.value;
       // let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewdByDs="";
        let tstSource=this.dropDownListObjectTstSource.value;
        let tstSourceId=[this.dropDownListObjectTstSourceId.value];
        let fnLnNpi= [this.dropDownListObjectTstFnLnNpi.value];
        let comments=this.dropDownListObjectComment.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        
         this.props.dispatch({
            type: 'TESTING_AUDIT_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [status,"",reviewdByDs,tstSource,tstSourceId,checkboxFilter,comments,fnLnNpi],data:this.state.checkedItemsId,srcid:this.state.srcIds}
        })
        
    }
   
    handleInput(e){
        this.setState({[e.target.name]: e.target.checked})
        let str =e.target.id;
        let res = str.split("_");
        let srcIdlist=e.target.name.split("_");
        let obj={"id":res[res.length-1],"reviewd_by_ds":localStorage.fullname}
        if(e.target.checked){
            this.state.checkedItems.push(e.target.name);
            this.state.srcIds.push(srcIdlist[1]);
            this.state.submittedData.push(obj);
            this.state.checkedItemsId.push(res[1]);
            
         
        }else{
            var arrayDaya =[...this.state.checkedItems];
            var submittedData =[...this.state.submittedData];
            var arrayDataId =[...this.state.checkedItemsId];
            let srcIdData=[...this.state.srcIds]
            const index = arrayDaya.indexOf(str);
            const indexId = arrayDataId.indexOf(res[1]);
            const srcId=srcIdData.indexOf(srcIdlist[1]);
            if (srcId > -1) {
                srcIdData.splice(srcId, 1);
             }
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
            this.setState({checkedItems:arrayDaya,submittedData:submittedData,checkedItemsId:arrayDataId,srcIds:srcIdData})
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
            type:"REVERT_TESTING_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,data:this.state.checkedItemsId,srcid:this.state.srcIds}
            
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
                type:"UPDATE_TESTING_REVERT_RESULT_STATE",
               
            });
        }
       
        
        
    }

    
     onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
        let status = this.dropDownListObject.value;
       // let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewdByDs="";
        let tstSource=this.dropDownListObjectTstSource.value;
        let tstSourceId=[this.dropDownListObjectTstSourceId.value];
        let fnLnNpi= [this.dropDownListObjectTstFnLnNpi.value];
        let comments=this.dropDownListObjectComment.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        this.props.dispatch({
            type:"GET_TESTING_AUDIT_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder,value: [status,"",reviewdByDs,tstSource,tstSourceId,checkboxFilter,comments,fnLnNpi],data:this.state.checkedItemsId,srcid:this.state.srcIds}
        })
    
      }
      revertAllRecords=()=>{

        let status = this.dropDownListObject.value;
       // let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewdByDs="";
        let tstSource=this.dropDownListObjectTstSource.value;
        let tstSourceId=[this.dropDownListObjectTstSourceId.value];
        let fnLnNpi= [this.dropDownListObjectTstFnLnNpi.value];
        let comments=this.dropDownListObjectComment.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        this.props.dispatch({
            type:"REVERT_TESTING_REQUEST",
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [status,"",reviewdByDs,tstSource,tstSourceId,checkboxFilter,comments,fnLnNpi],data:this.state.checkedItemsId,revrtAll:true,srcid:this.state.srcIds}
            
        });
    }
  
    switchToTesting =(e)=>{
        

        if(!e.target.checked){
            
            this.props.history.push("Testing");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObject.value=this.props.testingFilter ? this.props.testingFilter.status : [];
        //this.dropDownListObjectReviewer.value=this.props.testingFilter ? this.props.testingFilter.reviewd_by_ds : [];
        this.dropDownListObjectTstSource.value=this.props.testingNpiFilter ? Object.keys(this.props.testingNpiFilter): [];
        this.dropDownListObjectTstSourceId.value=null;
        this.dropDownListObjectTstFnLnNpi.value=null;
        this.dropDownListObjectComment.value=this.props.testingFilter ? this.props.testingFilter.Rule : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
    }
    removeSelectedValues=(val) =>{
        val.value = null;
    }
    onClickShowCommentPopup=(e)=>{
        e.preventDefault();
        let res = e.target.id.split("_");
        this.setState({
            ["comments_popup"+res[1]]: true
        })
    }
    getNpiSourceId=()=>{
        let SelectedTestSource=(this.dropDownListObjectTstSource.value && this.dropDownListObjectTstSource.value.length > 0 )? this.dropDownListObjectTstSource.value : (this.props.testingNpiFilter ? Object.keys(this.props.testingNpiFilter): []);
        this.props.dispatch({
            type:"GET_MAPPING_FILTERS",
            payload:{SelectedTestSource:SelectedTestSource,testingNpiFilter:this.props.testingNpiFilter,testingTetsSourceFilter:this.props.testingTetsSourceFilter}
        })

       /* let selectedNPI=[];
        let selectedTestId=[];
        for(let i=0; i<=SelectedTestSource.length;i++ ){
      
            if(this.props.testingNpiFilter[SelectedTestSource[i]]){
                selectedNPI=  [...selectedNPI,...this.props.testingNpiFilter[SelectedTestSource[i]]];
                selectedTestId=  [...selectedTestId,...this.props.testingTetsSourceFilter[SelectedTestSource[i]]];
            }
        }
        this.setState({selectedNPI:selectedNPI,selectedTestId:selectedTestId})*/
    }
    
    onFiltering=(args)=>{
        let query = new Query();
        query = (args.text !== "") ? query.where("", "contains", args.text, true) : query;
        args.updateData(this.props.testingFilter.src_hcp_fn_ln_npi, query);

    }
    render() {
       
        let products= this.props.RefPrefferedFilteredResult;
        
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={2}/>
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Testing Audit</h2>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" checked onChange={(e)=>this.switchToTesting(e)}/>
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
                <div className="no-padding product-filter col-xl-12 col-lg-12 col-12">
                    <div className="row">
                        <div className="col-xl-6 col-lg-5 ">
                            <div className="row">
                                <div className="col-xl-4  col-lg-2 col-md-3 col-sm-6 col-5 p-0 select-wrapper select-wrapper-test-source mb-2 mb-md-2 mb-lg-0">
                                    <span className="drp-lable-testing">Test Source</span>
                                        <MultiSelectComponent change={this.getNpiSourceId} value={this.props.testingNpiFilter ? Object.keys(this.props.testingNpiFilter): ""} ref={(scope) => { this.dropDownListObjectTstSource = scope; }} className="filter-select"  id="tst-source" dataSource={this.props.testingNpiFilter ? Object.keys(this.props.testingNpiFilter): ""}
                                            fields={this.fields} placeholder="Select Test Source" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                            <Inject services={[CheckBoxSelection]} />
                                        </MultiSelectComponent>
                                        
                                </div>
                                <div className="col-xl-4 col-lg-3 col-md-10  pr-0">
                                    <div className="p-0 col-xl-12  col-lg-12 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0  select-wrapper-ts-id">
                                       
                                        <span className="drp-lable-testing">Test Source ID</span>
                                        <span className=" audit-cross-btn-test-source" onClick={()=>{this.removeSelectedValues(this.dropDownListObjectTstSourceId)}}></span>
                                    
                                        <DropDownListComponent  mode="Default" maximumSelectionLength={1} ref={(dropdownlist) => { this.dropDownListObjectTstSourceId = dropdownlist; }} className="filter-select"  id="ddlelement" 
                                                fields={this.fields}  allowFiltering={true} dataSource={this.props.selectedTestId ? this.props.selectedTestId : ""} placeholder="Select Test Source ID"  >
                                                
                                        </DropDownListComponent>
                                    </div>

                                </div>
                                <div className="col-xl-4 col-lg-3 col-md-10  p-0">
                                    <div className="col-xl-12  col-lg-12 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-npi">
                                        
                                        <span className="drp-lable-testing">Search NPI Or Name</span>
                                        <span className="audit-search-npi-or-name" onClick={()=>{this.removeSelectedValues(this.dropDownListObjectTstFnLnNpi)}}></span>
                                        <DropDownListComponent   filtering={this.onFiltering = this.onFiltering.bind(this)} mode="Default"  ref={(dropdownlist) => { this.dropDownListObjectTstFnLnNpi = dropdownlist; }} className="filter-select"  id="ddlelement" 
                                                fields={this.fields}  allowFiltering={true} dataSource={this.props.selectedNPI ? this.props.selectedNPI : ""} placeholder="Search NPI Or Name"  >
                                            
                                        </DropDownListComponent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-xl-6 col-lg-8 col-md-10  ">
                            <div className="row">
                                <div className="col-xl-3  col-lg-3 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-test-status">
                                    <span className="drp-lable-testing">Status</span>

                                    <MultiSelectComponent value={this.props.testingFilter ? this.props.testingFilter.status : ""} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="status" dataSource={this.props.testingFilter ? this.props.testingFilter.status : ""}
                                        fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                                    
                                </div>
                            
                               {/****  <div className="col-xl-3  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-reviewer">
                                    
                                    <span className="drp-lable-testing">Reviewer</span>
                                    <MultiSelectComponent value={this.props.testingFilter ? this.props.testingFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.testingFilter ? this.props.testingFilter.reviewd_by_ds : ""}
                                        fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                                </div>****/}
                                    
                                <div className="col-xl-3  col-lg-3 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 pr-0 select-wrapper select-wrapper-test-source">
                                
                                    <span className="drp-lable-testing">Rule</span>
                                    <MultiSelectComponent value={this.props.testingFilter ? this.props.testingFilter.Rule : ""} ref={(scope) => { this.dropDownListObjectComment = scope; }} className="filter-select"  id="comment" dataSource={this.props.testingFilter ? this.props.testingFilter.Rule : ""}
                                        fields={this.fields} placeholder="Select Rule" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                                </div>

                                <div className="col-xl-3  col-lg-3 col-md-3 col-sm-6 col-5 select-wrapper-checkbox test-checkbox-wrapp mb-2 mb-md-2 mb-lg-0">
                                        <span className="drp-lable-testing">Checkbox Filter</span>
                                        <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={[{ Name: 'TRUE', Value: 'Checked' },{ Name: 'FALSE', Value: 'Unchecked' }] }
                                            fields={this.checkFields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={false}>
                                            <Inject services={[CheckBoxSelection]} />
                                        </MultiSelectComponent>
                                        
                                </div>
                                <div className="pl-0 row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                                    
                                    <div className="col-lg-7 p-0 go-margin"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                                    <div className="col-lg-5 p-1 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                                    
                                </div>
                            </div>
                                
                        </div>
                    </div>
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped table-responsive ref-preffered-table ">
                       
                    <thead className="thead-blue"> 
                        <tr>
                            <th rowSpan="2" className="text-center sticky-col check-col  vertical-align">#</th>
                            <th rowSpan="2" className="text-center sticky-col first-col  vertical-align">Source</th>
                            <th rowSpan="2" className="text-center sticky-col second-col  vertical-align">Source ID</th>
                            <th colspan="2" className="text-center">NPI</th>
                            <th colspan="2" className="text-center">First Name</th>
                            <th colspan="2" className="text-center">Middle Name</th>
                            <th colspan="2" className="text-center">Last Name</th>
                            <th colspan="2" className="text-center">Degree</th>
                            <th colspan="2" className="text-center">Email</th>
                            <th colspan="2" className="text-center">Zipcode</th>
                            <th colspan="2" className="text-center">City</th>
                            <th colspan="2" className="text-center">State</th>
                            <th colspan="2" className="text-center">Organization Name</th>
                            <th rowSpan="2"  className="text-center vertical-align">EX-US Flag</th>
                            <th rowSpan="2"  className="text-center  vertical-align">Comments</th>
                            <th rowSpan="2"  className="text-center vertical-align">Record Date</th>
                            <th rowSpan="2"  className="text-center sticky-col status-col  vertical-align">Status</th>
                            <th rowSpan="2"  className="text-center reviewed-by-col sticky-col  vertical-align" >Reviewer</th>
                            <th colspan="2"  className="text-center" style={{"display":"none"}}>Rec Updated By</th>
                            <th colspan="2"  className="text-center" style={{"display":"none"}}>Approved Flag</th>
                            <th colspan="2" className="text-center" style={{"display":"none"}}>Rec Updated Ts</th>
                           
                        </tr>
                        <tr>
                            
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            <th  className="text-center">Source</th>
                            <th  className="text-center">Suggested/Input</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    { products.length ?
                        <List handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} auditFlag={"1"}  onChangeInput={e => { this.handleInput(e)}}  item={this.state.item}  list={products} props={this.state} />
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                        
                    </tbody>
                </table>
               
                    <ToastContainer />
                   
                    { products.length ? <CustomPagination totalRecords={this.props.testingListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                   
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
        loader:state['DataStewardshipAuditingReducer']['loader'] || false,
        RefPrefferedList:state['DataStewardshipAuditingReducer']['TESTING_AUDIT_RESULT'] || [],
        RefPrefferedFilteredResult:state['DataStewardshipAuditingReducer']['filteredAuditProducts'] || [],
        testingFilter:state['DataStewardshipTestingReducer']['TESTING_FILTER_RESULT'] || [],
        testingNpiFilter:state['DataStewardshipTestingReducer']['TESTING_MAPPING_NPI_FILTER_RESULT'] || [],
        selectedNPI:state['DataStewardshipTestingReducer']['TESTING_SELECTED_NPI'] || [],
        selectedTestId:state['DataStewardshipTestingReducer']['TESTING_SELECTED_TEST_ID'] || [],
        testingTetsSourceFilter:state['DataStewardshipTestingReducer']['TESTING_MAPPING_TESTSOURCE_FILTER_RESULT'] || [],
        testingListTotal:state['DataStewardshipAuditingReducer']['TESTING_TOTAL'] || [],
        TestingAuditRevertResult:state['DataStewardshipAuditingReducer']['REVERT_TESTING_RESULT'] || [],
        
        
    };
}

export default connect(mapStateToProps)(TestingAuditing);
