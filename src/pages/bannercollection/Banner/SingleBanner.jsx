import { Link } from "react-router-dom";

export const SingleBanner = () => {
  const banners = [
    {
      id: 1,
      ref: "/products",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-gia-moi-right-banner-30-8-2024.png",
    },
    {
      id: 2,
      ref: "/products",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-gia-moi-right-banner-30-8-2024.png",
    },
    {
      id: 3,
      ref: "/products",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-gia-moi-right-banner-30-8-2024.png",
    },
  ];
  return (
    <div className=" grid grid-rows-3 w-full h-full gap-3 bg-whiteColor">
      {banners.map((banner, index) => (
        <div className="w-full drop-shadow-main" key={index}>
          <Link to={banner.ref}>
            <img
              key={banner.id}
              src={banner.image}
              alt="banner"
              className="w-full h-full object-fill"
              style={{ aspectRatio: "auto 690 / 300" }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
