import React from "react";
import { useSelector } from "react-redux";
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
  const user = useSelector((state) => state.login.user);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="/avatar.png" title="Contemplative Reptile"></CardMedia>
        <CardMedia></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {user?.fullName || ""}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="center">
            Code vì đam mê
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
