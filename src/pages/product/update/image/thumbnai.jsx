/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import ImageUploader from "../../../../components/upload";

export default function ThumbnailProduct({ formik }) {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Hình đại diện
      </Typography>

      <ImageUploader
        onUploadComplete={
          (url) => formik.setFieldValue("thumbnail", url)
          // formik.setFieldValue("thumbnail", url)
        }
        onDelete={() => formik.setFieldValue("thumbnail", "")}
        fooder="products/thumbnails"
        avatarSize={80}
        // dataImage={
        //   Array.isArray(formik.values.thumbnail)
        //     ? formik.values.thumbnail[0]
        //     : formik.values.thumbnail
        // }
      />
    </>
  );
}
