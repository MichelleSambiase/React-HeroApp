import React, { useEffect } from "react";

import { AppBar, Typography } from "@material-ui/core";

import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import { searchHeroes, setHeros } from "../store/actions/hero";

import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

const axios = require("axios");

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    backgroundColor: "#6e7c7c",
    margin: 0,
    height: "100%",
    padding: "0.5%",
  },
  logIn: {
    color: "white",
    paddingRight: "1%",
  },
  MuiTextFieldRoot: {
    color: "black",
    padding: "0 !important",
  },
  styleTitleNav: {
    cursor: "pointer",
  },
}));
const Navbar = (props) => {
  const dispatch = useDispatch();
  const logueado = useSelector((state) => state.isLogged);

  const handleClick = () => {
    props.history.push("/Home");
  };
  const handleClickAllHeroes = () => {
    props.history.push("SearchHeroes");
  };
  const handleClickLog = () => {
    props.history.push("LogIn");
  };

  const searchHero = async (values) => {
    try {
      console.log("entre");
      const response = await axios.get(
        `https://superheroapi.com/api/3813382392107628/search/${values.name}`
      );
      // Recorro el array, modifico la propiedad que quiero, retorno el objeto y le paso la nueva propiedad agregada a la variable totalAmount

      const itemModified = response.data.results.map((item) => {
        let totalAmount = 0;

        totalAmount =
          parseInt(item.powerstats.intelligence) +
          parseInt(item.powerstats.strength) +
          parseInt(item.powerstats.speed) +
          parseInt(item.powerstats.durability) +
          parseInt(item.powerstats.power) +
          parseInt(item.powerstats.combat);

        return {
          ...item,
          powerStatsTotal: totalAmount,
        };
      });
      dispatch(searchHeroes(itemModified));
      console.log(response);
    } catch {
      console.log("entro en el error");
    }
  };

  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="sticky">
      <div style={{ display: "flex" }}>
        <Typography
          className={classes.styleTitleNav}
          variant="h5"
          onClick={handleClick}
        >
          Heroes App
        </Typography>
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            columnGap: "15px",
          }}
        >
          {logueado ? (
            <ButtonComponent
              className={classes.logIn}
              /* handleClick={handleClickLog} */
              label="Cerrar Sesion"
            />
          ) : (
            <ButtonComponent
              className={classes.logIn}
              handleClick={handleClickLog}
              label="Iniciar Sesion"
            />
          )}

          <ButtonComponent
            handleClick={handleClickAllHeroes}
            label="Heroes y Villanos"
          />
          <Formik
            initialValues={{ name: "" }}
            validate={(valores) => {
              let errors = {};
              if (!valores.name) {
                errors.name = "Superheroe no encontrado";
              }
              return errors;
            }}
            onSubmit={searchHero}
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
                <InputComponent
                  className={classes.MuiTextFieldRoot}
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="search"
                />
                {errors.name && touched.name && (
                  <div>
                    <p>{errors.name}</p>
                  </div>
                )}
                <ButtonComponent type="submit" label="Buscar" />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </AppBar>
  );
};

export default withRouter(Navbar);
