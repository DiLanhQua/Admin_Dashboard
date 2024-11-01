import sendRequest from "../utils/resquest";

const WarehouseService = {
  getAll: () => sendRequest("get", "/warehouses/"),
  create: (data) => sendRequest("post", "/warehouses/create", data),
  delete: (id) => sendRequest("delete", `/warehouses/${id}`),
  update: (id, data) => sendRequest("put", `/warehouses/${id}`, data),
};

export default WarehouseService;
