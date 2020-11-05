import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";

import { useRouter } from "next/router";

import api from "services/axios";

function CategoryDetail() {
  const classes = useStyles();
  const { control, register, handleSubmit, setValue, reset } = useForm({
    validationSchema: categorySchema,
  });

  const router = useRouter();
  const { category } = router.query;

  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (!!category) {
      async function fetchData() {
        try {
          const { data } = await api.get(`/api/category/${category}`);
          if (data) {
            reset({
              title: data.title,
              description: data.description,
            });
            // setValue("title", data.title);
            // setValue("slug", data.slug);
            // setValue("description", data.description);
          }
        } catch (error) {
          console.log(error);
          setError(error.response.data.message);
        }
      }
      fetchData();
    }
  }, [category]);

  const onSubmit = async (values) => {
    const { title, slug, description } = values;
    try {
      await api.put(`/api/category/${category}`, { title, slug, description });
      router.push(`${slug}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className={classes.root}>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
        <Grid container direction="column">
          <Grid item>
            <Controller
              as={<TextField label="Category" margin="normal" variant="outlined" fullWidth />}
              name="title"
              control={control}
              defaultValue=""
            />
            <Controller
              as={<TextField label="Slug" margin="normal" variant="outlined" fullWidth />}
              name="slug"
              control={control}
              defaultValue=""
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
              defaultValue=""
            />
          </Grid>
          <Grid item>
            <Button className={classes.button} type="submit" variant="outlined" aria-label="delete" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

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

export default CategoryDetail;
