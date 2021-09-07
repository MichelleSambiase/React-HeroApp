import React from "react";

import { Button } from "@material-ui/core";

const ButtonComponent = (props) => {
  return (
    <div>
      <Button variant="outlined" onClick={props.handleClick}>
        {props.label}
        {props.icon}
      </Button>
    </div>
  );
};

export default ButtonComponent;
