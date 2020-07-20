import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="error-dialog"
      >
        {props.title &&
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.txt}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" variant="contained" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export function FormDialog(props:any) {
  let billNo = React.useRef(null)
  let pin = React.useRef(null)
  
  return (
    <div>
      
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="text-center" >Order Tracking  <i className="fa fa-times float-right" onClick={props.handleClose}  /></DialogTitle>
        <DialogContent>
          <DialogContentText>
            For security purposes, we have sent pin number when you placed order along with invoice over email/sms . Please enter the same below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="bill"
            label="Bill No"
            fullWidth
            defaultValue= ""
            inputProps= {{ref :billNo,maxLength:12}}
          />
          <TextField
            margin="dense"
            name="pin"
            label="PIN"
            type="password"
            fullWidth
            defaultValue= ""
            inputProps= {{maxLength:4, ref:pin}}
          />
        </DialogContent>
        <DialogActions style={{justifyContent:'center', paddingBottom:'20px'}} >
          <Button size="large" endIcon={ <i className={props.isLoading ? "fa-spin fa-spinner fas": ""}  /> } variant="contained" onClick={()=> props.handleSubmit({billNo, pin})} color="primary">
            Track Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
