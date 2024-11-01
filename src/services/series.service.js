import sendRequest from "../utils/resquest";

const ServiceService = {
  getAll: () => sendRequest("get", "/series/"),
  create: (data) => sendRequest("post", "/series/create", data),
  delete: (id) => sendRequest("delete", `/series/${id}`),
  update: (id, data) => sendRequest("put", `/series/${id}`, data),
};

export default ServiceService;
