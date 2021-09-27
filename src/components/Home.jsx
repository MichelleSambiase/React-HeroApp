import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteHeros } from "../store/actions/hero";
import CardHeroes from "./CardHeroes";

import { Grid, makeStyles, Typography } from "@material-ui/core";

const Home = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.homeHeroes);
  const [heroesWeight, setHeroesWeight] = useState();
  const [heroesHeight, setHeroesHeight] = useState();

  const handleDeleteHero = (selectedHeros) => {
    dispatch(deleteHeros(selectedHeros));
  };

  useEffect(() => {
    let teamWeight = 0;
    heroes.forEach((heroe) => {
      let weightString = heroe.appearance.weight[1];
      let arrayWeight = weightString.split(" ");
      let numberWeight = parseInt(arrayWeight[0]);
      teamWeight = teamWeight + numberWeight;
    });
    setHeroesWeight(Math.floor(teamWeight / heroes.length));
  }, [heroes]);

  useEffect(() => {
    let teamHeight = 0;
    heroes.forEach((heroe) => {
      let HeightString = heroe.appearance.height[1];
      let arrayHeight = HeightString.split(" ");
      let numberHeight = parseInt(arrayHeight[0]);
      teamHeight = teamHeight + numberHeight;
    });
    setHeroesHeight(Math.floor(teamHeight / heroes.length));
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
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#4f5e5e",
        }}
      >
        The Console-Log Team
        <div>
          <Typography>total Weight: {heroesWeight} kg</Typography>
          <Typography>total Height: {heroesHeight} cm</Typography>
        </div>
      </h1>

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
