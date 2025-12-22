export const baseUrl = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgotPassword: {
    url: "/api/user/forget-password",
    method: "put",
  },
  VerifyOtp: {
    url: "/api/user/verify-forget-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  userLogout: {
    url: "/api/user/logout",
    method: "get",
  },
  userAvatarUpload: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  userUpdateDetails: {
    url: "/api/user/update-user",
    method: "put",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "/api/file/upload-image",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get-category",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update-category",
    method: "put",
  },
  deleteCateGory: {
    url: "/api/category/delete-category",
    method: "delete",
  },
  addSubCategory: {
    url: "/api/subCategory/upload-subCategory",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subCategory/get-subCategory",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/subCategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subCategory/delete",
    method: "delete",
  },
  createProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "post",
  },
  getProductByCategory: {
    url: "/api/product/get-product-by-category",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-pruduct-by-category-and-subcategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "post",
  },
  updateProductDetails: {
    url: "/api/product/update-product-details",
    method: "put",
  },
  deleteProduct: {
    url: "/api/product/delete-product",
    method: "delete",
  },
  searchProduct: {
    url: "/api/product/search-product",
    method: "post",
  },
  addTocart: {
    url: "/api/cart/create",
    method: "post",
  },
  getCartItem: {
    url: "/api/cart/get",
    method: "get",
  },
  updateCartItemQty: {
    url: "/api/cart/update-qty",
    method: "put",
  },
  deleteCartItem: {
    url: "/api/cart/delete-cart-item",
    method: "delete",
  },
  createAddress: {
    url: "/api/address/create",
    method: "post",
  },
  getAddress: {
    url: "/api/address/get",
    method: "get",
  },
  updateAddress: {
    url: "/api/address/update",
    method: "put",
  },
  disableAddress: {
    url: "/api/address/disable",
    method: "delete",
  },
  CashOnDeliveryOrder: {
    url: "/api/order/cash-on-delivery",
    method: "post",
  },
  payment_url: {
    url: "/api/order/checkout",
    method: "post",
  },
  getOrderItems: {
    url: "/api/order/order-list",
    method: "get",
  },
};

export default SummaryApi;