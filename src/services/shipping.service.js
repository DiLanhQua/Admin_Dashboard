import { getAll } from "../redux/slices/post";
import sendRequest from "../utils/resquest";
const ShippingService = {
    getAll: () => sendRequest("get", "/shippingUnits"),
    create: (data) => sendRequest("post", "shippingUnits/create", data),
    update: (id, data) => sendRequest("put", `shippingUnits/${id}`, data),
    delete: (id) => sendRequest("delete", `shippingUnits/${id}`)
}
export default ShippingService;