import sendRequest from "../utils/resquest";

const AttributesService = {
  getAll: () => sendRequest("get", "/attributes"),
  create: (data) => sendRequest("post", "/attributes/create", data),
  delete: (id) => sendRequest("delete", `/attributes/${id}`),
  update: (id, data) => sendRequest("put", `/attributes/${id}`, data),
};

export default AttributesService;
