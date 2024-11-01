import sendRequest from "../utils/resquest";

const CouponService = {
  getAll: () => sendRequest("get", "/coupon/"),
  updateCoupon: (id, data) => sendRequest("put", `/coupon/${id}`, data),
  deleteCoupon: (id) => sendRequest("delete", `/coupon/${id}`),
  createCoupon: (data) => sendRequest("post", "/coupon/", data),
  getCouponById: (id) => sendRequest("get", `/coupon/${id}`),
};

export default CouponService;
