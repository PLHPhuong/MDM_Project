const axios = require("axios");
const { response } = require("express");

const LoadCitiesByContinent = async () => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8000/api/activities/continent/city",
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return result;
};
const SearchAttraction = async (data) => {
  //   const result = await axios({
  //     method: "post",
  //     url: "http://localhost:8000/api/activities/search",
  //     data: data
  //   })
  //     .then((response) => response.data)
  //     .catch((error) => console.log(error));
  //   return result;
  // };
  const result = await axios
    .post("http://localhost:8000/api/activities/search", data)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return result;
};
module.exports = {
  LoadCitiesByContinent,
  SearchAttraction,
};
