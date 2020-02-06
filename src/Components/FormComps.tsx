import React from "react";
import { AntSwitch } from "./antswitch";

interface Props  {
    checkedValue:boolean,
    handleSwitchChange():any,
    switchValue:string,
    leftKey:string,
    rightKey:string,

}
export const SwitchA = (props:any) => {
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