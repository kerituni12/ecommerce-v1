import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "services/axios";
import Router from "next/router";

function VnPay({ order }) {
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = async (values) => {    
    try {
      const { data } = await api.post("/api/vnpay", { order });
      if (data) {
        console.log(data);
        if (data.code === "00") {        
          Router.push(data.vnpUrl);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default VnPay;
