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

/* --------------------------------------------
 *  モーダル
 * -------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const open = document.querySelectorAll(".js-modal-open");
  const close = document.querySelectorAll(".js-modal-close");
  const modal = document.querySelector(".js-modal");

  // 開くボタンをクリックしたら
  open.forEach(function (button) {
    button.addEventListener("click", function () {
      modal.classList.add("is-open");
      // 背景を固定してスクロールさせない
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    });
  });

  // 閉じるボタンまたはモーダルをクリックしたらモーダルを閉じる
  close.forEach(function (button) {
    button.addEventListener("click", function () {
      modal.classList.remove("is-open");
      // 背景の固定を解除する
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    });
  });
});


jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
// ハンバーガーメニュー
$(".js-hamburger,.js-drawer").click(function () {
  $(".js-hamburger").toggleClass("is-active");
  $(".js-drawer").fadeToggle();
});


$(document).ready(function () {
  // ヘッダーの高さ取得
  const headerHeight = $(".js-header").height();
  // ページ内リンクがクリックされたときの処理
  $('a[href^="#"]').click(function (e) {
    const speed = 700;
    const href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    // ヘッダーの高さ分下げる
    const position = target.offset().top - headerHeight - 20;
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
    const position = $(hash).offset().top - headerHeight - 20;
    $("body,html").animate({ scrollTop: position }, 700, "swing");
  }
});

//  ページトップボタン
$(function() {
  // 変数にクラスを入れる
  var btn = $('.js-page-top');

  //スクロールしてページトップから100に達したらボタンを表示
  $(window).on('load scroll', function(){
    if($(this).scrollTop() > 100) {
      btn.addClass('is-active');
    }else{
      btn.removeClass('is-active');
    }
  });

  //フッターの手前でボタンを止める
  $(window).on('load scroll', function(){
    var height = $(document).height(), //ドキュメントの高さ
        position = window.innerHeight + $(window).scrollTop(), //ページトップから現在地までの高さ
        footer = $('footer').height(); //フッターの高さ
    if ( height - position  < footer ){
      btn.addClass('is-none');
    } else {
      btn.removeClass('is-none');
    }
  });

  //スクロールしてトップへ戻る
  btn.on('click',function () {
    $('body,html').animate({
      scrollTop: 0
    });
  });
});

// モーダル
// $(function() {
//   const open = $(".js-modal-open"),
//     close = $(".js-modal-close"),
//     modal = $(".js-modal");

//   //開くボタンをクリックしたら
//   open.on("click", function () {
//     modal.addClass("is-open");
//     // 背景を固定してスクロールさせない
//     $('html, body').css('overflow', 'hidden');
//   });

//   //閉じるボタンをクリックしたらモーダルを閉じる
//   close.add(modal).on("click", function () {
//     modal.removeClass("is-open");
//     // 背景の固定を解除する
//     $('html, body').removeAttr('style');
//   });
// });


});
