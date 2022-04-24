// ------Animation Product-----------
VanillaTilt.init(document.querySelectorAll(".product-item"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 1,
});
// ------------scroll menu-----------
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});
// -----------show model-------------
function showLogin() {
  var login = document.getElementById("model");
  login.classList.remove("showRegistration");
  login.classList.toggle("showLogin");
}
function showCart() {
  var cart = document.getElementById("model");
  cart.classList.toggle("showCart");
}
function showRegistration() {
  var regis = document.getElementById("model");
  regis.classList.toggle("showRegistration");
  regis.classList.remove("showLogin");
}
function remove() {
  var remove = document.getElementById("model");
  remove.classList.remove("showRegistration");
  remove.classList.remove("showLogin");
  remove.classList.remove("showCart");
}
// -----------slide show--------------
var slides = document.querySelectorAll(".slide");
var btos = document.querySelectorAll(".bto");
let currentSlider = 1;

var manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    btos.forEach((bto) => {
      bto.classList.remove("active");
    });
  });
  slides[manual].classList.add("active");
  btos[manual].classList.add("active");
};
btos.forEach((bto, i) => {
  bto.addEventListener("click", () => {
    manualNav(i);
    currentSlider = i;
  });
});
// autoplay slides
function repeat() {
  let active = document.getElementsByClassName("active");
  let i = 1;

  var repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active");
      });
      slides[i].classList.add("active");
      btos[i].classList.add("active");
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 5000);
  };
  repeater();
}
repeat();

function add_cart(av) {
  let str = "";
  let x = document.getElementById("cart-items");
  productList.forEach((item) => {
    if (item.id == av && item.quantity == 0) {
      item.quantity++;
      str += `<div id="${item.id}" class="sp">
      <img class="cart-column" src="${item.img}" alt="" />
      <div class="name-pro">${item.name_pro}</div>
      <div id="cart-price-${av}" class="cart-price cart-column">${item.pice} $</div>
      <div class="cart_qty">
      <span id="min-${av}" class="qty-none qty-crease" onclick="dis_cart(${av})">-</span>
      <span class="qty-input" id="quantity-${av}">${item.quantity}</span>
      <span id="max-${av}" class="qty-crease" onclick="add_cart(${av})">+</span>
      </div>
      <button onclick="remove_cart('${av}')">Xóa</button>
      </div>
      `;
      x.innerHTML += str;
    } else if (item.id == av && item.quantity > 0) {
      item.quantity++;
      let j = document.getElementById(`quantity-${av}`);
      let cs = document.getElementById(`min-${av}`);
      j.innerHTML = item.quantity;
      cs.classList.remove("qty-none");
      if (item.quantity == 5) {
        let cs = document.getElementById(`max-${av}`);
        cs.classList.add("qty-none");
      }
      let updatePrice = document.getElementById(`cart-price-${av}`);
      updatePrice.innerText = item.pice * item.quantity + " $";
    }
  });
  let jhm = document.querySelector("span.jhm");
  sumCart++;
  jhm.innerHTML = sumCart;
  update_total_price();
}
function dis_cart(id) {
  let j = document.getElementById(`quantity-${id}`);
  let updatePrice = document.getElementById(`cart-price-${id}`);
  productList.forEach((item) => {
    if (item.id == id && item.quantity > 2) {
      item.quantity--;
      let cs = document.getElementById(`max-${id}`);
      j.innerHTML = item.quantity;
      cs.classList.remove("qty-none");
      updatePrice.innerText = item.pice * item.quantity + " $";
    } else if (item.id == id && item.quantity == 2) {
      item.quantity--;
      let cs = document.getElementById(`min-${id}`);
      j.innerHTML = item.quantity;
      cs.classList.add("qty-none");
      updatePrice.innerText = item.pice * item.quantity + " $";
    }
  });
  let jhm = document.querySelector("span.jhm");
  sumCart--;
  jhm.innerHTML = sumCart;
  update_total_price();
}
function remove_cart(id) {
  let x = document.getElementById(id);
  let inpe = document.getElementById(`quantity-${id}`);
  let jhm = document.querySelector("span.jhm");
  productList.forEach((item) => {
    if (item.id == id) {
      x.remove();
      item.quantity = 0;
      sumCart -= parseInt(inpe.innerText);
      jhm.innerHTML = sumCart;
    }
  });
  update_total_price();
}
function update_total_price() {
  let totalPrice = 0;
  qty = document.querySelectorAll(".cart-price");
  cat = document.getElementById("cart-total-price");
  qty.forEach((element) => {
    totalPrice += parseInt(element.innerText);
  });
  cat.innerText = totalPrice + " $";
}
// ======================= form validate ============================
document.addEventListener("DOMContentLoaded", function () {
  Validator({
    form: "#form-registration",
    formGroupSelector: ".input-box",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#fullname", "Vui lòng nhập tên đầy đủ của bạn"),
      Validator.isEmail("#email", "Vui lòng nhập đúng email"),
      Validator.minLength("#password", 6, 32),
      Validator.isRequired(
        "#password_confirmation",
        "Vui lòng nhập lại mật khẩu"
      ),
      Validator.isRequired("input[name='gender']", "Vui lòng chọn giới tính"),
      Validator.isConfirmed(
        "#password_confirmation",
        function () {
          return document.querySelector("#form-registration #password").value;
        },
        "Mật khẩu nhập lại không chính xác"
      ),
      Validator.isRequired("#number_phone", "Vui lòng nhập số điện thoại"),
      Validator.isRequired("#accuracy", "Vui lòng nhập mã xác thực"),
    ],
  });

  Validator({
    form: "#form-login",
    formGroupSelector: ".input-box",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#user-name", "Vui lòng nhập tên đăng nhập"),
      Validator.minLength("#password_login", 6, 32),
    ],
  });
});
