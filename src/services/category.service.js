import sendRequest from "../utils/resquest";

const CategoryService = {
  getAll: () => sendRequest("get", "/categories/"),
  delete: (id) => sendRequest("delete", `/categories/${id}`),
  create: (data) => sendRequest("post", "/categories/create", data),
  update: (id, data) => sendRequest("put", `/categories/${id}`, data),
  getById: (id) => sendRequest("get", `/categories/${id}`),
  updatePosition: (data) =>
    sendRequest("put", "/categories/position/update", data),
};

export default CategoryService;
