import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardHeroes from "./CardHeroes";
import { deleteHeros } from "../store/actions/hero";

const Home = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.homeHeroes);
  const [heroesWeight, setHeroesWeight] = useState();

  const handleDeleteHero = (selectedHeros) => {
    dispatch(deleteHeros(selectedHeros));
  };

  useEffect(() => {
    let teamWeight = 0;
    heroes.forEach((heroe) => {
      let weightString = heroe.appearance.weight[1];
      let arrayWeight = weightString.split(" ");
      let pesoNumero = parseInt(arrayWeight[0]);
      teamWeight = teamWeight + pesoNumero;
    });
    setHeroesWeight(Math.floor(teamWeight / heroes.length));
  }, [heroes]);

  const useStyles = makeStyles({
    styleContainerHeroe: {
      padding: "20px 5px",
      justifyContent: "center",
    },
    styleGridItemHeroe: {
      margin: "30px",
      display: "flex",
      justifyContent: "center",
    },
  });
  const classes = useStyles();
  return (
    <div>
      <h1
        style={{ display: "flex", justifyContent: "center", color: "#4f5e5e" }}
      >
        The Console-Log Team
      </h1>
      <div> total weight: {heroesWeight} kg </div>
      <Grid container className={classes.styleContainerHeroe}>
        {heroes.map((heroe, index) => (
          <Grid item lg={3} key={index} className={classes.styleGridItemHeroe}>
            <CardHeroes
              heroe={heroe}
              deleteHero={handleDeleteHero}
              propsBooleano={true}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
