import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePicker,
} from '@material-ui/pickers';
import { makeStyles, createStyles } from '@material-ui/core';

const pickerStyles = makeStyles(
  createStyles({
    pickerRoot:{
      '& label.Mui-focused': {display:'none'},
      '& legend': {display:'none'},
    }
  })
)

export  function InlinePicker({selectedDate,handleDateChange}) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
    )
}
export  function DefaultDatePicker({selectedDate,handleDateChange}) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          fullWidth
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
    )
}
export  function DefaultTimePicker(props) {
  const classes = pickerStyles();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          fullWidth
          inputVariant="outlined"
          open = {props.open}
          onClose = {props.onClose}
        />
        </MuiPickersUtilsProvider>
    )
}
