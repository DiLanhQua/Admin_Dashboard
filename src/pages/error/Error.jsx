/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const NotFound = ({ errorCode, errorMessage, errorDes }) => {
  return (
    <main className="d-flex min-vh-100 align-items-center justify-content-center bg-white px-3 py-5">
      <div className="text-center">
        <p className="display-1 fw-bold text-primary">
          {errorCode && errorCode}
        </p>
        <h1 className="mt-3 display-4 fw-bold text-dark">
          {errorMessage && errorMessage}
        </h1>
        <p className="mt-4 lead text-muted">{errorDes && errorDes}</p>
        <div className="mt-5 d-flex justify-content-center gap-3">
          <Link
            to="/dashboard"
            className="btn btn-primary px-4 py-2 fw-semibold"
          >
            Về Trang Chủ
          </Link>
        </div>
      </div>
    </main>
  );
};
