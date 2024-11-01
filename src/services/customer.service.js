import sendRequest from "../utils/resquest";

const CustomerService = {
  getAll: () => sendRequest("get", "/customers/"),
  updateCustomer: (id, data) => sendRequest("put", `/customers/${id}`, data),
  deleteCustomer: (id) => sendRequest("delete", `/customers/${id}`),
  createCustomer: (data) => sendRequest("post", "/customers/register", data),
};

export default CustomerService;
