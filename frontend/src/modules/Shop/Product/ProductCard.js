import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import convertPrice from "helpers/convertPriceVND";
import Link from "next/link";

function ProductCard({ item }) {
  const classes = useStyles();

  return (
    <div>
      <Link href={{ pathname: "/product/" + item.slug }}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} title={item.title} image={item.image}></CardMedia>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.title}>
                {item.title}
              </Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
              ₫{convertPrice(item.price)}
              <span style={{ color: "grey" }}>Còn {item.inventory}</span>
            </CardActions>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
}

export function ProductCardSkeleton() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media}>
            <Skeleton animation="wave" width="100%" height="100%" />
          </CardMedia>
          <CardContent>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </CardContent>
          <CardActions className={classes.cartActions}>
            <Skeleton width="100%" animation="wave" />
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 390,
    marginTop: 5,
  },
  media: {
    height: 180,
    width: "100%",
  },
  title: { height: 50 },
  cartActions: { display: "flex", justifyContent: "space-between" },
});

export default ProductCard;
