import React from "react";
import {connect} from "react-redux"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar";
import List from "./List"
import * as ConstVal from "../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent ,DropDownListComponent} from '@syncfusion/ej2-react-dropdowns';
import Modal from "../Common/Modal";
import CustomPagination from "../Common/CustomPagination";
import axios from "axios"
import {Redirect} from "react-router-dom"
import moment from "moment";
import { Query } from '@syncfusion/ej2-data';
import { css } from 'glamor'
import Notification from "../Common/Notification";
const group = [  ];
const pageLimit=15;

//const pageSort="tst_src_id asc, reg_npi_nbr asc";
const pageSort="rec_created_ts desc,tst_source asc,reg_npi_nbr";
const sortorder="desc";

class Testing extends React.Component {
     
    constructor() {
        super();
        this.checkFields = { text: 'Name', value: 'Value' };
        this.state = {
            exampleItems:  [],
            pageOfItems: [],
            loader:false,
            checkbox: false,
            inputValue: "",
            submittedData:[],
            regNpiExistCheck:[],
            checkedItems:[],
            switchSort:false,
            checkedItemsId:[],
           
            filename:"",
            showImportModal1:"",
            selectedFile:"",
            showExport:"",
            exportFileName:"",
            currentPage:1,
            showNOData:false,
            showLoader:false,
            approvedList:[],
            pendingList:[],
            newList:[],
            inProgressList:[],
            rejectedList:[],
            submitList:[]


         };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        this.compareByDesc  =  this.compareByDesc.bind(this);
       
    }

    componentWillMount=() =>{
        document.title = 'Testing'
    }
    handleExportModalShowClick=(e)=> {
        e.preventDefault();
        this.setState({
            showExport: true
        })
      }
 
 
      handleImport1ModalShowClick=(e)=>{
        e.preventDefault();
        this.setState({
          showImportModal1: true
        })
      }
      
      handleModalCloseClick=(modelId)=> {
          
          let getmodelId= modelId && modelId.target ? modelId.target.id : "showImportModal1";
          if(getmodelId){
            this.setState({ [getmodelId]:false })
          }
          $('.modal.in').modal('hide')
          $('.modal-backdrop').remove()

          this.setState({ item:[] });
    
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
        this.setState({ showImportModal1:false })
        this.props.dispatch({
            type:"IMPORT_TESTING_FILE",
            
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
           
        //if(!this.props.RefPrefferedFilteredResult.length){
            let status = ["New","Submit","Pending","In_Progess"];
            console.log("status value",status)
            this.props.dispatch({
                type:"GET_REP_PREFFERD_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder,value: [status]}
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
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        
        let tstSource=this.dropDownListObjectTstSource.value;
        let tstSourceId=[this.dropDownListObjectTstSourceId.value];
        let fnLnNpi= [this.dropDownListObjectTstFnLnNpi.value];
        let comments=this.dropDownListObjectComment.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
       
         this.props.dispatch({
            type: 'FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [status,"",reviewdByDs,tstSource,tstSourceId,checkboxFilter,comments,fnLnNpi],data:this.state.checkedItemsId}
        })
        
    }
    setStatus=(id)=>{
        let element= document.getElementById(id);
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
    handleInput(e){
        console.log("changes target value",e.target.value)
       this.setState({[e.target.name]: e.target.value})
     
       let targetId = e.target.id.split("_");
       console.log("inside checked",e.target.id.split('_',3).join("_"))
       if(e.target.id.split('_',3).join("_")=="ex_us_flag"){
           console.log("inside checked",e.target.checked)
          this.setState({[e.target.name]: e.target.checked})  
       }
       console.log("selected status", document.getElementById("status_"+targetId[targetId.length-1]).value)
      
            let StatusAtt="";
            StatusAtt = document.querySelectorAll('[data-status-check="'+e.target.getAttribute("data-status-check")+'"]');
            if(e.target.name){
                let checkStatusChange=e.target.name;
                
                let res = checkStatusChange.split("_");
                /***on change of status change bg clr****/
                if(res[0]=="status"){
                    this.setStatus(e.target.id);
                }
            }


        /****testing selected records : on check of checkbox select checkbox with same src id********/
        let res = e.target.id.split("_");
        if( e.target.value!="Submit" && e.target.value!="In_Progress" && e.target.value!="Pending"){
            for (var i = 0; i < StatusAtt.length; i++) {
        
                if(StatusAtt[i].id!=e.target.id || StatusAtt.length==1){
                
                    let checkForStatus=StatusAtt[i].name.split("_");
                    this.setState({[StatusAtt[i].name]: StatusAtt[i].value})
                    if(checkForStatus[0]=="status"){
                        StatusAtt[i].classList.remove("reject-clr")
                        StatusAtt[i].classList.remove("in-progress-clr")
                        StatusAtt[i].classList.remove("pending-clr")
                        StatusAtt[i].classList.remove("approve-clr")
                        StatusAtt[i].classList.remove("submitted-clr")
                        StatusAtt[i].classList.remove("new-clr")

                        /***remove src from list****/

                        this.setState({approvedList:[],pendingList:[], newList:[], inProgressList:[],rejectedList:[], submitList:[]})
                    
                        /***remove src from list ****/

                        if(e.target.value=="Approved"){
                            StatusAtt[i].classList.add("approve-clr")
                            this.setState({approvedList:[e.target.getAttribute("data-status-check")+'_'+ res[res.length-1]],["status_clr_"+res[res.length-1]]:"Approved"})
                        }else if(e.target.value=="New"){
                            console.log("in case of new value",StatusAtt[i])
                            StatusAtt[i].classList.add("new-clr")
                            this.setState({newList:[...this.state.newList,e.target.getAttribute("data-status-check")+'_'+res[res.length-1]],["status_clr_"+res[res.length-1]]:"New"})
                        }else if(e.target.value=="Rejected"){
                            StatusAtt[i].classList.add("reject-clr")
                            this.setState({["status_clr_"+res[res.length-1]]:"Rejected"})
                            if(!this.state.approvedList.includes(e.target.getAttribute("data-status-check"))){
                                this.setState({rejectedList:[...this.state.rejectedList,e.target.getAttribute("data-status-check")+'_'+res[res.length-1]]})
                            }

                        }else if(e.target.value=="Pending"){
                            StatusAtt[i].classList.add("pending-clr")
                            this.setState({pendingList:[...this.state.pendingList,e.target.getAttribute("data-status-check")+'_'+ res[res.length-1]],["status_clr_"+res[res.length-1]]:"Pending"})
                        }else if(e.target.value=="In_Progress"){
                            StatusAtt[i].classList.add("in-progress-clr")
                            
                            this.setState({inProgressList:[...this.state.inProgressList,e.target.getAttribute("data-status-check")+'_'+ res[res.length-1]],["status_clr_"+res[res.length-1]]:"In_Progress"})
                        } else if(e.target.value=="Submit"){
                            StatusAtt[i].classList.add("submitted-clr")
                            this.setState({submitList:[...this.state.submitList,e.target.getAttribute("data-status-check")+'_'+ res[res.length-1]],["status_clr_"+res[res.length-1]]:"Submit"})
                        }
                    
                        this.setState({[StatusAtt[i].name]: e.target.value})
                    
                    }
                
                    this.setState({[StatusAtt[i].name]: e.target.value})
                    

                    if(checkForStatus[0]=="status" && e.target.value=="Approved" && StatusAtt.length>1){
                        
                        StatusAtt[i].classList.add("reject-clr")
                        this.setState({[StatusAtt[i].name]: "Rejected"})
                    }
                    let res1 = StatusAtt[i].id.split("_");
                    let getApprovedFlag="FALSE";
                    let resVariable=res1[res1.length-1];
                    let stat=e.target.value;
                    if( e.target.value=="Approved" ){
                        /***check for same source id***/
                        const srcindex =this.state.submittedData.filter(a => a.tst_src_id == e.target.getAttribute("data-status-check"));
                        if(srcindex.length>0){
                            let updatedsubmitdata=srcindex.map((val)=>{
                            console.log("tareget id check", res[res.length-1],val.id)
                                if(res[res.length-1]!=val.id){
                                    const srcUpdateindex = this.state.submittedData.findIndex((e) => e.id === val.id);
                                    
                                    val['approved_flag']="FALSE";
                                    val['status']="Rejected";
                                    this.state.submittedData[srcUpdateindex] = val;
                                }
                            })
                            
                        }

                        console.log("all values src id",this.state.submittedData)
                        /**check for same source id***/
                    }
                    if( e.target.value=="Approved" && StatusAtt.length>1){
                    
                        stat="Rejected";
                    }
                   
                        let obj1=this.getObj(resVariable,getApprovedFlag,stat);
                        const index = this.state.submittedData.findIndex((e) => e.id === obj1.id);
                        if (index === -1) {
                            this.state.submittedData.push(obj1);
                        } else {
                            this.state.submittedData[index] = obj1;
                        }
                    
                }else{
                

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
                  
                }
            }
        }
        /***in case of no multiple records****/
        if(!StatusAtt.length || e.target.value=="Submit" || e.target.value=="In_Progress" || e.target.value=="Pending"){
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
            
        }



    // console.log("get submitted data",this.state.submittedData,this.state)
        /***testing****/
    
        
        /****on change of checkbox****/
        
        if(res[0]=="check"){
            console.log("final submit data****",this.state.submittedData)
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
    /****in case of same source id remove all checked records *** */

                /***check for same source id***/
                let currSrcId =str.split("_");
                const srcToBeremoved =this.state.submittedData.filter(a => a.tst_src_id == currSrcId[1]);
                console.log("data to be removed",srcToBeremoved,currSrcId[1])
                if(srcToBeremoved.length>0){
                    srcToBeremoved.map((val)=>{
                        const srcRemoveindex = this.state.submittedData.findIndex((e) => e.id === val.id);
                            
                            if(srcRemoveindex >-1){
                                this.state.submittedData.splice(srcRemoveindex, 1);
                                }
                        })
                    }

                
                /**check for same source id***/

                /****in case of same source id***/
                    const indexToRemoveElement = this.state.submittedData.findIndex((e) => e.id == res[1]);
                    if(indexToRemoveElement >-1){
                        this.state.submittedData.splice(indexToRemoveElement, 1);
                    }
            console.log("final submit data",this.state.submittedData)
                /***************************************/
            
                this.setState({checkedItems:arrayDaya,checkedItemsId:arrayDataId})
            }

        
            this.setState({[e.target.name]: e.target.checked})
        }
        /****on chenge of checkbox *****/
         
            const checkNewStatus =this.state.submittedData.filter(a => a.status == "New");
            if(checkNewStatus.length>0){
                checkNewStatus.map((val)=>{
                    const recRemoveindex = this.state.submittedData.findIndex((e) => e.id === val.id);
                        
                        if(recRemoveindex >-1){
                            this.state.submittedData.splice(recRemoveindex, 1);
                            }
                    })
            }


       
    }
    getObj=(resVariable,getApprovedFlag,status)=>{

        let obj={"id":parseInt(document.getElementById("id_"+resVariable).innerText),
        "tst_src_id":document.getElementById("tst_src_id_"+resVariable).innerText,
        "src_npi_nbr":document.getElementById("src_npi_nbr_"+resVariable).innerText,
        "tst_source":document.getElementById("tst_source_"+resVariable).innerText,
        "src_fname":document.getElementById("src_fname_"+resVariable).innerText,
        "src_middlename":document.getElementById("src_middlename_"+resVariable).innerText,
        "src_lname":document.getElementById("src_lname_"+resVariable).innerText,
        "src_degree":document.getElementById("src_degree_"+resVariable).innerText,
        "src_email":document.getElementById("src_email_"+resVariable).innerText,
        "src_zipcode":document.getElementById("src_zipcode_"+resVariable).innerText,
        "src_city":document.getElementById("src_city_"+resVariable).innerText,
        "src_state":document.getElementById("src_state_"+resVariable).innerText,
        "src_org_name":document.getElementById("src_org_name_"+resVariable).innerText,
        "reg_npi_nbr":document.getElementById("reg_npi_nbr_"+resVariable).value,
        "reg_fname":document.getElementById("reg_fname_"+resVariable).value,
        "reg_middlename":document.getElementById("reg_middlename_"+resVariable).value,
        "reg_lname":document.getElementById("reg_lname_"+resVariable).value,
        "reg_credential":document.getElementById("reg_credential_"+resVariable).value,
        "reg_email":document.getElementById("reg_email_"+resVariable).value,
        "reg_zip":document.getElementById("reg_zip_"+resVariable).value,
        "reg_practise_city":document.getElementById("reg_practise_city_"+resVariable).value,
        "reg_practise_state":document.getElementById("reg_practise_state_"+resVariable).value,
        "reg_practise_city":document.getElementById("reg_practise_city_"+resVariable).value,
        "reg_practise_state":document.getElementById("reg_practise_state_"+resVariable).value,
        "reg_org_name":document.getElementById("reg_org_name_"+resVariable).value,
        "rec_created_ts":document.getElementById("rec_created_ts_"+resVariable).getAttribute('data-reccreatedts'),
        "rec_updated_ts":document.getElementById("rec_updated_ts_"+resVariable).innerText,
        "rec_updated_by":document.getElementById("rec_updated_by_"+resVariable).value,
        "status":status,
        "approved_flag":getApprovedFlag,
        "reviewd_by_ds":localStorage.fullname,
        "ex_us_flag":document.getElementById("ex_us_flag_"+resVariable).checked,
        "comments":document.getElementById("comments_"+resVariable).value,
        "mat_run_id":parseInt(document.getElementById("mat_run_id_"+resVariable).innerText)
        };


        if(!document.getElementById("reg_npi_nbr_"+resVariable).value && document.getElementById("status_"+resVariable).value=="Approved"){
            let objReg={
                "id":parseInt(document.getElementById("id_"+resVariable).innerText)
            };
           
            const index = this.state.regNpiExistCheck.findIndex((e) => e.id === objReg.id);
            if (index === -1) {
                this.state.regNpiExistCheck.push(objReg);
            } else {
                this.state.regNpiExistCheck[index] = objReg;
            }
        }
        if(document.getElementById("reg_npi_nbr_"+resVariable).value || document.getElementById("status_"+resVariable).value!="Approved"){
            let objReg={
                "id":parseInt(document.getElementById("id_"+resVariable).innerText)
            };
            const indexToRemoveRegElement = this.state.regNpiExistCheck.findIndex((e) => e.id == objReg.id);
            if(indexToRemoveRegElement >-1){
                this.state.regNpiExistCheck.splice(indexToRemoveRegElement, 1);
            }
        }

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
       
        
        if(this.state.regNpiExistCheck && this.state.regNpiExistCheck.length>0 ){
            toast(
                <Notification msg="NPI is missing in selected Records." headerText="Note !"></Notification>
               ,{
                 toastId: "warning_notification",
            })
           
            return false;
        }

      
    
        let status = this.dropDownListObject.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        
        let tstSource=this.dropDownListObjectTstSource.value;
        let tstSourceId=[this.dropDownListObjectTstSourceId.value];
        let fnLnNpi= [this.dropDownListObjectTstFnLnNpi.value];
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let comments=this.dropDownListObjectComment.value;
        let Filtervalue=[status,"",reviewdByDs,tstSource,tstSourceId,checkboxFilter,comments,fnLnNpi]
        this.props.dispatch({
            type:"UPDATE_SUBMITTED_RECORDS_REQUEST",
            payload:{data:this.state.submittedData,pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:this.state.checkedItemsId}
            
        });
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
             console.log("get submitted data",this.state.submittedData)
    }

    componentDidUpdate=() =>{
       
        if(this.props.resetTestingStatus!=""){
            this.props.dispatch({
                type:"UPDATE_RESET_TESTING_STATE",
               
            });
            
            

            for(let i=0;i<this.props.RefPrefferedFilteredResult.length;i++){
                
                  if(this.state.approvedList.find(a =>a.includes(this.props.RefPrefferedFilteredResult[i].tst_src_id)) && !this.state.approvedList.find(a =>a.includes(this.props.RefPrefferedFilteredResult[i].id))){
                    this.setState({["status_"+this.props.RefPrefferedFilteredResult[i].id]:"Rejected",["status_clr_"+this.props.RefPrefferedFilteredResult[i].id]:"Rejected"}) 
                  }else if(this.state.rejectedList.find(a =>a.includes(this.props.RefPrefferedFilteredResult[i].tst_src_id))){ 
                    this.setState({["status_"+this.props.RefPrefferedFilteredResult[i].id]:"Rejected",["status_clr_"+this.props.RefPrefferedFilteredResult[i].id]:"Rejected"}) 
                  }else if(this.state.submitList.find(a =>a.includes(this.props.RefPrefferedFilteredResult[i].tst_src_id))){  
                    this.setState({["status_"+this.props.RefPrefferedFilteredResult[i].id]:"Submit",["status_clr_"+this.props.RefPrefferedFilteredResult[i].id]:"Submit"}) 
                  }else if(this.state.pendingList.find(a =>a.includes(this.props.RefPrefferedFilteredResult[i].tst_src_id))){  
                    this.setState({["status_"+this.props.RefPrefferedFilteredResult[i].id]:"Pending",["status_clr_"+this.props.RefPrefferedFilteredResult[i].id]:"Pending"}) 
                  }else if(this.state.newList.find(a =>a.includes(this.props.RefPrefferedFilteredResult[i].tst_src_id))){  
                    this.setState({["status_"+this.props.RefPrefferedFilteredResult[i].id]:"New",["status_clr_"+this.props.RefPrefferedFilteredResult[i].id]:"New"}) 
                  }else if(this.state.inProgressList.find(a =>a.includes(this.props.RefPrefferedFilteredResult[i].tst_src_id))){   
                    this.setState({["status_"+this.props.RefPrefferedFilteredResult[i].id]:"In_Progress",["status_clr_"+this.props.RefPrefferedFilteredResult[i].id]:"In_Progress"}) 
                  }

            }
         
        }
        if(this.props.RefPrefferedUpdateStatus!="" ) {
           
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
           
            this.props.dispatch({
                type:"UPDATE_UPDATED_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_TESTING_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_TESTING_MAPPING_FILTER",
            })
            
        }
        if(this.props.RefPrefferedImportStatus!="" ) {

           if(this.props.ImporResponseStatus==200){
                toast(
                    <Notification msg={this.props.RefPrefferedImportMsg ? this.props.RefPrefferedImportMsg : "File Uploaded Successfully"} headerText=""></Notification>
                ,{
                    toastId: "success_notification",
                })
            }else{
                toast(
                    <Notification msg={this.props.RefPrefferedImportMsg ? this.props.RefPrefferedImportMsg : "Import Failed"} headerText=""></Notification>
                ,{
                    toastId: "error_notification",
                })

            }  
            this.props.dispatch({
                type:"UPDATE_IMPORT_RESULT_STATE",
               
            });
         
            this.props.dispatch({
                type:"GET_TESTING_FILTER_RESULT",
            })
           this.props.dispatch({
                type:"GET_TESTING_MAPPING_FILTER",
            })
            
        }
        if(this.props.exportResult!="" ) {
           
           let Filename= this.state.exportFileName+".csv";
           this.saveDataToFile(this.props.exportResult,Filename,'text/csv');
            this.setState({exportFileName:""})
            this.props.dispatch({
                type:"UPDATE_EXPORT_RESULT_STATE",
               
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
    showRegPopup=(e)=>{
        
        e.preventDefault();
        this.setState({
            [e.target.id]: true
        })
          
    }

  
    /***search reg no ****/
    autocomplete=(evt)=>{
        
      /*  if( document.getElementById("noData")){
            console.log("inside ul log")
            document.getElementById("noData").children[0].style.display = "none";
        }*/
       
        let text = evt.target.value;
        this.setState({ item: {id: text } })
        let showNOData=false;
      
        if(text.length > 4){
          
            let showLoader=true;
            this.setState({showLoader:showLoader })
            
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/getNPIData/${text}`, {
                headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
              })
              .then((res) => {
                 
                  let data=res.data;
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
      
        const {product,speciality,acct_exists_in_customer_master,retro_call_date__c,tot_pat_count,last_rx_date,first_rx_date, provider_first_name, id, provider_last_name_legal_name, provider_middle_name,provider_business_practice_location_address_city_name,provider_business_practice_location_address_state_name,provider_business_practice_location_address_postal_code,provider_credential_text ,provider_other_organization_name,provider_first_line_business_practice_location_address,provider_business_practice_location_address_telephone_number} = selectedItem;
        this.setState({ item: {product,speciality,acct_exists_in_customer_master,tot_pat_count,retro_call_date__c,last_rx_date, first_rx_date,provider_first_name, id, provider_last_name_legal_name, provider_middle_name,provider_business_practice_location_address_city_name,provider_business_practice_location_address_state_name,provider_business_practice_location_address_postal_code,provider_credential_text,provider_other_organization_name,provider_first_line_business_practice_location_address,provider_business_practice_location_address_telephone_number} });
        this.setState({ searchItems: [] });
    }
    handleRegistryClick=(arg)=>{
   
        let regNO=this.state.item.id;
        let firstName=this.state.item.provider_first_name;
        let middleName=this.state.item.provider_middle_name;
        let lastName=this.state.item.provider_last_name_legal_name;
        let city=this.state.item.provider_business_practice_location_address_city_name;
        let state=this.state.item.provider_business_practice_location_address_state_name;
        let zipcode=this.state.item.provider_business_practice_location_address_postal_code;
        let degree=this.state.item.provider_credential_text;
        let org_name=this.state.item.provider_other_organization_name;

        
        
        let res = arg.modelId.split("_");
     
        
        this.setState({ item:[] });
        if(regNO){
            this.setState({["reg_npi_nbr_"+res[2]]:regNO,
                            ["reg_fname_"+res[2]]:firstName,
                            ["reg_middlename_"+res[2]]:middleName,
                            ["reg_lname_"+res[2]]:lastName,
                            ["reg_practise_city_"+res[2]]:city,
                            ["reg_practise_state_"+res[2]]:state,
                            ["reg_zip_"+res[2]]:zipcode,
                            ["reg_credential_"+res[2]]:degree,
                            ["reg_org_name_"+res[2]]:org_name,
                            ["status_"+res[2]]:"Submit",
                            ["reg_popup_"+res[2]]:false,
                            ["row_dis_"+res[2]]:true,
                        },()=>{
                            
                             this.updateSubmitState(res[2]);
            })
        }
       
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
   
    }
    updateSubmitState=(id)=>{
     /***on change of status change bg clr****/
        let element= document.getElementById("status_"+id);
        element.classList.add("submitted-clr")
        let getApprovedFlag=document.getElementById("status_"+id).value =="Approved" ? "TRUE" : "FALSE";
   
        let status=document.getElementById("status_"+id).value;
       
            let obj=this.getObj(id,getApprovedFlag,status);
            const index = this.state.submittedData.findIndex((e) => e.id === obj.id);
            if (index === -1) {
                this.state.submittedData.push(obj);
            } else {
                this.state.submittedData[index] = obj;
            }

            if(document.getElementById("reg_npi_nbr_"+id).value){
                let objReg={
                    "id":parseInt(document.getElementById("id_"+id).innerText)
                };
            

                const indexToRemoveRegElement = this.state.regNpiExistCheck.findIndex((e) => e.id == objReg.id);
                if(indexToRemoveRegElement >-1){
                    this.state.regNpiExistCheck.splice(indexToRemoveRegElement, 1);
                }
            

            }
        
            /***testing****/
            const checkNewStatus =this.state.submittedData.filter(a => a.status == "New");
            if(checkNewStatus.length>0){
                checkNewStatus.map((val)=>{
                    const recRemoveindex = this.state.submittedData.findIndex((e) => e.id === val.id);
                        
                        if(recRemoveindex >-1){
                            this.state.submittedData.splice(recRemoveindex, 1);
                            }
                    })
            }     
    }

     /***search reg no ****/

     exportTesting=()=>{
        document.getElementById('errorMsg').style.display="none";
        if(!document.getElementById('exortFile').value){
            document.getElementById('errorMsg').style.display="block";
            return false;
        }
      
        this.setState({exportFileName:document.getElementById('exortFile').value})
          /***close modal****/
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
        this.setState({ showExport:false })
        /***close modal****/
        let status = this.dropDownListObject.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let comments=this.dropDownListObjectComment.value;
        let tstSource=this.dropDownListObjectTstSource.value;
        let tstSourceId=[this.dropDownListObjectTstSourceId.value];
        let checkboxFilter=this.dropDownListObjectCheckbox.value;
        let fnLnNpi= [this.dropDownListObjectTstFnLnNpi.value];
        let Filtervalue=[status,"",reviewdByDs,tstSource,tstSourceId,checkboxFilter,comments,fnLnNpi];

        this.props.dispatch({
            type:"TESTING_EXPORT",
            payload:{pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:this.state.checkedItemsId}
        })

     }
     onPageChanged = data => {
      /****set testing status***/
      let totalCount=this.props.RefPrefferedFilteredResult.length;
      let getAllrecordsForsrcId=this.props.RefPrefferedFilteredResult[totalCount-1] ? this.props.RefPrefferedFilteredResult[totalCount-1].tst_src_id :"";
      console.log("source id",getAllrecordsForsrcId)
      let StatusAtt="";
       StatusAtt = document.querySelectorAll('[data-status-check="'+getAllrecordsForsrcId+'"]');
       this.setState({['testing_status_srcid']:getAllrecordsForsrcId})

        let status = this.dropDownListObject.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let tstSource=this.dropDownListObjectTstSource.value;
        let tstSourceId=[this.dropDownListObjectTstSourceId.value];
        let fnLnNpi= [this.dropDownListObjectTstFnLnNpi.value];
        let comments=this.dropDownListObjectComment.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
      

        this.setState({currentPage:data.currentPage});
        this.props.dispatch({
            type:"GET_REP_PREFFERD_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,sortorder:sortorder,value: [status,"",reviewdByDs,tstSource,tstSourceId,checkboxFilter,comments,fnLnNpi],data:this.state.checkedItemsId}
        })
    
      }

    switchToAudit =(e)=>{
      

        if(e.target.checked){
          
            this.props.history.push("testing-auditing");
          
        }
    }
    onFiltering=(args)=>{
        let query = new Query();
        query = (args.text !== "") ? query.where("", "contains", args.text, true) : query;
        args.updateData(this.props.testingFilter.src_hcp_fn_ln_npi, query);

    }
    refreshFilter=()=>{
        this.dropDownListObject.value=this.props.testingFilter ? this.props.testingFilter.status : [];
        this.dropDownListObjectReviewer.value=this.props.testingFilter ? this.props.testingFilter.reviewd_by_ds : [];
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
        let SelectedTestSource=(this.dropDownListObjectTstSource.value && this.dropDownListObjectTstSource.value.length > 0 ) ? this.dropDownListObjectTstSource.value : (this.props.testingNpiFilter ? Object.keys(this.props.testingNpiFilter): []);
        
        this.props.dispatch({
            type:"GET_MAPPING_FILTERS",
            payload:{SelectedTestSource:SelectedTestSource,testingNpiFilter:this.props.testingNpiFilter,testingTetsSourceFilter:this.props.testingTetsSourceFilter}
        })
    }
    
    render() {
       
        let products= this.props.RefPrefferedFilteredResult;
        
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={1}/>
           
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Testing</h2>
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

           {/***  <div className="container main margin-l-ipad col-xl-11 col-lg-11 col-11 cont-div">***/}
                <div className="main-div">
                    <div className="no-padding product-filter col-xl-12 col-lg-12 col-12">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5 ">
                           
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
                                            <span className="cross-btn cross-btn-test-source" onClick={()=>{this.removeSelectedValues(this.dropDownListObjectTstSourceId)}}></span>
                                            <DropDownListComponent  mode="Default" maximumSelectionLength={1} ref={(dropdownlist) => { this.dropDownListObjectTstSourceId = dropdownlist; }} className="filter-select"  id="testSouceId" 
                                                    fields={this.fields}  allowFiltering={true} dataSource={this.props.selectedTestId ? this.props.selectedTestId : ""} placeholder="Select Test Source ID"  >
                                                    
                                            </DropDownListComponent>
                                        </div>

                                    </div>
                                    <div className="col-xl-4 col-lg-3 col-md-10  p-0">
                                        <div className="col-xl-12  col-lg-12 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-npi">
                                            
                                            <span className="drp-lable-testing">Search NPI Or Name</span>
                                            <span className="cross-btn" onClick={()=>{this.removeSelectedValues(this.dropDownListObjectTstFnLnNpi)}}></span>
                                            <DropDownListComponent   filtering={this.onFiltering = this.onFiltering.bind(this)} mode="Default"  ref={(dropdownlist) => { this.dropDownListObjectTstFnLnNpi = dropdownlist; }} className="filter-select"  id="npiSearch" 
                                                    fields={this.fields}  allowFiltering={true} dataSource={this.props.selectedNPI ? this.props.selectedNPI : ""} placeholder="Search NPI Or Name"  >
                                                
                                            </DropDownListComponent>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                        
                            <div className="col-xl-5 col-lg-8 col-md-10  ">
                                <div className="row">
                                
                                    <div className="col-xl-4  col-lg-3 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-test-status">
                                        <span className="drp-lable-testing">Status</span>

                                        <MultiSelectComponent value={this.props.testingFilter ? this.props.testingFilter.filteredStatus : ""} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="status" dataSource={this.props.testingFilter ? this.props.testingFilter.status : ""}
                                            fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                            <Inject services={[CheckBoxSelection]} />
                                        </MultiSelectComponent>
                                        
                                    </div>
                                
                                    <div className="col-xl-4  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-reviewer">
                                        
                                        <span className="drp-lable-testing">Reviewer</span>
                                        <MultiSelectComponent value={this.props.testingFilter ? this.props.testingFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.testingFilter ? this.props.testingFilter.reviewd_by_ds : ""}
                                            fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                            <Inject services={[CheckBoxSelection]} />
                                        </MultiSelectComponent>
                                    </div>
                                    <div className="col-xl-4  col-lg-2 col-md-2 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 pr-0 select-wrapper select-wrapper-test-source">
                                    
                                        <span className="drp-lable-testing">Rule</span>
                                        <MultiSelectComponent value={this.props.testingFilter ? this.props.testingFilter.Rule : ""} ref={(scope) => { this.dropDownListObjectComment = scope; }} className="filter-select"  id="comment" dataSource={this.props.testingFilter ? this.props.testingFilter.Rule : ""}
                                            fields={this.fields} placeholder="Select Rule" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                            <Inject services={[CheckBoxSelection]} />
                                        </MultiSelectComponent>
                                    </div>
                            </div>
                        </div> 
                        <div className="col-xl-2 col-lg-8 col-md-10" >
                            <div className="row">      
                                    

                                    <div className="col-xl-8  col-lg-3 col-md-3 col-sm-6 col-5 select-wrapper-checkbox test-checkbox-wrapp mb-2 mb-md-2 mb-lg-0">
                                        <span className="drp-lable-testing">Checkbox Filter</span>
                                        <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={[{ Name: 'TRUE', Value: 'Checked' },{ Name: 'FALSE', Value: 'Unchecked' }] }
                                            fields={this.checkFields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={false}>
                                            <Inject services={[CheckBoxSelection]} />
                                        </MultiSelectComponent>
                                        
                                    </div>
                                    <div className="pl-0 row col-xl-4  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                                       
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
                            <th rowSpan="2" className="text-center sticky-col check-col vertical-align">#</th>
                            <th rowSpan="2" className="text-center sticky-col first-col vertical-align">Source</th>
                            <th rowSpan="2" className="text-center sticky-col second-col vertical-align" >Source ID</th>
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
                            <th rowSpan="2"  className="text-center vertical-align">Comments</th>
                            <th rowSpan="2"  className="text-center vertical-align">Record Date</th>
                            <th rowSpan="2"  className="text-center sticky-col status-col vertical-align">Status</th>
                            <th rowSpan="2"  className="text-center reviewed-by-col sticky-col vertical-align" >Reviewer</th>
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
                        <List testingApprovedRecords={this.props.testingApprovedRecords} onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} handleRegistryClick={this.handleRegistryClick} showLoader={this.state.showLoader} selectItem={this.selectItem} showNOData={this.state.showNOData} searchItems={this.state.searchItems} item={this.state.item} autocomplete={(e)=>{this.autocomplete(e)}} handleModalCloseClick={this.handleModalCloseClick}  list={products} onChangeInput={e => { this.handleInput(e)}}  onClickShowPopup={e => { this.showRegPopup(e)}} props={this.state} Modal={Modal} />
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                        
                    </tbody>
                </table>
               
                    <ToastContainer />
                   
                    { products.length ? <CustomPagination totalRecords={this.props.testingListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                   
                </div>
            
                { products.length ? (!this.props.loader ? 
                    <div className="btn-align row">
                        <div>
                            <button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Update</button>
                        </div>
                        
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleExportModalShowClick} >Export</button>
                        </div>
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleImport1ModalShowClick} >Import</button>
                        </div>
                    </div> 
                : "") : ""}
                  {this.state.showExport ? (
                    <Modal  handleModalCloseClick={this.handleModalCloseClick} handleExportClick={this.exportTesting} modelId="showExport" text={"Export"} classname={"modal-import-export"}>
                       
                        <div className="form-group">
                            <label for="fileName">File Name</label>
                            <input type="text" className="form-control" id="exortFile" defaultValue={"Testing_"+moment().format("YYYYMMDD")} placeholder="File Name"/>
                            <span id="errorMsg" className="errorMsg" style={{"display":"none"}}>Enter File Name</span>
                        </div>
                    </Modal>
               ) : null}
                
                {this.state.showImportModal1 ? (
                    <Modal  handleModalCloseClick={this.handleModalCloseClick} handleImport1Click={this.Import} modelId="showImportModal1" text={"Import"} classname={"modal-import-export"}>
                        <div className="form-group">
                        <input type="file"  ref="fileUploader"  className="" id="customFile" onChange={(e)=>this.OnchangeOfImportFile(e)} />
                        <span id="errorImportMsg" className="errorMsg" style={{"display":"none"}}>Select File</span>
                        <span id="errorImportFileSize" className="errorMsg" style={{"display":"none"}}>{ConstVal.fileSizeErr}</span>
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
        loader:state['DataStewardshipTestingReducer']['loader'] || false,
        RefPrefferedList:state['DataStewardshipTestingReducer']['REP_PREFFERD_RESULT'] || [],
        RefPrefferedFilteredResult:state['DataStewardshipTestingReducer']['filteredProducts'] || [],
        RefPrefferedUpdateStatus:state['DataStewardshipTestingReducer']['UPDATE_RECORD_RESULT'] || [],
        RefPrefferedImportStatus:state['DataStewardshipTestingReducer']['IMPORT_TESTING_RESULT'] || [],
        ImporResponseStatus:state['DataStewardshipTestingReducer']['IMPORT_TESTING_STATUS'] || "",
        RefPrefferedImportMsg:state['DataStewardshipTestingReducer']['IMPORT_TESTING_MSG'] ||"",
        exportResult:state['DataStewardshipTestingReducer']['EXPORT_RESULT'] || [],
        testingFilter:state['DataStewardshipTestingReducer']['TESTING_FILTER_RESULT'] || [],
        testingNpiFilter:state['DataStewardshipTestingReducer']['TESTING_MAPPING_NPI_FILTER_RESULT'] || [],
        selectedNPI:state['DataStewardshipTestingReducer']['TESTING_SELECTED_NPI'] || [],
        selectedTestId:state['DataStewardshipTestingReducer']['TESTING_SELECTED_TEST_ID'] || [],
        testingApprovedRecords:state['DataStewardshipTestingReducer']['TESTING_APPROVED_RECORDS'] || [],
        testingTetsSourceFilter:state['DataStewardshipTestingReducer']['TESTING_MAPPING_TESTSOURCE_FILTER_RESULT'] || [],
        testingListTotal:state['DataStewardshipTestingReducer']['TESTING_TOTAL'] || [],
        resetTestingStatus:state['DataStewardshipTestingReducer']['RESET_TESTING_STATUS'] || [],
        
        
    };
}

export default connect(mapStateToProps)(Testing);
