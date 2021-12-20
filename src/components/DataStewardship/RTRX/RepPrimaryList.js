import React ,{ useState } from "react"
import Calendar from "../../Common/CustomCalendar"

const RepPrimaryList=({list,loading,onChangeInput,props,auditFlag,onClickShowCommentPopup,handleModalCloseClick,Modal})=>{
  
  if(loading){
      return <h2>....Loading</h2>
  }
  var currentdate = new Date();

  return (
    <>
    
      { list.map((each,index) =>(
       
        <>
        
       { props["comments_popup"+each.id] && each.comments ?  (
          <Modal    handleModalCloseClick={handleModalCloseClick} modelId={"comments_popup"+each.id} text={"Comment"} classname={"npi-model-list"}>
            <p className="comm-size"> {each.comments}</p> 
           </Modal>
          ) : null}
        <tr key={each.id}>
 
         
          <td className="sticky-col checkbox-col text-center pt-1 border-right-col"><input className="input-control"  type="checkbox" id={"check_"+each.id}  name={"check_"+each.id} onChange={onChangeInput } checked={ props["check_"+each.id] ? props["check_"+each.id] : false}   /></td>
          <td style={{"display":"none"}} scope="row" id={"id_"+each.id}>{each.id}</td>
          <td className="sticky-col nw-col sticky-bg-clr pl-1 pr-1 border-right-col"  id={"nw_vid_v_"+each.id}> {each.nw_vid_v}</td>
          <td className="sticky-col sales-force-col sticky-bg-clr pl-1 pr-1 border-right-col" id={"salesforce_account_id_"+each.id}> {each.salesforce_account_id}</td>
          <td className="sticky-col pri-npi-col sticky-bg-clr pl-1 pr-1 border-right-col"  id={"npi_"+each.id}> {each.npi}</td>
          <td className="sticky-col pri-firstname-col sticky-bg-clr pl-1 pr-1 border-right-col" id={"firstname_"+each.id}> {each.firstname}</td>
          <td  className="sticky-col pri-lastname-col sticky-bg-clr pl-1 pr-1 border-right-col" id={"lastname_"+each.id}> {each.lastname}</td>
          <td  id={"primary_address_sf_address_id_"+each.id} className="pl-1 pr-1 border-right-col"> {each.primary_address_sf_address_id}</td>
          <td  id={"rep_primary_address1_"+each.id} className="pl-1 pr-1 border-right-col"> {each.rep_primary_address1}</td>
          <td  id={"rep_primary_address2_"+each.id} className="pl-1 pr-1 border-right-col"> {each.rep_primary_address2}</td>
          <td  id={"addr3_"+each.id} className="pl-1 pr-1 border-right-col"> {each.addr3}</td>
          <td  id={"rep_primary_city_"+each.id} className="pl-1 pr-1 border-right-col"> {each.rep_primary_city}</td>
          <td  id={"rep_primary_state_"+each.id} className="pl-1 pr-1 border-right-col"> {each.rep_primary_state}</td>
          <td  id={"rep_primary_zip_"+each.id} className="pl-1 pr-1 border-right-col"> {each.rep_primary_zip}</td>
          <td  id={"rep_primary_zip4_"+each.id} className="pl-1 pr-1 border-right-col"> {each.rep_primary_zip4}</td>
          <td  id={"primary_address_override_flg_"+each.id} className="pl-1 pr-1 border-right-col"> {each.primary_address_override_flg ? "TRUE" : "FALSE"}</td>
          <td  id={"primary_address_override_date_"+each.id} className="pl-1 pr-1 border-right-col"> {each.primary_address_override_date}</td>
          <td  id={"rep_primary__c_"+each.id} className="pl-1 pr-1 border-right-col"> {each.rep_primary__c ? "TRUE" : "FALSE"}</td>
          <td  onClick={ (!props["check_"+each.id] || auditFlag) && each.comments ?  onClickShowCommentPopup  : ""} id={"comments_"+each.id} className={each.comments ? "dots-pointer comm-clr pl-1 pr-1 border-right-col" : " pl-1 pr-1 border-right-col" } > {each.comments }</td>
          <td className="sticky-col status-col sticky-bg-clr pl-1 pr-1 border-right-col">
            <select id={"status_"+each.id}  className={ (camelize(each.status)=="In_Progress"  ? "in-progress-clr" :(camelize(each.status)=="Pending" ? "pending-clr":(camelize(each.status)=="Approved" ? "approve-clr" : (camelize(each.status)=="Rejected" ? "reject-clr": ( camelize(each.status)=="New" ? "new-clr" : (camelize(each.status)=="Submit" ? "submitted-clr" : "in-progress-clr")))))) } value={props["status_"+each.id] || camelize(each.status)} disabled={auditFlag ? true :(props["check_"+each.id]  === true ? false : true)} data-status-check={each.id} name={"status_"+each.id} onChange={onChangeInput }>
                  
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Approved">
                    Approved
                  </option>
                  <option value="Rejected">
                    Rejected
                  </option>
                 
                </select>
            </td>
          <td className="reviewed-by-col sticky-col sticky-bg-clr pl-1 pr-1 border-right-col" id={"reviewd_by_ds_"+each.id}>{each.reviewd_by_ds}</td>
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
export default RepPrimaryList