import * as React from 'react';
import * as ConstVal from "../../Constants"
class Modal extends React.Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
  const { handleModalCloseClick } = this.props;
  $(this.modal).modal('show');
  $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
  }
  handleCloseClick=()=> {
    
    const { handleModalCloseClick } = this.props;
    $(this.modal).modal('hide');
    handleModalCloseClick();
  }
  handleRegBtnClick=()=> {
    //console.log(this.props)
    const { handleRegClick } = this.props;
    handleRegClick(this.props);
  }
  
  render() {
    return (
      <div>
        
        <div className="modal fade" ref={modal => this.modal = modal} id={this.props.modelId ? this.props.modelId : "exportid"} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className={this.props.classname ? this.props.classname +" modal-dialog": "modal-dialog"} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.text}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
              {this.props.children}

              </div>
              
              {(this.props.text=="Registry Data" || this.props.text=="HCP Current Alignment Details") && !this.props.showLoader && this.props.item && (this.props.item.npi || this.props.item.id) &&
                  <>
                    <div className="modal-footer p-0">
                      <div className=" col-xl-12">
                        <div className="row">
                          <div className={ this.props.text=="HCP Current Alignment Details" ? "col-xl-7 npi-text ml-3 alignment-veeva-txt" : "col-xl-7 npi-text ml-3"}>Account Exists in Customer Master (Veeva)</div>
                          <div className="col-xl-3 offset-xl-1">{this.props.item.acct_exists_in_customer_master ? <img className="login-logo p-0" src={ConstVal.deployment+"/assets/img/right.png"} /> : <img className="npi-cross-logo p-0" src={ConstVal.deployment+"/assets/img/cross.png"} />}</div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer p-0">
                        <div className=" col-xl-12 col-lg-12 col-md-12">
                            <div className="row">
                              <div className="col-xl-3 col-lg-3 col-md-3 pr-0">
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text pr-0">Date Of Last Call</div>
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text-val">{this.props.item.retro_call_date__c ? this.props.item.retro_call_date__c : "NA"}</div>
                              </div>
                              <div className="col-xl-3 col-lg-3 col-md-3">
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text pr-0">First Rx Date </div>
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text-val">{this.props.item.first_rx_date ? this.props.item.first_rx_date : "NA"}</div>
                              </div>
                              <div className="col-xl-3 col-lg-3 col-md-3">
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text pr-0">Last Rx Date </div>
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text-val">{this.props.item.last_rx_date ? this.props.item.last_rx_date : "NA"}</div>
                              </div>
                              <div className="col-xl-3 col-lg-3 col-md-3">
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text pr-0"> Patient Count </div>
                                  <div className="col-xl-12 col-lg-12 col-md-12 npi-text-val">{this.props.item.tot_pat_count ? this.props.item.tot_pat_count : "NA"}</div>
                              </div>
                            </div>
                          
                        </div>
                        
                    </div>
                    <div className="modal-footer p-0">
                      <div className=" col-xl-12">
                        <div className="row">
                          <div className="col-xl-1 npi-text ml-3">Product</div>
                          <div className="col-xl-8 offset-xl-1  submenu-rarr">{this.props.item.product ? this.props.item.product : "NA"}</div>
                        </div>
                      </div>
                    </div>
                  </>
              }

              {this.props.alignmentHcp && !this.props.showLoader && this.props.item && this.props.item.npi && 
              
              <>
               <div className="modal-footer p-0">
                    <div className=" col-xl-12">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 npi-text ml-3">Enter New HCP Address Details</div>
                        </div>
                    </div>
                  <div class=" col-xl-12 col-lg-12">
                     
                    <form className="needs-validation ml-3">
                      <div className="form-row">
                          <div className="form-group col-md-5">
                              <input  defaultValue={this.props.item.new_prime_address1 ? this.props.item.new_prime_address1 : ""} type="text"  className={ this.props.hasError("hcpAddress") ? "form-control input-font is-invalid" : "form-control input-font" } id="hcpAddress" placeholder="HCP Address"/>
                              <div class="invalid-feedback  text-left">Address is required</div>
                          </div>
                          <div className="form-group col-md-5">
                              <input  defaultValue={this.props.item.new_prime_state ? this.props.item.new_prime_state : ""} type="text"  className={ this.props.hasError("hcpState") ? "form-control input-font is-invalid" : "form-control input-font" } id="hcpState" placeholder="State"/>
                              <div class="invalid-feedback  text-left">State is required</div>
                          </div>
                          
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-5">
                              <input   type="text"   defaultValue={this.props.item.new_prime_city ? this.props.item.new_prime_city : ""} className={ this.props.hasError("hcpCity") ? "form-control input-font is-invalid" : "form-control input-font" } id="hcpCity" placeholder="City"/>
                              <div class="invalid-feedback  text-left">City is required</div>
                          </div>
                          <div className="form-group col-md-5">
                         
                              <input type="number" min="1" id="zipAutocomplete" placeholder="Enter ZIP to search" autocomplete="off" onChange={this.props.ZipAutocomplete} value={this.props.zipitem && this.props.zipitem.args }  defaultValue={this.props.item.new_prime_zip ? this.props.item.new_prime_zip : ""} className={ this.props.hasError("hcpZip") ? "form-control input-font is-invalid" : "form-control input-font" } />
                              {this.props.showZipLoader && <span class="spinner-border spinner-border-sm " id="loader-autocomplete" role="status" aria-hidden="true"></span>}
                              {this.props.searchZipItems &&  Object.keys(this.props.searchZipItems).length > 0 && (
                              <ul className="list-group autocomplete-dropdown">
                               
                                 {this.props.searchZipItems && Object.keys(this.props.searchZipItems).map((key, index)=> {
                                    return  <li className={"list-group-item" } key={key} onClick={()=> this.props.selectZipItem(key)}>
                                      
                                           {key } 
                                      </li>
                                  })}
                              </ul>
                              )}
                                 { this.props.showZipNOData && 
                            
                                    <ul className="list-group autocomplete-dropdown" id="noData">
                                        <li className={"list-group-item" }>
                                        No Data Found
                                        </li>
                                    </ul> 
                                }
                              <div class="invalid-feedback  text-left">ZIP is required</div>
                          </div>
                          
                      </div>
                  {this.props.zipitem &&
                    <div>
                      <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                            <div className="row">
                                <div className="col-xl-1 col-lg-1 col-md-1 txt-font">
                                    <b> SF1 </b>
                                </div>
                                <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                                {this.props.zipitem ? this.props.zipitem.thiolaTerrId : "NA"}: {this.props.zipitem ? this.props.zipitem.thiolaTerrName : "NA"}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 pr-0" >  
                            <div className="row">
                                <div className="col-xl-1 col-lg-1 col-md-1 txt-font">
                                    <b> SF2 </b>
                                </div>
                                <div className="col-xl-9 col-lg-9 col-md-9 txt-font">
                                {this.props.zipitem ? this.props.zipitem.cholbamTerrId : "NA"} :  {this.props.zipitem ? this.props.zipitem.cholbamTerrName : "NA"}
                                </div>
                            </div>
                        </div>
                                
                    </div>
                  }
            </form>
        </div>
    </div>
    </>
              
              }
             <div className="modal-footer ">
                  <div className="row">
                  
                  {this.props.text=="Registry Data" && !this.props.alignmentHcp && <div>
                      <button button type="button" className="btn btn-secondary" onClick={this.handleRegBtnClick}>Submit</button>
                  </div>}
                  {this.props.alignmentHcp && <div>
                      <button button type="button" className="btn btn-secondary" onClick={this.props.handleHcpAddUpdateClick}>Submit</button>
                  </div>}
                  {(this.props.text=="Insert" ||this.props.text=="Add Product" ) && <div>
                      <button button type="button" className="btn btn-secondary" onClick={this.props.handleInsertClick}>Insert</button>
                  </div>}
                  
                  {this.props.text=="Import" && <div>
                      <button button type="button" className="btn btn-secondary" onClick={this.props.handleImport1Click}>Import</button>
                  </div>}
                  
                  {this.props.text=="Export" && <div>
                        <button button type="button" className="btn btn-secondary" onClick={this.props.handleExportClick}>Export</button>
                    </div>}
                   <div className="pl-2">
                        <button type="button" className="btn btn-secondary" onClick={this.handleCloseClick}>Cancel</button>
                    </div>
                   
                  </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}


 export default Modal;
 