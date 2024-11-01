import sendRequest from "../utils/resquest";

const IconService = {
  getAll: () => sendRequest("get", "/icon-class/"),
};

export default IconService;
