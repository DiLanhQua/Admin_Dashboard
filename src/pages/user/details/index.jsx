import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import formatCurrency from "../../../config/formatCurrency";
import PropTypes from "prop-types";

// Cart Dialog Component
const CartDialog = ({ open, handleClose, items }) => {
  // Calculate total amount for the entire order
  const totalAmount = items?.cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="cart-dialog-title"
    >
      <DialogTitle id="cart-dialog-title">
        Giỏ hàng ({items?.cart?.length || 0} sản phẩm)
      </DialogTitle>
      <DialogContent dividers>
        <div className="container-fluid">
          {/* Header of the cart table */}
          <div className="row font-weight-bold text-muted py-2 border-bottom">
            <div className="col-6">Sản phẩm</div>
            <div className="col-2 text-center">Số lượng</div>
            <div className="col-2 text-center">Giá</div>
            <div className="col-2 text-center">Tổng tiền</div>
          </div>

          {/* Cart items */}
          {items && items.cart.length > 0 ? (
            <>
              {items.cart.map((item) => (
                <div
                  className="row py-3 border-bottom align-items-center"
                  key={item.productName}
                >
                  {/* Product */}
                  <div className="col-6 d-flex align-items-center">
                    <img
                      className="img-fluid rounded mr-3"
                      style={{ width: "70px", height: "70px" }}
                      src={item?.image}
                      alt={item?.productName}
                    />
                    <div className="p-4">
                      <h6 className="font-weight-bold">{item?.productName}</h6>
                      <p className="text-muted mb-0">Màu: {item?.color}</p>
                      <p className="text-muted mb-0">
                        Kích thước: {item?.size}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-2 d-flex justify-content-center">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control text-center"
                        value={item?.quantity}
                        readOnly
                        style={{ width: "40px" }}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-2 text-center">
                    <p className="font-weight-bold mb-0">
                      {formatCurrency(item?.price, "VND", "vi-VN")}
                    </p>
                  </div>

                  {/* Total for each product */}
                  <div className="col-2 text-center">
                    <p className="font-weight-bold mb-0">
                      {formatCurrency(
                        item?.quantity * item?.price,
                        "VND",
                        "vi-VN"
                      )}
                    </p>
                  </div>
                </div>
              ))}

              {/* Total order amount */}
              <div className="row py-3 d-flex">
                {/* Left part */}
                <div className="col-6 text-left px-0">
                  <h5 className="font-weight-bold">Tổng tiền đơn hàng:</h5>
                </div>

                {/* Right part */}
                <div
                  className="col-6 text-right px-0"
                  style={{ textAlign: "right" }}
                >
                  <h4 className="font-weight-bold">
                    {formatCurrency(totalAmount, "VND", "vi-VN")}
                  </h4>
                </div>
              </div>
            </>
          ) : (
            <p>Giỏ hàng của bạn đang trống.</p>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

CartDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  items: PropTypes.object,
  onRemove: PropTypes.func,
  onUpdateQuantity: PropTypes.func,
};

export default CartDialog;
