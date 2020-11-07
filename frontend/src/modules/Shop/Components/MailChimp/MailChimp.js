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
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
      {status === "success" && <div style={{ color: "green" }} dangerouslySetInnerHTML={{ __html: message }} />}
      <input ref={(node) => (name = node)} type="text" placeholder="Your name" />
      <br />
      <input ref={(node) => (email = node)} type="email" placeholder="Your email" />
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default CustomForm;
