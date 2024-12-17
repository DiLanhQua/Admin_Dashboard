import { Box, IconButton, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { imageDb } from "../../../../config/firebase";
import UploadIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

export default function VideoProduct({ handleUploadVideo, onDelete }) {
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [videoRefs, setVideoRefs] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      setUploadError(null);

      files.forEach((file) => {
        if (
          !["video/mp4", "video/avi", "video/mov", "video/webm"].includes(
            file.type
          )
        ) {
          setUploadError(
            "Vui lòng tải lên video MP4, AVI, MOV hoặc WEBM hợp lệ."
          );
          return;
        }

        const storageRef = ref(imageDb, `products/videos/${uuidv4()}`);
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

              // Update state with the new URL and ref
              setDownloadURLs((prevURLs) => {
                const updatedURLs = [...prevURLs, url];
                handleUploadVideo(updatedURLs);
                return updatedURLs;
              });

              setVideoRefs((prevRefs) => [...prevRefs, storageRef]);
            } catch (error) {
              
              setUploadError("Error getting download URL. Please try again.");
            }
          }
        );
      });
    },
    [handleUploadVideo]
  );

  const handleDelete = useCallback(
    (index) => {
      const videoRef = videoRefs[index];
      if (!videoRef) return;

      deleteObject(videoRef)
        .then(() => {
          setDownloadURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
          setVideoRefs((prevRefs) => prevRefs.filter((_, i) => i !== index));

          if (onDelete) onDelete(index);
        })
        .catch((error) => {
          
          setUploadError("Error deleting the file, please try again later.");
        });
    },
    [videoRefs, downloadURLs, onDelete]
  );

  return (
    <Box textAlign="center" p={3}>
      <input
        type="file"
        id="uploadVideo"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        multiple
      />
      <label htmlFor="uploadVideo">
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
            <UploadIcon fontSize="large" />
          </IconButton>
        </Box>
      </label>
      <Typography variant="body2" color="textSecondary" mt={2}>
        Hỗ trợ định dạng MP4, AVI, MOV, WEBM
      </Typography>

      {uploadError && (
        <Typography color="error" mt={2}>
          {uploadError}
        </Typography>
      )}

      {/* Display the uploaded videos */}
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
                width: 150,
                height: 100,
              }}
            >
              <video width="150" height="100" controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
  );
}
