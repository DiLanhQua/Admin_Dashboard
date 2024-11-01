import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    DialogTitle,
    Typography,
} from "@mui/material";


export default function DetailShipping(
    { open,
        handleClose,
        selectedData,
    }
) {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Chi tiết phương thức giao hàng</DialogTitle>
            <DialogContent>
                {selectedData ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Phương thức giao hàng:</Typography>
                            <Typography variant="body1">{selectedData.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Địa chỉ:</Typography>
                            <Typography variant="body1">{selectedData.address}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Ghi chú:</Typography>
                            <Typography variant="body1">{selectedData.note}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">Không có dữ liệu để hiển thị</Typography>
                )}
            </DialogContent>
        </Dialog>
    );

}
