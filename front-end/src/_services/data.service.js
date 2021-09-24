import http from "./http-common";

class KittenDataService {
  getAll = () => http.get("/kittens");

  get = (id) => http.get(`/kittens/${id}`);

  create = (data) => http.post("/kittens", data);

  update = (id, data) => http.put(`/kittens/${id}`, data);

  delete = (id) => http.delete(`/kittens/${id}`);

  findByName = (name) => http.get(`/kittens?name=${name}`);
}

export default new KittenDataService();
