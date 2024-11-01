import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

export default function EyePost({
  open,
  handleClose,
  selectedData,
  handleDelete,
  handleEdit,
}) {
  const truncateContent = (content, maxLength) => {
    if (!content) return "";
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent sx={{ padding: 4, maxHeight: "80vh", overflowY: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar
            src={selectedData.thumbnail}
            alt="Thumbnail"
            sx={{
              width: { xs: 400, md: 400 }, // Set width to 400
              height: { xs: 400, md: 400 }, // Set height to 400
              margin: "0 auto",
              mb: 2,
            }}
          />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {selectedData?.post_title}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {selectedData?.postShortDescription}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Tác giả:</strong> {selectedData?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>SEO Keywords:</strong> {selectedData?.seoKeywords}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Meta Description:</strong> {selectedData?.metaDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Short SEO Description:</strong>{" "}
              {selectedData?.postShortDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Nội dung bài viết:</strong>{" "}
              {truncateContent(selectedData?.content, 300)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Danh mục:</strong> {selectedData?.category}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Trạng thái:</strong> {selectedData?.statustPost}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Đánh ghá:</strong> {selectedData?.rating}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <IconButton
          aria-label="edit"
          onClick={() => handleEdit(selectedData.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(selectedData.id)}
        >
          <Delete color="error" />
        </IconButton>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EyePost.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedData: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
