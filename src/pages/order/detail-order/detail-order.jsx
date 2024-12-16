import React, { useState, useEffect } from "react";
import "./detail-order.scss";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSearchParams, useLocation } from "react-router-dom";

export default function DetailOrder({
    open,
    handleClose,
}) {
    const [order, setOrder] = useState({});
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId"); // Lấy giá trị orderId
    const location = useLocation();
    const getOrderById = async () => {
        if (!orderId) return;
        const response = await axios.get(`https://localhost:7048/api/Order/${orderId}`);
        setOrder(response.data);
        caculateTotal(response.data);
    }
    const [tamTinh, setTamTinh] = useState(0);
    const caculateTotal = (data) => {
        let totalItem = 0;
        data.detailOrder?.forEach((item) => {
            totalItem += item.quantity * item.detailProduct.price;
        })
        if (data.voucher) {
            caculateVoucher(data.voucher, data.totalPrice, totalItem * 1000);
        }
        setTamTinh(totalItem * 1000);
    }
    const [voucher, setVoucher] = useState(0);
    const [feeShip, setFeeShip] = useState(0);
    const caculateVoucher = (voucherItem, total, tamTinh) => {
        let voucher1 = 0;
        if (voucherItem.discountType === "Percentage") {
            voucher1 = (tamTinh * voucherItem.discount) / 100;
        }
        else {
            voucher1 = voucherItem.discount * 1000
        }
        setFeeShip(total - (tamTinh - voucher1));
        setVoucher(voucher1);
    }
    const toStringStatus = (status) => {
        switch (status) {
            case 1:
                return "Chờ xử lý";
            case 3:
                return "Đang giao";
            case 4:
                return "Hoàn thành";
            case 5:
                return "Đã hủy"
        }
    }

    const exportOrder = async () => {
        try {
            const response = await axios.get(`https://localhost:7048/api/Order/export-file/${orderId}`);
            if (response.status === 200) {
                alert("Xuất file thành công")
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const setColorStatus = (status) => {
        switch (status) {
            case 1:
                return "#ed6c02";
            case 3:
                return "#0288d1";
            case 4:
                return "#2e7d32";
            case 5:
                return "#f00"
        }
    }
    useEffect(() => {
        getOrderById();
    }, [location])
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
            <DialogTitle>
                Chi tiết đơn hàng
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <div className="detail-order">
                    <div className="detail-order-info">

                        <div className="header">
                            {/* info order */}
                            <div className="header-date">
                                <div className="header-date-code">
                                    <p>Đơn hàng:</p>
                                    <p>#{order.orderCode}</p>
                                </div>
                                <div className="header-date-content">
                                    {order.orderDate}
                                </div>
                            </div>
                            {/* status */}
                            <div className="header-status" style={{ backgroundColor: setColorStatus(order.status) }}>
                                <p>
                                    {toStringStatus(order.status)}
                                </p>
                            </div>
                        </div>
                        {/* info user */}
                        <div className="info-user">
                            <div className="info-user-primary">
                                <div className="content-title">
                                    Khách hàng
                                </div>
                                <div className="content-info">
                                    <p> {order.fullName} </p>
                                    <p> {order.numberPhone} </p>
                                </div>
                            </div>
                            <div className="info-user-delivery">
                                <div className="content-title">
                                    Người nhận
                                </div>
                                <div className="content-info">
                                    <p> {order.fullName} </p>
                                    <p> {order.numberPhone} </p>
                                    <p>{order.address}</p>
                                    <p style={{ color: "red" }} >{order.reason}</p>
                                </div>
                            </div>
                        </div>
                        {/* table */}
                        <div className="info-table">
                            <table>
                                <tr>
                                    <th>#</th>
                                    <th>Sản phẩm</th>
                                    <th>Size</th>
                                    <th>Màu</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Tổng tiền</th>
                                </tr>
                                {order.detailOrder?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="products">
                                                <img src={`https://localhost:7048/${item.product?.medias[0]?.link}`} alt="hình ảnh" />
                                                <p> {item.product.productName} </p>
                                            </div>
                                        </td>
                                        <td>Size {item.detailProduct.size}</td>
                                        <td> {item.colorName} </td>
                                        <td> {item.quantity} </td>
                                        <td> {item.detailProduct.price.toLocaleString("vi-VN")}.000 VND</td>
                                        <td>
                                            <strong>{item.detailProduct.price * item.quantity}.000 VND</strong>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                    {/* Money */}
                    <div className="detail-order-money">
                        <div className="payment-method">
                            <div className="content-title">
                                Phương thức thanh toán
                            </div>
                            <div className="payment-method-content">
                                <p>
                                    {order.paymentMethod}
                                </p>
                            </div>
                        </div>
                        <div className="money">
                            <div className="list">
                                <div className="money-item">
                                    <p>Tạm tính</p>
                                    <p>{(tamTinh ?? 0).toLocaleString("vi-VN")} VND</p>
                                </div>

                                <div className="money-item">
                                    <p>Khuyến mãi</p>
                                    <p className="minius">- {(voucher ?? 0).toLocaleString("vi-VN")} VND</p>
                                </div>

                                <div className="money-item">
                                    <p>Phí vận chuyển</p>
                                    <p className="plus">+ {(feeShip ?? 0).toLocaleString("vi-VN")} VND</p>
                                </div>

                                <div className="money-item">
                                    <p>Thành tiền</p>
                                    <strong>{((tamTinh + feeShip - voucher) ?? 0).toLocaleString("vi-VN")} VND</strong>
                                </div>
                            </div>
                            <div className="money-item need-pay-top">
                                <p>Cần thành toán</p>
                                <p className="need-pay">{((tamTinh + feeShip - voucher) ?? 0).toLocaleString("vi-VN")} VND</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Đóng
                </Button>
                <Button variant="contained" onClick={exportOrder} color="primary">
                    Xuất hóa đơn
                </Button>
            </DialogActions>
        </Dialog>
    )
}
