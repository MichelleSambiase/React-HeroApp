import React, { useState } from "react";

import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import {
  Menu,
  MenuItem,
  IconButton,
  AppBar,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#6e7c7c",
    margin: 0,
    height: "100%",
  },
  styleTitleNav: {
    cursor: "pointer",
  },
});
const NavbarResponsive = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const logueado = useSelector((state) => state.isLogged);
  const history = useHistory();

  const handleClick = () => {
    history.push("/Home");
  };
  const handleClickAllHeroes = () => {
    history.push("SearchHeroes");
  };
  const handleClickLog = () => {
    history.push("LogIn");
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <AppBar className={classes.root} position="sticky">
        <Typography
          className={classes.styleTitleNav}
          variant="h5"
          onClick={handleClick}
        >
          Heroes App
        </Typography>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={classes.menu}
        >
          {logueado ? (
            <MenuItem onClick={handleClickLog}>Cerrar Sesion</MenuItem>
          ) : (
            <MenuItem onClick={handleClickLog}>Iniciar Sesion</MenuItem>
          )}

          <MenuItem onClick={handleClickAllHeroes}>Heroes y Villanos</MenuItem>
        </Menu>
        <IconButton
          onClick={handleClickMenu}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
    </div>
  );
};

export default NavbarResponsive;
