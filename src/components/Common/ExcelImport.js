import React, { useState } from "react";

import * as XLSX from "xlsx";

class ExcelImport extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
    };
  }
  componentDidMount() {
    const { handleModalCloseClick } = this.props;
    $(this.modal).modal('show');
    $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
    }
  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
   // console.log(file);
    this.setState({ file });

    //console.log(this.state.file);
  }

  updateData=(data)=>{
   
    this.props.sendData(data);
  }

  readFile() {
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
  
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data);// shows that excel data is read
      console.log("JSON data",this.convertToJson(data)); // shows data in json format
     this.updateData(this.convertToJson(data));
    };
  
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",") ;

    for (i = 0; i < headers.length; ++i) {
      headers[i] = headers[i].replaceAll(" ","_").toLowerCase()
    }

         console.log("headers***",headers,lines)
    for (var i = 1; i < lines.length-1; i++) {
     
      var currentline = lines[i].split(",");
      console.log("current line",currentline,headers,"***",currentline[0],currentline[0]!="","****")
     // if(currentline!=""){
      if(currentline[0]!="" && currentline[0]!=null){
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
           
            if(headers[j]=="id"){
              obj[headers[j]] = parseInt(currentline[j]);
            }else if(headers[j]=="mat_run_id"){
              obj[headers[j]] = parseInt(currentline[j]);
            }else{
              obj[headers[j]] = currentline[j];
            }
         }
         if(obj!="" ){
          result.push(obj);
          }
      }
      console.log("object",obj)
        
    }

    console.log("Result object",result)
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  handleCloseClick=()=> {
    console.log(this.props)
    const { handleModalCloseClick } = this.props;
    $(this.modal).modal('hide');
    handleModalCloseClick();
  }

  render() {
    return (
      <div className="col-lg-12 ">
        <div className="row">
          <div className="col-lg-12">
          
            <input type="file"  ref="fileUploader" onChange={this.filePathset.bind(this)} className="" id="customFile" />
         
          </div>
          <div className="col-lg-12  mt-4 modal-footer">
           
                <div className="row">
                  <div> <button button type="button" className="btn btn-secondary" onClick={() => { this.readFile(); }}>Import</button></div>
                  <div className="pl-2"> <button type="button" className="btn btn-secondary" id={this.props.modelId} onClick={this.handleCloseClick}>Cancel</button> </div>
                </div>
          
          </div>
        </div>
      </div>
    );
  }
}

export default ExcelImport;