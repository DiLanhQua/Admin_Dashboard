import sendRequest from "../utils/resquest";

const TagsService = {
  getAll: () => sendRequest("get", "/tags/"),
  create: (data) => sendRequest("post", "/tags/create", data),
  update: (id, data) => sendRequest("put", `/tags/${id}`, data),
  delete: (id) => sendRequest("delete", `/tags/${id}`),
};

export default TagsService;
