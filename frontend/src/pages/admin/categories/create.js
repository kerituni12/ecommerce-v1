import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";

import Link from "next/link";

import api from "services/axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginBottom: theme.spacing(1.5),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const categorySchema = yup.object().shape({
  title: yup.string().required(),
  slug: yup.string().required(),
});

function CreateCategory() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: categorySchema,
  });

  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { title, slug, description } = values;

    try {
      await api.post(`/api/category`, { title, slug, description });
    } catch (error) {
      console.log(error.response)     
      setError(error.response.data.message);
    }
  };

  return (
    <div className={classes.root}>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              name="title"
              inputRef={register}
              label="Category"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              error={errors.email ? true : false}
            />

            <TextField
              name="slug"
              inputRef={register}
              label="Slug"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              error={errors.email ? true : false}
            />
          </Grid>
          <Grid item>
            <TextField
              name="description"
              inputRef={register}
              label="Description"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
            />
          </Grid>
          <Grid item>
            <Button className={classes.button} type="submit" variant="outlined" aria-label="delete" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <Link href="/admin">
        <a>Admin</a>
      </Link>
      <Link href="/admin/categories/create">
        <a>categories</a>
      </Link>
      <Link href="/">
        <a>index</a>
      </Link>
    </div>
  );
}

export default CreateCategory;
