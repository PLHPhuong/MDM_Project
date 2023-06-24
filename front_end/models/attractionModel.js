const axios = require("axios");
const { response } = require("express");

const getAllAttractions = async (data) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8000/attraction",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return result;
};

module.exports = {
  getAllAttractions,
};
