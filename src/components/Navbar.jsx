import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import axios from "axios";

import { searchHeroes } from "../store/actions/hero";
import { loggedIn } from "../store/actions/hero";

import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("sm")]: {
      width: "10%",
      height: "6%",
      fontSize: "0.5rem",
    },
  },
  MuiTextFieldRoot: {
    color: "black",
    padding: "0 !important",
  },
  styleTitleNav: {
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
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
  const handleClickLogOut = () => {
    localStorage.removeItem("token");
    dispatch(loggedIn(false));
    props.history.push("/");
  };

  const searchHero = async (values) => {
    try {
      const response = await axios.get(
        `https://superheroapi.com/api/3813382392107628/search/${values.name}`
      );
      // Recorro el array, modifico la propiedad que quiero, retorno el objeto y le paso la nueva propiedad agregada a la variable totalAmount
      // para tener el powerStatsTotal del heroe buscado

      const itemModified = response.data.results.map((item) => {
        let totalAmount = 0;
        let totalWeight = 0;
        let totalHeight = 0;

        totalAmount =
          parseInt(item.powerstats.intelligence) +
          parseInt(item.powerstats.strength) +
          parseInt(item.powerstats.speed) +
          parseInt(item.powerstats.durability) +
          parseInt(item.powerstats.power) +
          parseInt(item.powerstats.combat);

        totalWeight = parseInt(item.appearance.weight[1]);
        totalHeight = parseInt(item.appearance.height[1]);

        return {
          ...item,
          powerStatsTotal: totalAmount,
          teamTotalWeight: totalWeight,
          teamTotalHeight: totalHeight,
        };
      });
      dispatch(searchHeroes(itemModified));
    } catch {
      alert("Superheroe no encontrado");
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
              handleClick={handleClickLogOut}
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
              if (!valores.name || valores.name === "") {
                errors.name = "Superheroe no encontrado";
              }
              return errors;
            }}
            onSubmit={searchHero}
          >
            {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <div>
                  <InputComponent
                    className={classes.MuiTextFieldRoot}
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="search"
                  />
                  {errors.name && (
                    <div style={{ display: "flex" }}>
                      <span style={{ fontSize: "0.8em" }}>{errors.name}</span>
                    </div>
                  )}
                </div>
                <div>
                  <ButtonComponent type="submit" label="Buscar" />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </AppBar>
  );
};

export default withRouter(Navbar);
