import sendRequest from "../utils/resquest";

const CustomerService = {
  getAll: () => sendRequest("get", "/Account/get-all-account"),
  getDe: (id) => sendRequest("get", `/Account/getDe-account/${id}`),
  updateCustomer: (id, data) => sendRequest("put", `/customers/${id}`, data),
  deleteCustomer: (id) => sendRequest("delete", `/customers/${id}`),
  createCustomer: (data) => sendRequest("post", "/customers/register", data),
};

export default CustomerService;