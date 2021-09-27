import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { Route } from "react-router-dom";
import { useHistory } from "react-router";

import { setHeros } from "./store/actions/hero";
import Login from "./Pages/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchHeroes from "./components/SearchHeroes";
import NavbarResponsive from "./components/NavbarResponsive";

import { Hidden } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const getMyHero = async () => {
    for (let i = 1; i <= 50; i++) {
      const getHero = await fetch(
        "https://www.superheroapi.com/api/3813382392107628/" + i
      );

      const data = await getHero.json();
      let totalAmount = 0;

      totalAmount =
        parseInt(data.powerstats.intelligence) +
        parseInt(data.powerstats.strength) +
        parseInt(data.powerstats.speed) +
        parseInt(data.powerstats.durability) +
        parseInt(data.powerstats.power) +
        parseInt(data.powerstats.combat);

      const hero = {
        ...data,
        powerStatsTotal: totalAmount,
      };
      dispatch(setHeros(hero));
    }
  };
  useEffect(() => {
    getMyHero();
  }, []);

  useEffect(() => {
    let dataToken = localStorage.getItem("token");
    if (dataToken) {
      history.push("/Home");
    } else {
      history.push("/LogIn");
    }
  }, []);
  return (
    <div>
      <Hidden only={["xs", "sm"]}>
        <Navbar />
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <NavbarResponsive />
      </Hidden>
      <Route component={Home} path="/Home" exact={true} />
      <Route component={SearchHeroes} exact path="/SearchHeroes" />
      <Route component={Login} exact path="/LogIn" />
    </div>
  );
}

export default App;
