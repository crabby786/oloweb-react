import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogContent } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    semiFull:{
      transform:`translateY(10%)`
    } ,
    content:{    }
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog( props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog classes={{paper:(props.semiFull && classes.semiFull) }} fullScreen open={props.isOpen} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color={props.headerColor || "secondary"} >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <h4  className='heading'>
              {props.heading}
          </h4>
          </Toolbar>
        </AppBar>
         <DialogContent className={classes.content} style={props.noGutter && {padding:0}}>
           {props.children}
           </DialogContent>
        </Dialog>
    </div>
  );
}

