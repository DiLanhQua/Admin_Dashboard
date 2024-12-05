import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ReusableTable from "../../components/Table";
import ColorForm from "./components/ColorForm";
import { deleteBrand } from "../../pages/brand/apibrand";  // Import các hàm API
import { createColor, getColors, updateColor } from "./components/color-api";

export default function ColorPages() {
    const [isUpdate, setIsUpdate] = useState(false);
    const [arrColor, setArrColor] = useState([]);

    const [initialValues, setInitialValues] = useState({
        colorCode: "",
        nameColor: "",
    });

    const columns = [
        { label: "Tên màu", field: "nameColor" },
        { label: "Mã màu", field: "colorCode" },
    ];

    const loadColor = async () => {
        const res = await getColors();
        setArrColor(res.data);
    }

    useEffect(() => {
        loadColor();
    }, []);

    const handleEdit = (brand) => {
        setInitialValues({
            id: brand.id,
            colorCode: brand.colorCode,
            nameColor: brand.nameColor,
        });
        setIsUpdate(true);
    };

    const handleAdd = async (formData) => {
        const res = await createColor(formData);
        loadColor();
        formik.resetForm()
        setInitialValues({ colorCode: "", nameColor: "" });
    };

    const handleUpdate = async (formData) => {
        const res = await updateColor(formData);
        loadColor();
        setIsUpdate(false);
        setInitialValues({ colorCode: "", nameColor: "" });
    };

    const handleDelete = async (id) => {
        await deleteBrand(id);
        loadBrands();
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <ReusableTable
                    columns={columns}
                    data={arrColor}
                    handleEdit={handleEdit}
                />
            </Grid>
            <Grid item xs={7}>
                <ColorForm
                    title={isUpdate ? "Cập nhật màu sắc" : "Thêm màu sắc"}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    initialValues={initialValues}
                    isUpdate={isUpdate}
                />
            </Grid>
        </Grid>
    )
}
