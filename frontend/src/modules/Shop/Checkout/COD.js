import { Button, Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "services/axios";
import Router from "next/router";

function COD({ order }) {
  const onSubmit = async () => {
    try {
      const { data } = await api.post(`/api/order`, order);
      if (data) {
        Router.push("/order");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button color="secondary" fullWidth type="submit" variant="contained" onClick={() => onSubmit()}>
      Đặt hàng
    </Button>
  );
}

export default COD;
