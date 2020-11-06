import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { addUserInfo } from "./checkout.slice";
import api from "services/axios";

function AddressForm({ handleNext }) {
  const { handleSubmit, errors, control, trigger, reset } = useForm();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.checkout.order);

  const onSubmit = async (values) => {
    dispatch(addUserInfo(values));
    handleNext();
  };

  React.useEffect(() => {
    !!order && reset(order);

    return console.log("chay address");
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Controller
            as={<TextField margin="normal" variant="outlined" fullWidth required />}
            label="Name"
            name="user.name"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            as={<TextField margin="normal" variant="outlined" fullWidth required />}
            label="Email"
            name="user.email"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <Controller
            as={<TextField type="number" margin="normal" variant="outlined" fullWidth required />}
            label="Phone"
            name="user.phone"
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
            name="shipping.address"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            as={<TextField margin="normal" variant="outlined" fullWidth required />}
            label="City"
            name="shipping.city"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            as={<TextField margin="normal" variant="outlined" fullWidth required />}
            label="Ward"
            name="shipping.ward"
            control={control}
            helperText={errors.title ? errors.title.message : null}
            error={errors.title ? true : false}
            defaultValue=""
            rules={{
              required: "this is required",
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

export default React.memo(AddressForm);
