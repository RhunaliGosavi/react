import * as React from 'react';
import * as ConstVal from "../../Constants"
class SessionTimeoutModal extends React.Component {
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
  handleOKBtnClick=()=>{
    const { handleOKBtnClick } = this.props;
    $(this.modal).modal('hide');
    handleOKBtnClick();
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
              Your session has timed out .
              {this.props.children}

              </div>
              <div className="modal-footer ">
                  <div className="row">
                   <button button type="button" className="btn btn-secondary" onClick={this.handleOKBtnClick}>Ok</button>
                    {/*<div className="pl-2">
                        <button type="button" className="btn btn-secondary" onClick={this.handleCloseClick}>Cancel</button>
                    </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


 export default SessionTimeoutModal;
 