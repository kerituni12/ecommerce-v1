import { TextField, Button, Typography } from "@material-ui/core";
const CustomForm = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value,
    });

  return (
    <div>
      <Typography>Đăng kí nhận tin</Typography>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
      {status === "success" && <div style={{ color: "green" }} dangerouslySetInnerHTML={{ __html: message }} />}
      <TextField
        inputRef={(node) => (name = node)}
        type="text"
        placeholder="Your name"
        variant="outlined"
        size="small"
      />
      <br />
      <TextField
        inputRef={(node) => (email = node)}
        type="email"
        placeholder="Your email"
        variant="outlined"
        size="small"
        margin="normal"
      />
      <br />
      <Button variant="contained" color="primary" onClick={submit}>
        Submit
      </Button>
    </div>
  );
};

export default CustomForm;
