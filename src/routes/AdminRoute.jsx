// AdminRoute.js
import { Route } from "react-router-dom";
import HomePage from "../pages/home";
import CategoryPage from "../pages/category";
import StaffPage from "../pages/staff";
import AddStaff from "../pages/staff/create";
import History from "../pages/history";
import UserPage from "../pages/user";
import WarehousePage from "../pages/warehouse";
import AddWarehouse from "../pages/warehouse/create";
import ProductPage from "../pages/product";
import VariantForm from "../pages/product/variant/create";
import VariantPage from "../pages/product/variant";
import OrderPage from "../pages/order";
import SiteConfig from "../pages/webconfig";
import PaymentConfig from "../pages/paymentconfig";
import BannerCollection from "../pages/bannercollection";

import PostList from "../pages/post";
import AddPost from "../pages/post/create";
import EditPost from "../pages/post/edit";

import EditStaff from "../pages/staff/edit";
import CouponsList from "../pages/coupons";
import CategoryCreate from "../pages/category/create";
import AddCoupond from "../pages/coupons/create";
import UpdateCoupons from "../pages/coupons/edit";
import CategoryEdit from "../pages/category/edit";
import BrandPage from "../pages/brand";
import CollectionPage from "../pages/collection";
import AddBannerConllection from "../pages/bannercollection/create";
import EditBannerCollection from "../pages/bannercollection/edit";
import CreateProduct from "../pages/product/create";
import EditProduct from "../pages/product/update";
import TagPage from "../pages/tags";
import ShippingPage from "../pages/shippingConfig";
import UserInfo from "../pages/profiles/UserInfo"
import ColorPages from "../pages/color";



const AdminRoute = () => {
  return (
    <>
      {/* Home Page route */}
      <Route index element={<HomePage />} />
      <Route path="history" element={<History />} />
      {/* Profile route */}
      <Route path="profile" element={<UserInfo />} />
      {/* Category Page route */}
      <Route path="category" element={<CategoryPage />} />
      <Route path="category/create" element={<CategoryCreate />} />
      <Route path="category/update/:id" element={<CategoryEdit />} />

      <Route path="page-color" element={<ColorPages />} />


      <Route path="brand" element={<BrandPage />} />

      <Route path="collection" element={<CollectionPage />} />
      {/* Staff Page route */}
      <Route path="staff" element={<StaffPage />} />

      {/* Add Staff Page route */}
      <Route path="staff/edit/:id" element={<EditStaff />} />
      <Route path="staff/create" element={<AddStaff />} />
      {/** route user */}

      <Route path="customer" element={<UserPage />} />
      <Route path="customer/create" element={<UserPage />} />
      {/* kho hàng */}
      <Route path="warehouse" element={<WarehousePage />} />
      {/* Nhập sản phẩm vào kho */}
      <Route path="warehouse/create" element={<AddWarehouse />} />

      {/* product */}
      <Route path="product" element={<ProductPage />} />
      <Route path="product/create" element={<CreateProduct />} />
      <Route path="product/update/:id" element={<EditProduct />} />
      <Route path="product/variant" element={<VariantPage />} />
      <Route path="product/variant/create" element={<VariantForm />} />

      {/* order */}

      <Route path="order" element={<OrderPage />} />
      <Route path="webconfig" element={<SiteConfig />} />
      <Route path="paymentconfig" element={<PaymentConfig />} />
      <Route path="bannercollection" element={<BannerCollection />} />
      <Route
        path="bannercollection/create"
        element={<AddBannerConllection />}
      />
      <Route
        path="bannercollection/edit/:id"
        element={<EditBannerCollection />}
      />
      {/* bài đăng */}
      <Route path="post" element={<PostList />} />
      <Route path="post/create" element={<AddPost />} />
      <Route path="post/edit/:id" element={<EditPost />} />
      {/* Mã giảm giá */}
      <Route path="coupons" element={<CouponsList />} />
      <Route path="coupons/create" element={<AddCoupond />} />
      <Route path="coupons/edit/:id" element={<UpdateCoupons />} />
      <Route path="tags" element={<TagPage />} />
      <Route path="shippingConfig" element={<ShippingPage />} />
    </>
  );
};

export default AdminRoute;
