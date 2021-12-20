import React from "react";
const Notification=(props)=>{
    return (
                <div>
                    {props.headerText && <p className="note m-0 p-0" >{props.headerText}</p>}
                    <p className="m-0">
                        {
                            props.msg.split("\n").map(function(item, idx) {
                                return (
                                    <span key={idx}>
                                        {item}
                                        <br/>
                                    </span>
                                )
                            })
                        }
                    
                    </p>
                </div>
    )
}
export default Notification
