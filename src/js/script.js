/* --------------------------------------------
 *  ローディングアニメーション
 * -------------------------------------------- */
// クッキー登録
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// クッキーを取得
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2){
      return parts.pop().split(";").shift();
  }else{
      return "";
  }
}
// アニメーション再生
const loadingAnime = document.querySelector('.js-loading');
const body = document.body;
const scrollPosition = window.scrollY;
function playAnimation() {
  if (loadingAnime) {
    body.style.overflow = 'hidden'; // スクロールを禁止
    gsap.ticker.lagSmoothing(false); // 別タブを開いてもアニメーションを止めない
    const openingTL = gsap.timeline();
    openingTL
      .set('.js-header',{yPercent: -100})
      .set('.p-mv__title-wrapper',{clipPath:'inset(100% 0 0 0)'})
      .fromTo('.p-loading__logo',
        {clipPath:'inset(0 100% 0 0)',scale:1.1,autoAlpha:0},
        {clipPath:'inset(0 0% 0 0)',scale:1,autoAlpha:1,duration:3,ease:'power4.out'})
      .to('.p-loading__mask-stripe',{yPercent:'100',duration:2,ease:'power4.out',stagger:.1},'-=.5')
      .to('.p-loading__logo',{autoAlpha:0,duration:1},'<')
      .fromTo('.js-loading-img',
        {scale:1.2,filter:'grayscale(100%)'},
        {scale:1,filter:'grayscale(0%)',duration:2,ease:'power4.out'},'-=1.2')
      .fromTo('.js-loading-text',
        {clipPath:'inset(0 100% 0 0)'},
        {clipPath:'inset(0 0% 0 0)',duration:2,ease:'power4.out'},'<')
      .to('.js-header',{yPercent: 0,duration:3,ease:'power4.out'},'-=.5')
      // .set('.js-loading',{autoAlpha:0},'<')
      .call(animationComplete); // アニメーション終了時にコールバックを呼び出す
  }
}

function animationComplete() {
  // オープニングアニメーションに関わる要素を非表示
  hideAnimation();
  // Swiperを初期化
  initializeSwiper();
  // スクロールを有効にする
  enableScroll();
}
function initializeSwiper() {
  // Swiperの初期化
  const mvSwiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}
function enableScroll() {
  // スクロールを有効にする
  body.style.overflow = 'auto';
  // スクロール位置を元に戻す（任意の位置にスクロールさせない場合はこの行を削除できます）
  window.scrollTo(0, scrollPosition);
}
function hideAnimation() {
  if (loadingAnime) {
    // オープニングアニメーションに関わる要素を非表示
    gsap.set('.js-loading',{autoAlpha:0});
    // Swiperを初期化
    initializeSwiper();
  }
}

// まず最初に読み込まれる所
document.addEventListener("DOMContentLoaded", function() {
  const animationPlayed = getCookie("animationPlayed");
  if (animationPlayed) {
    hideAnimation();
  } else {
    playAnimation();
    setCookie("animationPlayed", "true", 1);
  }
});

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
// const mvSwiper = new Swiper(".js-mv-swiper", {
//   loop: true,
//   effect: "fade",
//   speed: 3000,
//   allowTouchMove: false,
//   autoplay: {
//     delay: 3000,
//   },
// });

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
        end: 'bottom top',
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
/* --------------------------------------------
 *  ハンバーガーメニュー
 * -------------------------------------------- */
$(function() {
  const hamburger = $(".js-hamburger");
  const drawer = $(".js-drawer");

  hamburger.add(drawer).click(function() {
    hamburger.toggleClass("is-active");
    drawer.fadeToggle();

    // ハンバーガーメニューがアクティブな場合のみスクロール禁止
    if (hamburger.hasClass("is-active")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }
  });
});

/* --------------------------------------------
 *  スムーススクロール
 * -------------------------------------------- */
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

/* --------------------------------------------
 *  ページトップボタン
 * -------------------------------------------- */
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

});
