import "./style.css";

export default function Loading() {
  return (
    <div className="loader-wrapper">
      <div className="cube-loader">
        <div className="cube cube1"></div>
        <div className="cube cube2"></div>
        <div className="cube cube3"></div>
        <div className="cube cube4"></div>
      </div>
      <h6 className="py-2">Đang tải dữ liệu bạn chờ xíu nha</h6>
    </div>
  );
}
