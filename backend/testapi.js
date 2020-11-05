const axios = require("axios");
axios.post("http://localhost:3000/v1/auth/login")
  .then(function (response) {
    console.log("vo day",response);
  })
  .catch(function (error) {
    console.log( error.response.data);   
  });
