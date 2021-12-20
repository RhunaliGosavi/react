import React from "react"

const ProductList=({list,loading,onChangeInput,props,auditFlag,onClickShowPopup,Modal,handleModalCloseClick})=>{
  
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
 
         
           {auditFlag ? <td className=""><input className="input-control"  type="checkbox" id={"check_"+each.id}  name={"check_"+each.id} onChange={onChangeInput } checked={ props["check_"+each.id] ? props["check_"+each.id] : false}/></td>: ""}
          <td style={{"display":"none"}} scope="row" id={"id_"+each.id}>{each.id}</td>
         {/***  <td><input className="input-control" type="text"  id={"rtrx_id_"+each.id}  value={props["rtrx_id_"+each.id]  } defaultValue={each.rtrx_id} disabled={auditFlag ? true : (props["check_"+each.id]  === true ? false : true)} data-check={"check_"+each.id} name={"rtrx_id_"+each.id} onChange={onChangeInput } /></td> ****/}
          <td id={"brand_id_"+each.id} className="pl-1 pr-1 border-right-col">{each.brand_id}</td> 
          <td id={"brand_name_"+each.id} className="pl-1 pr-1 border-right-col">{each.brand_name}</td> 
          <td  id={"rtrx_productid_"+each.id} className="pl-1 pr-1 border-right-col">{each.rtrx_productid}</td> 
          <td id={"product_name_"+each.id} className="pl-1 pr-1 border-right-col">{each.product_name}</td>
          
          <td id={"product_numb_"+each.id} className="pl-1 pr-1 border-right-col">{each.product_numb}</td> 
          
          <td id={"market_name_"+each.id} className="pl-1 pr-1 border-right-col">{each.market_name}</td> 
          <td id={"market_id_"+each.id} className="pl-1 pr-1 border-right-col">{each.market_id}</td> 
          <td id={"units_per_bottle_"+each.id} className="pl-1 pr-1 border-right-col">{each.units_per_bottle}</td> 
          <td id={"mg_conversion_"+each.id} className="pl-1 pr-1 border-right-col">{each.mg_conversion}</td> 
          <td id={"formulation_"+each.id} className="pl-1 pr-1 border-right-col">{each.formulation}</td> 
          <td  id={"data_source_"+each.id} className="pl-1 pr-1 border-right-col">{each.data_source}</td> 
          <td className={each.comments ? "dots-pointer product-comm-clr pl-1 pr-1 border-right-col" : "pl-1 pr-1 border-right-col"} onClick={ each.comments ?  onClickShowPopup : "" } name={"comments_popup"+each.id} id={"comments_"+each.id}>{each.comments}</td>
         {/* <td >
            
          <select id={"status_"+each.id}  className={ (camelize(each.status)=="In_Progress"  ? "in-progress-clr" :(camelize(each.status)=="Pending" ? "pending-clr":(camelize(each.status)=="Approved" ? "approve-clr" : (camelize(each.status)=="Rejected" ? "reject-clr": ( camelize(each.status)=="New" ? "new-clr" : (camelize(each.status)=="Submit" ? "submitted-clr" : "")))))) } value={props["status_"+each.id] || camelize(each.status)} disabled={auditFlag ? true :(props["check_"+each.id]  === true ? false : true)} data-status-check={each.id} name={"status_"+each.id} onChange={onChangeInput }>
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
      
                 
              </select>
         </td>*/}
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
export default ProductList