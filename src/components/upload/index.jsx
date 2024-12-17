import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, IconButton, Typography, Avatar } from "@mui/material";
import UploadIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import propTypes from "prop-types";
import { imageDb } from "./../../config/firebase";

const ImageUploader = ({
  onUploadComplete,
  onDelete,
  buttonComponent: CustomButton,
  avatarSize = 120,
  error,
  helperText,
  allowedFormats = ["PNG", "JPG"],
  fooder, // Dynamic folder path for upload
  idupload,
}) => {
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [imageRefs, setImageRefs] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  // Handle file upload
  const handleFileUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      setUploadError(null);

      files.forEach((file) => {
        // Check file type
        if (!["image/png", "image/jpeg"].includes(file.type)) {
          setUploadError("Vui lòng tải lên hình ảnh PNG hoặc JPG hợp lệ.");
          return;
        }

        // Check file size
        if (file.size > 5 * 1024 * 1024) {
          setUploadError("Kích thước hình ảnh không được vượt quá 5MB.");
          return;
        }

        const storageRef = ref(imageDb, `${fooder}/${uuidv4()}`); // Correct template literal for dynamic path
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null, // No progress tracking
          (error) => {
            setUploadError("Vui lòng tải lên hình ảnh PNG hoặc JPG hợp lệ.");
          },
          () => {
            // On successful upload, get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setDownloadURLs((prevURLs) => [...prevURLs, url]); // Add new URL
              setImageRefs((prevRefs) => [...prevRefs, storageRef]); // Add new reference
              if (onUploadComplete) onUploadComplete(url);
            });
          }
        );
      });
    },
    [onUploadComplete, fooder] // Ensure fooder is in the dependency array
  );

  // Handle delete action for individual images
  const handleDelete = useCallback(
    (index) => {
      if (!imageRefs[index]) return;

      deleteObject(imageRefs[index])
        .then(() => {
          setDownloadURLs((prevURLs) => prevURLs.filter((_, i) => i !== index)); // Remove URL
          setImageRefs((prevRefs) => prevRefs.filter((_, i) => i !== index)); // Remove reference
          if (onDelete) onDelete();
        })
        .catch((error) => {
          setUploadError("Error deleting the file, please try again later.");
        });
    },
    [imageRefs, onDelete]
  );

  return (
    <Box textAlign="center" p={3}>
      <input
        type="file"
        id={idupload || "uploadFile"}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        multiple // Allow multiple file uploads
      />
      <label htmlFor={idupload || "uploadFile"}>
        <Box
          sx={{
            width: avatarSize + 30,
            height: avatarSize + 30,
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
                width: avatarSize,
                height: avatarSize,
                backgroundColor: "#d3d3d3",
                color: "#6c757d",
              }}
            >
              <UploadIcon fontSize="large" />
            </Avatar>
          </IconButton>
        </Box>
      </label>
      <Typography variant="body2" color="textSecondary" mt={2}>
        {`Hỗ trợ định dạng ${allowedFormats.join(", ")}`}{" "}
        {/* Dynamic formats */}
      </Typography>

      {/* Display error if present */}
      {(error || uploadError) && (
        <Typography variant="body2" color="error" mt={1}>
          {helperText || uploadError}
        </Typography>
      )}

      {/* Display all uploaded images */}
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
                width: avatarSize,
                height: avatarSize,
              }}
            >
              <Avatar
                src={url}
                sx={{
                  width: avatarSize,
                  height: avatarSize,
                }}
              />
              {CustomButton ? (
                <CustomButton onClick={() => handleDelete(index)} />
              ) : (
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
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

ImageUploader.propTypes = {
  onUploadComplete: propTypes.func,
  onDelete: propTypes.func,
  buttonComponent: propTypes.elementType,
  avatarSize: propTypes.number,
  error: propTypes.bool,
  helperText: propTypes.string,
  allowedFormats: propTypes.arrayOf(propTypes.string),
  fooder: propTypes.string.isRequired, // Required prop for dynamic folder path
  idupload: propTypes.string,
};

export default ImageUploader;
