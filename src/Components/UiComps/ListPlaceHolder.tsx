import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export const ListPlaceHolder = (props) => {
    const {Height} = props;
    return (
        <div style={{height:Height || '106px', overflow:'hidden'}} {...props}
        className="d-flex w-100 align-items-center justify-content-around">
            
            <Skeleton variant="rect" width={60} height={60} />
            <div style={{paddingLeft:'15px',alignItems:'space-between', height:'100%'}}>
            <Skeleton variant="text" animation = 'wave'/>
            <Skeleton variant="rect" width={210} height={40}  animation = 'wave'/>
            </div>
            
        </div>
    )
}
