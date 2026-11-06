// src/utils/imageProps.js
// Thuộc tính dùng chung cho ảnh thumbnail.

// loading="lazy": chỉ tải ảnh khi sắp cuộn tới
// decoding="async": giải mã ảnh ngoài luồng chính, tránh giật khi cuộn
export const thumbImgProps = {
  loading: "lazy",
  decoding: "async",
};
