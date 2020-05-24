import React from "react";
import { AntSwitch } from "./antswitch";
import { FormControl, InputLabel, Select, makeStyles, createStyles} from "@material-ui/core";

interface Props  {
    checkedValue:boolean,
    handleSwitchChange(),
    switchValue:string,
    leftKey:string,
    rightKey:string,

}
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom:'15px',
      '& label.Mui-focused': {
        // display:'none'
      },
      '& label.MuiFormLabel-root': {
        color:'#fff'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#fff',
        },
        '&:hover fieldset': {
          borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#fff',
        },
      },
    },
  }),
);
export const SwitchA = (props) => {
    return (
        <div>
            <table style={{width:'100%'}}>
                <tbody>
                    <tr>
                        <td colSpan = {2} >
                            <AntSwitch
                                checked={props.checkedValue}
                                onChange={props.handleSwitchChange}
                                value={props.switchValue}
                            />
                        </td>
                        </tr>
                        <tr>
                        <td style={{padding:"0 4px", fontSize:'10px'}}>{props.leftKey}</td>
                        <td style={{padding:"0 4px", fontSize:'10px'}}>
                                {props.rightKey}
                            </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
export const DropdownA = (props) => {
    const classes = useStyles();
    return (
      <FormControl variant="outlined" className={classes.root} fullWidth>
        <InputLabel id="city_label">{props.label}</InputLabel>
        <Select
          name={props.name}
          label={props.label}
          value={props.value}
          disabled={props.disabled}
          onChange={props.handleChange} 
          MenuProps={{ elevation:1,
            getContentAnchorEl:null,
          anchorOrigin:{vertical:'bottom', horizontal:'left'},
         }}
        >
          {props.children}
        </Select>
      </FormControl>
    );
  }

  //item Qty counter
export const Counter = (props) => {
  return(
    <table className="" id="counter" style={{}}>
      <tbody>
        <tr>
        <td className="actions" onClick= {props.upgrader} >
        <i className="fa fa-minus"></i>
      </td>
      <td className="val">
        {props.count}
      </td>
      <td className="actions" onClick= {props.degrader}>
        <i className="fa fa-plus"></i>
      </td>
        </tr>
      </tbody>
      
    </table>
  )
}