/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

export default function DetailWeb({ open, handleClose, selectedData }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="company-details-dialog"
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        {selectedData && (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <img
              src={
                selectedData?.logo ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={selectedData?.title || "No Image Available"}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Image+Not+Available";
              }}
              style={{
                width: "30%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />

            <h2 id="company-details-dialog">{selectedData.title}</h2>
            {/* <p><strong>ID:</strong> {selectedData.id}</p> */}
            <p>
              <strong>Email:</strong> {selectedData.email}
            </p>
            <p>
              <strong>SDT:</strong> {selectedData.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedData.address}
            </p>
            <p>
              <strong>Fanpage Facebook:</strong>
              <a
                href={selectedData.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedData.facebook}
              </a>
            </p>

            <p>
              <strong>Tiktok:</strong>
              <a
                href={selectedData.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedData.tiktok}
              </a>
            </p>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
