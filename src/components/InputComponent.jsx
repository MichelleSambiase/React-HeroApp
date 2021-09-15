import React from "react";

import TextField from "@material-ui/core/TextField";

const InputComponent = (props) => {
  return (
    <div>
      <TextField
        /*  variant="outlined" */
        className={props.className}
        onChange={props.onChange}
        id={props.id}
        label={props.label}
        type={props.type}
        value={props.value}
        name={props.name}
        onBlur={props.onBlur}
      >
        {props.icon}
      </TextField>
    </div>
  );
};

export default InputComponent;
