import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 140,
    height: 140,
    backgroundSize: "contain",
    margin: "auto",
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://lh3.googleusercontent.com/proxy/g5ncQ8j5S0a3uWtimQgwMj3CoKL2d3fl3bErD1CCGVynXYCH5cHgNf1IlWIWwA2eRqhDA8OB5nHmNst9QtPnZfchJunuzg2DgJNPJfpEfLi92NB3ekBeRg"
          title="Contemplative Reptile"
        ></CardMedia>
        <CardMedia></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>      
    </Card>
  );
}
