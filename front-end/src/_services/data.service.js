// eslint-disable-next-line import/no-unresolved
import connect from "./http.service";
import { baseURL } from "./address.service";

const http = connect(baseURL);

class KittenDataService {
  getAll = () => http.get("/");

  getAdd = () => http.get("/kittens/add");

  view = (id) => http.get(`/id=${id}`);

  create = (data) => http.post("/kittens/add", data);

  update = (id, data) => http.put(`/kittens/edit/${id}`, data);

  delete = (id) => http.delete(`/kittens/delete/${id}`);

  findByName = (name) => http.get(`/search/name=${name}`);

  isLoggedIn = () => http.get("/loggedInStatus");

  logout = () => http.get("/auth/logout");
}

export default new KittenDataService();
