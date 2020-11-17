import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { login } from "./login.slice";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));
function Login({ setEmail, setRenderLogin }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(login({ email, password, setRenderLogin }));
    setEmail(email);
  });

  return (
    <Container className={classes.container} maxWidth="xs">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
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
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
