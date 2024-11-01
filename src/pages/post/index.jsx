import EyePost from "./details";
import { useNavigate } from "react-router-dom";
import ReusableTablePost from "./table";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAll, resetState } from "../../redux/slices/post";
import { fDateVN } from "../../utils/format-time";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";

const columns = [
  { label: "Tác giả", field: "name" },
  { label: "Tiêu đề bài viết", field: "post_title" },
  { label: "Mô tả ngắn", field: "postShortDescription" },
  { label: "Từ khóa SEO", field: "seoKeywords" },
  { label: "Ngày đăng ", field: "dateStart" },
];

export default function PostList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleEdit = (id) => {
    const postId = id.id;
    navigate(`/dashboard/post/edit/${postId}`);
  };
  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa Bài đăng",
        content: "Bạn có chắc chắn muốn xóa bài đăng này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deletePost(index.id)),
      });
    },
    [dispatch]
  );

  const handleEye = (index) => {
    setSelectedData(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const status = useSelector((state) => state.post.getAllStatus);
  const initialData = useSelector((state) => state.post.posts);
  const deleteStatus = useSelector((state) => state.post.deleteStatus);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      setData(
        initialData.map((item) => ({
          id: item._id,
          name: item.author.name,
          post_title: item.postTitle,
          postShortDescription: item.shortDescription,
          seoKeywords: item.seoKeyWords,
          rating: item.rating,
          content: item.content,
          dateStart: fDateVN(item.createdAt),
          slug: item.slug,
          metaDescription: item?.metaDescription,
          thumbnail: item?.thumbnail,
          statustPost: item.status,
          category: item.category?.name,
        }))
      );

      dispatch(resetState({ key: "getAllStatus", value: "idle" }));
    }
  }, [dispatch, status, initialData]);

  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(getAll());
      dispatch(resetState({ key: "deleteStatus", value: "idle" }));
      handleToast("success", "Xóa bài viết thành công");
    }
  }, [dispatch, deleteStatus]);

  return (
    <>
      <ReusableTablePost
        data={data}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleEye={handleEye}
        navigate={"/dashboard/post/create"}
      />
      {selectedData && (
        <EyePost
          open={open}
          handleClose={handleClose}
          selectedData={selectedData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
}
