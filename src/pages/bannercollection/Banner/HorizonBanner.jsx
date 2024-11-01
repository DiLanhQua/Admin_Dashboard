import { Link } from "react-router-dom";
import "./HorizonBanner.css";

export const HorizonBanner = () => {
  return (
    <div className="horizontal-banner py-3">
      <Link to="/chao-mung-nam-hoc-moi">
        <img
          src="https://cdn2.cellphones.com.vn/insecure/rs:fill:1200:75/q:90/plain/https://dashboard.cellphones.com.vn/storage/b2s-update-19-06%20(1).gif"
          alt="chao-mung-nam-hoc-moi"
          id="desktop"
        />
      </Link>
    </div>
  );
};
