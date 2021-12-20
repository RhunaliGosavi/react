import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function CustomCalendar(props) {
 

 const handleDateChange=(e,id,handleDatePickerChnage)=>{
  
    handleDatePickerChnage(e,id)
    
 }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
 
      <DatePicker
        autoOk
        value={props.selectedDate }
        onChange={(e)=>{handleDateChange(e,props.id,props.handleDatePickerChnage)}}
        views={["date","year", "month"]}
        format="yyyy-MM-dd"
        id={props.id}
        disabled={props.disabled}
        name={props.name}
       
      />

    </MuiPickersUtilsProvider>
  );
}


export default CustomCalendar;