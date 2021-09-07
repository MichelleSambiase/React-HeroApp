import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHeros } from "../store/actions/hero";
import CardHeroes from "./CardHeroes";

const SearchHeroes = () => {
  const dispatch = useDispatch();
  const goodHeros = useSelector((state) => state.goodHeros);
  const badHeros = useSelector((state) => state.badHeros);
  const heroes = useSelector((state) => state.searchHeroes);

  const useStyles = makeStyles({
    styleContainerHeroe: {
      padding: "20px 5px",
    },
    styleGridItemHeroe: {
      margin: "30px",
    },
  });

  const handleAddHero = (selectedHeroe) => {
    if (selectedHeroe.biography.alignment === "good") {
      if (goodHeros < 3) {
        dispatch(addHeros(selectedHeroe, "good"));
      } else {
        alert("No se puede agregar más de 3 héroes.");
      }
    } else {
      if (badHeros < 3) {
        dispatch(addHeros(selectedHeroe, "bad"));
      } else if (badHeros >= 3) {
        alert("No se puede agregar más de 3 villanos.");
      }
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        className={classes.styleContainerHeroe}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {heroes.map((heroe, index) => (
          <Grid key={index} item className={classes.styleGridItemHeroe}>
            <CardHeroes heroe={heroe} addHero={handleAddHero} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchHeroes;
