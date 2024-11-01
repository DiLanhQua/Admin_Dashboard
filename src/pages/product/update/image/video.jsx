/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import ImageUploader from "../../../../components/upload";

export default function VideosProduct({ formik }) {
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
        Video
      </Typography>

      <ImageUploader
        onUploadComplete={(url) => formik.setFieldValue("videos", url)}
        onDelete={() => formik.setFieldValue("videos", "")}
        fooder="products/videos"
        avatarSize={80}
        idupload="video"
        // dataImage={formik.values.videos}
      />
    </>
  );
}
