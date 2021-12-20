import React from 'react';

const columnHeader =["Id","firstName","lastName","email","gender"];
export default class ChildComponent extends React.Component{
   
   constructor(props){
       super(props);
       let employ={
        "data" :[{
        "id": 1,
        "firstName": "Beverlie",
        "lastName": "Yeoman",
        "email": "byeoman0@google.it",
        "gender": "Female"
      }, {
        "id": 2,
        "firstName": "Mabel",
        "lastName": "Saurin",
        "email": "msaurin1@facebook.com",
        "gender": "Female"
      }, {
        "id": 3,
        "firstName": "Agnum",
        "lastName": "Moniker",
        "email": "mmoniker2@geocities.com",
        "gender": "Male"
      },
      {
        "id": 4,
        "firstName": "samuel",
        "lastName": "Jackson",
        "email": "samuel2@geocities.com",
        "gender": "Male"
      },
      {
        "id": 5,
        "firstName": "raju",
        "lastName": "r",
        "email": "raju@geocities.com",
        "gender": "Male"
      },
      {
        "id": 6,
        "firstName": "raj",
        "lastName": "r",
        "email": "raj@geocities.com",
        "gender": "Male"
      },
      {
        "id": 7,
        "firstName": "samu",
        "lastName": "r",
        "email": "samu@geocities.com",
        "gender": "Male"
      },
      {
        "id": 8,
        "firstName": "kilu",
        "lastName": "k",
        "email": "kilu@geocities.com",
        "gender": "Male"
      },
      {
        "id": 9,
        "firstName": "devi",
        "lastName": "d",
        "email": "devi@geocities.com",
        "gender": "Female"
      },
      {
        "id": 10,
        "firstName": "mike",
        "lastName": "r",
        "email": "mike@geocities.com",
        "gender": "Male"
      },
      {
        "id": 11,
        "firstName": "mitt",
        "lastName": "H",
        "email": "sadddy@geocities.com",
        "gender": "Male"
      }
      
    ]
       
    };
    
       this.state={
           tableData:employ.data,
           switchSort:false,
       }
       this.generateHeader = this.generateHeader.bind(this);
       this.generateTableData = this.generateTableData.bind(this);
       this.compareByDesc  =  this.compareByDesc.bind(this);
   }
   handleSort(key){
       alert(key);
        this.setState({
            switchSort:!this.state.switchSort
        })
       let copyTableData =[...this.state.tableData];
       copyTableData.sort(this.compareByDesc(key));
       this.setState({
        tableData:copyTableData
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
   generateHeader(){
    let res=[];
     for(var i = 0; i < columnHeader.length; i++){
         res.push(<th key={columnHeader[i]}>
             <a  id={columnHeader[i]} key={columnHeader[i]} 
               onClick={(e)=>this.handleSort(e.target.id)}>{columnHeader[i]}</a>
             </th>)
     }
     return res;
   }
   generateTableData() {
       let res=[];
       let tableData = this.state.tableData;
       for(var i =0; i < tableData.length; i++){
           res.push(
            <tr key={i}>
           <td key={tableData[i].id}>{tableData[i].id}</td>
           <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
           <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
           <td key={tableData[i].email}>{tableData[i].email}</td>
           <td key={tableData[i].gender}>{tableData[i].gender}</td>
           </tr>
           )
       }
       return res;
   }
   render(){
       return(
           <div>
               <div>
        <table className="table  table-hover">
        <thead>
            <tr>
            {this.generateHeader()}
            </tr>
        </thead>
        <tbody>
            {this.generateTableData()}
        </tbody>
        </table>
             </div>
        </div>
       )
   }
}