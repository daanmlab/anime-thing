import axios from "axios";

const headers = {
  Authorization: `Bearer ${process.env["VUE_APP_aniApi_jwt"]}`,
};

const api = axios.create({
  baseURL: "https://api.aniapi.com/v1/",
  headers,
});

export const getRandomAnimes = async (count = 8, nsfw = false) => {
  return await api.get(`random/anime/${count}/${nsfw}`);
};
