/* --------------------------------------------
 *  ページ遷移
 * -------------------------------------------- */
window.addEventListener('load', function() {
  const body = document.querySelector('body');
  body.classList.add('is-active');
});

/* --------------------------------------------
 *  swiper
 * -------------------------------------------- */
const mvSwiper = new Swiper(".js-mv-swiper", {
  loop: true,
  effect: "fade",
  speed: 3000,
  allowTouchMove: false,
  autoplay: {
    delay: 3000,
  },
});

const gallerySwiper = new Swiper(".js-gallery-swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 40,
  speed: 6000,
  allowTouchMove: false,
  autoplay: {
      delay: 0,
    },
});

/* --------------------------------------------
 *  parallax
 * -------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
  const parallaxElement = document.querySelector('.js-parallax'); // .js-parallax要素を選択

  if (parallaxElement) {
    // .js-parallax要素が存在する場合にのみ実行
    gsap.to('.c-parallax__img', {
      yPercent: -40,
      scrollTrigger: {
        trigger: '.js-parallax',
        start: 'top bottom',
        end: 'bottom top', // headerHeightの値を使うために変数を展開
        endTrigger: '.js-parallax',
        scrub: 0.5,
      },
    });
  }
});

jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

// ハンバーガーメニュー
$(".js-hamburger,.js-drawer").click(function () {
  $(".js-hamburger").toggleClass("is-active");
  $(".js-drawer").fadeToggle();
});

// ヘッダーの高さ分だけコンテンツを下げる
// $(function () {
//   var height = $(".js-header").height();
//   $("main").css("margin-top", height);
// });

$(document).ready(function () {
  // ヘッダーの高さ取得
  const headerHeight = $(".js-header").height();
  // ページ内リンクがクリックされたときの処理
  $('a[href^="#"]').click(function (e) {
    const speed = 700;
    const href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    // ヘッダーの高さ分下げる
    const position = target.offset().top - headerHeight;
    // ページ内スクロールアニメーション
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    // ページ遷移をキャンセル
    e.preventDefault();
    // URLにアンカーを追加（ブラウザの履歴に記録される）
    history.pushState(null, null, href);
  });
  // ページ読み込み時にURLのアンカーがある場合の処理
  const hash = window.location.hash;
  if (hash && $(hash).length) {
    const position = $(hash).offset().top - headerHeight;
    $("body,html").animate({ scrollTop: position }, 700, "swing");
  }
});

});
