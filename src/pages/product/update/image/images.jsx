/* eslint-disable react/prop-types */
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import UploadIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { imageDb } from "../../../../config/firebase";

export default function ImageProduct({ formik }) {
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [imageRefs, setImageRefs] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    setDownloadURLs(formik.values.images);
  }, [formik.values.images]);
  // Xử lý upload ảnh
  const handleFileUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      setUploadError(null);

      files.forEach((file) => {
        if (!["image/png", "image/jpeg"].includes(file.type)) {
          setUploadError("Vui lòng tải lên hình ảnh PNG hoặc JPG hợp lệ.");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setUploadError("Kích thước hình ảnh không được vượt quá 5MB.");
          return;
        }

        const storageRef = ref(imageDb, `products/images/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            
            setUploadError("Upload failed. Please try again.");
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);

              setDownloadURLs((prevURLs) => {
                const updatedURLs = [...prevURLs, url];
                formik.setFieldValue("images", updatedURLs);
                return updatedURLs;
              });

              setImageRefs((prevRefs) => [...prevRefs, storageRef]);
            } catch (error) {
              
              setUploadError("Error getting download URL. Please try again.");
            }
          }
        );
      });
    },
    [formik]
  );

  const handleDelete = useCallback(
    (index) => {
      const imageRef = imageRefs[index];

      if (imageRef) {
        deleteObject(imageRef)
          .then(() => {
            setDownloadURLs((prevURLs) => {
              const updatedURLs = prevURLs.filter((_, i) => i !== index);
              formik.setFieldValue("images", updatedURLs);
              return updatedURLs;
            });

            setImageRefs((prevRefs) => prevRefs.filter((_, i) => i !== index));
          })
          .catch((error) => {
            
            setUploadError("Error deleting the file, please try again later.");
          });
      } else {
        setDownloadURLs((prevURLs) => {
          const updatedURLs = prevURLs.filter((_, i) => i !== index);
          formik.setFieldValue("images", updatedURLs);
          return updatedURLs;
        });
      }
    },
    [imageRefs, downloadURLs, formik]
  );

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h6">
        Hình ảnh
      </Typography>
      <Box textAlign="center" p={3}>
        <input
          type="file"
          id="uploadImage"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
          multiple
        />
        <label htmlFor="uploadImage">
          <Box
            sx={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              margin: "0 auto",
            }}
          >
            <IconButton component="span">
              <Avatar
                sx={{
                  backgroundColor: "#d3d3d3",
                  color: "#6c757d",
                  width: 80,
                  height: 80,
                }}
              >
                <UploadIcon fontSize="large" />
              </Avatar>
            </IconButton>
          </Box>
        </label>
        <Typography variant="body2" color="textSecondary" mt={2}>
          Hỗ trợ định dạng PNG, JPG
        </Typography>

        {uploadError && (
          <Typography color="error" mt={2}>
            {uploadError}
          </Typography>
        )}

        {downloadURLs.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
              mt: 4,
            }}
          >
            {downloadURLs.map((url, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                }}
              >
                <Avatar
                  src={url}
                  alt="product image"
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "red",
                    color: "white",
                    width: 30,
                    height: 30,
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                  }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
