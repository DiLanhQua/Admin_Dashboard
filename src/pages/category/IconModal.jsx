import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Stack, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import Iconify from "./Iconify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 1,
};

export default function IconModal({ open, onClose, onSubmit }) {
  const [icons, setIcons] = React.useState([]);
  const debouncedFetchIcons = React.useMemo(
    () =>
      debounce((value) => {
        fetch(`https://api.iconify.design/search?query=${value}`)
          .then((response) => response.json())
          .then((data) => {
            setIcons(data.icons);
          });
      }, 300),
    []
  );

  const handleChange = React.useCallback(
    (value) => {
      debouncedFetchIcons(value);
    },
    [debouncedFetchIcons]
  );

  const handleInputChange = (e) => {
    handleChange(e.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="icon-modal-title"
        aria-describedby="icon-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <Typography variant="h6" component="h2" mb={3}>
            Tìm kiếm icon
          </Typography>
          <TextField fullWidth label="Icon" onChange={handleInputChange} />
          <Stack
            direction="row"
            sx={{
              maxHeight: 300,
              overflow: "auto",
            }}
            flexWrap="wrap"
            mt={2}
          >
            {icons ? (
              icons.map((icon) => (
                <Box
                  key={icon}
                  sx={{
                    cursor: "pointer",
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ":hover": {
                      bgcolor: "grey.200",
                      borderRadius: "50%",
                    },
                  }}
                  onClick={() => onSubmit(icon)}
                >
                  <Iconify icon={icon} />
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Không tìm thấy icon
              </Typography>
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
IconModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
