import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { addUserInfo } from "./checkout.slice";
import api from "services/axios";

export default function AddressForm({ handleNext }) {
  const { handleSubmit, errors, control, trigger } = useForm({});
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
   
    dispatch(addUserInfo(values));
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            as={<TextField margin="normal" variant="outlined" fullWidth required />}
            label="firstName"
            name="firstName"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
              pattern: { value: /^[a-zA-Z 0-9]*$/, message: "not include special characters" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            as={<TextField margin="normal" variant="outlined" fullWidth required />}
            label="lastName"
            name="lastName"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
              pattern: { value: /^[a-zA-Z 0-9]*$/, message: "not include special characters" },
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <Controller
            as={<TextField type="number" margin="normal" variant="outlined" fullWidth required />}
            label="Phone"
            name="phone"
            control={control}
            rules={{ required: "this is required" }}
            helperText={errors.price ? errors.price.message : null}
            error={errors.price ? true : false}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<TextField margin="normal" variant="outlined" fullWidth required />}
            label="address"
            name="address"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
              pattern: { value: /^[a-zA-Z 0-9]*$/, message: "not include special characters" },
            }}
          />
        </Grid>

        <Button variant="contained" color="primary" type="submit">
          {"Next"}
        </Button>
      </Grid>
    </form>
  );
}
