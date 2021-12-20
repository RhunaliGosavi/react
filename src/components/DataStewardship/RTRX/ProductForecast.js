import React from "react";
import {connect} from "react-redux"
import Header from "../../Common/Header"
import Sidebar from "../../Common/Sidebar";
import List from "./ProductForecastList"
import * as ConstVal from "../../../Constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Modal from "../../Common/Modal";
import CustomPagination from "../../Common/CustomPagination";
import moment from "moment";
//import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SampleBase } from '../../Common/sample-base';
import Notification from "../../Common/Notification";
import { compose } from "glamor";
import * as validation from "../../Common/Validations"

const group = [  ];
const pageLimit=15;
const pageSort="1";
const sortorder="desc";
class ProductForecast extends SampleBase {
    constructor() {
        super();
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
            selectedEndDate:"",
            selectedStartDate:"",
            currentPage:1,
            errors:[],
            showInserModal:"",
            selectMonth:[],
            showExport:"",
            showImportModal:false,
            selectedFile:"",
        
         };

    
    }
    componentWillMount=() =>{
        document.title = 'Product Forecast'
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
           
        //if(!this.props.ProductForecastFilteredResult.length){
           /* this.props.dispatch({
                type:"GET_PRODCT_DROPDOWN_FILTER_RESULT",
            })*/
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
        //}
        
        
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    filterByInput=()=>{

        let year=this.dropDownListObjectYear.value
        let brandName = this.dropDownListObjectBrandName.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let status=this.dropDownListObjectStatus.value
        let month =this.dropDownListObjectMonth.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        
         this.props.dispatch({
            type: 'PRODUCTFORECAST_FILTER_BY_VALUE',
            payload:{pageSort:pageSort,pagelimit:pageLimit,value: [year,brandName,reviewdByDs,checkboxFilter,status,month],data:this.state.checkedItemsId}
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
    getObj=(resVariable,getApprovedFlag,status,year)=>{
        let obj={"id":parseInt(document.getElementById("id_"+resVariable).innerText),
            "forecast_month":document.getElementById("forecast_month_"+resVariable).innerText,
            "brand_id":document.getElementById("brand_id_"+resVariable).innerText,
            "mat_run_id":parseInt(document.getElementById("mat_run_id_"+resVariable).innerText),
            "rec_created_ts":document.getElementById("rec_created_ts_"+resVariable).getAttribute('data-reccreatedts'),
            "rec_updated_by":document.getElementById("rec_updated_by_"+resVariable).value,
            "rec_updated_ts":document.getElementById("rec_updated_ts_"+resVariable).innerText,
            "status":status,
            "approved_flag":getApprovedFlag,
            "reviewd_by_ds":localStorage.fullname,
            "le_ttl_actv_patients":document.getElementById("le_ttl_actv_patients_"+resVariable).value,
            "le_gross_new_patients":document.getElementById("le_gross_new_patients_"+resVariable).value ,
            "le_net_new_patients":document.getElementById("le_net_new_patients_"+resVariable).value ,
            "le_shipments":document.getElementById("le_shipments_"+resVariable).value,
            "le_prcnt_patients_ship":document.getElementById("le_prcnt_patients_ship_"+resVariable).value,
            "le_units":document.getElementById("le_units_"+resVariable).value,
            "le_mgs":document.getElementById("le_mgs_"+resVariable).value,
            "le_gross":document.getElementById("le_gross_"+resVariable).value,
            "le_net":document.getElementById("le_net_"+resVariable).value,
            "comments":document.getElementById("comments_"+resVariable).value,
        
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
    

         let year=this.dropDownListObjectYear.value
        let brandName = this.dropDownListObjectBrandName.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let status=this.dropDownListObjectStatus.value
      
        let month =this.dropDownListObjectMonth.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value

        let Filtervalue= [year,brandName,reviewdByDs,checkboxFilter,status,month];
        let checkedIds=this.state.checkedItemsId;
       this.props.dispatch({
            type:"UPDATE_PRODUCTFORECAST_RECORDS_REQUEST",
            payload:{data:this.state.submittedData,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
            
       });

    
        for(let a=0; a<this.state.checkedItems.length;a++){
            this.setState({[this.state.checkedItems[a]]:false});
        }
 
    }

    componentDidUpdate=() =>{
       
         if(this.props.ProductForecastFilterStatus!=""){
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_DATA",
                payload:{pagestart:1,pagelimit:pageLimit,pageSort:pageSort}
            })
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_FILTER_STATUS",
            
            });
        
        }
        
        if(this.props.ProductForecastUpdateStatus!="" ) {
            toast(
                <Notification msg="Data Updated Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })
            this.props.dispatch({
                type:"UPDATE_PRODUCTFORECAST_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_MONTH_YEAR_FILTER",
            })
            
        }
        if(this.props.ProductForecastImportStatus!="" ) {
          /*  toast(
                <Notification msg="File Uploaded Successfully" headerText=""></Notification>
               ,{
                 toastId: "success_notification",
            })*/

            if(this.props.ProductForecastImportStatusCode==200){
                toast(
                    <Notification msg={this.props.ProductForecastImportMsg ? this.props.ProductForecastImportMsg : "File Uploaded Successfully"} headerText=""></Notification>
                ,{
                    toastId: "success_notification",
                })
            }else{
                toast(
                    <Notification msg={this.props.ProductForecastImportMsg ? this.props.ProductForecastImportMsg : "Import Failed"} headerText=""></Notification>
                ,{
                    toastId: "error_notification",
                })

            }  
            this.props.dispatch({
                type:"PRODUCT_FORECAST_UPDATE_IMPORT_RESULT_STATE",
               
            });
         
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_FILTER_RESULT",
            })
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_MONTH_YEAR_FILTER",
            })
            
        }

        if(this.props.InsertRes!="" ) {
            
            if(this.props.InsertMsg=="" ){
                toast(
                    <Notification msg="Data Inserted Successfully" headerText=""></Notification>
                ,{
                    toastId: "success_notification",
                })
              
            }else{
                toast(
                    <Notification msg={this.props.InsertMsg} headerText="Warning !"></Notification>
                    ,{
                      toastId: "warning_notification",
                 })
            }
            this.props.dispatch({
                type:"UPDATE_PRODUCTFORECAST_INSERT_RESULT_STATE",
               
            });
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_FILTER_RESULT",
                })
            this.props.dispatch({
                type:"GET_PRODUCTFORECAST_MONTH_YEAR_FILTER",
            })
            
        }


        if(this.props.exportResult!="" ) {
           
            let Filename= this.state.exportFileName+".csv";
            this.saveDataToFile(this.props.exportResult,Filename,'text/csv');
             this.setState({exportFileName:""})
             this.props.dispatch({
                 type:"FORECAST_UPDATE_EXPORT_RESULT_STATE",
                
             });
         
             
         }
    }
    saveDataToFile=(data, fileName, dataType) =>{
       // console.log("convert to csv",fileName);
        let a = document.createElement("a");
        document.body.appendChild(a);
    
        // let json = JSON.stringify(data);
        let json = data;
        let blob = new Blob([json], {type: dataType});
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
      //  console.log("url",url)
        window.URL.revokeObjectURL(url);
    }
 
    onPageChanged = data => {
        
        this.setState({currentPage:data.currentPage});
         let year=this.dropDownListObjectYear.value
        let brandName = this.dropDownListObjectBrandName.value;
        let reviewdByDs=this.dropDownListObjectReviewer.value;
        let status=this.dropDownListObjectStatus.value
        let checkboxFilter=this.dropDownListObjectCheckbox.value
        
        let month =this.dropDownListObjectMonth.value
        this.props.dispatch({
            type:"GET_PRODUCTFORECAST_DATA",
            payload:{pagestart:data.currentPage,pagelimit:pageLimit,pageSort:pageSort,value: [year,brandName,reviewdByDs,checkboxFilter,status,month],data:this.state.checkedItemsId}
        })
      
      }
     
   switchToAudit =(e)=>{
       // console.log(e.target.checked)

        if(e.target.checked){
           // console.log("inside redirect");
            this.props.history.push("product-forecast-auditing");
            
        }
    }

    onChangeDatepicker=(value ,e,name)=>{
       // console.log("date***", moment(value).format("YYYY-MM-DD"),"****",name)
        const valueOfInput= moment(value).format("YYYY-MM-DD")
        this.setState({selectedEndDate:valueOfInput})
        //console.log('this.state.date',valueOfInput,e);
      
    }
    hasError(key) {
        //console.log(key)
        return this.state.errors.indexOf(key) !== -1;
    }
    InsertProductForecast=()=>{
    // console.log("inside insert")
		var errors = [];
		/*if (document.getElementById('forecast_month').value === "") {
			errors.push("forecast_month");
		}*/
        if (document.getElementById('insert_forecast_month').value == "") {
			errors.push("forecast_month");
		}

        /*if (document.getElementById('brand_id').value === "") {
			errors.push("brand_id");
		}*/
        if (document.getElementById('brand_name').value === "") {
			errors.push("brand_name");
		}
        if (document.getElementById('forecast_ttl_actv_patients').value === "") {
			errors.push("forecast_ttl_actv_patients");
		}
        if (document.getElementById('forecast_gross_new_patients').value === "") {
			errors.push("forecast_gross_new_patients");
		}
        if (document.getElementById('forecast_net_new_patients').value === "") {
			errors.push("forecast_net_new_patients");
		}
        if (document.getElementById('forecast_shipments').value === "") {
			errors.push("forecast_shipments");
		}
        if (document.getElementById('forecast_prcnt_patients_ship').value === "") {
			errors.push("forecast_prcnt_patients_ship");
		}
        if (document.getElementById('forecast_units').value === "") {
			errors.push("forecast_units");
		}
        if (document.getElementById('forecast_mgs').value === "") {
			errors.push("forecast_mgs");
		}
        if (document.getElementById('forecast_gross').value === "") {
			errors.push("forecast_gross");
		}
        if (document.getElementById('forecast_net').value === "") {
			errors.push("forecast_net");
		}
        if (document.getElementById('le_ttl_actv_patients').value === "") {
			errors.push("le_ttl_actv_patients");
		}
        if (document.getElementById('le_gross_new_patients').value === "") {
			errors.push("le_gross_new_patients");
		}
        if (document.getElementById('le_net_new_patients').value === "") {
			errors.push("le_net_new_patients");
		}
        if (document.getElementById('le_shipments').value === "") {
			errors.push("le_shipments");
		}
        if (document.getElementById('le_prcnt_patients_ship').value === "") {
			errors.push("le_prcnt_patients_ship");
		}
        if (document.getElementById('le_units').value === "") {
			errors.push("le_units");
		}
        if (document.getElementById('le_mgs').value === "") {
			errors.push("le_mgs");
		}
        if (document.getElementById('le_gross').value === "") {
			errors.push("le_gross");
		}
        if (document.getElementById('le_net').value === "") {
			errors.push("le_net");
		}
      
       		this.setState({
			errors: errors
			});
		
			if (errors.length > 0) {
			return false;
			}
        
     
        let insetObj =  [ {
                    "FORECAST_MONTH": moment(document.getElementById('insert_forecast_month').value).format("YYYY-MM-DD") ,
                    "BRAND_ID":document.getElementById("brand_name").value,
                    "BRAND_NAME":document.getElementById("brand_name").options[document.getElementById("brand_name").selectedIndex].text,
                    "FORECAST_TTL_ACTV_PATIENTS":document.getElementById("forecast_ttl_actv_patients").value,
                    "FORECAST_GROSS_NEW_PATIENTS":document.getElementById("forecast_gross_new_patients").value,
                    "FORECAST_NET_NEW_PATIENTS":document.getElementById("forecast_net_new_patients").value,
                    "FORECAST_SHIPMENTS":document.getElementById("forecast_shipments").value,
                    "FORECAST_PRCNT_PATIENTS_SHIP":document.getElementById("forecast_prcnt_patients_ship").value,
                    "FORECAST_UNITS":document.getElementById("forecast_units").value,
                    "FORECAST_MGS":document.getElementById("forecast_mgs").value,
                    "FORECAST_GROSS":document.getElementById("forecast_gross").value,
                    "FORECAST_NET":document.getElementById("forecast_net").value,
                    "LE_TTL_ACTV_PATIENTS":document.getElementById("le_ttl_actv_patients").value,
                    "LE_GROSS_NEW_PATIENTS":document.getElementById("le_gross_new_patients").value,
                    "LE_NET_NEW_PATIENTS":document.getElementById("le_net_new_patients").value,
                    "LE_SHIPMENTS":document.getElementById("le_shipments").value,
                    "LE_PRCNT_PATIENTS_SHIP":document.getElementById("le_prcnt_patients_ship").value,
                    "LE_UNITS":document.getElementById("le_units").value,
                    "LE_MGS":document.getElementById("le_mgs").value,
                    "LE_GROSS":document.getElementById("le_gross").value,
                    "LE_NET":document.getElementById("le_net").value,
                    "STATUS":"Submit",
                    "REVIEWD_BY_DS":localStorage.fullname,
                    "ACTV_FLG":"NEW",
                    "COMMENTS":document.getElementById("comments").value,
         
                }];

           
           this.setState({ showInserModal:false })
           $('.modal.in').modal('hide')
           $('.modal-backdrop').remove()


           let year=this.dropDownListObjectYear.value
           let brandName = this.dropDownListObjectBrandName.value;
           let reviewdByDs=this.dropDownListObjectReviewer.value;
           let status=this.dropDownListObjectStatus.value
           let checkboxFilter=this.dropDownListObjectCheckbox.value
          
           let month =this.dropDownListObjectMonth.value
           let Filtervalue= [year,brandName,reviewdByDs,checkboxFilter,status,month];
           let checkedIds=this.state.checkedItemsId;
         
           this.props.dispatch({
            type:"INSERT_PRODUCTFORECAST",
            payload:{data:insetObj,pageSort:pageSort,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:checkedIds}
           })
          
           
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
        this.dropDownListObjectYear.value=this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter) : [];
        this.dropDownListObjectBrandName.value=this.props.ProductForecastFilter ? this.props.ProductForecastFilter.brand_name : [];
        this.dropDownListObjectReviewer.value=this.props.ProductForecastFilter ? this.props.ProductForecastFilter.reviewd_by_ds : [];
        this.dropDownListObjectStatus.value=this.props.ProductForecastFilter ? this.props.ProductForecastFilter.status : [];
        this.dropDownListObjectCheckbox.value=["Checked","Unchecked"];
        console.log("selected refresh",this.props.selectMonth)
        this.dropDownListObjectMonth.value=this.props.selectMonth ? this.props.selectMonth : []
        
       
    }
    getmonth=()=>{
        let SelectedYear=(this.dropDownListObjectYear.value && this.dropDownListObjectYear.value.length > 0 )? this.dropDownListObjectYear.value : (this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter): []);

        this.props.dispatch({
            type:"PRODUC_FORECAST_FILTER_MONTH",
            payload:{SelectedYear:SelectedYear,ProductForeYearMonthFilter:this.props.ProductForeYearMonthFilter}
        })
    }
    handleExportModalShowClick=(e)=> {
        e.preventDefault();
        this.setState({
            showExport: true
        })
      }
      exportForecast=()=>{
        document.getElementById('errorMsg').style.display="none";
        if(!document.getElementById('exortFile').value){
            document.getElementById('errorMsg').style.display="block";
            return false;
        }
      // console.log(document.getElementById('exortFile').value);
        this.setState({exportFileName:document.getElementById('exortFile').value})
          /***close modal****/
        $('.modal.in').modal('hide')
        $('.modal-backdrop').remove()
        this.setState({ showExport:false })
        /***close modal****/
           let year=this.dropDownListObjectYear.value
           let brandName = this.dropDownListObjectBrandName.value;
           let reviewdByDs=this.dropDownListObjectReviewer.value;
           let status=this.dropDownListObjectStatus.value
           let checkboxFilter=this.dropDownListObjectCheckbox.value
           let month =this.dropDownListObjectMonth.value
           let Filtervalue= [year,brandName,reviewdByDs,checkboxFilter,status,month];
          

        this.props.dispatch({
            type:"FORECAST_EXPORT",
            payload:{pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:this.state.currentPage,Filtervalue:Filtervalue,checkedIds:this.state.checkedItemsId}
        })

     }
     handleImportModalShowClick=(e)=>{
        e.preventDefault();
        this.setState({
          showImportModal: true
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
            type:"IMPORT_PRODUCT_FORECAST_FILE",
            
            payload:{pageSort:pageSort,sortorder:sortorder,pageLimit:pageLimit,pagestart:0,file:this.state.selectedFile}
        })
      
       
    }
    OnchangeOfImportFile=(e)=>{
        if(e.target.files[0]){
            const fsize = e.target.files[0].size;
            const file = Math.round((fsize / 1024/1024));
           // console.log("selected file size",file)

            document.getElementById('errorImportFileSize').style.display="none";
            if(file>10){
                document.getElementById('errorImportFileSize').style.display="block";
                document.getElementById('errorImportMsg').style.display="none";
                return false;
            }
        }
        this.setState({ selectedFile: e.target.files[0] });
    }
    onClickShowCommentPopup=(e)=>{
        e.preventDefault();
        let res = e.target.id.split("_");
        this.setState({
            ["comments_popup"+res[1]]: true
        })
    }
    insertHandleDateChange=(e)=>{
        console.log(moment(e).format('YYYY-MM-DD'),e);
          this.setState({"insert_forecast_month":moment(e).format('YYYY-MM-DD')});
      }

    render() {
     
        let products= this.props.ProductForecastFilteredResult;
  
        return (

            <>
            <Header />
            <Sidebar activeIndex={2} activeInnerIdex={0}/>
           
            <div className="container-fluid main " style={{marginTop:"10px"}}>
                <div className="row title-row-table">
                    <div className="col-lg-10">
                        <h2 className="page-title-strwardship">Data Steward Interface - Product Forecast</h2>
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

           {/***  <div className="container main margin-l-ipad col-lg-11 col-11 cont-div" style={{ "height": "400px"}}>***/}
           <div className="main-div">
                <div className="row no-padding product-filter col-lg-12 col-12 pl-2">
                    <div className="col-xl-11 col-lg-11 col-md-10 row p-0">
                        <div className="col-xl-2  col-lg-3 col-md-3 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper-ts-id select-wrapper-product-fore-year">
                            <span className="drp-lable">Forecast Year</span>
                            
                            <MultiSelectComponent change={this.getmonth} value={this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter) : ""} ref={(scope) => { this.dropDownListObjectYear = scope; }} className="filter-select"  id="year" dataSource={this.props.ProductForeYearMonthFilter ? Object.keys(this.props.ProductForeYearMonthFilter) : ""}
                                    fields={this.fields} placeholder="Select Forecast Year" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-4 col-sm-6  col-5 offset-md-0 offset-sm-0 offset-1  mb-2 mb-md-2 mb-lg-0 select-wrapper select-wrapper-ts-id-zip">
                            <span className="drp-lable">Forecast Month</span>
                            
                            <MultiSelectComponent  value={this.props.selectMonth ? this.props.selectMonth : []} ref={(scope) => { this.dropDownListObjectMonth = scope; }} className="filter-select"  id="moth" dataSource={this.props.selectMonth? this.props.selectMonth : ""}
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
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6  col-5  offset-md-0 offset-sm-0 offset-1 mb-2 mb-md-2 mb-lg-0 ml-md-2 ml-lg-0 select-wrapper select-wrapper-ts-id-zip">
                        
                                <span className="drp-lable">Reviewer</span>
                                <MultiSelectComponent value={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.reviewd_by_ds : ""} ref={(scope) => { this.dropDownListObjectReviewer = scope; }} className="filter-select"  id="reviewer" dataSource={this.props.ProductForecastFilter ? this.props.ProductForecastFilter.reviewd_by_ds : ""}
                                    fields={this.fields} placeholder="Select Reviewer" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                    <Inject services={[CheckBoxSelection]} />
                                </MultiSelectComponent>
                        </div>
                        <div className="col-xl-2  col-lg-2 col-md-3 col-sm-6 col-5 select-wrapper select-wrapper-ts-id-zip mb-2 mb-md-2 mb-lg-0">
                            <span className="drp-lable">Checkbox Filter</span>
                            <MultiSelectComponent  value={["Checked","Unchecked"]} ref={(scope) => { this.dropDownListObjectCheckbox = scope; }} className="filter-select"  id="selected-checbox" dataSource={["Checked","Unchecked"] }
                                fields={this.fields} placeholder="Select Checkbox Type" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                            
                        </div>
                    </div>
                    {/***  <div className="col-xl-1 col-lg-1 col-md-2 row pr-lg-0">  
                        <div className="col-xl-12  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                    </div>  ****/}
                        <div className=" row col-xl-1  col-lg-12 col-md-12 col-sm-12 col-12  offset-md-0 offset-sm-0 offset-1 mb-2 mt-md-4 mb-lg-0">
                            <div className="col-lg-8 pl-0"><button className="product-btn btn-bg" onClick={() => { this.filterByInput()}}>Go</button></div>
                            <div className="col-lg-4 p-0 dots-pointer" onClick={this.refreshFilter}><i class="fa fa-refresh" aria-hidden="true"></i></div>
                        </div>
                </div>
                   
                <div className="container no-padding  wrapp-table col-lg-12 col-12">
                
                    <table className="table table-striped table-responsive ref-preffered-table ">
                       
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
                            <th  className="text-center">Comments</th>
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
                           <List handleModalCloseClick={this.handleModalCloseClick} Modal={Modal} onClickShowCommentPopup={e => { this.onClickShowCommentPopup(e)}} datepickerChange={this.datepickerChange}  list={products} loading={this.state.loading}  onChangeInput={e => { this.handleInput(e)}}   props={this.state} /> 
                             
                          : (!this.props.loader ? <tr><td  className="align-no-data" colSpan="35">No data available</td></tr> : "")
                        }
                    </tbody>
                </table>
               
                    <ToastContainer />
                  
                    { products.length ? <CustomPagination totalRecords={this.props.ProductForecastListTotal} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />: ""}
                </div>
                
                { products.length ? (!this.props.loader ? 
                   <div className="btn-align row">
                        <div>
                            <button type="button" className="btn btn-primary btn-bg" onClick={this.getSElectedREcords}>Update</button>
                        </div>
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleInsertModalShowClick} >Insert</button>
                        </div>
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleExportModalShowClick} >Export</button>
                        </div> 
                        <div className="ml-2">
                            <button className="btn btn-primary btn-bg" onClick={this.handleImportModalShowClick} >Import</button>
                        </div>         
                        
                     
                 </div> 
               : "") : ""}
               {this.state.showImportModal ? (
                    <Modal  handleModalCloseClick={this.handleModalCloseClick} handleImport1Click={this.Import} modelId="showImportModal" text={"Import"} classname={"modal-import-export"}>
                        <div className="form-group">
                        <input type="file"  ref="fileUploader"  className="" id="customFile" onChange={(e)=>this.OnchangeOfImportFile(e)} />
                        <span id="errorImportMsg" className="errorMsg" style={{"display":"none"}}>Select File</span>
                        <span id="errorImportFileSize" className="errorMsg" style={{"display":"none"}}>{ConstVal.fileSizeErr}</span>

                        </div>
                    </Modal>
               ) : null}
                {this.state.showExport ? (
                    <Modal  handleModalCloseClick={this.handleModalCloseClick} handleExportClick={this.exportForecast} modelId="showExport" text={"Export"} classname={"modal-import-export"}>
                       
                        <div className="form-group">
                            <label for="fileName">File Name</label>
                            <input type="text" className="form-control" id="exortFile" defaultValue={"Product_forecast_"+moment().format("YYYYMMDD")} placeholder="File Name"/>
                            <span id="errorMsg" className="errorMsg" style={{"display":"none"}}>Enter File Name</span>
                        </div>
                    </Modal>
               ) : null}
             {this.state.showInserModal ? (
            <Modal handleModalCloseClick={this.handleModalCloseClick} handleInsertClick={this.InsertProductForecast} modelId={"showInserModal"} text={"Insert"} classname={"model-list-insert-pricing"}>
            
                <form className="needs-validation">
                {/****<div className="product-title">Forecast Month</div>***/}
                <div className="form-row">
                    <div className="form-group col-md-6 mb-1">
                        <label for="inputEmail4">FORECAST MONTH</label>
                       <div className='control-pane'>
                            <div className='control-section'>
                                <div className='datepicker-control-section'>
                                    {/****<DatePickerComponent  allowEdit={false} cssClass={"calendarHeight"} ref={(element) => {this.calendarInstance = element }} value={ this.dateValue ? this.dateValue :  moment().toDate() }   format='yyyy-MM-dd'  placeholder="Forecast Month"></DatePickerComponent>****/}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} disableEnforceFocus>
                                   
                                        <KeyboardDatePicker
                                            autoOk
                                            
                                            variant="inline"
                                            onChange={(e)=>this.insertHandleDateChange(e)}
                                            value={ this.state.insert_forecast_month ? this.state.insert_forecast_month :  moment().toDate() }
                                            views={["date","year", "month"]}
                                            format="yyyy-MM-dd"
                                            id="insert_forecast_month"
                                            name="insert_forecast_month"
                                            placeholder="Forecast Month"
                                            InputProps={{ readOnly: true,disableUnderline: true }}
                                            
                                        />
                              
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>
                    <div class="invalid-feedback  text-left">Forecast month is required</div>
                    </div>
                   
                </div>
                <div className="form-row">
                    {/***<div className="form-group col-md-4">
                        <label for="inputEmail4">BRAND ID</label>
                        <input type="text" className={ this.hasError("brand_id") ? "form-control input-font is-invalid" : "form-control input-font" } id="brand_id" placeholder="Brand Id" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Brand id is required</div>
                    </div>****/}
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">BRAND</label>
                        <select id="brand_name" className={ this.hasError("brand_name") ? "form-control input-font is-invalid" : "form-control input-font" }>
                            <option value="">--Select--</option>
                            {this.props.ProductForeBrandFilter && Object.keys(this.props.ProductForeBrandFilter).map((key, index) =>{
                                return <option value={key} >{ this.props.ProductForeBrandFilter[key]}</option>
                            })}
                           
                        </select>
                        <div class="invalid-feedback  text-left">Brand name is required</div>
                    </div>
                   
                   
                </div>
                <div className="product-title">Forecast</div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST TTL ACTV PATIENTS</label>
                        <input type="text" className={ this.hasError("forecast_ttl_actv_patients") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_ttl_actv_patients" placeholder="Forecast TTL Actv Patients" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Forecast ttl actv patients is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST GROSS NEW PATIENTS</label>
                        <input type="text" className={ this.hasError("forecast_gross_new_patients") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_gross_new_patients" placeholder="Forecast Gross New Patients" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}} />
                        <div class="invalid-feedback  text-left">Forecast gross new patients is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST NET NEW PATIENTS</label>
                        <input type="text" className={ this.hasError("forecast_net_new_patients") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_net_new_patients" placeholder="Forecast Net New Patients"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Forecast net new patients is required</div>
                    </div>
                   
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST SHIPMENTS</label>
                        <input type="text" className={ this.hasError("forecast_shipments") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_shipments" placeholder="Forecast Shipments" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Forecast shipments is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST % PATIENTS SHIPPED</label>
                        <input type="text" className={ this.hasError("forecast_prcnt_patients_ship") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_prcnt_patients_ship" placeholder="Forecast % Patients Shipped" />
                        <div class="invalid-feedback  text-left">Forecast % patients shipped is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST UNITS</label>
                        <input type="text" className={ this.hasError("forecast_units") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_units" placeholder="Forecast Units"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Forecast units is required</div>
                    </div>
                   
                </div>

                <div className="form-row">
                    
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST MGS</label>
                        <input type="text" className={ this.hasError("forecast_mgs") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_mgs" placeholder="Forecast Mgs" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Forecast mgs is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST GROSS</label>
                        <input type="text" className={ this.hasError("forecast_gross") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_gross" placeholder="Forecast Gross"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Forecast gross is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">FORECAST NET</label>
                        <input type="text" className={ this.hasError("forecast_net") ? "form-control input-font is-invalid" : "form-control input-font" } id="forecast_net" placeholder="Forecast Net"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Forecast net is required</div>
                    </div>
                   
                </div>
                <div className="product-title">Latest Enhancement</div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE TTL ACTV PATIENTS</label>
                        <input type="text" className={ this.hasError("le_ttl_actv_patients") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_ttl_actv_patients" placeholder="LE TTL Actv Patients"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Le ttl actv patients is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE GROSS NEW PATIENTS</label>
                        <input type="text" className={ this.hasError("le_gross_new_patients") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_gross_new_patients" placeholder="LE Gross New Patients"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Le gross new patients is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE NET NEW PATIENTS</label>
                        <input type="text" className={ this.hasError("le_net_new_patients") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_net_new_patients" placeholder="LE Net New Patients" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}} />
                        <div class="invalid-feedback  text-left">Le net new patients is required</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE SHIPMENTS</label>
                        <input type="text" className={ this.hasError("le_shipments") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_shipments" placeholder="LE Shipments"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">LE shipments is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE % PATIENTS SHIPPED</label>
                        <input type="text" className={ this.hasError("le_prcnt_patients_ship") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_prcnt_patients_ship" placeholder="LE % Patients Shipped" />
                        <div class="invalid-feedback  text-left">LE % patients shipped is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE UNITS</label>
                        <input type="text" className={ this.hasError("le_units") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_units" placeholder="LE Units"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Le units is required</div>
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE MGS</label>
                        <input type="text" className={ this.hasError("le_mgs") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_mgs" placeholder="LE Mgs"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Le mgs is required</div>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputEmail4">LE GROSS</label>
                        <input type="text" className={ this.hasError("le_gross") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_gross" placeholder="LE Gross" onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Le gross is required</div>
                    </div>
                    <div className="form-group col-md-4">
                         <label for="inputEmail4">LE NET</label>
                        <input type="text" className={ this.hasError("le_net") ? "form-control input-font is-invalid" : "form-control input-font" } id="le_net" placeholder="LE Net"  onKeyPress={(e)=>{ return validation.onlyNumberKey(e)}}/>
                        <div class="invalid-feedback  text-left">Le net is required</div>
                    </div>
                   
                </div>
                <div className="form-row">
                 
                
                    <div className="form-group col-md-6">
                       
                        <label for="inputPassword4">Comment</label>
                        <textarea type="text" className={ "form-control input-font" } id="comments" placeholder="Comment"/>
                        
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
        loader:state['ProductForecastReducer']['loader'] || false,
        ProductForecastList:state['ProductForecastReducer']['PRODUCTFORECAST_RESULT'] || [],
        ProductForecastListTotal:state['ProductForecastReducer']['PRODUCTFORECAST_TOTAL'] || [],
        ProductForecastFilteredResult:state['ProductForecastReducer']['filteredProductForecast'] || [],
        ProductForecastUpdateStatus:state['ProductForecastReducer']['UPDATE_PRODUCTFORECAST_RECORD_RESULT'] || [],
        ProductForecastDropdown:state['ProductForecastReducer']['filteredProductDrop'] || [],
        ProductForeYearMonthFilter:state['ProductForecastReducer']['PRODUCTFORECAST_MONTH_YEAR_FILTER_RESULT'] || [],
        ProductForecastFilter:state['ProductForecastReducer']['PRODUCTFORECAST_FILTER_RESULT'] || [],
        selectMonth:state['ProductForecastReducer']['PRODUCT_FORECAST_SELECTED_MONTH'] || [],
        ProductForecastFilterStatus:state['ProductForecastReducer']['PRODUCTFORECAST_FILTER_STATUS_RESULT'] || [],
        InsertRes:state['ProductForecastReducer']['INSERT_PRODUCTFORECAST_RESULT'] || [],
        exportResult:state['ProductForecastReducer']['FORECAST_EXPORT_RESULT'] || [],
        ProductForecastImportStatus:state['ProductForecastReducer']['IMPORT_PRODUCT_FORECAST_RESULT'] || [],
        ProductForecastImportStatusCode:state['ProductForecastReducer']['IMPORT_PRODUCT_FORECAST_STATUS'] || [],
        ProductForecastImportMsg:state['ProductForecastReducer']['IMPORT_PRODUCT_FORECAST_MSG'] || [],
        ProductForeBrandFilter:state['ProductForecastReducer']['PRODUCTFORECAST_BRAND_FILTER_RESULT'] || [],
        InsertMsg:state['ProductForecastReducer']['FORECAST_INSERT_MSG'] || [],
           
     };
}

export default connect(mapStateToProps)(ProductForecast);
