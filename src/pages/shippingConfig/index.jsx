import { useCallback, useEffect, useState } from "react";
import { Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import ReusableTable from "../../components/table";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllShipping, createShipping, updateShipping, deleteShipping } from "../../redux/slices/shipping";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";

// Cấu hình các cột cho bảng hiển thị phương thức giao hàng
const columns = [
    { label: "Phương thức giao hàng", field: "name" },
    { label: "Địa chỉ", field: "address" },
    { label: "Ghi chú", field: "note" },
];

// Danh sách các phương thức giao hàng
const shippingMethods = [
    "Giao hàng tiết kiệm",
    "Giao hàng nhanh",
    "Giao hàng hỏa tốc",
    "Viettel Post",
    "Bưu điện"
];

// Khởi tạo validation schema cho Formik
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng chọn phương thức giao hàng"),
    address: Yup.string()
        .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
        .required("Vui lòng nhập địa chỉ")
        .max(200, "Ghi chú không vượt quá 200 ký tự")
        .required("Vui lòng nhập địa chỉ"),
    note: Yup.string().max(200, "Ghi chú không vượt quá 200 ký tự"),
});

export default function ShippingPage() {
    // Trạng thái chỉnh sửa và id đang được chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const dispatch = useDispatch();

    // Gọi API lấy danh sách phương thức giao hàng khi component được tải
    useEffect(() => {
        dispatch(getAllShipping());
    }, [dispatch]);

    const status = useSelector((state) => state.shippingUnits.status);
    const dataShipping = useSelector((state) => state.shippingUnits.data);

    // Khởi tạo form với Formik và tích hợp validation schema
    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            note: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (isEditing) {
                // Gọi API cập nhật phương thức giao hàng
                dispatch(updateShipping({ shippingId: editingId, data: { ...values } })).then((res) => {
                    if (res.type === "shippingUnits/updateShippingUnits/fulfilled") {
                        handleToast("success", "Cập nhật phương thức giao hàng thành công");
                        resetForm();
                        setIsEditing(false);
                        setEditingId(null);
                        dispatch(getAllShipping());
                    } else {
                        handleToast("error", "Cập nhật phương thức giao hàng thất bại");
                    }
                });
            } else {
                // Gọi API thêm mới phương thức giao hàng
                dispatch(createShipping(values)).then((res) => {
                    if (res.type === "shippingUnits/createShipping/fulfilled") {
                        handleToast("success", "Phương thức giao hàng thêm thành công");
                        resetForm();
                        dispatch(getAllShipping());
                    } else {
                        handleToast("error", "Thêm phương thức giao hàng thất bại");
                    }
                });
            }
        },
    });
    // Xử lý sự kiện khi nhấn nút chỉnh sửa
    const handleEdit = (rowData) => {
        formik.setValues(rowData);
        setIsEditing(true);
        setEditingId(rowData._id);
    };
    // Xử lý sự kiện khi nhấn nút xóa
    const handleDelete = useCallback(
        (index) => {
            DeleteConfirmationModal({
                title: "Xác nhận xóa",
                content: "Bạn có chắc chắn muốn xóa phương thức này?",
                okText: "Xóa",
                cancelText: "Hủy",
                icon: "warning",
                confirmButtonText: "Xóa",
                onConfirm: () =>
                    dispatch(deleteShipping(index._id)).then((res) => {
                        if (res.type === "shippingUnits/deleteShippingUnits/fulfilled") {
                            handleToast("success", "Xóa phương thức thành công");
                            dispatch(getAllShipping());
                        } else {
                            handleToast("error", "Xóa phương thức thất bại");
                        }
                    }),
            });
        },
        [dispatch]
    );
    // Hủy chỉnh sửa và đặt lại form
    const handleCancel = () => {
        formik.resetForm();
        setIsEditing(false);
        setEditingId(null);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '20px' }}>
            <div>
                {dataShipping && (
                    <ReusableTable
                        data={dataShipping}
                        columns={columns}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                )}
            </div>
            <div>
                <Card style={{ padding: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <h4 style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                        {isEditing ? "Chỉnh sửa phương thức giao hàng" : "Thêm phương thức giao hàng mới"}
                    </h4>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)}>
                                    <InputLabel>Phương thức giao hàng</InputLabel>
                                    <Select
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        name="name"
                                    >
                                        {shippingMethods.map((method, index) => (
                                            <MenuItem key={index} value={method}>
                                                {method}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.name && formik.errors.name && (
                                        <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.name}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Địa chỉ"
                                    fullWidth
                                    variant="outlined"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Ghi chú"
                                    fullWidth
                                    variant="outlined"
                                    name="note"
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                    error={formik.touched.note && Boolean(formik.errors.note)}
                                    helperText={formik.touched.note && formik.errors.note}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '10px', justifyContent: 'flex-end' }}>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    style={{ padding: '10px 0', fontWeight: 'bold' }}
                                >
                                    {isEditing ? "Cập nhật" : "Thêm"}
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleCancel}
                                    fullWidth
                                    style={{ padding: '10px 0', fontWeight: 'bold' }}
                                >
                                    Hủy
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Card>
            </div>
        </div>
    );
}
