// eslint-disable-next-line import/no-unresolved
import http from "./http-common-dev";

class KittenDataService {
  getAll = () => http.get("/kittens");

  get = (id) => http.get(`/kittens/${id}`);

  view = (id) => http.get(`/kittens?${id}`);

  create = (data) => http.post("/kittens", data);

  update = (id, data) => http.put(`/kittens/edit/${id}`, data);

  delete = (id) => http.delete(`/kittens/delete/${id}`);

  findByName = (name) => http.get(`/kittens?name=${name}`);
}

export default new KittenDataService();
