import axios from "axios";

export async function updataeArticle(article) {
  const data = await axios.post(`http://localhost:9000/article/update`, article, {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data;
}
