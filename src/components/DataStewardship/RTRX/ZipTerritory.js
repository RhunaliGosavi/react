import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "./ZipTerritoryList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import moment from "moment";
import Notification from "../../Common/Notification";
import { compose } from "glamor";
import * as validation from "../../Common/Validations"
import axios from "axios"
const group = [  ];
const pageLimit=15;
const pageSort="1";
const sortorder="desc";
class ZipTerritory extends React.Component {
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
            errors:[],
            zipSearchItems:[],
            zipShowNOData:false,
            zipItem:'',
            zipSelectItem:'',
            terrShowloader:false,
            zipTerrId:[],
            terrInsertShowloader:false
         };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        this.compareByDesc  =  this.compareByDesc.bind(this);
    }
    componentWillMount=() =>{
        document.title = 'Zip Territory'
    }
    
    handleInsertModalShowClick=(e)=> {
        e.preventDefault();
        this.setState({
            showInserModal: true
        })
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

        
        let salesForceName = this.dropDownListObject.value;
        let rigion = this.dropDownListObjectRegion.value;
        let district = this.dropDownListObjectDistrict.value;
        let terrName=this.dropDownListObjectTerrName.value;
        let status=this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value;
        let selectedZip=document.getElementById('npi-autocomplete').value;
        let Filtervalue= [salesForceName,rigion,district,reviewdByDs,checkboxFilter,terrName,status,selectedZip];
        let checkedIds=this.state.checkedItemsId;
        this.props.dispatch({
            type:"ZIP_TERR_EXPORT",
            payload:{pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
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
            type:"IMPORT_ZIP_TERR_FILE",
            payload:{pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:0,file:this.state.selectedFile}
            
        })
      
       
    }
  
    InsertZipTerr=()=>{
     
		var errors = [];
		if (document.getElementById('zip_code').value === "") {
			errors.push("zip_code");
		}
        if (document.getElementById('territory_id').value === "") {
			errors.push("territory_id");
		}
        if (document.getElementById('territory_name').value === "") {
			errors.push("territory_name");
		}
        if (document.getElementById('district_id').value === "") {
			errors.push("district_id");
		}
        if (document.getElementById('district_name').value === "") {
			errors.push("district_name");
		}
        if (document.getElementById('region_id').value === "") {
			errors.push("region_id");
		}
        if (document.getElementById('region_name').value === "") {
			errors.push("region_name");
		}
        if (document.getElementById('sales_force_id').value === "") {
			errors.push("sales_force_id");
		}
        if (document.getElementById('sales_force_name').value === "") {
			errors.push("sales_force_name");
		}
        if (document.getElementById('alignment_quarter').value === "") {
			errors.push("alignment_quarter");
		}
        if (document.getElementById('alignment_year').value === "") {
			errors.push("alignment_year");
		}
      /*  if (document.getElementById('comment').value === "") {
			errors.push("comment");
		}*/
			
		
			this.setState({
			errors: errors
			});
		
			if (errors.length > 0) {
			return false;
			}
        
        let currentdate = new Date();
        let insetObj = {
             "DATA": [ {
                    "ZT_ZIP_CODE":document.getElementById("zip_code").value ,
                    "ZT_TERR_ID":document.getElementById("territory_id").value,
                    "ZT_TERR_NAME":document.getElementById("territory_name").value,
                    "ZT_DISTRICT_ID":document.getElementById("district_id").value,
                    "ZT_DISTRICT_NAME":document.getElementById("district_name").value,
                    "ZT_REGION_ID":document.getElementById("region_id").value,
                    "ZT_REGION_NAME":document.getElementById("region_name").value,
                    "ZT_SALES_FORCE_ID":document.getElementById("sales_force_id").value,
                    "ZT_SALES_FORCE_NAME":document.getElementById("sales_force_name").value,
                    "ZT_ALIGNMENT_QTR":document.getElementById("alignment_quarter").value,
                    "ZT_ALIGNMENT_YEAR":document.getElementById("alignment_year").value,
                    "REC_CREATED_TS":currentdate.toISOString(),
                    "REC_UPDATED_TS":currentdate.toISOString(),
                    "REC_UPDATED_BY":"INTERFACE",
                    "STATUS":"Submit",
                    "APPROVED_FLAG":"FALSE",
                    "REVIEWD_BY_DS":localStorage.fullname,
                    "COMMENTS":document.getElementById("comment").value,

                }]
           };
           this.setState({ showInserModal:false })
           $('.modal.in').modal('hide')
           $('.modal-backdrop').remove()

           this.props.dispatch({
            type:"INSERT_ZIP_TERR",
            payload:insetObj
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
               //if(!this.props.ZipTerrFilteredResult.length){
            /****get Zip Terr ids****/
            /*axios.get(`${process.env.REACT_APP_API_BASE_URL}/zipterr/terr/all`, {
                headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
              })
              .then((res) => {
                  
                let data=res.data.DATA ? Object.keys(res.data.DATA) : [];
                this.setState({zipTerrId:data});
               
                }, (error) => {
                console.log(error);
               
              });
            this.props.dispatch({
                type:"GET_ZIP_TERR_LIST",
            })*/
            /*************************/
            this.props.dispatch({
                type:"GET_ZIP_ENABLE_BUTTON_DETAILS",
            });
            this.props.dispatch({
                type:"GET_ZIP_TERR_LIST",
            })
            this.props.dispatch({
                type:"GET_ZIP_TERR_DATA",
                 payload:{pagestart:1,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_INSERT_FILTER_RESULT",
            })
        //}
        
        
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
        let status=this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value;
        let selectedZip=document.getElementById('npi-autocomplete').value;

        
         this.props.dispatch({
            type: 'ZIPP_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,sortorder:sortorder,pagelimit:pageLimit,value: [salesForceName,rigion,district,reviewdByDs,checkboxFilter,terrName,status,selectedZip],data:this.state.checkedItemsId}
        })
        
    }
    
    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
        if(e.target.name){
        /**on change of terr id***/
        let str=e.target.name;
        var arr = str.split("_");      // Split the string using dot as separator
        var lastIndex = arr.pop();       // Get last element
        var zipTerrName = arr.join("_"); 
        if(zipTerrName=="zt_terr_id"){
            this.setState({terrShowloader:true});
            console.log("inside val");
            let zipTerrId=e.target.value;
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/zipterr/terr/${zipTerrId}`, {
                headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
              })
              .then((res) => {
                  
                let data=res.data.DATA[zipTerrId];
                  console.log("data",data);
               
                // this.setState({ item:[] });
               
                    this.setState({["zt_district_id_"+lastIndex]:data.zt_district_id,
                                    ["zt_terr_name_"+lastIndex]:data.zt_terr_name,
                                    ["zt_region_id_"+lastIndex]:data.zt_region_id,
                                    ["zt_region_name_"+lastIndex]:data.zt_region_name,
                                    ["zt_terr_id_"+lastIndex]:data.zt_terr_id,
                                    ["zt_district_name_"+lastIndex]:data.zt_district_name,
                                },()=>{
                                    
                                    // this.updateSubmitState(res[2]);
                    })
                    this.setState({terrShowloader:false});
               
            }, (error) => {
                console.log(error);
                this.setState({terrShowloader:false});
              });

        }
        
        /***on change of terr id **/
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
        "comments":document.getElementById("comments_"+resVariable).value,
        "mat_run_id":parseInt(document.getElementById("mat_run_id_"+resVariable).innerText),
        "rec_created_ts":document.getElementById("rec_created_ts_"+resVariable).getAttribute('data-reccreatedts'),
        "rec_updated_by":document.getElementById("rec_updated_by_"+resVariable).value,
        "rec_updated_ts":document.getElementById("rec_updated_ts_"+resVariable).innerText,
        "status":status,
        "approved_flag":getApprovedFlag,
        "reviewd_by_ds":localStorage.fullname,
        "zt_alignment_qtr":document.getElementById("zt_alignment_qtr_"+resVariable).innerText,
        "zt_alignment_year":document.getElementById("zt_alignment_year_"+resVariable).innerText,
        "zt_district_id":document.getElementById("zt_district_id_"+resVariable).value,
        "zt_district_name":document.getElementById("zt_district_name_"+resVariable).value,
        "zt_region_id":document.getElementById("zt_region_id_"+resVariable).value,
        "zt_region_name":document.getElementById("zt_region_name_"+resVariable).value,
        "zt_sales_force_id":document.getElementById("zt_sales_force_id_"+resVariable).innerText,
        "zt_sales_force_name":document.getElementById("zt_sales_force_name_"+resVariable).innerText,
        "zt_terr_id":document.getElementById("zt_terr_id_"+resVariable).value,
        "zt_terr_name":document.getElementById("zt_terr_name_"+resVariable).value,
        
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
    

        let salesForceName = this.dropDownListObject.value;
        let rigion = this.dropDownListObjectRegion.value;
        let district = this.dropDownListObjectDistrict.value;
        let terrName=this.dropDownListObjectTerrName.value;
        let status=this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        let selectedZip=document.getElementById('npi-autocomplete').value;
        let Filtervalue= [salesForceName,rigion,district,reviewdByDs,checkboxFilter,terrName,status,selectedZip];
        let checkedIds=this.state.checkedItemsId;
        

       this.props.dispatch({
            type:"UPDATE_ZIP_TERR_RECORDS_REQUEST",
            payload:{data:this.state.submittedData,pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
            
       });

     
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
        
        if(this.props.RefPrefferedUpdateStatus!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_ZIP_TERR_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_FILTER_RESULT",
            })
            
        }
        if(this.props.InsertRes!="" ) {
            
            toast(
                <Notification msg="Data Inserted Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_ZIP_TERR_INSERT_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_FILTER_RESULT",
                })
            
        }
        if(this.props.exportResult!="" ) {
            let Filename= this.state.exportFileName+".csv";
 
             this.saveDataToFile(this.props.exportResult,Filename,'text/csv');
             this.setState({exportFileName:""})
             this.props.dispatch({
                 type:"ZIP_TERR_EXPORT_RESULT_STATE",
                
             });
         
             
        }
        if(this.props.zipTerrImportStatus!="" ) {
            
            toast(
                <Notification msg="File Uploaded Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_IMPORT_ZIP_TERR_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_ZIP_TERR_DATA",
                 payload:{pagestart:1,pagelimit:pageLimit,sortorder:sortorder,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_FILTER_RESULT",
            })
            
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

    getData=(val)=>{
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
        this.handleModalCloseClick()

        this.props.dispatch({
            type:"UPDATE_EXCEL_DATA",
            payload:val
        })
    }
    onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
        let salesForceName = this.dropDownListObject.value;
        let rigion = this.dropDownListObjectRegion.value;
        let district = this.dropDownListObjectDistrict.value;
        let terrName=this.dropDownListObjectTerrName.value;
        let status=this.dropDownListObjectStatus.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let checkboxFilter=this.dropDownListObjectCheckbox.value;
        let selectedZip=document.getElementById('npi-autocomplete').value;
        this.props.dispatch({
            type:"GET_ZIP_TERR_DATA",
            payload:{pagestart:data.currentPage,sortorder:sortorder,pagelimit:pageLimit,pageSort:pageSort,value: [salesForceName,rigion,district,reviewdByDs,checkboxFilter,terrName,status,selectedZip],data:this.state.checkedItemsId}
        })
      
      }
      populateSalesForceName=(e)=>{
        let sorceId=e.target.value;
       
        this.setState({sourceName:this.props.InsertZipTerrFilter[sorceId]})

      }
      hasError(key) {
	/*	document.getElementById("usernamePasswordRequired") && document.getElementById("usernamePasswordRequired").classList.add("hide-error");
		//document.getElementById("login-loader") && document.getElementById("login-loader").classList.add("hide-error");
		if(this.state.errors.indexOf(key) !== -1){
			document.getElementById("login-loader") && document.getElementById("login-loader").classList.add("hide-error");	
		}*/
		return this.state.errors.indexOf(key) !== -1;
	}
    switchToAudit =(e)=>{
        

        if(e.target.checked){
          
            this.props.history.push("zip-territory-auditing");
          
        }
    }
    refreshFilter=()=>{
        this.dropDownListObject.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_sales_force_name : [];
        this.dropDownListObjectRegion.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_region_name : [];
        this.dropDownListObjectDistrict.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_district_name : [];
        this.dropDownListObjectTerrName.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_terr_name : [];
        this.dropDownListObjectStatus.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.status : [];
        this.dropDownListObjectReviewer.value=this.props.zipTerrFilter ? this.props.zipTerrFilter.reviewd_by_ds : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
        this.setState({ zipSearchItems: [],zipItem:"",zipShowNOData:false });

    }
    onClickShowCommentPopup=(e)=>{
        e.preventDefault();
        let res = e.target.id.split("_");
        this.setState({
            ["comments_popup"+res[1]]: true
        })
    }

     /**********ZIP search*******/
     zipSelectItem=(args)=>{
        const { zipSearchItems } = this.state;
        let selectedItem = zipSearchItems.find(item => item === args);
        console.log("zip code",selectedItem);
        
        this.setState({ zipItem: {id:selectedItem} ,zipSearchItems: []});
 
    }
    zipAutocomplete=(evt)=>{

        let text = evt.target.value;
        this.setState({ zipItem: {id: text } })
        let showNOData=false;
      
        if(text.length > 2){
          
            let showLoader=true;
            this.setState({zipShowLoader:showLoader })
            
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/zipterr/${text}`, {
                headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
              })
              .then((res) => {
                 
                  let data=Object.keys(res.data.DATA);
                  showLoader=false;
                  if(data.length==0){
                      showNOData=true;
                  }
                this.setState({ zipSearchItems: data,zipShowNOData:showNOData ,zipShowLoader:showLoader});
              }, (error) => {
                console.log(error);
              });
  
           
        }else{
           
            this.setState({ zipSearchItems: [],zipShowNOData:false ,zipShowLoader:false});
        }
    }

    removeSelectedValues=()=>{
       
        this.setState({ zipSearchItems: [],zipItem:"",zipShowNOData:false });
     }
     /**insert form on change of terr id ***/
     getTerrData=(e)=>{
        let zipTerrId=e.target.value;
        this.setState({terrInsertShowloader:true});
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/zipterr/terr/${zipTerrId}`, {
            headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
          })
          .then((res) => {
              console.log("inside")
            let data=res.data.DATA[zipTerrId];
              console.log("data",data);
           
            // this.setState({ item:[] });
           
                this.setState({["district_id"]:data.zt_district_id,
                                ["territory_name"]:data.zt_terr_name,
                                ["region_id"]:data.zt_region_id,
                                ["region_name"]:data.zt_region_name,
                                ["territory_id"]:data.zt_terr_id,
                                ["district_name"]:data.zt_district_name,
                            },()=>{
                                
                                // this.updateSubmitState(res[2]);
                })
                this.setState({terrInsertShowloader:false});
           
        }, (error) => {
            console.log(error);
            this.setState({terrInsertShowloader:false});
          });

     }

     onTerrInputChange=(e)=>{
        this.setState({[e.target.id]: e.target.value})
     }

     render() {
     
        let products= this.props.ZipTerrFilteredResult;
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={0}/>
         
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <div className="col-lg-12">
                             <h2 className="page-title-strwardship-note">Data Steward Interface - ZIP Territory</h2>
                        </div>
                        <div className="col-lg-12 qtr-alignmnt"><p>
                         {/*ZIP Territory is freezed for the current quarter , if last Q , date bet 15 to last date */}
                        {this.props.zipParams && this.props.zipParams.NOTE_FLAG  && this.props.zipParams.NOTE_FLAG.toLowerCase()=="true" ? this.props.zipParams.NOTE : <p>&nbsp;</p>  }</p></div>
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
           
           

            {(this.props.loader || this.state.terrShowloader) && <div className="Dataloader" >
                <img className="login-logo" src={ConstVal.deployment+"/assets/img/ajax-loader.gif"} />
             </div>	
            }


            {/***  Tabs ***/}

           {/***  <div className="container main margin-l-ipad col-lg-11 col-11 cont-div">****/}
           <div className="main-div">
                <div className="no-padding product-filter col-lg-12 col-12">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-11  pl-0">
                        <div className="row">
                            <div className="col-xl-6  col-lg-6 col-md-3 col-sm-6  col-5  select-wrapper-ts-id select-wrapper-sales-zip">
                                <span className="drp-lable">Sales Force</span>
                            
                                <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_sales_force_name : ""} ref={(scope) => { this.dropDownListObject = scope; }} className="filter-select"  id="status" dataSource={this.props.zipTerrFilter? this.props.zipTerrFilter.zt_sales_force_name : ""}
                                        fields={this.fields} placeholder="Select Sales Force" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                            </div>
                            <div className="col-xl-6  col-lg-6 col-md-4 col-sm-6  col-5  select-wrapper select-wrapper-zip-region">
                                    <span className="drp-lable">Region</span>
                                    <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_region_name : ""} ref={(scope) => { this.dropDownListObjectRegion = scope; }} className="filter-select"  id="status" dataSource={ this.props.zipTerrFilter ?  this.props.zipTerrFilter.zt_region_name : ""}
                                        fields={this.fields} placeholder="Select Region" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                            
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-11  ">
                        <div className="row">
                            <div className="col-xl-4  col-lg-5 col-md-3 col-sm-6  col-5  select-wrapper select-wrapper-dist-zip">
                                    <span className="drp-lable">District</span>
                                    <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_district_name : ""} ref={(scope) => { this.dropDownListObjectDistrict = scope; }} className="filter-select"  id="status" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_district_name : ""}
                                        fields={this.fields} placeholder="Select District" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                            
                            </div>
                            <div className="col-xl-5  col-lg-7 col-md-3 col-sm-6  col-5 select-wrapper select-wrapper-terr-zip-audit">
                                    <span className="drp-lable">Territory</span>
                                    <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_terr_name : ""} ref={(scope) => { this.dropDownListObjectTerrName = scope; }} className="filter-select"  id="terrName" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.zt_terr_name : ""}
                                        fields={this.fields} placeholder="Select Territory" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                            
                            </div>

                            <div className="col-xl-3  col-lg-2 col-md-3 col-sm-6  col-5 pl-0 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0">
                                
                                <div class="row ">
                                     <div class="col-lg-10">
                                        <span className="drp-lable">Search ZIP</span>
                                     </div>
                                     <div class="col-lg-2 p-0"><span class="cross-btn npi-cross-btn zip-cross-button" onClick={this.removeSelectedValues}></span></div>
                                 </div>
 
                                 <input type="text" id="npi-autocomplete" placeholder="Enter ZIP" autocomplete="off" onChange={this.zipAutocomplete}   className="" value={this.state.zipItem ? this.state.zipItem.id : ""} />
                                 {this.state.zipShowLoader && <span class="spinner-border spinner-border-sm " id="zip-loader-autocomplete" role="status" aria-hidden="true"></span>}
                                 {this.state.zipSearchItems && this.state.zipSearchItems.length > 0 && (
                                 <ul className="list-group autocomplete-dropdown npi-autocomplete-drop">
                               
                                 {this.state.zipSearchItems && this.state.zipSearchItems.map((item, idx) => (
                                     <li className={"list-group-item" } key={idx} onClick={()=> this.zipSelectItem(item)}>
                                     {item}
                                     </li>
                                 ))}
                                 </ul>
                             )}
                         
                             { this.state.zipShowNOData && 
                                 
                                 <ul className="list-group autocomplete-dropdown npi-autocomplete-drop" id="noData">
                                 <li className={"list-group-item" }>
                                     No Data Found
                                 </li>
                                 </ul> 
                             }
                         </div>




                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-11 ">
                        <div className="row">
                            <div className="col-xl-6  col-lg-6 col-md-3 col-sm-6  col-5  select-wrapper select-wrapper-zip-status">
                                    <span className="drp-lable-testing">Status</span>

                                    <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.status : ""} ref={(scope) => { this.dropDownListObjectStatus = scope; }} className="filter-select"  id="status" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.status : ""}
                                        fields={this.fields} placeholder="Select Status" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                            
                            </div>
                    
                            <div className="col-xl-6  col-lg-6 col-md-3 col-sm-6  col-5  select-wrapper select-wrapper-sales-zip">
                            
                                    <span className="drp-lable">Reviewer</span>
                                    <MultiSelectComponent value={this.props.zipTerrFilter ? this.props.zipTerrFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.zipTerrFilter ? this.props.zipTerrFilter.reviewd_by_ds : ""}
                                        fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                            </div>
                        </div>
                    </div>
                  
                        <div className="  col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 ">
                            <div className="row">
                                <div className="col-xl-7  col-lg-7 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-zip-check mb-2 mb-md-2 mb-lg-0 p-0">
                                    <span className="drp-lable">Checkbox Filter</span>
                                    <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                        fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" UnselectAllText="Unselect All" showSelectAll={true}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                                    
                                </div>
                                <div className="col-xl-3 col-lg-2 pl-2 pr-1 mt-1 pt-3"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                                <div className="col-xl-2 col-lg-3  mt-1 pt-3 pl-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    </div>
                   
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped table-responsive ref-preffered-table zipp-rerr-table ">
                       
                    <thead className="thead-blue"> 
                        <tr>
                            {this.props.zipParams && this.props.zipParams.BUTTON_FLAG &&  this.props.zipParams.BUTTON_FLAG.toLowerCase()=="true" ? <th className="text-center sticky-col check-col">#</th> :  <th className="text-center sticky-col checkbox-col"></th>}
                            <th className={ this.props.zipParams && this.props.zipParams.BUTTON_FLAG  && this.props.zipParams.BUTTON_FLAG.toLowerCase()=="true" ? "text-center sticky-col first-col" : "text-center sticky-col first-col zip-left-border"}>Zip Code</th>
                            <th className="text-center">Territory ID</th>
                            <th className="text-center">Territory</th>
                            <th className="text-center">District ID</th>
                            <th className="text-center">District</th>
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
                           <List buttonFlag={this.props.zipParams ? this.props.zipParams.BUTTON_FLAG : false}  onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} zipTerrIdList={this.props.zipTerrId ? this.props.zipTerrId : []}/> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                    </tbody>
                </table>
               
                    <ToastContainer />
                  
                    { products.length ? <CustomPagination totalRecords={this.props.ZipTerrListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                </div>
                
                { products.length ? (!this.props.loader ? 
                   <div className="btn-align row">


                        {this.props.zipParams && this.props.zipParams.BUTTON_FLAG && this.props.zipParams.BUTTON_FLAG.toLowerCase()=="true" &&
                            <div>
                                <button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Update</button>
                            </div>
                        }
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleModalShowClick} >Export</button>
                        </div>
                       
                        {this.props.zipParams && this.props.zipParams.BUTTON_FLAG && this.props.zipParams.BUTTON_FLAG.toLowerCase()=="true" && 
                            <>
                                <div className="ml-2">
                                    <button className="btn btn-primary btn-bg" onClick={this.handleImportModalShowClick} >Import</button>
                                </div>
                                <div className="ml-2">
                                    <button className="btn btn-primary btn-bg" onClick={this.handleInsertModalShowClick} >Insert</button>
                                </div>
                            </>
                         }
                 </div> 
               : "") : ""}
                    
                                  
        {this.state.showInserModal ? (
            <Modal handleModalCloseClick={this.handleModalCloseClick} handleInsertClick={this.InsertZipTerr} modelId={"showInserModal"} text={"Insert"} classname={"model-list-insert"}>
            
                <form className="needs-validation">
                {this.state.terrInsertShowloader && <div className="Dataloader" >
                    <img className="login-logo" src={ConstVal.deployment+"/assets/img/ajax-loader.gif"} />
                </div>  }
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="inputEmail4">ZIP CODE</label>
                    <input type="text" className={ this.hasError("zip_code") ? "form-control input-font is-invalid" : "form-control input-font" }  id="zip_code" placeholder="ZIP Code" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                    <div class="invalid-feedback  text-left"> Zipcode is required</div>
                    </div>
                   
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">TERRITORY ID</label>
                       {/***  <input type="text" className={ this.hasError("territory_id") ? "form-control input-font is-invalid" : "form-control input-font" } id="territory_id" placeholder="Territory ID"/>***/}
                       <select id="territory_id" className={ this.hasError("territory_id") ? "form-control input-font is-invalid" : "form-control input-font" }  onChange={(e)=>this.getTerrData(e)}>
                            <option value="">--Select--</option>
                            {this.props.zipTerrId && this.props.zipTerrId.map((terrId,index)=>{
                                return  <option value={terrId}>{terrId}</option>
                            })}
                           
                        </select>
                        <div class="invalid-feedback  text-left"> Territory id is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">TERRITORY</label>
                        <input type="text" className={ this.hasError("territory_name") ? "form-control input-font is-invalid" : "form-control input-font" } id="territory_name" placeholder="Territory" value={this.state.territory_name} onChange={(e)=>this.onTerrInputChange(e)}/>
                        <div class="invalid-feedback  text-left"> Territory is required</div>
                    </div>
                   
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">DISTRICT ID</label>
                        <input type="Text" className={ this.hasError("district_id") ? "form-control input-font is-invalid" : "form-control input-font" } id="district_id" placeholder="District ID" value={this.state.district_id} onChange={(e)=>this.onTerrInputChange(e)}/>
                        <div class="invalid-feedback  text-left"> District id is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">DISTRICT</label>
                        <input type="text" className={ this.hasError("district_name") ? "form-control input-font is-invalid" : "form-control input-font" } id="district_name" placeholder="District"  value={this.state.district_name} onChange={(e)=>this.onTerrInputChange(e)}/>
                        <div class="invalid-feedback  text-left">District is required</div>
                    </div>
                   
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">REGION ID</label>
                        <input type="text" className={ this.hasError("region_id") ? "form-control input-font is-invalid" : "form-control input-font" } id="region_id" placeholder="Region ID" value={this.state.region_id} onChange={(e)=>this.onTerrInputChange(e)}/>
                        <div class="invalid-feedback  text-left">Region id is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">REGION</label>
                        <input type="text" className={ this.hasError("region_name") ? "form-control input-font is-invalid" : "form-control input-font" } id="region_name" placeholder="Region" value={this.state.region_name} onChange={(e)=>this.onTerrInputChange(e)}/>
                        <div class="invalid-feedback  text-left">Region is required</div>
                    </div>
                   
                    
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">SALES FORCE ID</label>
                        <select id="sales_force_id" className={ this.hasError("sales_force_id") ? "form-control input-font is-invalid" : "form-control input-font" } onLoad={(e)=>this.populateSalesForceName(e)} onChange={(e)=>this.populateSalesForceName(e)}>
                            <option value="">--Select--</option>
                            {this.props.InsertZipTerrFilter && Object.keys(this.props.InsertZipTerrFilter).map(function(key, index) {
                                return <option value={key} >{key}</option>
                            })}
                           
                        </select>
                        <div class="invalid-feedback  text-left">Sales force id is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">SALES FORCE NAME</label>
                        <select id="sales_force_name" className={ this.hasError("sales_force_name") ? "form-control input-font is-invalid" : "form-control input-font" } >
                            <option value="">--Select--</option>
                             {this.state.sourceName && this.state.sourceName.map((each,index) =>(
                                <option value={each}>{each}</option>
                            ))}
                        </select>
                        <div class="invalid-feedback  text-left">Sales force name is required</div>
                    </div>
                    
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">ALIGNMENT QUARTER</label>
                        <select id="alignment_quarter" className={ this.hasError("alignment_quarter") ? "form-control input-font is-invalid" : "form-control input-font" }>
                             {this.props.zipTerrFilter.zt_alignment_qtr && this.props.zipTerrFilter.zt_alignment_qtr.map((each,index) =>(
                                <option value={each}>{each}</option>
                            ))}
                        </select>
                        <div class="invalid-feedback  text-left">Alignment quarter is required</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">ALIGNMENT YEAR</label>
                        <select id="alignment_year" className={ this.hasError("alignment_year") ? "form-control input-font is-invalid" : "form-control input-font" }>
                             {this.props.zipTerrFilter.zt_alignment_year && this.props.zipTerrFilter.zt_alignment_year.map((each,index) =>(
                                <option value={each}>{each}</option>
                            ))}
                        </select>
                        <div class="invalid-feedback  text-left">Alignment year is required</div>
                    </div>
                  
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">COMMENT</label>
                        <textarea type="text" className={ "form-control input-font" } id="comment" placeholder="Comment"/>
                        <div class="invalid-feedback  text-left">Comment is required</div>
                    </div>
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
                            <input type="text" className="form-control" id="fileName"  defaultValue={"ZipTerr_"+moment().format("YYYYMMDD")} placeholder="File Name"/>
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
        zipTerrId:state['DataStewardshipZipTerrReducer']['ZIP_TERR_LIST'] || [],
        loader:state['DataStewardshipZipTerrReducer']['loader'] || false,
        ZipTerrList:state['DataStewardshipZipTerrReducer']['ZIP_TERR_RESULT'] || [],
        ZipTerrListTotal:state['DataStewardshipZipTerrReducer']['ZIP_TERR_TOTAL'] || [],
        ZipTerrFilteredResult:state['DataStewardshipZipTerrReducer']['filteredZipTerrProducts'] || [],
        RefPrefferedUpdateStatus:state['DataStewardshipZipTerrReducer']['UPDATE_ZIP_TERR_RECORD_RESULT'] || [],
        InsertRes:state['DataStewardshipZipTerrReducer']['INSERT_ZIP_TERR_RESULT'] || [],
        exportResult:state['DataStewardshipZipTerrReducer']['ZIP_TERR_EXPORT_RESULT'] || [],
        zipTerrImportStatus:state['DataStewardshipZipTerrReducer']['IMPORT_ZIP_TERR_RESULT'] || [],
        zipTerrFilter:state['DataStewardshipZipTerrReducer']['ZIP_TERR_FILTER_RESULT'] || [],
        InsertZipTerrFilter:state['DataStewardshipZipTerrReducer']['INSERT_FILTER_RESULT'] || [],
        zipParams:state['DataStewardshipZipTerrReducer']['ZIP_ENABLE_BUTTON_DETAILS_RESULT'] || [],
        
      
    };
}

export default connect(mapStateToProps)(ZipTerritory);
