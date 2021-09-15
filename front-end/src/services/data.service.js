import http from "../http-common";

class KittenDataService {
  getAll() {
    return http.get("/kittens");
  }

  get(id) {
    return http.get(`/kittens/${id}`);
  }

  create(data) {
    return http.post("/kittens", data);
  }

  update(id, data) {
    return http.put(`/kittens/${id}`, data);
  }

  delete(id) {
    return http.delete(`/kittens/${id}`);
  }

  deleteAll() {
    return http.delete(`/kittens`);
  }

  findByName(name) {
    return http.get(`/kittens?name=${name}`);
  }
}

export default new KittenDataService();