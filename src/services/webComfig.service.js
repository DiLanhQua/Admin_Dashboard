import sendRequest from "../utils/resquest";

const WebConfigService = {
  get: () => sendRequest("get", "/webConfig"),
  update: (id, data) => sendRequest("put", `/webConfig/${id}`, data),
};

export default WebConfigService;
