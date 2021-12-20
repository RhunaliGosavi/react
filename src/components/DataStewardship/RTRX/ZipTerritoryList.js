import React from "react"
import moment from "moment";
const ZipTerritoryList=({buttonFlag,list,loading,onChangeInput,props,auditFlag,onClickShowCommentPopup,handleModalCloseClick,Modal,zipTerrIdList})=>{
  
  if(loading){
      return <h2>....Loading</h2>
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

        {buttonFlag && buttonFlag.toLowerCase()=="true" ?
          <td className="zip-code-index sticky-col check-col text-center pt-1 border-right-col"><input className="input-control"  type="checkbox" id={"check_"+each.id}  name={"check_"+each.id} onChange={onChangeInput } checked={ props["check_"+each.id] ? props["check_"+each.id] : false}/></td> :<td className="sticky-col checkbox-col sticky-bg-clr "></td>}
          <td style={{"display":"none"}} scope="row" id={"id_"+each.id}>{each.id}</td>
          <td id={"zt_zip_code_"+each.id}   className="zip-code-index sticky-col first-col sticky-bg-clr pl-1 pr-1 border-right-col">{each.zt_zip_code}</td>
          <td className="pl-1 pr-1 border-right-col">
            {/***<input className="input-control" type="text"  id={"zt_terr_id_"+each.id}  value={props["zt_terr_id_"+each.id]  } defaultValue={each.zt_terr_id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"zt_terr_id_"+each.id} onChange={onChangeInput } />***/}
           
           <select className={props["check_"+each.id] && !auditFlag ? "input-control" : "input-control zip_terr_sel"} id={"zt_terr_id_"+each.id} value={props["zt_terr_id_"+each.id] } defaultValue={each.zt_terr_id}  data-check={"check_"+each.id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} name={"zt_terr_id_"+each.id} onChange={onChangeInput }>
               {zipTerrIdList.map((terrId,index)=>{
                  return  <option value={terrId}>{terrId}</option>
               })}
          </select>
            
            </td>
          <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"zt_terr_name_"+each.id}  value={props["zt_terr_name_"+each.id]  } defaultValue={each.zt_terr_name} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"zt_terr_name_"+each.id} onChange={onChangeInput } /></td>
          <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"zt_district_id_"+each.id}  value={props["zt_district_id_"+each.id]  } defaultValue={each.zt_district_id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"zt_district_id_"+each.id} onChange={onChangeInput } /></td>
          <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"zt_district_name_"+each.id}  value={props["zt_district_name_"+each.id]  } defaultValue={each.zt_district_name} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"zt_district_name_"+each.id} onChange={onChangeInput } /></td>
          <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"zt_region_id_"+each.id}  value={props["zt_region_id_"+each.id]  } defaultValue={each.zt_region_id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"zt_region_id_"+each.id} onChange={onChangeInput } /></td>
          <td className="pl-1 pr-1 border-right-col"><input className="input-control" type="text"  id={"zt_region_name_"+each.id}  value={props["zt_region_name_"+each.id]  } defaultValue={each.zt_region_name} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"zt_region_name_"+each.id} onChange={onChangeInput } /></td>
          <td id={"zt_sales_force_id_"+each.id} className="pl-1 pr-1 border-right-col">{each.zt_sales_force_id}</td>
          <td id={"zt_sales_force_name_"+each.id} className="pl-1 pr-1 border-right-col">{each.zt_sales_force_name}</td>
          <td id={"zt_alignment_qtr_"+each.id} className="pl-1 pr-1 border-right-col">{each.zt_alignment_qtr}</td>
          <td id={"zt_alignment_year_"+each.id} className="pl-1 pr-1 border-right-col">{each.zt_alignment_year}</td>
   
          <td className="pl-1 pr-1 border-right-col border-right-col" onClick={ (!props["check_"+each.id] || auditFlag) && each.comments ?  onClickShowCommentPopup  : ""}><input className={(!props["check_"+each.id] || auditFlag  ) && each.comments ? "dots-pointer  comm-clr" : "input-control" } type="text"  id={"comments_"+each.id}  value={props["comments_"+each.id]  } defaultValue={each.comments} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"comments_"+each.id} onChange={onChangeInput } /></td>
          <td className="sticky-col status-col sticky-bg-clr pl-1 pr-1 border-right-col">
           
          <select id={"status_"+each.id}  className={ (camelize(each.status)=="In_Progress"  ? "in-progress-clr" :(camelize(each.status)=="Pending" ? "pending-clr":(camelize(each.status)=="Approved" ? "approve-clr" : (camelize(each.status)=="Rejected" ? "reject-clr": ( camelize(each.status)=="New" ? "new-clr" : (camelize(each.status)=="Submit" ? "submitted-clr" : "new-clr")))))) } value={props["status_"+each.id] || camelize(each.status)} disabled={auditFlag ? true :(props["check_"+each.id]  === true ? false : true)} data-status-check={each.id} name={"status_"+each.id} onChange={onChangeInput }>
                <option value="New">
                  New
                </option>
                {/**<option value="In_Progress">
                  In Progress
                </option>
                <option value="Pending">
                  Pending
                </option>
                  <option value="Rejected">
                  Rejected
                </option>***/}
                <option value="Approved">
                  Approved
                </option>
                <option value="Submit">
                  Submit
                </option>
      
              </select>
            
             
          </td>
          <td id={"reviewd_by_ds_"+each.id} className="border-right-col reviewed-by-col sticky-col sticky-bg-clr pl-1 pr-1">{each.reviewd_by_ds}</td>
          <td style={{"display":"none"}} id={"rec_created_ts_"+each.id} data-reccreatedts={each.rec_created_ts}>{each.rec_created_ts ? each.rec_created_ts.split(' ',1): ""}</td>
          <td id={"rec_updated_ts_"+each.id}  style={{"display":"none"}}>{currentdate.toISOString()}</td>
          <td style={{"display":"none"}}><input className="input-control" type="text"  id={"rec_updated_by_"+each.id}  value={props["rec_updated_by_"+each.id] } defaultValue={"Interface"} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"rec_updated_by_"+each.id} onChange={onChangeInput } /></td>
          <td style={{"display":"none"}} id={"mat_run_id_"+each.id}>{each.mat_run_id}</td>
          <td style={{"display":"none"}} id={"approved_flag_"+each.id}>{each.approved_flag}</td>

         
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
export default ZipTerritoryList