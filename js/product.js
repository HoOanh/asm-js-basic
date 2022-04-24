var product_list = [
  {
    id: 1,
    name_pro: "Tên sản phẩm 1",
    img: "images/product/product_1.png",
    pice: 100000,
    quantity: 0,
  },
  {
    id: 2,
    name_pro: "Tên sản phẩm 2",
    img: "images/product/product_2.png",
    pice: 30000,
    quantity: 0,
  },
  {
    id: 3,
    name_pro: "Tên sản phẩm 3",
    img: "images/product/product_3.png",
    pice: 500000,
    quantity: 0,
  },
  {
    id: 4,
    name_pro: "Tên sản phẩm 4",
    img: "images/product/product_4.png",
    pice: 20000,
    quantity: 0,
  },
];
// ------------------Lưu Dữ liệu lên local----------------------
const product = JSON.stringify(product_list);
localStorage.setItem("productList", product);
// --------------------Lấy dữ liệu----------------------
const productList = JSON.parse(localStorage.getItem("productList"));
// --------------------Thêm sản phẩm ----------------------
function add_product() {
  var pro = document.getElementById("wp_product");
  var str = "";
  productList.forEach((item) => {
    str += `<div class="product-list">
    <div class="post-product">
      <img src="${item.img}" alt="" />
      <div class="wishlist-box">
        <div>
          <p onclick="add_cart('${item.id}')" title="Thêm giỏ hàng"
            ><i class="fa fa-cart-plus"></i
          ></p>
          <a href="404.html" title="Chi tiết"
            ><i class="fa fa-info-circle"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="detail">
    <div class="name"><a href="#">${item.name_pro}</a></div>
    <div class="price">${item.pice} $</div>
    </div>
  </div>`;
  });
  pro.innerHTML += str;
}
let sumCart = 0;
