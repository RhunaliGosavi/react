import React from "react"

const List=({onClickShowCommentPopup,showLoader,showNOData,handleRegistryClick,item,selectItem,searchItems,autocomplete,list,onChangeInput,props,onClickShowPopup,Modal,handleModalCloseClick,auditFlag ,testingApprovedRecords })=>{

let selectedItem=(arg,selectItem)=>{

  selectItem(arg);

}
let handleRegClick=(e,handleRegistryClick)=>{
  
  handleRegistryClick(e);
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
        
        { props["reg_popup_"+each.id] ?  (
          <Modal showLoader={showLoader} item={item} handleRegClick={(e)=>{handleRegClick(e,handleRegistryClick)}} handleModalCloseClick={handleModalCloseClick} modelId={"reg_popup_"+each.id} text={"Registry Data"} classname={"npi-model-list"}>
            
            <form id={"reg_form_"+each.id} className="regForm" onSubmit={e => { e.preventDefault(); }}>
            <div class="form-row">
                <div className="form-group col-md-7">
                    {/* <label for="inputEmail4" >NPI</label> */}
                    <input type="text" id="autocomplete" placeholder="Enter NPI or Name to search" autocomplete="off" onChange={autocomplete}   className="custom-input form-control" value={item ? item.id : ""}/>
                   {showLoader && <span class="spinner-border spinner-border-sm " id="loader-autocomplete" role="status" aria-hidden="true"></span>}
                    {searchItems && searchItems.length > 0 && (
                      <ul className="list-group autocomplete-dropdown">
                        
                        {searchItems && searchItems.map((item, idx) => (
                          <li className={"list-group-item" } key={idx} onClick={()=> selectedItem(item.id,selectItem)}>
                            {item.id} ({item.provider_first_name} {item.provider_middle_name} {item.provider_last_name_legal_name})
                          </li>
                        ))}
                      </ul>
                    )}
                   
                     { showNOData && 
                       
                      <ul className="list-group autocomplete-dropdown" id="noData">
                         <li className={"list-group-item" }>
                          No Data Found
                         </li>
                      </ul> 
                    }
                </div>

            
              </div>
              <div>
              
                {!showLoader && item  && 
                  <div className="row">
                    
                    <div className="col-xl-5 col-lg-5 col-md-5">
                        <div className="col-xl-12 col-lg-12 col-md-12 doctor-name pr-0 mb-2" >  
                          {item.provider_first_name} {item.provider_middle_name} {item.provider_last_name_legal_name}
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 txt-font">
                              <b>NPI</b>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                            {item.id}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 icon-font cap-icon">
                             <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                               {item.provider_credential_text}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1  pl-2">
                            <img className="specialityImg" src={process.env.REACT_APP_BASE_URL+"/dist/assets/img/speciality.jpg"}></img>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 txt-font pl-4">
                               {item.speciality ? item.speciality : "NA"}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 icon-font">
                              <i class="fa fa-phone" aria-hidden="true"></i>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 txt-font mt-2">
                               {item.provider_business_practice_location_address_telephone_number}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 pr-0">  
                          <div className="row">
                              <div className="col-xl-1 col-lg-1 col-md-1 icon-font">
                                 <i class="fa fa-hospital-o" aria-hidden="true"></i>
                              </div>
                              <div className="col-xl-9 col-lg-9 col-md-9 txt-font p-0">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                  {item.provider_first_line_business_practice_location_address}
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                 {item.provider_business_practice_location_address_state_name}
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                  {item.provider_business_practice_location_address_city_name}
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                  {item.provider_business_practice_location_address_postal_code}
                                </div>
                              
                              </div>
                              
                          </div>
                         
                        </div>
                      
                   
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <img className="doctor-img" src={process.env.REACT_APP_BASE_URL+"/dist/assets/img/doctor.png"}></img>
                    </div>
                  </div>
                }
               
              </div>
              
             </form>
            
          </Modal>
          ) : null}
        <tr key={each.id}>

         
          <td  className="sticky-col check-col text-center pt-1 border-right-col"><input className="input-control"  type="checkbox" id={"check_"+each.id}  name={"check_"+each.tst_src_id} onChange={onChangeInput } checked={ props["check_"+each.tst_src_id] ? props["check_"+each.tst_src_id] : false} disabled={auditFlag ? false  :( testingApprovedRecords && testingApprovedRecords.length>0 && testingApprovedRecords.includes(each.tst_src_id) ? true : false)}/></td>
          <td style={{"display":"none"}} scope="row" id={"id_"+each.id}>{each.id}</td>
          <td id={"tst_source_"+each.id}   className="sticky-col first-col sticky-bg-clr pl-1 pr-1 border-right-col">{each.tst_source}</td>
          <td className="sticky-col second-col sticky-bg-clr pl-1 pr-1 border-right-col" id={"tst_src_id_"+each.id}  >{each.tst_src_id}</td>

          <td id={"src_npi_nbr_"+each.id} className="border-right-col pl-1 pr-1">{each.src_npi_nbr}</td>
          <td className="border-right-col pl-1 pr-1">
              
              <input  style={{"border":"none"}} className="input-control" type="text"  id={"reg_npi_nbr_"+each.id}  value={ props["reg_npi_nbr_"+each.id] } defaultValue={each.reg_npi_nbr} disabled={auditFlag ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_npi_nbr_"+each.id} onChange={onChangeInput } />
              {!auditFlag ? <span title="Search Registry Data" className={props["check_"+each.tst_src_id] ? "dots dots-pointer dot-color" : "dots"} id={"reg_popup_"+each.id} onClick={props["check_"+each.tst_src_id]  ? onClickShowPopup : ""}></span> : ""}
          </td>
          <td id={"src_fname_"+each.id} className="border-right-col pl-1 pr-1">{each.src_fname}</td>
          <td className="border-right-col"><input className="input-control pl-1 pr-1" type="text"  id={"reg_fname_"+each.id}  value={props["reg_fname_"+each.id]  } defaultValue={each.reg_fname} disabled={(auditFlag || props["row_dis_"+each.id] )  ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_fname_"+each.id} onChange={onChangeInput } /></td>
          <td id={"src_middlename_"+each.id} className="border-right-col pl-1 pr-1">{each.src_middlename}</td>
          <td className="border-right-col"><input className="input-control pl-1 pr-1" type="text"  id={"reg_middlename_"+each.id}  value={props["reg_middlename_"+each.id] } defaultValue={each.reg_middlename} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_middlename_"+each.id} onChange={onChangeInput } /></td>
          <td id={"src_lname_"+each.id} className="border-right-col pl-1 pr-1">{each.src_lname}</td>
          <td className="border-right-col"><input className="input-control pl-1 pr-1" type="text"  id={"reg_lname_"+each.id}  value={props["reg_lname_"+each.id] } defaultValue={each.reg_lname} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_lname_"+each.id} onChange={onChangeInput } /></td>
          <td id={"src_degree_"+each.id} className="border-right-col pl-1 pr-1">{each.src_degree}</td>
          <td className="border-right-col"><input className="input-control pl-1 pr-1" type="text"  id={"reg_credential_"+each.id}  value={props["reg_credential_"+each.id] }  defaultValue={each.reg_credential} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_credential_"+each.id} onChange={onChangeInput } /></td>
          <td id={"src_email_"+each.id} className="border-right-col pl-1 pr-1">{each.src_email}</td>
          <td className="border-right-col"><input className="input-control pl-1 pr-1" type="text"  id={"reg_email_"+each.id}  value={props["reg_email_"+each.id] }  defaultValue={each.reg_email} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_email_"+each.id} onChange={onChangeInput } /></td>

          <td id={"src_zipcode_"+each.id} className="border-right-col pl-1 pr-1">{each.src_zipcode}</td>
          <td className="border-right-col" className="border-right-col pl-1 pr-1"><input className="input-control" type="text"  id={"reg_zip_"+each.id}  value={props["reg_zip_"+each.id] } defaultValue={each.reg_zip} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_zip_"+each.id} onChange={onChangeInput } /></td>
          <td id={"src_city_"+each.id} className="border-right-col pl-1 pr-1">{each.src_city}</td>
          <td className="border-right-col"><input className="input-control pl-1 pr-1" type="text"  id={"reg_practise_city_"+each.id}  value={props["reg_practise_city_"+each.id] } defaultValue={each.reg_practise_city} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_practise_city_"+each.id} onChange={onChangeInput } /></td>

          <td id={"src_state_"+each.id} className="border-right-col pl-1 pr-1">{each.src_state}</td>
          <td  className="border-right-col"><input className="input-control pl-1 pr-1 " type="text"  id={"reg_practise_state_"+each.id}  value={props["reg_practise_state_"+each.id] } defaultValue={each.reg_practise_state} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_practise_state_"+each.id} onChange={onChangeInput } /></td>
          <td id={"src_org_name_"+each.id} className="border-right-col pl-1 pr-1">{each.src_org_name}</td>
          <td  className="border-right-col pl-1 pr-1"><input className="input-control" type="text"  id={"reg_org_name_"+each.id}  value={props["reg_org_name_"+each.id] } defaultValue={each.reg_org_name} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_org_name_"+each.id} onChange={onChangeInput } /></td>
          
          <td style={{"display":"none"}}><input className="input-control " type="text"  id={"reg_practise_city_"+each.id}  value={props["reg_practise_city_"+each.id] } defaultValue={each.reg_practise_city}  disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_practise_city_"+each.id} onChange={onChangeInput } /></td>
          <td style={{"display":"none"}}><input className="input-control" type="text"  id={"reg_practise_state_"+each.id}  value={props["reg_practise_state_"+each.id] } defaultValue={each.reg_practise_state}  disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"reg_practise_state_"+each.id} onChange={onChangeInput } /></td>
          <td style={{"display":"none"}} id={"rec_created_ts_"+each.id} data-reccreatedts={each.rec_created_ts}>{each.rec_created_ts ? each.rec_created_ts.split(' ',1): ""}</td>
          {/***<td style={{"display":"none"}} id={"rec_updated_ts_"+each.id} data-recupdatedts={each.rec_updated_ts}>{each.rec_updated_ts.split(' ',1)}</td>***/}
        
          <td className="pl-1 pr-1 border-right-col ex-us-flag-checkbox" >
            <input className="input-control"  type="checkbox" id={"ex_us_flag_"+each.id}  name={"ex_us_flag_"+each.id} onChange={onChangeInput } checked={ props["ex_us_flag_"+each.id] ===undefined ? each.ex_us_flag : props["ex_us_flag_"+each.id] } disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} />
           

          </td>
          <td className="pl-1 pr-1 border-right-col"   onClick={ (!props["check_"+each.tst_src_id] || auditFlag ) && each.comments ?  onClickShowCommentPopup  : ""}><input className={ (!props["check_"+each.tst_src_id] || auditFlag ) && each.comments ? "dots-pointer comm-clr" : "input-control"} type="text"  id={"comments_"+each.id}  value={props["comments_"+each.id] } defaultValue={each.comments} disabled={auditFlag ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"comments_"+each.id} onChange={onChangeInput } /></td>
          <td id={"src_rec_date_"+each.id} className="border-right-col pl-1 pr-1">{each.src_rec_date}</td>
           <td  className="sticky-col status-col sticky-bg-clr pl-1 pr-1 border-right-col">
           
              <select id={"status_"+each.id}  className={ ( (camelize(each.status) =="In_Progress"  ||  props["status_clr_"+each.id] =="In_Progress" ) ? "in-progress-clr" :( (camelize(each.status)=="Pending"  ||  props["status_clr_"+each.id] == "Pending") ? "pending-clr":( (camelize(each.status)=="Approved" ||  props["status_clr_"+each.id] =="Approved") ? "approve-clr" : ((camelize(each.status)=="Rejected" ||  props["status_clr_"+each.id] =="Rejected" ) ? "reject-clr": (  (camelize(each.status)=="New" ||  props["status_clr_"+each.id] =="New") ? "new-clr" : ( (camelize(each.status)=="Submit" ||  props["status_clr_"+each.id] =="Submit") ? "submitted-clr": "in-progress-clr")))))) } value={ props["status_"+each.id] || camelize(each.status)} disabled={auditFlag ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-status-check={each.tst_src_id} name={"status_"+each.id} onChange={onChangeInput }>
                <option value="In_Progress">
                  In Progress
                </option>
                <option value="Pending">
                  Pending
                </option>
                <option value="Approved">
                  Approved
                </option>
                <option value="Rejected">
                  Rejected
                </option>
                <option value="New">
                  New
                </option>
                <option value="Submit">
                  Submit
                </option>
      
                 {/**uniqueStatus && uniqueStatus.map((each,index) =>(
                    <option value={each}>{each}</option>
                 ))**/}
              </select>
          </td>
          <td  className="border-right-col reviewed-by-col sticky-col sticky-bg-clr pl-1 pr-1" id={"reviewd_by_ds_"+each.id} >{each.reviewd_by_ds}</td>
          <td colspan="2" style={{"display":"none"}}><input className="input-control" type="text"  id={"rec_updated_by_"+each.id}  value={props["rec_updated_by_"+each.id] } defaultValue={"Interface"} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"rec_updated_by_"+each.id} onChange={onChangeInput } /></td>
          <td colspan="2" style={{"display":"none"}}>
            <select id={"approved_flag_"+each.id}  value={props["approved_flag_"+each.id] } defaultValue={each.approved_flag} disabled={(auditFlag || props["row_dis_"+each.id] ) ? true :(props["check_"+each.tst_src_id]  === true ? false : true)} data-check={"check_"+each.id} name={"approved_flag_"+each.id} onChange={onChangeInput }>
              <option value="FALSE">
                FALSE
              </option>
              <option value="TRUE">
                TRUE
              </option>
            </select>
          </td>
          <td colspan="2" id={"mat_run_id_"+each.id} style={{"display":"none"}}>{each.mat_run_id}</td>
          <td colspan="2" id={"rec_updated_ts_"+each.id}  style={{"display":"none"}}>{currentdate.toISOString()}</td>
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
export default List