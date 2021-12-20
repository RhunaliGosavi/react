import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "./AlignmentList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent,DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import moment from "moment";
import axios from "axios"
import Notification from "../../Common/Notification";
const pageLimit=15;
const pageSort="1";
const sortorder="desc";
import * as validation from "../../Common/Validations"
class Alignment extends React.Component {
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
            showHcpAddModal:false,
            filename:"",
            showImportModal:"",
            selectedFile:"",
            showLoader:false,
            exportFileName:"",
            currentPage:1,
            sourceName:[],
            errors:[],
            npiSearchItems:[],
            npiShowNOData:false,
            npiItem:'',
            npiSelectItem:''
          
         };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        this.compareByDesc  =  this.compareByDesc.bind(this);
    }
    showRegPopup=(e)=>{
     
        e.preventDefault();
        this.setState({
          showHcpAddModal: true
        })
    }
    componentWillMount=() =>{
        document.title = 'Alignment'
    }
   
    handleModalShowClick=(e)=> {
        e.preventDefault();
        this.setState({
          showModal: true
        })
      }
      handleImportModalShowClick=(e)=>{
        e.preventDefault();
        this.setState({
          showImportModal: true
        })
      }
   
      
      handleModalCloseClick=(modelId)=> {
          
          let getmodelId= modelId && modelId.target ? modelId.target.id : "showImportModal";
          if(getmodelId){
            this.setState({ [getmodelId]:false })
          }
          $('.modal.in').modal('hide')
          $('.modal-backdrop').remove()
          this.setState({item:[],zipitem:[],errors:[]})
    
      }


   
    export = () => {
        document.getElementById('errorMsg').style.display="none";
        if(!document.getElementById('fileName').value){
            document.getElementById('errorMsg').style.display="block";
            return false;
        }
        this.setState({exportFileName:document.getElementById('fileName').value})
        /***close modal****/
            $('.modal.in').modal('hide')
            $('.modal-backdrop').remove()
            this.setState({ showModal:false })
        /***close modal****/

        
        let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let group=this.dropDownListObjectGroupCategory.value;
        let selectedNpi=document.getElementById('npi-autocomplete').value;
        let Filtervalue= [sale,lastQtr,status,reviewdByDs,reviewerCategory,checkboxFilter,group,selectedNpi];
        let checkedIds=this.state.checkedItemsId;
        this.props.dispatch({
            type:"ALIGNMENT_EXPORT",
            payload:{sortorder:sortorder,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
        })
      
    }
    Import=()=>{
        document.getElementById('errorImportMsg').style.display="none";
        if(!this.state.selectedFile){
            document.getElementById('errorImportMsg').style.display="block";
            document.getElementById('errorImportFileSize').style.display="none";
            return false;
        }
        
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
        this.setState({ showImportModal:false })
        this.props.dispatch({
            type:"IMPORT_ALIGNMENT_FILE",
            
            payload:{pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:0,file:this.state.selectedFile}
        })
      
       
    }
 
    
    OnchangeOfImportFile=(e)=>{
        if(e.target.files[0]){
            const fsize = e.target.files[0].size;
            const file = Math.round((fsize / 1024/1024));
            

            document.getElementById('errorImportFileSize').style.display="none";
            if(file>10){
                document.getElementById('errorImportFileSize').style.display="block";
                document.getElementById('errorImportMsg').style.display="none";
                return false;
            }
        }
        this.setState({ selectedFile: e.target.files[0] });
    }

    handleExport = () => {
        this.props.dispatch({
            type:"HIDE_LOADER",
        })
       
    };


    handleSort(key){
        this.setState({
            switchSort:!this.state.switchSort
        })

       let switchSort=this.state.switchSort;
        this.props.dispatch({
            type:"SORT_RESULT",
            payload:{key,switchSort}
            
       })

        
    }
    compareByDesc(key){
     if(this.state.switchSort){
         return function(a,b){
             if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
             if (a[key] > b[key]) return 1;  //check for value if the second value is bigger then first return 1
             return 0;
         };
     }else{
         return function(a,b){
             if (a[key] > b[key]) return -1; 
             if (a[key] < b[key]) return 1; 
             return 0;
         };
     }
    }
    componentDidMount=()=>{
           
        //if(!this.props.AlignmentFilteredResult.length){
            this.props.dispatch({
                type:"GET_ENABLE_BUTTON_DETAILS",
            });
            this.props.dispatch({
                type:"GET_ALIGNMENT_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder}
            })
            this.props.dispatch({
                type:"GET_ALIGNMENT_FILTER_RESULT",
            })
         
        //}
        this.props.dispatch({
            type:"GET_GROUP_REVIEW_FILTER",
        });
        let SelectedGroup=(this.dropDownListObjectGroupCategory.value && this.dropDownListObjectGroupCategory.value.length > 0 ) ? this.dropDownListObjectGroupCategory.value :(this.props.GroupReviewFilter ? Object.keys(this.props.GroupReviewFilter) : []);
            
            this.props.dispatch({
                type:"GET_MAPPING_REVIEW_FILTERS",
                payload:{SelectedGroup:SelectedGroup,GroupReviewFilter:this.props.GroupReviewFilter}
            })
        
        
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let group=this.dropDownListObjectGroupCategory.value;
        let selectedNpi=document.getElementById('npi-autocomplete').value;

        
         this.props.dispatch({
            type: 'ALIGNMENT_FILTER_BY_VALUE',
            payload:{sortorder:sortorder,pageSort:pageSort,pagelimit:pageLimit,value: [sale,lastQtr,status,reviewdByDs,reviewerCategory,checkboxFilter,group,selectedNpi],data:this.state.checkedItemsId}
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
                
                element.classList.remove("in-progress-clr")
                element.classList.remove("approve-clr")
              
            if(element.value=="Approved"){
                element.classList.add("approve-clr");
            }else if(element.value=="Retained"){
                element.classList.add("in-progress-clr")
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
        "comments":document.getElementById("comments_"+resVariable).value,
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
    

        let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value;
        let group=this.dropDownListObjectGroupCategory.value;
        let selectedNpi=document.getElementById('npi-autocomplete').value;
        let Filtervalue= [sale,lastQtr,status,reviewdByDs,reviewerCategory,checkboxFilter,group,selectedNpi];
        let checkedIds=this.state.checkedItemsId;
       this.props.dispatch({
            type:"UPDATE_ALIGNMENT_REQUEST",
            payload:{data:this.state.submittedData,sortorder:sortorder,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
            
       });

      
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
        
        if(this.props.AlignmentUpdateStatus!="" ) {
           
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_ALIGNMENT_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_ALIGNMENT_FILTER_RESULT",
                })
            
        }
       
        if(this.props.exportResult!="" ) {
            let Filename= this.state.exportFileName+".csv";
 
             this.saveDataToFile(this.props.exportResult,Filename,'text/csv');
             this.setState({exportFileName:""})
             this.props.dispatch({
                 type:"ALIGNMENT_EXPORT_RESULT_STATE",
                
             });
         
             
        }
        if(this.props.AlignmentImportStatus!="" ) {
          
            toast(
                <Notification msg="File Uploaded Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_IMPORT_ALIGNMENT_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_ALIGNMENT_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder}
            })
            this.props.dispatch({
                type:"GET_ALIGNMENT_FILTER_RESULT",
            })
            
        }
        if(this.props.InsertRes!="" ) {
            
            toast(
                <Notification msg="Data Inserted Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_HCP_ADDRESS_INSERT_RESULT_STATE",
               
            });
        
        }
        
    }
    saveDataToFile=(data, fileName, dataType) =>{
        
        let a = document.createElement("a");
        document.body.appendChild(a);
    
        // let json = JSON.stringify(data);
        let json = data;
        let blob = new Blob([json], {type: dataType});
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        
        window.URL.revokeObjectURL(url);
    }
    /****search zip***/
    ZipAutocomplete=(evt)=>{
       
          let text = evt.target.value;
          this.setState({ zipitem: {id: text } })
          let showZipNOData=false;
       
          if(text.length > 3){
             
              let showZipLoader=true;
              this.setState({showZipLoader:showZipLoader })
              
              axios.get(`${process.env.REACT_APP_API_BASE_URL}/zipterr/${text}`, {
                  headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
                })
                .then((res) => {
                    
                    let data=res.data.DATA;
                  showZipLoader=false;
                  if(data.length==0){
                       showZipNOData=true;
                  }
                  this.setState({ searchZipItems: data,showZipNOData:showZipNOData ,showZipLoader:showZipLoader});
                }, (error) => {
                  console.log(error);
                });
  
             
          }else{
              this.setState({ searchZipItems: [],showZipNOData:false ,showZipLoader:false});
          }
      }
      selectZipItem=(args)=>{
        const { searchZipItems } = this.state;
        
        let selectedItem = searchZipItems[args];
        
      
        const {zt_zip_code} = selectedItem;
        let thiolaTerrId= selectedItem[0]['zt_terr_id'];
        let thiolaTerrName= selectedItem[0]['zt_terr_name'];
        let cholbamTerrId= selectedItem[1]['zt_terr_id'];
        let cholbamTerrName= selectedItem[1]['zt_terr_name'];
        this.setState({ zipitem: {args,zt_zip_code,thiolaTerrId,thiolaTerrName,cholbamTerrId,cholbamTerrName} });
        this.setState({ searchZipItems: [] });
    }
     /***search reg no ****/
     
     
     autocomplete=(evt)=>{
      
         
          let text = evt.target.value;
          this.setState({ item: {id: text } })
          let showNOData=false;
       
          if(text.length > 4){
             
              let showLoader=true;
              this.setState({showLoader:showLoader })
              
              axios.get(`${process.env.REACT_APP_API_BASE_URL}/alignmenthcpaddress/${text}`, {
                  headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
                })
                .then((res) => {
                    
                    let data=res.data.DATA;
                  showLoader=false;
                  if(data.length==0){
                       showNOData=true;
                  }
                  this.setState({ searchItems: data,showNOData:showNOData ,showLoader:showLoader});
                }, (error) => {
                  console.log(error);
                });
  
             
          }else{
              this.setState({ searchItems: [],showNOData:false ,showLoader:false});
          }
      }
      selectItem=(args)=>{
  
          const { searchItems } = this.state;
          
          let selectedItem = searchItems.find(item => item.id === args);
          
          const {new_prime_zip,new_prime_address2,new_prime_address1,new_prime_city,new_prime_state,id,tot_pat_count,last_rx_date,first_rx_date,retro_call_date__c,acct_exists_in_customer_master,prime_zip,prime_address1,degree,lastname,middlename,firstname,sf2_terr_id,sf1_terr_id,sf1_terr_name,sf2_terr_name,prime_state,prime_city, product, npi} = selectedItem;
          this.setState({ item: {new_prime_zip,new_prime_address2,new_prime_address1,new_prime_city,new_prime_state,id,tot_pat_count,last_rx_date,first_rx_date,retro_call_date__c,acct_exists_in_customer_master,prime_zip,prime_address1,degree,lastname,middlename,firstname,sf2_terr_id,sf1_terr_id,sf1_terr_name,sf2_terr_name,prime_state,prime_city, product, npi} });
          this.setState({ searchItems: [] });
      }

     

  
    onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
        let sale = this.dropDownListObject.value;
        let lastQtr = this.dropDownListObjectLastQtr.value;
        let status = this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let reviewerCategory=this.dropDownListObjectReviewerCategory.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let group=this.dropDownListObjectGroupCategory.value;
        let selectedNpi=document.getElementById('npi-autocomplete').value;

        this.props.dispatch({
            type:"GET_ALIGNMENT_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder,value: [sale,lastQtr,status,reviewdByDs,reviewerCategory,checkboxFilter,group,selectedNpi],data:this.state.checkedItemsId}
        })
    
      }
      switchToAudit =(e)=>{
        

        if(e.target.checked){
          
            this.props.history.push("alignment-auditing");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObject.value=["TRUE","FALSE"];
        this.dropDownListObjectLastQtr.value=["TRUE","FALSE"];
        this.dropDownListObjectStatus.value=this.props.AlignmentFilter ? this.props.AlignmentFilter.status : [];
        this.dropDownListObjectReviewer.value=this.props.AlignmentFilter ? this.props.AlignmentFilter.reviewd_by_ds : [];
        this.dropDownListObjectReviewerCategory.value=this.props.AlignmentFilter ? this.props.AlignmentFilter.review_category : [];
        //this.dropDownListObjectGroupCategory.value=this.props.AlignmentFilter ? this.props.AlignmentFilter.group : [];
        this.dropDownListObjectGroupCategory.value=this.props.GroupReviewFilter ? Object.keys(this.props.GroupReviewFilter ): [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
        this.setState({ npiSearchItems: [],npiItem:"",npiShowNOData:false });
    }
    handleHcpAddUpdateClick=()=>{
        var errors = [];
		if (document.getElementById('hcpAddress').value === "") {
			errors.push("hcpAddress");
		}
        if (document.getElementById('hcpState').value === "") {
			errors.push("hcpState");
		}
        if (document.getElementById('hcpCity').value === "") {
			errors.push("hcpCity");
		}
        if (document.getElementById('zipAutocomplete').value === "") {
			errors.push("hcpZip");
		}
        this.setState({
			errors: errors
		});
		
		if (errors.length > 0) {
			return false;
		}
      
        let insetObj = {
             "DATA": [ {
                    "ID":this.state.item.id,
                    "NEW_PRIME_ADDRESS1":document.getElementById('hcpAddress').value ,
                    "NEW_PRIME_ADDRESS2":"" ,
                   // "SF1_TERR_NAME":document.getElementById("thiolaTerrName").innerText,
                   // "SF2_TERR_NAME":document.getElementById("cholbamTerrName").innerText,
                    //"SF1_TERR_ID":document.getElementById("thiolaTerrId").innerText,
                    //"SF2_TERR_ID":document.getElementById("cholbamTerrId").innerText,
                    "NEW_PRIME_STATE":document.getElementById('hcpState').value ,
                    "NEW_PRIME_CITY":document.getElementById('hcpCity').value ,
                    "NEW_PRIME_ZIP":document.getElementById('zipAutocomplete').value ,
                 }]
           };

      
           this.setState({ showHcpAddModal:false ,item:[]})
           $('.modal.in').modal('hide')
           $('.modal-backdrop').remove()

           this.props.dispatch({
            type:"INSERT_HCP_ADDRESS",
            payload:insetObj
           })

        }
        hasError=(key)=> {
           
            return this.state.errors.indexOf(key) !== -1;
        }
        onClickShowCommentPopup=(e)=>{
            e.preventDefault();
            let res = e.target.id.split("_");
            this.setState({
                ["comments_popup"+res[1]]: true
            })
        }

        onFiltering=(args)=>{

            let text = args.text;
           
      
        if(text.length > 4){
          
        
         
            
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/getNPIData/${text}`, {
                headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
              })
              .then((res) => {
                 
                  let data=res.data;
                  
                  args.updateData(this.props.testingFilter.src_hcp_fn_ln_npi, data);
              
              }, (error) => {
                console.log(error);
              });

           
        }
    
    }
    /**********npi search*******/
    npiSelectItem=(args)=>{
        const { npiSearchItems } = this.state;
        let selectedItem = npiSearchItems.find(item => item.CM_NPI === args);
        const {CM_NPI:npi,CM_LASTNAME:last_name,CM_FIRSTNAME:name} = selectedItem;
        this.setState({ npiItem: {id:npi,name:name,lname:last_name} ,npiSearchItems: []});
 
    }
    npiAutocomplete=(evt)=>{

        let text = evt.target.value;
        this.setState({ npiItem: {id: text } })
        let showNOData=false;
      
        if(text.length > 4){
          
            let showLoader=true;
            this.setState({npiShowLoader:showLoader })
            
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/alignment/search/cm_npi-cm_firstname-cm_lastname/${text}`, {
                headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
              })
              .then((res) => {
                 
                  let data=res.data.DATA;
                   showLoader=false;
                  if(data.length==0){
                      showNOData=true;
                  }
                this.setState({ npiSearchItems: data,npiShowNOData:showNOData ,npiShowLoader:showLoader});
              }, (error) => {
                console.log(error);
              });
  
           
        }else{
           
            this.setState({ npiSearchItems: [],npiShowNOData:false ,npiShowLoader:false});
        }
    }

    removeSelectedValues=()=>{
       
       this.setState({ npiSearchItems: [],npiItem:"",npiShowNOData:false });
    }
    getReviewCategory=()=>{
        
        let SelectedGroup=(this.dropDownListObjectGroupCategory.value && this.dropDownListObjectGroupCategory.value.length > 0 ) ? this.dropDownListObjectGroupCategory.value :(this.props.GroupReviewFilter ? Object.keys(this.props.GroupReviewFilter) : []);
        this.props.dispatch({
            type:"GET_MAPPING_REVIEW_FILTERS",
            payload:{SelectedGroup:SelectedGroup,GroupReviewFilter:this.props.GroupReviewFilter}
        })
    }
  
    render() {
     
        let products= this.props.AlignmentFilteredResult;
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={0}/>
           
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <div className="col-lg-12">
                            <h2 className="page-title-strwardship-note">Data Steward Interface - Alignment</h2>
                        </div>
                        <div className="col-lg-12 qtr-alignmnt">
                            <p>
                           
                        {this.props.alignmentParams && this.props.alignmentParams.NOTE_FLAG && this.props.alignmentParams.NOTE_FLAG.toLowerCase()=="true" ?  this.props.alignmentParams.NOTE  : <p>&nbsp;</p>  
                        }
                        </p></div>
                    </div>
                    <div className="col-lg-2  row pr-0">
                        <div className="col-lg-8 audit-text">{ConstVal.auditText} :</div>
                        <div className="col-lg-3 offset-lg-1 p-0">
                            <label className="switch">
                                <input type="checkbox" onChange={(e)=>this.switchToAudit(e)}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="note-text-zip">{ConstVal.auditMessage}</div>
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
                    <div className="col-xl-12 col-lg-11 col-md-10 row p-0">
                            <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5 pl-0 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0">
                                
                               <div class="col-lg-12 row ">
                                    <div class="col-lg-10 p-0">
                                       <span className="drp-lable">NPI or Name Search</span>
                                    </div>
                                    <div class="col-lg-2 p-0"><span class="cross-btn npi-cross-btn" onClick={this.removeSelectedValues}></span></div>
                                </div>

                                <input type="text" id="npi-autocomplete" placeholder="Enter NPI or Name To Search" autocomplete="off" onChange={this.npiAutocomplete}   className="" value={this.state.npiItem ? this.state.npiItem.id : ""} />
                                {this.state.npiShowLoader && <span class="spinner-border spinner-border-sm " id="npi-loader-autocomplete" role="status" aria-hidden="true"></span>}
                                {this.state.npiSearchItems && this.state.npiSearchItems.length > 0 && (
                                <ul className="list-group autocomplete-dropdown npi-autocomplete-drop">
                               
                                {this.state.npiSearchItems && this.state.npiSearchItems.map((item, idx) => (
                                    <li className={"list-group-item" } key={idx} onClick={()=> this.npiSelectItem(item.CM_NPI)}>
                                    {item.CM_NPI} ({item.CM_FIRSTNAME+" "+item.CM_LASTNAME})
                                    </li>
                                ))}
                                </ul>
                            )}
                        
                            { this.state.npiShowNOData && 
                                
                                <ul className="list-group autocomplete-dropdown npi-autocomplete-drop" id="noData">
                                <li className={"list-group-item" }>
                                    No Data Found
                                </li>
                                </ul> 
                            }
                        </div>
                        <div className="col-xl-2  col-lg-3 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-ts-id  select-wrapper-alignment-has-sale pl-0">
                            <span className="drp-lable">Has Sales</span>
                         
                            <MultiSelectComponent  value={["TRUE","FALSE"]} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="status" dataSource={["TRUE","FALSE"] }
                                    fields={this.fields} placeholder="Select Sales" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Sales In Last 2 Qtr</span>
                                <MultiSelectComponent value={["TRUE","FALSE"]} ref={(scope) => { this.dropDownListObjectLastQtr = scope; }} className="filter-select"  id="status" dataSource={["TRUE","FALSE"]}
                                    fields={this.fields} placeholder="Select Sales In Last 2 Qtr" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-2 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                                <span className="drp-lable">Status</span>
                                <MultiSelectComponent value={this.props.AlignmentFilter ? this.props.AlignmentFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.AlignmentFilter ? this.props.AlignmentFilter.status : ""}
                                    fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        
                        </div>
                 
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.AlignmentFilter ? this.props.AlignmentFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.AlignmentFilter ? this.props.AlignmentFilter.reviewd_by_ds : ""}
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
                        <div className="col-xl-12 col-lg-11 col-md-10 row p-0">
                            <div className="col-xl-5  col-lg-2 col-md-3 col-sm-6  col-5 select-wrapper select-wrapper-group">
                                
                                <span className="drp-lable">Group</span>
                                <MultiSelectComponent  change={this.getReviewCategory} value={this.props.GroupReviewFilter ? Object.keys(this.props.GroupReviewFilter) : ""} ref={(scope) => { this.dropDownListObjectGroupCategory = scope; }} className="filter-select"  id="group" dataSource={this.props.GroupReviewFilter ? Object.keys(this.props.GroupReviewFilter) : ""}
                                    fields={this.fields} placeholder="Select Group" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                            </div>
                            

                          
                            <div className="col-xl-6  col-lg-2 col-md-3 col-sm-6  col-5  select-wrapper select-wrapper-review-cate">
                                <span className="drp-lable">Review Category</span>
                                <MultiSelectComponent value={this.props.selectedReviewCategory ? this.props.selectedReviewCategory : []} ref={(scope) => { this.dropDownListObjectReviewerCategory = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.selectedReviewCategory ? this.props.selectedReviewCategory : []}
                                    fields={this.fields} placeholder="Select Review Category" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                            </div>
                            <div className="col-lg-1 mt-4 row">
                                <div className="col-lg-7 p-0">
                                    <button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button>
                                </div>
                                <div className="col-lg-5 pl-2  pr-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                            </div>
                           
                       
                    </div>
                </div>
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                <table className="table table-striped table-responsive ref-preffered-table alignment-tbl ">
                   
                <thead className="thead-blue"> 
                    <tr>
                       
                    {this.props.alignmentParams && this.props.alignmentParams.BUTTON_FLAG && this.props.alignmentParams.BUTTON_FLAG.toLowerCase()=="true" ?  <th  rowSpan="2" className="text-center sticky-col checkbox-col alignment-border-right vertical-align">#</th> : <th  rowSpan="2" className="text-center sticky-col checkbox-col vertical-align"></th>}
                       <th  rowSpan="2" className="text-center sticky-col npi-col alignment-left-border vertical-align">NPI</th>
                       <th  rowSpan="2" className="text-center sticky-col firstname-col vertical-align">First Name</th>
                       <th  rowSpan="2" className="text-center sticky-col lastname-col vertical-align">Last Name</th>
                       <th  rowSpan="2" className="text-center sticky-col zip-col vertical-align alignment-border-right">Customer Master <br></br> Prime ZIP</th>
                       <th  colSpan="6" className="text-center left-border"> { this.props.alignmentParams ? this.props.alignmentParams.CURRENT_QTR : ""}  </th>
                       <th  colSpan="6" className="text-center">{ this.props.alignmentParams ? this.props.alignmentParams.NEXT_QTR : ""}</th>
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
                        {/*<th className="text-center curr-qtr curr-qtr-degree">Zip Code</th>*/}
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
                           <List  buttonFlag={this.props.alignmentParams ? this.props.alignmentParams.BUTTON_FLAG : false} Modal={Modal}  handleModalCloseClick={this.handleModalCloseClick}  onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                </tbody>
            </table>
            <ToastContainer />
                  
                  { products.length ? <CustomPagination totalRecords={this.props.AlignmentListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
            
            </div>
                   
               
                { products.length ? (!this.props.loader ? 
                    <div className="btn-align row">
                        {this.props.alignmentParams && this.props.alignmentParams.BUTTON_FLAG && this.props.alignmentParams.BUTTON_FLAG.toLowerCase()=="true" &&
                        <>
                            <div>
                                <button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Update</button>
                            </div>
                            <div className="ml-2">
                                <button className="btn btn-primary btn-bg" onClick={this.handleImportModalShowClick} >Import</button>
                            </div>
                         </>
                    }
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleModalShowClick} >Export</button>
                        </div>
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={(e)=>{this.showRegPopup(e)}} >Update HCP Address</button>
                        </div>
                       
                       
                       
                    </div> 
               : "") : ""}
                   
            {this.state.showHcpAddModal ? (
                
                <Modal hasError={this.hasError} zipitem={this.state.zipitem} showZipNOData={this.state.showZipNOData} showZipLoader={this.state.showZipLoader} selectZipItem={this.selectZipItem} searchZipItems={this.state.searchZipItems} ZipAutocomplete={(e)=>{this.ZipAutocomplete(e)}} handleHcpAddUpdateClick={this.handleHcpAddUpdateClick}  alignmentHcp={1} showLoader={this.state.showLoader} item={this.state.item} handleModalCloseClick={this.handleModalCloseClick} modelId={"showHcpAddModal"} text={"HCP Current Alignment Details"} classname={"npi-model-list"}>
                   
                    <form id={"reg_form"} className="regForm" onSubmit={e => { e.preventDefault(); }}>
                    <div class="form-row">
                        <div className="form-group col-md-7">
                            {/* <label for="inputEmail4" >NPI</label> */}
                            <input type="text" id="autocomplete" placeholder="Enter NPI or Name to search" autocomplete="off" onChange={this.autocomplete}   className="custom-input form-control auto-input" value={this.state.item ? this.state.item.npi : ""}/>
                        {this.state.showLoader && <span class="spinner-border spinner-border-sm " id="loader-autocomplete" role="status" aria-hidden="true"></span>}
                            {this.state.searchItems && this.state.searchItems.length > 0 && (
                            <ul className="list-group autocomplete-dropdown">
                                {this.state.searchItems && this.state.searchItems.map((item, idx) => (
                                
                                <li className={"list-group-item" } key={idx} onClick={()=> this.selectItem(item.id)}>
                                   
                                    {item.npi} ({item.firstname} {item.middlename} {item.lastname})
                                </li>
                                ))}
                            </ul>
                            )}
                        
                            { this.state.showNOData && 
                            
                            <ul className="list-group autocomplete-dropdown" id="noData">
                                <li className={"list-group-item" }>
                                No Data Found
                                </li>
                            </ul> 
                            }
                        </div>

                    
                    </div>
                    <div>
                   
                        {!this.state.showLoader && this.state.item  && this.state.item.npi &&
                        <div className="row">
                            
                            <div className="col-xl-5 col-lg-5 col-md-5">
                                
                                <div className="col-xl-12 col-lg-12 col-md-12 doctor-name pr-0 mb-2" >  
                                {this.state.item.firstname} {this.state.item.middlename} {this.state.item.lastname}
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                                <div className="row">
                                    <div className="col-xl-1 col-lg-1 col-md-1 txt-font">
                                    <b>NPI</b>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                                    {this.state.item.npi}
                                    </div>
                                </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1 col-md-1 icon-font cap-icon">
                                        <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                                        {this.state.item.degree}
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="col-xl-12 col-lg-12 col-md-12 pr-0">  
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1 col-md-1 icon-font">
                                            <i class="fa fa-hospital-o" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-xl-9 col-lg-9 col-md-9 txt-font p-0">
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                            {this.state.item.prime_address1}
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                            {this.state.item.prime_state}
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                            {this.state.item.prime_city}
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                            {this.state.item.prime_zip}
                                            </div>
                                        
                                        </div>
                                        
                                    </div>
                                
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1 col-md-1 txt-font">
                                           <b> SF1 </b>
                                        </div>
                                        <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                                        {this.state.item.sf1_terr_id ? this.state.item.sf1_terr_id : "NA"} : {this.state.item.sf1_terr_name ? this.state.item.sf1_terr_name : "NA"}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1 col-md-1 txt-font">
                                            <b> SF2 </b>
                                        </div>
                                        <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                                            {this.state.item.sf2_terr_id ? this.state.item.sf2_terr_id : "NA"} : {this.state.item.sf2_terr_name ? this.state.item.sf2_terr_name : "NA"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="al-doctor-img" src={process.env.REACT_APP_BASE_URL+"/dist/assets/img/doctor.png"}></img>
                            </div>
                            
                        </div>
                        }
                    
                    </div>
                    
                    </form>
                    
                </Modal>          
                 ) : null}
        
               {this.state.showImportModal ? (
                    <Modal  handleModalCloseClick={this.handleModalCloseClick} handleImport1Click={this.Import} modelId="showImportModal" text={"Import"} classname={"modal-import-export"}>
                    <div className="form-group">
                    <input type="file"  ref="fileUploader"  className="" id="customFile" onChange={(e)=>this.OnchangeOfImportFile(e)} />
                    <span id="errorImportMsg" className="errorMsg" style={{"display":"none"}}>Select File</span>
                    <span id="errorImportFileSize" className="errorMsg" style={{"display":"none"}}>{ConstVal.fileSizeErr}</span>
                    </div>
                </Modal>
               ) : null}
                {this.state.showModal ? (
                    <Modal handleModalCloseClick={this.handleModalCloseClick}  handleExportClick={this.export} modelId="showModal" text={"Export"} classname={"modal-import-export"}>
                        <div className="form-group">
                            <label for="fileName">File Name</label>
                            <input type="text" className="form-control" id="fileName"  defaultValue={"Alignment_"+moment().format("YYYYMMDD")} placeholder="File Name"/>
                            <span id="errorMsg" className="errorMsg" style={{"display":"none"}}>Enter File Name</span>
                        </div>
                    </Modal>
                ) : null}
                
            </div> 
         
  

            
             
           </>
        );
    }
}



function mapStateToProps(state) {
    
    return {
        loader:state['AlignmentReducer']['loader'] || false,
        AlignmentList:state['AlignmentReducer']['ALIGNMENT_RESULT'] || [],
        AlignmentListTotal:state['AlignmentReducer']['ALIGNMENT_TOTAL'] || [],
        AlignmentFilteredResult:state['AlignmentReducer']['filteredAlignmentProducts'] || [],
        AlignmentUpdateStatus:state['AlignmentReducer']['UPDATE_ALIGNMENT_RECORD_RESULT'] || [],
        exportResult:state['AlignmentReducer']['ALIGNMENT_EXPORT_RESULT'] || [],
        AlignmentImportStatus:state['AlignmentReducer']['IMPORT_ALIGNMENT_RESULT'] || [],
        AlignmentFilter:state['AlignmentReducer']['ALIGNMENT_FILTER_RESULT'] || [],
        InsertRes:state['AlignmentReducer']['INSERT_HCP_ADDRESS_RESULT'] || [],
        GroupReviewFilter:state['AlignmentReducer']['GROUP_REVIEW_FILTER_RESULT'] || [],
        selectedReviewCategory:state['AlignmentReducer']['SELECTED_UNIQUE_REVIEW'] || [],
        alignmentParams:state['AlignmentReducer']['ENABLE_BUTTON_DETAILS_RESULT'] || [],
        
    };
}

export default connect(mapStateToProps)(Alignment);
