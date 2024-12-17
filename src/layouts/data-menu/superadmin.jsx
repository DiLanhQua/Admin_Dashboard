const storedUserInfo = localStorage.getItem("userInfo");
let role = null;

if (storedUserInfo) {
  try {
    const userInfo = JSON.parse(storedUserInfo); // Chỉ parse khi dữ liệu không rỗng
    role = userInfo.role || null;
  } catch (error) {
  }
}

const menuItems = {
  items: [
    {
      id: "navigation",
      title: "Bảng điều khiển",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Quản lý",
          type: "item",
          icon: "feather icon-home",
          url: "/dashboard",
        },
        {
          id: "categories",
          title: "Danh mục",
          type: "collapse",
          icon: "feather icon-list",
          children: [
            {
              id: "category-list",
              title: "Danh sách danh mục",
              type: "item",
              url: "/dashboard/category",
            },
            {
              id: "add-category",
              title: "Thêm danh mục",
              type: "item",
              url: "/dashboard/category/create",
            },
          ],
        },
        {
          id: "brands",
          title: "Thương hiệu & Màu",
          type: "collapse",
          icon: "feather icon-award",
          children: [
            {
              id: "color-list",
              title: "Danh sách màu",
              type: "item",
              url: "/dashboard/page-color",
            },
            {
              id: "brand-list",
              title: "Danh sách thương hiệu",
              type: "item",
              url: "/dashboard/brand",
            },
          ],
        },
        {
          id: "products",
          title: "Sản phẩm",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "product-list",
              title: "Danh sách sản phẩm",
              type: "item",
              url: "/dashboard/product",
            },
            {
              id: "add-product",
              title: "Thêm sản phẩm",
              type: "item",
              url: "/dashboard/product/create",
            },
          ],
        },
        {
          id: "orders",
          title: "Đơn hàng",
          type: "collapse",
          icon: "feather icon-server",
          children: [
            {
              id: "all-orders",
              title: "Tất cả đơn hàng",
              type: "item",
              url: "/dashboard/order",
            },
          ],
        },
        ...(role !== 1
          ? [
              {
                id: "personnel",
                title: "Nhân viên",
                type: "collapse",
                icon: "feather icon-user",
                children: [
                  {
                    id: "add-personnel",
                    title: "Thêm nhân viên",
                    type: "item",
                    url: "/dashboard/staff/create",
                  },
                  {
                    id: "personnel-list",
                    title: "Danh sách nhân viên",
                    type: "item",
                    url: "/dashboard/staff",
                  },
                ],
              },
            ]
          : []),
        {
          id: "customers",
          title: "Khách hàng",
          type: "collapse",
          icon: "feather icon-users",
          children: [
            {
              id: "all-customers",
              title: "Tất cả khách hàng",
              type: "item",
              url: "/dashboard/customer",
            },
          ],
        },
        {
          id: "coupons",
          title: "Mã giảm giá",
          type: "item",
          icon: "feather icon-tag",
          url: "/dashboard/coupons",
        },
        {
          id: "Post",
          title: "Bài đăng",
          type: "collapse",
          icon: "feather icon-file-text",
          children: [
            {
              id: "post-list",
              title: "Danh sách bài đăng",
              type: "item",
              url: "/dashboard/post",
            },
            {
              id: "add-blog",
              title: "Thêm bài viết",
              type: "item",
              url: "/dashboard/post/create",
            },
          ],
        },
        {
          id: "history",
          title: "Lịch sử Thao tác",
          type: "item",
          icon: "feather icon-clock",
          url: "/dashboard/history",
        },
      ],
    },
  ],
};

export default menuItems;
