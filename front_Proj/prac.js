document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".swiper-container", {
    slidesPerView: 4,
    slidesPerGroup: 4,
    observer: true,
    observeParents: true,
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // 사진 요소의 각 넓이는 스크롤뷰에 몇개가 보일것인지 수정해야함.
      // 아래와 같이 2개로 보이게끔
      1280: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 75,
      },
      720: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      360: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 25,
      },
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 25,
      },
    },
    // 박스 간격설정
    // spaceBetween: 100,
  });
});

function closeModal() {
  document.getElementById("myModal").style.display = "none"; // 모달 닫기
}

let destinationText;

function openModal(event) {
  document.getElementById("myModal").style.display = "block"; // 모달 열기
  let destination;

  const slide = event.target.closest(".swiper-slide");
  if (slide) {
    destination = slide.querySelector(".travelDestination");
    if (destination) {
      destinationText = destination.innerText;
      console.log(destinationText); // 클릭된 위치의 오브젝트 가져온다음 여행지 문자열만 꺼냄
    }
  }
  // 슬라이더가 초기화되었는지 확인
  const slickContent = $(".slick-content");
  if (slickContent.hasClass("slick-initialized")) {
    // 초기화되었다면 제거
    slickContent.slick("unslick");
  }
  initSlickSlider(); //모달 창이 열릴 때 슬라이더 초기화

  updateSlickSlider(destinationText); //이미지를 슬라이더에 넣는 함수
}

// Slick 슬라이더 초기화 함수
function initSlickSlider() {
  $(".slick-content").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, //자동재생시간 5초
    arrows: true,
    dots: true,
  });
}

let photoText = {
  Bankok: ["hello Bankok", "This is Bankok", "Bye Bye"],
  Japan: ["hello Japan", "This is Japan", "Bye Bye"],
  Seoul: ["hello Seoul", "This is Seoul", "Bye Bye"],
  USA: ["hello USA", "This is USA", "Bye Bye"],
};
function updateSlickSlider(destinationText) {
  let slickContainer = $(".slick-container");

  for (let i = 1; i < 4; i++) {
    let imgSrc = `/front_Proj/front_Proj_img/${destinationText}/${destinationText}${i}.png`;
    let text = document.querySelector(`.Photo_text #tx${i}`);
    text.innerText = photoText[destinationText][i - 1];
    slickContainer.find(`.slick-img${i} img`).attr("src", imgSrc);
  }
}
