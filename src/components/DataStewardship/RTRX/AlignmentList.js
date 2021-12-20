import React from "react"
import moment from "moment";
const AlignmentList=({buttonFlag,list,loading,onChangeInput,props,auditFlag,onClickShowCommentPopup,handleModalCloseClick,Modal})=>{
  
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
 
        { buttonFlag && buttonFlag.toLowerCase()=="true" ?
         <td className="sticky-col checkbox-col text-center pt-1 border-right-col "><input className="input-control "  type="checkbox" id={"check_"+each.id}  name={"check_"+each.id} onChange={onChangeInput } checked={ props["check_"+each.id] ? props["check_"+each.id] : false}/></td> : <td className="sticky-col checkbox-col sticky-bg-clr "></td>}
          <td style={{"display":"none"}} scope="row" id={"id_"+each.id}>{each.id}</td>
          <td id={"ac_npi_"+each.id}   className="sticky-col npi-col sticky-bg-clr border-right-col ">{each.cm_npi}</td>
          <td id={"ac_firstname_"+each.id}   className="sticky-col firstname-col sticky-bg-clr border-right-col">{each.cm_firstname}</td>
          <td id={"ac_lastname_"+each.id}   className="sticky-col lastname-col sticky-bg-clr border-right-col">{each.cm_lastname}</td>
          <td id={"cm_prime_zip_"+each.id}   className="sticky-col zip-col sticky-bg-clr border-right-col">{each.cm_prime_zip}</td>
          {/*<td id={"zip_code_"+each.id}   className="border-right-col">{each.zt_zip_code}</td>*/}
          <td id={"ac_degree_"+each.id}   className="border-right-col">{each.cm_degree}</td>
          <td id={"ac_prime_zip_"+each.id}   className="border-right-col">{each.ac_prime_zip}</td>
          <td id={"ac_sf1_terr_id_"+each.id}   className="border-right-col">{each.ac_sf1_terr_id}</td>
          <td id={"ac_sf1_terr_name_"+each.id}   className="border-right-col">{each.ac_sf1_terr_name}</td>
          <td id={"ac_sf2_terr_id_"+each.id}   className="border-right-col">{each.ac_sf2_terr_id}</td>
          <td id={"ac_sf2_terr_name_"+each.id}   className="border-right-col">{each.ac_sf2_terr_name}</td>
          <td id={"anx_degree_"+each.id}   className="border-right-col">{each.nx_degree}</td>
          <td id={"nx_prime_zip_"+each.id}   className="border-right-col">{each.nx_prime_zip}</td>
          <td id={"nx_sf1_terr_id_"+each.id}   className="border-right-col">{each.nx_sf1_terr_id}</td>
          <td id={"nx_sf1_terr_name_"+each.id}   className="border-right-col">{each.nx_sf1_terr_name}</td>
          <td id={"nx_sf2_terr_id_"+each.id}   className="border-right-col">{each.nx_sf2_terr_id}</td>
          <td id={"nx_sf2_terr_name_"+each.id}   className="border-right-col">{each.nx_sf2_terr_name}</td>
          <td id={"has_sale_"+each.id}   className="border-right-col">{each.has_sale ? "TRUE" :"FALSE"}</td>
          <td id={"sale_dt_"+each.id}   className="border-right-col">{each.sale_dt}</td>
          <td id={"has_sale_last_2_qtr_"+each.id}   className="border-right-col">{each.has_sale_last_2_qtr ? "TRUE" : "FALSE"}</td>
          <td onClick={ (!props["check_"+each.id] || auditFlag) && each.comments ?  onClickShowCommentPopup  : ""} className="border-right-col"><input className={ (!props["check_"+each.id] || auditFlag ) && each.comments  ? "dots-pointer  comm-clr" : "input-control"} type="text"  id={"comments_"+each.id}  value={props["comments_"+each.id]  } defaultValue={each.comments} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"comments_"+each.id} onChange={onChangeInput } /></td>
          <td id={"review_category_"+each.id} className="border-right-col">{each.review_category}</td>
          <td id={"group_"+each.id} className="border-right-col">{each.group}</td>
          <td className="sticky-col al-status-col sticky-bg-clr border-right-col">
          
              <select id={"status_"+each.id}  className={ (each.status=="Retained"  ? "in-progress-clr" :(each.status=="Approved" ? "approve-clr" :  "approve-clr" )) } value={props["status_"+each.id] || each.status} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-status-check={each.id} name={"status_"+each.id} onChange={onChangeInput }>
              <option value="Approved">
                  Approved
                </option>
                <option value="Retained">
                Retained
                </option>
                
                
              </select>
          </td>
          <td id={"reviewd_by_ds_"+each.id} className="sticky-col al-reviewed-by-col sticky-bg-clr border-right-col">{each.reviewd_by_ds}</td>
          
          <td id={"rec_updated_ts_"+each.id}  style={{"display":"none"}}>{currentdate.toISOString()}</td>
          <td style={{"display":"none"}}><input className="input-control" type="text"  id={"rec_updated_by_"+each.id}  value={props["rec_updated_by_"+each.id] } defaultValue={"Interface"} disabled={auditFlag ? true : (props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"rec_updated_by_"+each.id} onChange={onChangeInput } /></td>
          <td style={{"display":"none"}} id={"rec_created_ts_"+each.id} data-reccreatedts={each.rec_created_ts}>{each.rec_created_ts ? each.rec_created_ts.split(' ',1): ""}</td>


          </tr>
        </>
      ))

    
        
        
      }
   </>
  )

}
export default AlignmentList