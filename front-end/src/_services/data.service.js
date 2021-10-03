import http from "front-end";

class KittenDataService {
  getAll = () => http.get("/kittens");

  get = (id) => http.get(`/kittens/${id}`);

  view = (id) => http.get(`/kittens?id=${id}`);

  create = (data) => http.post("/kittens", data);

  update = (id, data) => http.put(`/kittens/edit/${id}`, data);

  delete = (id) => http.delete(`/kittens/delete/${id}`);

  findByName = (name) => http.get(`/kittens?name=${name}`);
}

export default new KittenDataService();
