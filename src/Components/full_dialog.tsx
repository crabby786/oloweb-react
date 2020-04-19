import PropTypes from "prop-types";
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogContent } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
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
  const Content = props.dialogContent;
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

