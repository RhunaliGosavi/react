import React ,{ useState } from "react"
import Calendar from "../../Common/CustomCalendar"
import moment from "moment";
const ProductForecastList=({Modal,handleModalCloseClick,onClickShowCommentPopup,datepickerChange,list,loading,onChangeInput,props,auditFlag})=>{
  
  if(loading){
      return <h2>....Loading</h2>
  }
  const handleDatePickerChnage=(e,id,datepickerChange)=>{
    datepickerChange(e,id)
       // console.log("e,id",e,id)
   }
  var currentdate = new Date();

  return (
    <>
    
      { list.map((each,index) =>(
       
        <>
        
        { props["comments_popup"+each.id] ?  (
          <Modal    handleModalCloseClick={handleModalCloseClick} modelId={"comments_popup"+each.id} text={"Comment"} classname={"npi-model-list"}>
            <p className="comm-size"> {each.comments}</p> 
           </Modal>
          ) : null}  
        <tr key={each.id}>
 
          {console.log("forecastYear",moment(each.forecast_month).format("YYYY"), moment().format("YYYY"))}
          <td className="sticky-col check-col text-center pt-1 border-right-col"><input className="input-control"  type="checkbox" id={"check_"+each.id}  name={"check_"+each.id} onChange={onChangeInput } disabled={auditFlag ? false : ((moment(each.forecast_month).format("YYYY")== moment().format("YYYY")) ? false :true) } checked={ props["check_"+each.id] ? props["check_"+each.id] : false}  /></td>
          <td style={{"display":"none"}} scope="row" id={"id_"+each.id}>{each.id}</td>
          <td className="sticky-col prod-fore-first-col sticky-bg-clr pl-1 pr-1 border-right-col" id={"forecast_month_"+each.id}  >
            {each.forecast_month}
            {/****<Calendar selectedDate={props["forecast_month_"+each.id] ? props["forecast_month_"+each.id] : each.forecast_month} handleDatePickerChnage={(e)=>{handleDatePickerChnage(e,"forecast_month_"+each.id,datepickerChange)}} name={"forecast_month_"+each.id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} id={"forecast_month_"+each.id}></Calendar>****/}
          </td>
          <td className="sticky-col prod-fore-second-col sticky-bg-clr pl-1 pr-1 border-right-col" id={"brand_id_"+each.id}>
               {/* <input className="input-control" type="text"  id={"brand_id_"+each.id}  value={props["brand_id_"+each.id]  } defaultValue={each.brand_id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"brand_id_"+each.id} onChange={onChangeInput } />***/}
               {each.brand_id}
          </td>
            <td className="sticky-col prod-fore-third-col sticky-bg-clr pl-1 pr-1 border-right-col">
                {/***<input className="input-control" type="text"  id={"brand_name_"+each.id}  value={props["brand_name_"+each.id]  } defaultValue={each.brand_name} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"brand_name_"+each.id} onChange={onChangeInput } />***/}
                {each.brand_name}
            </td>
            <td className="pl-1 pr-1 border-right-col">
            {/****   <input className="input-control" type="text"  id={"forecast_ttl_actv_patients_"+each.id}  value={props["forecast_ttl_actv_patients_"+each.id]  } defaultValue={each.forecast_ttl_actv_patients} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_ttl_actv_patients_"+each.id} onChange={onChangeInput } />****/}
              {each.forecast_ttl_actv_patients}
            </td>
            <td className="pl-1 pr-1 border-right-col">
              {/****<input className="input-control" type="text"  id={"forecast_gross_new_patients_"+each.id}  value={props["forecast_gross_new_patients_"+each.id]  } defaultValue={each.forecast_gross_new_patients} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_gross_new_patients_"+each.id} onChange={onChangeInput } />***/}
              {each.forecast_gross_new_patients}
            </td>
            <td className="pl-1 pr-1 border-right-col">
              {/****<input className="input-control" type="text"  id={"forecast_net_new_patients_"+each.id}  value={props["forecast_net_new_patients_"+each.id]  } defaultValue={each.forecast_net_new_patients} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_net_new_patients_"+each.id} onChange={onChangeInput } />***/}
              {each.forecast_net_new_patients}
            </td>
            <td className="pl-1 pr-1 border-right-col">
              {/***  <input className="input-control" type="text"  id={"forecast_shipments_"+each.id}  value={props["forecast_shipments_"+each.id]  } defaultValue={each.forecast_shipments} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_shipments_"+each.id} onChange={onChangeInput } />***/}
              {each.forecast_shipments}
            </td>
            <td className="pl-1 pr-1 border-right-col">
              {/****<input className="input-control" type="text"  id={"forecast_prcnt_patients_ship_"+each.id}  value={props["forecast_prcnt_patients_ship_"+each.id]  } defaultValue={each.forecast_prcnt_patients_ship} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_prcnt_patients_ship_"+each.id} onChange={onChangeInput } />***/}
              {each.forecast_prcnt_patients_ship}
            </td>
            <td className="pl-1 pr-1 border-right-col">
             {/***   <input className="input-control" type="text"  id={"forecast_units_"+each.id}  value={props["forecast_units_"+each.id]  } defaultValue={each.forecast_units} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_units_"+each.id} onChange={onChangeInput } />***/}
             {each.forecast_units}
            </td>         
            <td className="pl-1 pr-1 border-right-col">
              {/****<input className="input-control" type="text"  id={"forecast_mgs_"+each.id}  value={props["forecast_mgs_"+each.id]  } defaultValue={each.forecast_mgs} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_mgs_"+each.id} onChange={onChangeInput } />***/}
              {each.forecast_mgs} 
            </td>         
            <td className="pl-1 pr-1 border-right-col">
              {/**<input className="input-control" type="text"  id={"forecast_gross_"+each.id}  value={props["forecast_gross_"+each.id]  } defaultValue={each.forecast_gross} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_gross_"+each.id} onChange={onChangeInput } />****/}
              {each.forecast_gross} 
            </td>         
            <td className="pl-1 pr-1 border-right-col">
              {/****<input className="input-control" type="text"  id={"forecast_net_"+each.id}  value={props["forecast_net_"+each.id]  } defaultValue={each.forecast_net} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"forecast_net_"+each.id} onChange={onChangeInput } />***/}
              {each.forecast_net} 
            </td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_ttl_actv_patients_"+each.id}  value={props["le_ttl_actv_patients_"+each.id]  } defaultValue={each.le_ttl_actv_patients} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_ttl_actv_patients_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_gross_new_patients_"+each.id}  value={props["le_gross_new_patients_"+each.id]} defaultValue={`${each.le_gross_new_patients}`} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_gross_new_patients_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_net_new_patients_"+each.id}  value={props["le_net_new_patients_"+each.id]  } defaultValue={`${each.le_net_new_patients}`} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_net_new_patients_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_shipments_"+each.id}  value={props["le_shipments_"+each.id]  } defaultValue={each.le_shipments} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_shipments_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_prcnt_patients_ship_"+each.id}  value={props["le_prcnt_patients_ship_"+each.id]  } defaultValue={each.le_prcnt_patients_ship} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_prcnt_patients_ship_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_units_"+each.id}  value={props["le_units_"+each.id]  } defaultValue={each.le_units} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_units_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_mgs_"+each.id}  value={props["le_mgs_"+each.id]  } defaultValue={each.le_mgs} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_mgs_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_gross_"+each.id}  value={props["le_gross_"+each.id]  } defaultValue={each.le_gross} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_gross_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col"><input className="input-control inp-size" type="text"  id={"le_net_"+each.id}  value={props["le_net_"+each.id]  } defaultValue={each.le_net} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"le_net_"+each.id} onChange={onChangeInput } /></td>         
            <td className="pl-1 pr-1 border-right-col border-right-col" onClick={ (!props["check_"+each.id] || auditFlag) && each.comments ?  onClickShowCommentPopup  : ""}><input className={(!props["check_"+each.id] || auditFlag  ) && each.comments ? "dots-pointer  comm-clr" : "input-control" } type="text"  id={"comments_"+each.id}  value={props["comments_"+each.id]  } defaultValue={each.comments} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"comments_"+each.id} onChange={onChangeInput } /></td>
          <td className="sticky-col status-col sticky-bg-clr pl-1 pr-1 border-right-col">
              
            
              <select id={"status_"+each.id}  className={ (each.status=="In_Progress"  ? "in-progress-clr" :(each.status=="Pending" ? "pending-clr":(each.status=="Approved" ? "approve-clr" : (each.status=="Rejected" ? "reject-clr": ( each.status=="New" ? "new-clr" : (each.status=="Submit" ? "submitted-clr" : "pending-clr")))))) } value={props["status_"+each.id] || each.status} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-status-check={each.id} name={"status_"+each.id} onChange={onChangeInput }>
                
                <option value="Pending">
                  Pending
                </option>
                <option value="Approved">
                  Approved
                </option>
                <option value="Submit">
                  Submit
                </option>
      
              </select>
          </td>
          <td id={"reviewd_by_ds_"+each.id} className="reviewed-by-col sticky-col sticky-bg-clr pl-1 pr-1 border-right-col">{each.reviewd_by_ds}</td>
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

}
export default ProductForecastList