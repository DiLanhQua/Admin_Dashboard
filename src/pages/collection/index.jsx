import ReusableTable from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  resetState,
  updateCollection,
} from "../../redux/slices/collection";
import { useCallback, useEffect, useState } from "react";
import CreateCollecton from "./create";
import { DeleteConfirmationModal, handleToast } from "./../../utils/toast";
import EditCollection from "./edit";

export default function CollectionPage() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [collectionData, setCollectionData] = useState(null);
  const columns = [
    { label: "Tên bộ sưu tập", field: "name" },
    { label: "tiêu đề ", field: "titleSEO" },
    { label: "từ khóa", field: "keywordsSEO" },
  ];

  const handleEdit = (index) => {
    setEditOpen(true);
    setCollectionData(index);
  };

  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa bộ sưu tập",
        content: "Bạn có chắc chắn muốn xóa bộ sưu tập này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deleteCollection(index.id)),
      });
    },
    [dispatch]
  );

  const status = useSelector((state) => state.collection.status);
  const data = useSelector((state) => state.collection.data);
  const deleteStatus = useSelector((state) => state.collection.deleteStatus);
  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && data) {
      setItems(
        data.map((item) => ({
          id: item._id,
          name: item.name,
          titleSEO: item.titleSEO,
          keywordsSEO: item.keywordsSEO,
          descriptionSEO: item.descriptionSEO,
          slug: item.slug,
        }))
      );
    }
  }, [status, data]);

  useEffect(() => {
    if (deleteStatus === "succeeded") {
      handleToast("success", "Xóa bộ sưu tập thành công");
      dispatch(getAllCollections());
      dispatch(resetState({ key: "deleteStatus", value: "idle" }));
    } else if (deleteStatus === "failed") {
      handleToast("error", "Xóa bộ sưu tập thất bại");
    }
  }, [dispatch, deleteStatus]);
  const handleCreate = (data) => {
    dispatch(createCollection(data)).then((res) => {
      if (res.type === "collection/createCollection/fulfilled") {
        handleToast("success", "Tạo bộ sưu tập thành công");
        dispatch(getAllCollections());
        setOpen(false);
      } else {
        handleToast("error", "Tạo bộ sưu tập thất bại");
      }
    });
  };

  const handleUpdate = (data) => {
    dispatch(updateCollection({ collectionId: collectionData.id, data })).then(
      (res) => {
        if (res.type === "collection/updateCollection/fulfilled") {
          handleToast("success", "Cập nhật bộ sưu tập thành công");
          dispatch(getAllCollections());
          setEditOpen(false);
        } else {
          handleToast("error", "Cập nhật bộ sưu tập thất bại");
        }
      }
    );
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        data={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        buttonAdd={() => setOpen(true)}
      />
      <CreateCollecton
        open={open}
        handleClose={() => setOpen(false)}
        handleCreate={handleCreate}
      />

      <EditCollection
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        collectionData={collectionData}
        handleUpdate={handleUpdate}
      />
    </>
  );
}
