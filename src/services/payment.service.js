import sendRequest from "../utils/resquest";

const PaymentService = {
  get: () => sendRequest("get", "/paynents"),
  add: (data) => sendRequest("post", "/paynents", data),
  update: (id, data) => sendRequest("put", `/paynents/${id}`, data),
  delete: (id) => sendRequest("delete", `/paynents/${id}`),
};

export default PaymentService;
