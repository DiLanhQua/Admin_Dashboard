import sendRequest from "../utils/resquest";

const BrandService = {
  getAll: () => sendRequest("get", "/brands/"),
  create: (data) => sendRequest("post", "/brands/create", data),
  delete: (id) => sendRequest("delete", `/brands/${id}`),
  update: (id, data) => sendRequest("put", `/brands/${id}`, data),
};

export default BrandService;
