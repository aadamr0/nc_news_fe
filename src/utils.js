import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-api-ffu7.onrender.com",
});

export function fetchArticles() {
  return ncNewsApi.get("/api/articles").then((response) => {
    return response.data.articlesArray
  });
}
