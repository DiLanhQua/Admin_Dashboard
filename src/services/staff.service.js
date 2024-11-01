import sendRequest from "../utils/resquest";

const StaffService = {
  login: (data) => sendRequest("post", "/staffs/login", data),
  getAll: () => sendRequest("get", "/staffs/"),
  createStaff: (data) => sendRequest("post", "/staffs/register", data),
  deleteStaff: (id) => sendRequest("delete", `/staffs/${id}`),
  updateStaff: (sid, data) => sendRequest("put", `/staffs/${sid}`, data),
  getStaffById: (id) => sendRequest("get", `/staffs/${id}`),
  fetchMe: () => sendRequest("get", "/staffs/get-current"),
  logout: () => sendRequest("post", "/staffs/logout"),
  forgotpassword: (data) => sendRequest("post", "/staffs/forgotpassword", data),
  resetpassword: (data) => sendRequest("post", "/staffs/resetpassword", data),
};

export default StaffService;
