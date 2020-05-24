import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress } from '@material-ui/core';

export const FullScreenLoading1 = (props) => (
    <Dialog open={props.isLoading}>
      <DialogContent>
        <div
          className="d-flex align-center"
          style={{
            width: "130px",
            height: "40px",
          }}
        >
          <div className="flex-grow-1">
            <p className="lead">Loading...</p>
          </div>
          <div className="">
            <div
              className=""
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              {" "}
              &nbsp;
              <CircularProgress size={25} color="primary" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

export function ContentLoad1(props) {
  return (
    <div className='content-loader1'>
              <CircularProgress size={25} />
            </div>
  )
}
