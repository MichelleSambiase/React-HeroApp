import {
  Container,
  Grid,
  TextField,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  Button,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import React from "react";

const Login = () => {
  const useStyles = makeStyles({
    root: {
      justifyContent: "space-evenly",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
    },
    styleEmail: {
      width: "250px",
    },
    fatherRoot: {
      height: "100vh",
      width: "100%",
    },
    buttonLogIn: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
    },
    styleLogIn: {
      display: "flex",
      flexDirection: "column",
    },
    styleCardInfo: {
      boxShadow:
        "20px 20px 1px 0px rgb(110 124 124), -20px -19px 7px 0px rgb(110 124 124), -1px -2px 19px 3px rgb(0 0 0 / 12%)",
    },
  });
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const classes = useStyles();
  return (
    <div className={classes.fatherRoot}>
      <Container className={classes.root}>
        <div className={classes.cardMensajeLogin}>
          <Card className={classes.styleCardInfo}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Por favor ingresa tu Email y contraseña:
              </Typography>
            </CardContent>
          </Card>
        </div>
        <Grid className={classes.styleLogIn}>
          <TextField
            id="Email"
            label="Email"
            type="Email"
            className={classes.styleEmail}
          />

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.buttonLogIn}>
            <Button variant="outlined" color="primary">
              Iniciar Sesion
            </Button>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
