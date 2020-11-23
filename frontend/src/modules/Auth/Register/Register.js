import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from 'services/axios'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));
function Register({ setEmail, setRenderLogin }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { data } = await api.post("/api/auth/register", values);
      if (data) {
        toast("Đăng kí thành công !");
      }
    } catch (err) {
      toast(err.response.data.message);
    }
  });

  return (
    <Container className={classes.container} maxWidth="xs">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  inputRef={register}
                  label="First Name"
                  name="firstName"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  inputRef={register}
                  label="Last Name"
                  name="lastName"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth inputRef={register} label="Phone" name="phone" size="small" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth inputRef={register} label="Email" name="email" size="small" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  inputRef={register}
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Register;
