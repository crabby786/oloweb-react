import React from 'react'
import { TextField, Button } from '@material-ui/core'

type Props = {
    addInstruct:any, errorObj:{isError:boolean, Msg:string},
    handleClose:any
}
export  function InstructPanel(props:Props) {
const {addInstruct, errorObj} = props;
const [instruct, setInstruct]=React.useState("");
// const [errorObj, setError]=React.useState({isError:false, Msg:""});
    return (
        <div>
            <h3 className="border-bottom p-3 " > Special Instructions (Optional) 
            <i className="fa fa-close float-right" onClick={props.handleClose} ></i>
            </h3>
            <div className="p-4">
              <TextField
              className="my-2"
              helperText= {errorObj.Msg}
              error={errorObj.isError}
               multiline rows={3} fullWidth placeholder="Add Instructions" value={instruct} onChange={(e)=>setInstruct(e.target.value)} />
              <h4 className="text-danger mt-1" > The Restaurant will follow your instructons on the best effort basis. No refunds or cancellations will be processed based on failure to comply with requests for the special instructions.  </h4>
              <div className="py-2 float-right" >
                  <Button color="primary" variant="contained"  onClick= {()=> addInstruct(instruct)} > Add </Button>
              </div>
            </div>
        </div>
    )
}
export const AddForm = props => {
  const {
    values: { line1,  home, pin },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <form onSubmit={handleSubmit} className="form-group" >
      <TextField
        id="home"
        name="home"
        helperText={touched.home ? errors.home : ""}
        error={touched.home && Boolean(errors.home)}
        label="Home / Flat No."
        value={home}
        onChange={change.bind(null, "home")}
        fullWidth
        variant="outlined"
      />
      <TextField
        id="line1"
        name="line1"
        helperText={touched.line1 ? errors.line1 : ""}
        error={touched.line1 && Boolean(errors.line1)}
        label="Address Line 1"
        value={line1}
        onChange={change.bind(null, "name")}
        fullWidth
        multiline
        variant="outlined"
      />
      <TextField
        id="pin"
        name="pin"
        helperText={touched.pin ? errors.pin : ""}
        error={touched.pin && Boolean(errors.pin)}
        label="Pin Code"
        fullWidth
        value={pin}
        onChange={change.bind(null, "pin")}
        variant="outlined"
      />
      <div className="float-right" > 
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
      >
        Continue
      </Button>
      </div>
    </form>
  );
};

