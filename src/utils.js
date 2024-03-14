import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-api-ffu7.onrender.com",
});

export function fetchArticles() {
  return ncNewsApi.get("/api/articles").then((response) => {
    return response.data.articlesArray;
  });
}

export function fetchArticleById(id) {
  if (Number(id)) {
    return ncNewsApi.get(`/api/articles/${id}`).then((res) => {
      return res.data;
    });
  }
}

export function fetchCommentsByArticleId(id) {
  if (Number(id)) {
    return ncNewsApi.get(`/api/articles/${id}/comments`).then((res) => {
      return res.data.commentsArray;
    });
  }
}

export function patchArticleById(id, vote) {
  if (Number(id)) {
    return ncNewsApi.patch(`/api/articles/${id}`, { inc_votes: vote });
  }
}

export function postCommentByArticleId(id, comment) {
  if (Number(id)) {
    return ncNewsApi
      .post(`/api/articles/${id}/comments`, {
        username: comment.username,
        body: comment.body,
      })
      .then((res) => res.data.commentObj);
  }
}

export function deleteCommentById(id) {
  if (Number(id)) return ncNewsApi.delete(`/api/comments/${id}`);
}

export function getTopics() {
  return ncNewsApi.get(`/api/topics`).then((res) => {
    return res.data;
  });
}
