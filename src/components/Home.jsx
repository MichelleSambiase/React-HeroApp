import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardHeroes from "./CardHeroes";
import { deleteHeros } from "../store/actions/hero";

const Home = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.homeHeroes);

  const handleDeleteHero = (selectedHeros) => {
    dispatch(deleteHeros(selectedHeros));
  };
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
      <h1>The IX Team</h1>
      <Grid container className={classes.styleContainerHeroe}>
        {heroes.map((heroe, index) => (
          <Grid
            item
            lg={3}
            key={index}
            item
            className={classes.styleGridItemHeroe}
          >
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
