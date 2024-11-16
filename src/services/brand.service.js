import sendRequest from "../utils/resquest";

const BrandService = {
  getAll: () => sendRequest("get", "/Brand/get-all-brand?maxPageSize=4&Pagesize=4&PageNumber=1"),
  create: (data) => sendRequest("post", "/Brand/add-brand", data),
  delete: (id) => sendRequest("delete", `/brands/${id}`),
  update: (id, data) => sendRequest("put", `/Brand/update-brand-by-id/${id}`, data),
};

export default BrandService;
