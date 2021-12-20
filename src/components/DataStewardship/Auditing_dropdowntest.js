import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from "axios"
class Auditing_dropdowntest extends React.Component {

    // define the JSON of data
    constructor() {
      super();
    
      this.state = {
        
         npiSearchItems:[],
         npiShowNOData:false,
         npiItem:'',
         npiSelectItem:''  
       };

   
     
  }

  npiAutocomplete=(evt)=>{

      let text = evt.target.value;
      this.setState({ npiItem: {id: text } })
      let showNOData=false;
    
      if(text.length > 4){
        
          let showLoader=true;
          this.setState({npiShowLoader:showLoader })
          
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/alignment/search/cm_npi/${text}`, {
              headers: {"Authorization" : `Bearer ${localStorage.jwt}`}
            })
            .then((res) => {
               
                let data=Object.keys(res.data);
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

    npiSelectItem=(args)=>{
         this.setState({ npiItem: {id: args }, npiSearchItems: [] });
    }
     render() {
        return (
            
          <div className="form-group col-md-7">
            <label for="inputEmail4" >NPI</label> 
            <input type="text" id="npi-autocomplete" placeholder="Enter NPI" autocomplete="off" onChange={this.npiAutocomplete}   className="custom-input form-control" value={this.state.npiItem ? this.state.npiItem.id : ""}/>
            {this.state.npiShowLoader && <span class="spinner-border spinner-border-sm " id="loader-autocomplete" role="status" aria-hidden="true"></span>}
            {this.state.npiSearchItems && this.state.npiSearchItems.length > 0 && (
            <ul className="list-group autocomplete-dropdown">
              
              {this.state.npiSearchItems && this.state.npiSearchItems.map((item, idx) => (
                <li className={"list-group-item" } key={idx} onClick={()=> this.npiSelectItem(item)}>
                  {item} 
                </li>
              ))}
            </ul>
          )}
         
           { this.state.npiShowNOData && 
             
            <ul className="list-group autocomplete-dropdown" id="noData">
               <li className={"list-group-item" }>
                No Data Found
               </li>
            </ul> 
          }
      </div>

  

        );
    }
}
export default Auditing_dropdowntest;