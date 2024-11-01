import sendRequest from "../utils/resquest";

const BannerCollectionService = {
  getAll: () => sendRequest("get", "/BannerCollection"),
  create: (data) => sendRequest("post", "/BannerCollection/create", data),
  getById: (id) => sendRequest("get", `/BannerCollection/${id}`),
  update: (id, data) => sendRequest("put", `/BannerCollection/${id}`, data),
  delete: (id) => sendRequest("delete", `/BannerCollection/${id}`),
};

export default BannerCollectionService;
