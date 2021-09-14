import React from "react";
import { Formik, useFormik } from "formik";

import { makeStyles } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";

const axios = require("axios");

const Login = () => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "600px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loginForm: {
      background: "#6e7c7c94",
      height: "80%",
      width: "20%",
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    loginError: {
      color: "#973636",
      width: "50%",
    },
    messageError: {
      fontSize: "0.8rem",
    },
  });
  const loginUser = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://challenge-react.alkemy.org/",
        data: JSON.stringify(response),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch {
      console.error("entro en el error");
    }
  };
  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(valores) => {
          let errores = {};
          // Validacion Email
          if (!valores.email) {
            errores.email = "Por favor ingresa un Email valido";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.email
            )
          ) {
            errores.email =
              "El email solo puede contener letras, numeros, puntos, guiones y guion bajo.";
          }
          // Validacion Contraseña
          /*     if (!valores.password) {
            errores.password = "Por favor ingresa una contraseña valida.";
          } else if (!/^[^\s]{4}$/.test(valores.password)) {
            errores.password =
              "La contraseña tiene que tener un minimo de 4 caracteres y un número.";
          } */
          return errores;
        }}
        onSubmit={(valores) => {}}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.root}>
              <div className={classes.loginForm}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    height: "50%",
                    alignItems: "center",
                  }}
                >
                  <InputComponent
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.email && touched.email && (
                    <div className={classes.loginError}>
                      <p className={classes.messageError}>{errors.email}</p>
                    </div>
                  )}
                  <InputComponent
                    id="password"
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={classes.loginError}>
                      <p className={classes.messageError}>{errors.password}</p>
                    </div>
                  )}
                </div>
                <ButtonComponent
                  label="Iniciar Sesion"
                  type="submit"
                  handleClick={loginUser}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
