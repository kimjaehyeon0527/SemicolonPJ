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

  const slide = event.target.closest(".swiper-slide"); //closet을 통해 부모 클래스 찾기
  if (slide) {
    destination = slide.querySelector(".travelDestination");
    if (destination) {
      destinationText = destination.innerText;
      console.log(destinationText); // 클릭된 위치의 오브젝트 가져온다음 여행지 문자열만 꺼냄
    }
    userContent = slide.closest("[class^='userContent']"); //클릭된 위치의 userClassName을 가져옴 -> 모달창에서의 유저 프로필 변경을 위함
    if (userContent) {
      console.log(userContent.className);
    }
  }
  // 슬라이더가 초기화되었는지 확인
  const slickContent = $(".slick-content");
  if (slickContent.hasClass("slick-initialized")) {
    // 초기화되었다면 제거
    slickContent.slick("unslick");
  }

  //
  const slickText = $(".slickText");
  if (slickText.hasClass("slick-initialized")) {
    // 초기화되었다면 제거
    slickText.slick("unslick");
  }
  initSlickSlider(); //모달 창이 열릴 때 슬라이더 초기화

  updateSlickImg(destinationText); //슬라이더 이미지 변경
  changeModalProfile(userContent.className); //모달 프로필 변경
}

// Slick 슬라이더 초기화 함수
function initSlickSlider() {
  $(".slick-content").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, //자동재생시간 3초
    arrows: true,
    dots: true,
  });
}

let photoText = {
  BanKok: ["hello Bankok", "This is Bankok", "Bye Bye"],
  Japan: ["hello Japan", "This is Japan", "Bye Bye"],
  Seoul: ["hello Seoul", "This is Seoul", "Bye Bye"],
  USA: ["hello USA", "This is USA", "Bye Bye"],
};

// 각 여행지마다 다른 이미지를 모달창에 삽입
function updateSlickImg(destinationText) {
  let slickContainer = $(".slick-container");
  let text = document.querySelector(".slickText > p");
  text.innerText = photoText[destinationText][0];

  for (let i = 1; i < 4; i++) {
    let imgSrc = `/front_Proj/front_Proj_img/${destinationText}/${destinationText}${i}.png`;

    slickContainer.find(`.slick-img${i} img`).attr("src", imgSrc);
  }
}

// 슬라이드 변경 시 이벤트 띄워서 currentSlide 인덱스로 접근한 뒤, 설정되어있는 photoText로 변경
$(".slick-content").on("afterChange", function (event, slick, currentSlide) {
  console.log("슬라이드 변경됨! 현재 슬라이드 인덱스:", currentSlide);
  let text = document.querySelector(".slickText > p");
  text.innerText = photoText[destinationText][currentSlide];
});

function changefollowBtn() {
  let button = document.querySelector(".modal-followBtn");
  let text = button.innerText;

  if (text == "follow") {
    button.innerText = "unfollow";
  } else if (text == "unfollow") {
    button.innerText = "follow";
  }
}

// 모달창 프로필 수정
function changeModalProfile(userContentString) {
  let lastWord = userContentString.charAt(userContentString.length - 1);
  let profileCircle = document.querySelector(".modal-profile-circle2");
  let modalProfileName = document.querySelector(".modal-profile-name");

  let sidebar = document.querySelector(`.sidebar${lastWord}`);
  let profileName = sidebar.querySelector(".mainText");

  let newImageUrl = `front_Proj_img/profile${lastWord}.jpg`;

  profileCircle.style.backgroundImage = `url(${newImageUrl})`; //이미지 변경
  modalProfileName.innerText = profileName.innerText; //이름 변경
}

// 호버 시 모달창
function openHoverModal(content, event) {
  // 모달 창 열기
  const modal = document.getElementById("Hover-myModal");
  modal.style.display = "block";

  // 클릭된 사이드바의 내용을 모달에 표시
  document.getElementById("modalContent").innerText = content;

  // 마우스 위치에서 우측으로 20px 떨어진 위치에 모달 표시
  const modalLeft = event.clientX + 20;
  const modalTop = event.clientY;
  modal.style.left = `${modalLeft}px`;
  modal.style.top = `${modalTop}px`;
}

function closeHoverModal() {
  // 모달 창 닫기
  document.getElementById("Hover-myModal").style.display = "none";
}
