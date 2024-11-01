import sendRequest from "../utils/resquest";

const PostService = {
  createPost: (data) => sendRequest("post", "/blogs/create", data),

  updatePost: (id, data) => sendRequest("put", `/blogs/${id}`, data),

  deletePost: (id) => sendRequest("delete", `/blogs/${id}`),
  deleteMany: (data) => sendRequest("delete", "/blogs/", data),

  getAll: () => sendRequest("get", "/blogs/"),
  getPostById: (id) => sendRequest("get", `/blogs/id/${id}`),
  getPostBySlug: (slug) => sendRequest("get", `/blogs/${slug}`),
};

export default PostService;
