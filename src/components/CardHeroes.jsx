import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  Typography,
  Divider,
} from "@material-ui/core";

import ButtonComponent from "./ButtonComponent";

const CardHeroes = (props) => {
  const useStyles = makeStyles({
    root: {
      width: "300px",
      height: "100%",
      margin: "0px !important",
    },
    styleCardMedia: {
      backgroundSize: "cover",
      minHeight: "500px",
    },
    styleCardContent: {
      padding: "0",
    },

    styleCardActions: {
      display: "flex",
      justifyContent: "center",
      padding: "5px",
    },

    listStyleTitle: {
      display: "grid",
      justifyContent: "center",
      width: "100%",
    },
    listStyleDetails: {
      display: "grid",
      justifyContent: "center",
      width: "100%",
    },
    /*   buttonListDetails: {
      marginTop: "8px",
    }, */
    titleList: {
      fontFamily: "Bungee Inline, cursive",
      color: "#6e7c7c",
    },
    styleListItem: {
      fontFamily: "Bungee Inline, cursive",
      fontSize: "17px",
    },
    styleInfoHero: {
      display: "flex",
      justifyContent: "center",
      fontFamily: "Bungee Inline",
      color: "black",
      padding: "5%",
    },
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      {props.heroe && (
        <Card className={classes.root}>
          <CardMedia
            component="img"
            id={props.heroe.id}
            image={props.heroe.image.url}
            className={classes.styleCardMedia}
          />
          <CardContent className={classes.styleCardContent}>
            <List className={classes.listStyleTitle}>
              <ButtonComponent
                className={classes.buttonStyle}
                color="default"
                variant="outlined"
                handleClick={handleClickOpen}
                label="Heroes Details"
              >
                {/*  <Typography className={classes.titleList}>
                    Heroes Details
                  </Typography> */}
              </ButtonComponent>
            </List>
            <List className={classes.listStyleDetails}>
              <ListItem>
                <Typography className={classes.styleListItem}>
                  Name: {props.heroe.name}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.styleListItem}>
                  speed: {props.heroe.powerstats.speed}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.styleListItem}>
                  strength: {props.heroe.powerstats.strength}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.styleListItem}>
                  duarability: {props.heroe.powerstats.durability}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.styleListItem}>
                  power: {props.heroe.powerstats.power}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.styleListItem}>
                  intelligence: {props.heroe.powerstats.intelligence}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.styleListItem}>
                  PowerStats Total: {props.heroe.powerStatsTotal}
                </Typography>
              </ListItem>
            </List>
          </CardContent>

          <CardActions className={classes.styleCardActions}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{ fontFamily: "Bungee Inline" }}>
                Informacion sobre el heroe: <br />
              </DialogTitle>

              <DialogContentText className={classes.styleInfoHero}>
                Alineacion: {props.heroe.biography.alignment} <br />
                Peso: {props.heroe.appearance.weight[1]} <br />
                Altura: {props.heroe.appearance.height[1]} <br />
                Nombre completo: {props.heroe.biography["full-name"]} <br />
                Alias: {props.heroe.biography.aliases[1]} <br />
                Color de Ojos: {props.heroe.appearance["eye-color"]} <br />
                Color de cabello: {props.heroe.appearance["hair-color"]} <br />
                Lugar de trabajo: {props.heroe.work.base} <br />
              </DialogContentText>
              <DialogActions>
                <ButtonComponent
                  handleClick={handleClose}
                  color="primary"
                  autoFocus
                  label="Ok"
                />
              </DialogActions>
            </Dialog>
            {props.propsBooleano ? (
              <ButtonComponent
                handleClick={() => props.deleteHero(props.heroe)}
                label="Eliminae Heroe"
                icon={<DeleteIcon />}
              />
            ) : (
              <ButtonComponent
                handleClick={() => props.addHero(props.heroe)}
                label="Agregar Heroe"
                icon={<AddIcon />}
              />
            )}
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default CardHeroes;
