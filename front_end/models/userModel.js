const axios = require("axios");
const { response } = require("express");

const login = async (data) => {
  const result = await axios({
    method: "post",
    url: "http://localhost:8000/api/user/login",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return result;
};

const register = async (data) => {
  const result = await axios({
    method: "post",
    url: "http://localhost:8000/api/user/register",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return result;
};

module.exports = {
  login,
  register,
};
