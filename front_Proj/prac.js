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

// 이 함수는 사용자의 첫번째 글 목록의 텍스트를 가져와서 웹상에 보여줍니다.
window.onload = function () {
  let travelDest = document.querySelectorAll(".travelDestination");
  let travelContent = document.querySelectorAll(".travelContent");
  for (let i = 0; i < travelDest.length; i++) {
    let str = photoText[travelDest[i].innerText][0];
    travelContent[i].innerText = str;
  }
};

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
    autoplaySpeed: 10000, //자동재생시간 10초
    arrows: true,
    dots: true,
  });
}

// 각 여행지 사진에 맞는 텍스트 설정
let photoText = {
  BanKok: ["방콕 2박 3일", "This is Bankok", "왓 아룬 탐방"],
  Japan: ["일본여행 1 - hello Japan", "This is Japan", "Bye Bye"],
  Seoul: ["서울 여행", "한옥 마을 들렀다!", "Bye Bye"],
  USA: ["미국 하와이 해변 간 날", "미국여행 2일차", "Bye Bye"],
  China: ["만리장성은 길다", "This is China", "Bye Bye"],
  Sweden: ["hello Sweden", "This is Sweden", "Bye Bye"],
  Hokkaido: ["일본여행 3 - Hokkaido", "This is Hokkaido", "Bye Bye"],
  Fukuoka: ["일본여행 2 - hello Fukuoka", "This is Fukuoka", "Bye Bye"],
  Germany: ["hello Germany", "This is Germany", "Bye Bye"],
  Swiss: ["hello Swiss", "This is Swiss", "Bye Bye"],
  Canada: ["캐나다 배낭여행 1일차", "캐나다 배낭여행 2일차", "Bye Bye"],
  Brazil: ["hello Brazil", "This is Brazil", "Bye Bye"],
  Mexico: ["멕시코 시티 탐방기", "This is Mexico", "Bye Bye"],
  Czech: ["hello Czech", "This is Czech", "Bye Bye"],
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

// follow 버튼 체인지
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

// 호버 시 차트 띄우는 함수
let chart; // 차트 인스턴스 저장 변수
let chartOpened = false; // 차트가 열려 있는지 여부를 나타내는 변수

function openHoverModal(event) {
  // 차트가 이미 열려 있다면 중복 열림을 방지
  if (chartOpened) {
    return;
  }

  const modal = document.getElementById("Hover-myModal");
  const modalLeft = event.clientX + 20;
  const modalTop = event.clientY;
  modal.style.left = `${modalLeft}px`;
  modal.style.top = `${modalTop}px`;
  modal.style.display = "block";

  // 여기서 sidebar의 클래스를 통해 다른 차트를 생성하도록 로직을 추가합니다.
  const sidebarClass = event.currentTarget.className;
  createChart(sidebarClass);

  chartOpened = true; // 차트가 열려 있는 상태로 변경
}

function createChart(sidebarClass) {
  const ctx = document.getElementById("line-chart").getContext("2d");

  // sidebarClass에 따라 다른 차트 데이터를 생성
  let chartData;
  if (sidebarClass.includes("sidebar1")) {
    chartData = {
      labels: ["100k", "200k", "300k", "400k", "500k"],
      datasets: [
        {
          label: "구독자 수 추이",
          data: [125, 315, 578, 415, 475],
          borderColor: "#FF5733",
          fill: false,
        },
      ],
    };
  } else if (sidebarClass.includes("sidebar2")) {
    chartData = {
      labels: ["10k", "20k", "30k", "40k", "50k"],
      datasets: [
        {
          label: "구독자 수 추이",
          data: [10, 20, 5, 40, 50],
          borderColor: "#33FF57",
          fill: false,
        },
      ],
    };
  } else if (sidebarClass.includes("sidebar3")) {
    chartData = {
      labels: ["100k", "200k", "300k", "400k", "500k"],
      datasets: [
        {
          label: "구독자 수 추이",
          data: [450, 345, 200, 150, 350],
          borderColor: "#5733FF",
          fill: false,
        },
      ],
    };
  }

  chart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: {
      title: {
        display: true,
        text: `구독자 변경 차트`,
      },
    },
  });
}

function closeHoverModal() {
  const modal = document.getElementById("Hover-myModal");
  modal.style.display = "none";

  // 차트 인스턴스 파기
  if (chart) {
    chart.destroy();
  }

  chartOpened = false; // 차트가 닫혔으므로 상태 변경
}

// 호버 영역을 벗어날 때 차트 닫기
document
  .getElementById("Hover-myModal")
  .addEventListener("mouseleave", closeHoverModal);

// 각 sidebar에 이벤트 리스너 추가
const sidebars = document.querySelectorAll(".sidebar1, .sidebar2, .sidebar3");
sidebars.forEach((sidebar) => {
  sidebar.addEventListener("mouseover", openHoverModal);
});

// 상단바 로그인 성공시
const appendMypageButton = (mypageButton, node) => {
  mypageButton = document.createElement('li');
  mypageButton.setAttribute("class", 'nav-item');
  mypageButton.innerHTML = `<a class="nav-link active" style="color: black;" href="../mypage_card.html">Mypage</a>`
  node.after(mypageButton);
}
const appendWriteButton = (writeButton, node) => {
  writeButton = document.createElement('li');
  writeButton.setAttribute("class", 'nav-item');
  writeButton.innerHTML = `<a class="nav-link active" style="color: black;" href="../planning.html">글작성하기</a>`
  node.after(writeButton);
}

const appendUserNameDisplay = (userNameDisplay, name) => {
  userNameDisplay = document.createElement('p')
  userNameDisplay.innerHTML = `<p class="nav-link active" style="color: black;" >${name}님</p>`
  document.querySelector("#userInfo").append(userNameDisplay);
}

const setLoginOutButton = (button) => {
  button.textContent = '로그아웃';
  button.removeAttribute("data-toggle");
  button.removeAttribute("data-target");
  button.setAttribute("onclick", "localStorage.removeItem('loggedIn'); location.href = '../index.html'");
}

let name = localStorage.getItem('loggedIn');
if (name){
let node = document.querySelector("#pointNode");
  let mypageButton;
  let writeButton;
  let userNameDisplay;
  setLoginOutButton(document.querySelector("#loginOut"));
  appendUserNameDisplay(userNameDisplay, name);
  appendMypageButton(mypageButton, node);
  appendWriteButton(writeButton, node);
}