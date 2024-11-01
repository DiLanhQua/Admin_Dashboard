import { Route } from "react-router-dom";
import { NotFound } from "../pages/error/Error";

export default function ErrorRoute() {
  return (
    <>
      <Route
        path="unauthorized"
        element={
          <NotFound
            errorCode={"401"}
            errorMessage={"Truy cập bị từ chối"}
            errorDes={" Bạn không có quyền truy cập trang này."}
          />
        }
      />
      <Route
        path="*"
        element={
          <NotFound
            errorCode={"404"}
            errorMessage={"Không tìm thấy trang"}
            errorDes={
              "Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm."
            }
          />
        }
      />
    </>
  );
}
