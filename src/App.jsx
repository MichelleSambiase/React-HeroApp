import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./Pages/Login";
import SearchHeroes from "./components/SearchHeroes";
import { setHeros } from "./store/actions/hero";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

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
  return (
    <div>
      <Navbar />
      <Route component={Home} path="/Home" exact={true} />
      <Route component={SearchHeroes} exact path="/SearchHeroes" />
      <Route component={Login} exact path="/LogIn" />
    </div>
  );
}

export default App;
