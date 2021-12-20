import React ,{ useState } from "react"
import Calendar from "../../Common/CustomCalendar"
import moment from "moment";
const PricingList=({datepickerChange,list,loading,onChangeInput,props,auditFlag})=>{
  
  if(loading){
      return <h2>....Loading</h2>
  }
  var currentdate = new Date();
 const handleDatePickerChnage=(e,id,datepickerChange)=>{
  datepickerChange(e,id)
      
 }
  return (
    <>
    
      { list.map((each,index) =>(
       
        <>
     
        <tr key={each.id}>
 
         
          <td className="border-right-col text-center pt-1"><input className="input-control"  type="checkbox" id={"check_"+each.id}  name={"check_"+each.id} onChange={onChangeInput } checked={ props["check_"+each.id] ? props["check_"+each.id] : false}  disabled={auditFlag ? false :(( camelize(each.status)!="Approved") ? false : true)} /></td>
          <td style={{"display":"none"}} scope="row" id={"id_"+each.id}>{each.id}</td>
          <td className="pl-1 pr-1 border-right-col">
                <input className="input-control" type="text"  id={"product_numb_"+each.id}  value={props["product_numb_"+each.id]  } defaultValue={each.product_numb} disabled={"disabled"} data-check={"check_"+each.id} name={"product_numb_"+each.id} onChange={onChangeInput } />
                {/***<select id={"product_numb_"+each.id}   value={props["product_numb_"+each.id] || each.product_numb}  disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-status-check={each.id} name={"product_numb_"+each.id} onChange={onChangeInput }>
                 {productDrop.product_numb && productDrop.product_numb.map((each,index) =>(
                    <option value={each}>{each}</option>
                 ))}
                 </select>**/}
          </td>
            <td  id={"product_name_"+each.id} className="pl-1 pr-1 border-right-col">
                {/***<input className="input-control" type="text"  id={"product_name_"+each.id}  value={props["product_name_"+each.id]  } defaultValue={each.product_name} disabled={"disabled"} data-check={"check_"+each.id} name={"product_name_"+each.id} onChange={onChangeInput } />***/}
                {/***<select id={"product_name_"+each.id}   value={props["product_name_"+each.id] || each.product_name}  data-status-check={each.id} name={"product_name_"+each.id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} onChange={onChangeInput }>
                {productDrop.product_name && productDrop.product_name.map((each,index) =>(
                    <option value={each}>{each}</option>
                ))}
                </select>***/}
                {each.product_name}
            </td>
            <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"awp_unit_"+each.id}  value={props["awp_unit_"+each.id]  } defaultValue={each.awp_unit} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"awp_unit_"+each.id} onChange={onChangeInput } /></td>
            <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"wac_unit_"+each.id}  value={props["wac_unit_"+each.id]  } defaultValue={each.wac_unit} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"wac_unit_"+each.id} onChange={onChangeInput } /></td>
            <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"actv_flg_"+each.id}  value={each.actv_flg } defaultValue={each.actv_flg} disabled={"disabled"} data-check={"check_"+each.id} name={"actv_flg_"+each.id} onChange={onChangeInput } /></td>
           
            <td className="pl-1 pr-1 border-right-col">
              {/***<input className="input-control" type="text"  id={"start_date_"+each.id}  value={props["start_date_"+each.id]  } defaultValue={each.start_date} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"start_date_"+each.id} onChange={onChangeInput } />***/}
              
              <Calendar selectedDate={props["start_date_"+each.id] ? props["start_date_"+each.id] : each.start_date} handleDatePickerChnage={(e)=>{handleDatePickerChnage(e,"start_date_"+each.id,datepickerChange)}} name={"start_date_"+each.id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} id={"start_date_"+each.id}></Calendar>
            </td>
            <td className="pl-1 pr-1 border-right-col">
              <input className="input-control" type="text"  id={"end_date_"+each.id}  value={each.end_date  } defaultValue={each.end_date} disabled={"disabled"} data-check={"check_"+each.id} name={"end_date_"+each.id} onChange={onChangeInput } />
             </td>
                     
          <td className="pl-1 pr-1 border-right-col" >
          <select id={"status_"+each.id}  className={ (camelize(each.status)=="In_Progress"  ? "in-progress-clr" :(camelize(each.status)=="Pending" ? "pending-clr":(camelize(each.status)=="Approved" ? "approve-clr" : (camelize(each.status)=="Rejected" ? "reject-clr": ( camelize(each.status)=="New" ? "new-clr" : (camelize(each.status)=="Submit" ? "submitted-clr" : "submitted-clr")))))) } value={props["status_"+each.id] || camelize(each.status)} disabled={auditFlag ? true :(props["check_"+each.id]  === true ? false : true)} data-status-check={each.id} name={"status_"+each.id} onChange={onChangeInput }>
                <option value="Submit">
                  Submit
                </option>
                <option value="Pending">
                  Pending
                </option>
                <option value="Approved">
                  Approved
                </option>
               
                 {/**uniqueStatus && uniqueStatus.map((each,index) =>(
                    <option value={each}>{each}</option>
                 ))**/}
              </select>
            
             
          </td>
          <td id={"reviewd_by_ds_"+each.id} className="pl-1 pr-1 border-right-col">{each.reviewd_by_ds}</td>
          <td style={{"display":"none"}} id={"rec_created_ts_"+each.id} data-reccreatedts={each.rec_created_ts}>{each.rec_created_ts ? each.rec_created_ts.split(' ',1): ""}</td>
          <td id={"rec_updated_ts_"+each.id}  style={{"display":"none"}}>{currentdate.toISOString()}</td>
          <td style={{"display":"none"}} id={"mat_run_id_"+each.id}>{each.mat_run_id}</td>
          <td style={{"display":"none"}} id={"approved_flag_"+each.id}>{each.approved_flag}</td>
          <td  style={{"display":"none"}}><input className="input-control" type="text"  id={"rec_updated_by_"+each.id}  value={props["rec_updated_by_"+each.id] } defaultValue={"Interface"} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"rec_updated_by_"+each.id} onChange={onChangeInput } /></td>

         
        </tr>
        </>
      ))

    
        
        
      }
   </>
  )

  function camelize(str) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
  }

}
export default PricingList