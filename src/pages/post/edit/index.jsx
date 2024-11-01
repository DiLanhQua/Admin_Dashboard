import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import Textarea from "../../../components/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";
import { PostSchema } from "../validate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/slices/category";
import {
  getPostById,
  resetState,
  updatePost,
} from "../../../redux/slices/post";

function EditPost() {
  const dispatch = useDispatch();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const category = useSelector((state) => state.category.data);
  const statusCategory = useSelector((state) => state.category.status);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (statusCategory === "success") {
      setCategoryOptions(
        category.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      );
    } else if (statusCategory === "failed") {
      console.log("Failed to fetch category");
    }
    dispatch(resetState({ key: "getcategoryStatus", value: "idle" }));
  }, [statusCategory, category, dispatch]);

  const navigate = useNavigate();
  const { id } = useParams();

  const statusGetPostById = useSelector((state) => state.post.getByIdStatus);
  const post = useSelector((state) => state.post.post);

  const statusOptiont = [
    { label: "Bản nháp", value: "draft" },
    { label: "Xuất bản", value: "publish" },
    { label: "Lưu trữ", value: "archived" },
  ];

  useEffect(() => {
    if (statusGetPostById === "success") {
      formik.setValues({
        postTitle: post.postTitle,
        slug: post.slug,
        thumbnail: post.thumbnail,
        shortDescription: post.shortDescription,
        seoKeyWords: post.seoKeyWords,
        metaDescription: post.metaDescription,
        shortSeoDescription: post.shortSeoDescription,
        content: post.content,
        category: post.category,
        status: post.status,
      });
    }
  }, [statusGetPostById, post]);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      postTitle: "",
      slug: "",
      thumbnail: "",
      shortDescription: "",
      seoKeyWords: "",
      metaDescription: "",
      shortSeoDescription: "",
      content: "",
      category: "",
      status: "",
    },
    validationSchema: PostSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      dispatch(updatePost({ postId: id, data: values })).then(
        (unwrapResult) => {
          if (unwrapResult.type === "post/updatePost/fulfilled") {
            handleToast("success", "Sửa bài viết thành công");
            resetForm();
            navigate("/dashboard/post");
          }
        }
      );
    },
  });

  const handleUploadComplete = (url) => {
    formik.setFieldValue("thumbnail", url);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này không?")) {
      formik.setFieldValue("thumbnail", "");
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    formik.setFieldValue("postTitle", title);
    if (!formik.touched.slug) {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      formik.setFieldValue("slug", slug);
    }
  };

  const getErrorProps = (name) => ({
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText:
      formik.touched[name] && formik.errors[name] ? formik.errors[name] : "",
  });

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy những thay đổi này không?")) {
      navigate("/dashboard/post");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box p={3}>
        <Grid container spacing={3}>
          {/* Thumbnail Upload Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">Ảnh bìa bài viết</Typography>
                <Box>
                  <ImageUploader
                    onUploadComplete={handleUploadComplete}
                    onDelete={handleDelete}
                    avatarSize={100}
                    {...getErrorProps("thumbnail")}
                    onBlur={formik.handleBlur}
                    fooder="post" // You can make it dynamic if needed
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          {/* Post Information Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Tiêu đề bài viết"
                    name="postTitle"
                    value={formik.values.postTitle}
                    onChange={handleTitleChange} // Use the new function
                    {...getErrorProps("postTitle")}
                    error={
                      formik.touched.postTitle &&
                      Boolean(formik.errors.postTitle)
                    }
                    helperText={
                      formik.touched.postTitle && formik.errors.postTitle
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Slug"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    {...getErrorProps("slug")}
                    placeholder="Slug will be generated"
                    disabled
                    error={formik.touched.slug && Boolean(formik.errors.slug)}
                    helperText={formik.touched.slug && formik.errors.slug}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                      label="Danh mục"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      {...getErrorProps("category")}
                    >
                      {categoryOptions.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText error>
                        {formik.errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Từ khóa SEO"
                    name="seoKeyWords"
                    value={formik.values.seoKeyWords}
                    onChange={formik.handleChange}
                    {...getErrorProps("seoKeywords")}
                    error={
                      formik.touched.seoKeyWords &&
                      Boolean(formik.errors.seoKeyWords)
                    }
                    helperText={
                      formik.touched.seoKeyWords && formik.errors.seoKeyWords
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Mô tả SEO"
                    name="metaDescription"
                    value={formik.values.metaDescription}
                    onChange={formik.handleChange}
                    {...getErrorProps("metaDescription")}
                    error={
                      formik.touched.metaDescription &&
                      Boolean(formik.errors.metaDescription)
                    }
                    helperText={
                      formik.touched.metaDescription &&
                      formik.errors.metaDescription
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    fullWidth
                    label="Trạng thái"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    {...getErrorProps("status")}
                  >
                    {statusOptiont.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả ngắn"
                    name="shortDescription"
                    value={formik.values.shortDescription || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.shortDescription &&
                      Boolean(formik.errors.shortDescription)
                    }
                    helperText={
                      formik.touched.shortDescription &&
                      formik.errors.shortDescription
                    }
                    height={250}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Nội dung bài viết"
                    name="content"
                    value={formik.values.content || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.content && Boolean(formik.errors.content)
                    }
                    helperText={formik.touched.content && formik.errors.content}
                    height={300}
                  />
                </Grid>
              </Grid>

              {/* Submit and Cancel Buttons */}
              <Box mt={3} textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  aria-label="Edit Post"
                >
                  Sửa bài viết
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                  style={{ marginLeft: 10 }}
                  aria-label="Cancel"
                >
                  Hủy
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default EditPost;
