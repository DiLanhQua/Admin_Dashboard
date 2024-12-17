import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardHeader,
} from "@mui/material";
import * as Yup from "yup";

export default function ColorForm({
    title,
    onAdd,
    onUpdate,
    initialValues,
    isUpdate,
}) {

    const handleSubmit = async (values) => {
        let data = {
            nameColor: values.nameColor,
            colorCode: values.colorCode,
        }
        try {
            if (isUpdate) {
                await onUpdate(data);
            } else {
                await onAdd(data);
            }
        } catch (error) {
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit} // Kết nối handleSubmit
            validationSchema={Yup.object().shape({
                nameColor: Yup.string().required("Tên màu sắc không được để trống")
                    .test('no-number', 'Tên màu sắc không được chứa số', value => !/[0-9]/.test(value)),
                colorCode: Yup.string().required("Mã màu không được để trống")
                    .test('no-number', 'Mã màu không được chứa số', value => !/[0-9]/.test(value)),
            })}
            enableReinitialize={true}
        >
            {({ errors, touched, handleChange, values, handleSubmit }) => (
                <Card>
                    <CardHeader title={title} />
                    <CardContent>
                        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Field
                                        name="nameColor"
                                        as={TextField}
                                        fullWidth
                                        label="Tên màu sắc"
                                        value={values.nameColor || ""}
                                        onChange={handleChange}
                                        error={errors.nameColor && touched.nameColor}
                                        helperText={errors.nameColor && touched.nameColor ? errors.nameColor : ""}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        name="colorCode"
                                        as={TextField}
                                        fullWidth
                                        label="Mã màu"
                                        value={values.colorCode || ""}
                                        onChange={handleChange}
                                        error={errors.colorCode && touched.colorCode}
                                        helperText={errors.colorCode && touched.colorCode ? errors.colorCode : ""}
                                    />
                                </Grid>

                                <Grid item xs={12} container justifyContent="flex-end">
                                    <Button onClick={async () => {
                                        let data = {
                                            id: values.id,
                                            nameColor: values.nameColor,
                                            colorCode: values.colorCode,
                                        }
                                        try {
                                            if (isUpdate) {
                                                await onUpdate(data);
                                            } else {
                                                await onAdd(data);
                                            }
                                        } catch (error) {
                                        }
                                    }} variant="contained" color="success">
                                        {isUpdate ? "Cập nhật màu sắc" : "Thêm màu sắc"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </CardContent>
                </Card>
            )}
        </Formik>
    )
}