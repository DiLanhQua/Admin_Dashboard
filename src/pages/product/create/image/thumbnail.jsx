import { Typography } from "@mui/material";
import ImageUploader from "../../../../components/upload";

export default function ThumbnailProduct({ handleUploadThumbnail }) {
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
        onUploadComplete={(url) => handleUploadThumbnail(url)}
        onDelete={() => handleUploadThumbnail("")}
        fooder="products/thumbnails"
        avatarSize={80}
      />
    </>
  );
}
