$(function () {
  $(".js-btn").on("click", function () {
    // js-btnクラスをクリックすると、
    $(".l-header__nav, .c-hamburger__line").toggleClass("open"); // メニューとバーガーの線にopenクラスをつけ外しする
  });

  $(".l-header__nav a").on("click", function () {
    $(".l-header__nav, .c-hamburger__line").removeClass("open");
  });
});

// toggle
$(function () {
  $(".c-toggle__header").click(function () {
    $(this).toggleClass("selected");
    $(this).next().slideToggle();
  });
});

// c-accordion
const buttons = document.querySelectorAll(".c-accordion button");

function openSection(btn) {
  const content = btn.nextElementSibling;
  // いったん auto 計測用に解除
  content.style.maxHeight = "none";
  const target = content.scrollHeight; // 現在の実高さ
  content.style.maxHeight = "0px"; // いったん0に戻してから
  // 次フレームで目標値へ（トランジション発火）
  requestAnimationFrame(() => {
    content.style.maxHeight = target + "px";
    content.style.opacity = "1";
    btn.setAttribute("aria-expanded", "true");
  });
}

function closeSection(btn) {
  const content = btn.nextElementSibling;
  // 今の高さを起点にして 0 へ縮める
  const current = content.scrollHeight;
  content.style.maxHeight = current + "px";
  // 次フレームで0に
  requestAnimationFrame(() => {
    content.style.maxHeight = "0px";
    content.style.opacity = "0";
    btn.setAttribute("aria-expanded", "false");
  });
}

buttons.forEach((btn, index) => {
  btn.setAttribute("id", `c-accordion-button-${index + 1}`);
  btn.setAttribute(
    "aria-expanded",
    btn.getAttribute("aria-expanded") || "false"
  );

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeSection(btn); // ← 上にスライドしながら閉じる
    } else {
      openSection(btn); // ← 下にスライドしながら開く
    }
  });
});

// ウィンドウ幅が変わった時、開いている項目の高さを再計算
window.addEventListener("resize", () => {
  buttons.forEach((btn) => {
    if (btn.getAttribute("aria-expanded") === "true") {
      const content = btn.nextElementSibling;
      content.style.maxHeight = "none";
      const target = content.scrollHeight;
      content.style.maxHeight = target + "px";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".l-header");
  const logoImg = header.querySelector(".l-header__logo img");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header.classList.add("is-scrolled");
      logoImg.setAttribute("src", "images/header/logo-black.svg");
    } else {
      header.classList.remove("is-scrolled");
      logoImg.setAttribute("src", "images/header/logo.svg");
    }
  });
});
