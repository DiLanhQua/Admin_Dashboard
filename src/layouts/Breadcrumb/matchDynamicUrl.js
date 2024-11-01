const matchDynamicUrl = (url) => {
  const dynamicUrls = [
    {
      pattern: /^\/dashboard\/category\/update\/[^/]+$/,
      title: "Cập nhật danh mục",
    },
    {
      pattern: /^\/dashboard\/product\/update\/[^/]+$/,
      title: "Cập nhật sản phẩm",
    },
    {
      pattern: /^\/dashboard\/staff\/edit\/[^/]+$/,
      title: "Cập nhật nhân viên",
    },
    {
      pattern: /^\/dashboard\/coupons\/edit\/[^/]+$/,
      title: "Cập nhật mã giảm giá",
    },
    {
      pattern: /^\/dashboard\/bannercollection\/edit\/[^/]+$/,
      title: "Cập nhật bộ sưu tập banner",
    },
    {
      pattern: /^\/dashboard\/post\/edit\/[^/]+$/,
      title: "Cập nhật bài viết",
    },
  ];

  for (const { pattern, title } of dynamicUrls) {
    if (pattern.test(url)) {
      return title;
    }
  }

  return null;
};

export default matchDynamicUrl;
