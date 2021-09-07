import React, { useState } from "react";

import { AppBar, Typography, Input } from "@material-ui/core";

import ButtonComponent from "./ButtonComponent";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

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
  styleInput: {
    color: "black",
    paddingRight: "1%",
  },
  styleTitleNav: {
    cursor: "pointer",
  },
  styleButtonSearch: {
    color: "white",
    paddingRight: "1% !important",
  },
}));
const Navbar = (props) => {
  const [inputValues, setInputValues] = useState("");
  const handleClick = () => {
    props.history.push("/");
  };
  const handleClickAllHeroes = () => {
    props.history.push("AllHeroes");
  };
  const handleClickLog = () => {
    props.history.push("LogIn");
  };

  const searchHero = async () => {
    try {
      const response = await axios.get(
        "https://superheroapi.com/api/access-token/search/name"
      );
      console.log(response);
    } catch {
      console.log("entro en el error");
    }
  };
  const handleClickSearch = () => {};
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
          <ButtonComponent
            className={classes.logIn}
            handleClick={handleClickLog}
            label="Log In"
          />
          <ButtonComponent
            className={classes.styleButtonSearch}
            handleClick={handleClickAllHeroes}
            label="All Heroes"
          />

          <Input
            className={classes.styleInput}
            onChange={searchHero}
            placeholder="search"
          />
          <ButtonComponent handleClick={handleClickSearch} label="Buscar" />
        </div>
      </div>
    </AppBar>
  );
};

export default withRouter(Navbar);
