// eslint-disable-next-line import/no-unresolved
import http from "front-end";

class KittenDataService {
  getAll = () => http.get("/");

  getAdd = () => http.get("/kittens/add");

  // get = (id) => http.get(`/*/id=${id}`);

  view = (id) => http.get(`/id=${id}`);

  create = (data) => http.post("/kittens/add", data);

  update = (id, data) => http.put(`/kittens/edit/${id}`, data);

  delete = (id) => http.delete(`/kittens/delete/${id}`);

  findByName = (name) => http.get(`/search/name=${name}`);
}

export default new KittenDataService();
