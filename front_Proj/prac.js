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

  // 아래는 모달창을 켰을 때 팔로우 버튼 설정 -> 팔로우가 이미 되어있는지 체크함
  let followBtn = document.querySelector(".modal-followBtn");
  if (!isfollow.includes(destinationText)) {
    followBtn.innerText = "follow";
  } else {
    followBtn.innerText = "Unfollow";
  }

  console.log(isfollow);
}

let isfollow = []; // 클릭된 여행지가 follow가 되어있을 때 저장 배열
function changefollowBtn() {
  let followBtn = document.querySelector(".modal-followBtn");
  let countBasket = document.querySelector(".baksetItemNumber span"); //follow 버튼 클릭 시 isfollow 배열의 길이를 체크해서 아이템의 개수 체크

  if (!isfollow.includes(destinationText)) {
    isfollow.push(destinationText); //follow가 아닌데 클릭됐다면 isfollow에 저장시켜야함
    followBtn.innerText = "unfollow"; //즉시 문자열 수정

    // sweet alert 띄워서 팔로우 메시지 출력
    swal({
      icon: "success",
      text: "팔로우 되었습니다.",
    });
  } else {
    isfollow.pop();
    followBtn.innerText = "follow";

    // sweet alert 띄워서 팔로우 메시지 출력
    swal({
      text: "언팔로우 되었습니다.",
    });
  }

  countBasket.innerText = `+${isfollow.length}`;
}

// 장바구니 클릭 시, 내용물 출력
function clickBasket() {
  // HTML 문자열을 이용하여 select 태그 생성
  // select 태그를 동적으로 생성합니다.
  const selectList = document.createElement("select");
  selectList.id = "mySelect";

  // isfollow 배열의 각 원소를 option으로 추가합니다.
  for (let i = 0; i < isfollow.length; i++) {
    const option = document.createElement("option");
    option.value = isfollow[i];
    option.text = isfollow[i];
    selectList.appendChild(option);
  }

  // swal에 select 태그를 포함하는 커스텀 HTML을 표시합니다.
  swal({
    title: "장바구니 내역",
    content: {
      element: "div",
      attributes: {
        innerHTML: selectList.outerHTML, // outerHTML을 사용하여 select 태그의 HTML을 문자열로 가져옵니다.
      },
    },
    buttons: {
      confirm: {
        text: "OK",
        closeModal: true,
      },
    },
  }).then(() => {
    // 사용자가 선택한 값을 가져오기
    const selectedValue = document.getElementById("mySelect").value;
    console.log("Selected option:", selectedValue);
  });
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
  BanKok: [
    "여행 1일차 오전, \n 킹파워 마하나콘은 2018년 11월 문을 연 따끈따끈한 떠오르는 핫플이에요. 인스타그램 등에 전망대 인증샷을 올리는게 유행하면서 방콕의 새로운 랜드마크가 되었어요. 지상 78층, 높이 총 314m로 78층은 전망대로 운영하고 있어요. 아주아주 멋진 공간이며 모두에게 추천드리는 강추하는 장소입니다. ",
    "여행 1일차 오후, \n 아유타야는 방콕에서 차로 약 1시간 정도 떨어진 곳에 위치한 고대 유적 도시예요. 아유타야 고대 유적지는 세계문화유산으로 지정 되었을 만큼 보존이 잘 되어 있어 역사 공원에 들어가면 마치 차원을 이동해 과거로 온 것 같은 착각까지 들어요.",
    "여행 1일차 저녁, \n 왓 아룬 탐방은 매우 아름다운 궁전 앞에서 진행됐어요. 매우 높은 유적지여서 솔직히 놀란거 같아요.",
  ],
  Japan: ["일본여행 1 - hello Japan", "This is Japan", "Bye Bye"],
  Seoul: [
    "여행 2일차 오전, \n 오늘은 서울 시청에 들러서 앞에서 사진 찍었습니다. 날씨가 매우 좋은 것 같아요!",
    "여행 2일차 오후 \n 한옥마을에 들러서 한복입고 사진도 찍었습니다. 가게도 한옥으로 되어있어서 색다른 경험이었습니다. ",
    "여행 2일차 저녁 \n 동대문 디지털 플라자에 들러서 건물이 이쁜 기념으로 사진한방 찍었습니다. 개인적으로는 야경이 마음에 들어요,",
  ],
  USA: ["미국 하와이 해변 간 날", "미국여행 2일차", "Bye Bye"],
  China: [
    "여행 3일차 오전 \n 중국의 베이징에 들렀습니다. 서울에서 베이징까지 얼마 걸리지 않아서 오는 길이 수월했습니다. ",
    "여행 3일차 오후 \n 근처의 유적지 앞에서 사진찍었습니다. 개인적으로 중국 유적은 규모가 크기에, 웅장한 느낌을 많이 받았던 것 같아서 한번씩 가보시는 것을 추천드립니다.",
    "여행 3일차 저녁 \n 만리장성에 갔습니다. 사진은 조금 오후에 찍은 것 같지만, 다 둘러보니 저녁이 되었네요! 엄청 길고 크고, 저는 사실 다시 가보는 것은 추천드리지 않습니다.",
  ],
  Sweden: [
    "여행 4일차 \n 스웨덴에 도착했습니다. 4일차부터는 오전,오후 나누는 것 없이 포스팅 합니다. 사진을 막 찍었더니 구분이 안가네요. 스톡홀름에 도착했는데 매우 조용한 느낌을 받았습니다.",
    "여행 4일차 \n 스톡홀름에서 지내면서 시청 주변을 찍었습니다. 유럽 건물은 한국식 건물이 주는 느낌과 다른 느낌을 주는 것 같습니다.",
    "여행 4일차 \n 이 사진은 호수에서 찍은 광경이 멋있어서 넣었습니다. 꼭 한번 가보시는 것을 추천드립니다. 매우 편안한 느낌입니다.",
  ],
  Hokkaido: ["일본여행 3 - Hokkaido", "This is Hokkaido", "Bye Bye"],
  Fukuoka: ["일본여행 2 - hello Fukuoka", "This is Fukuoka", "Bye Bye"],
  Germany: [
    "여행 6일차 \n 돔 지역에서 베를린의 탁 트인 전망을 즐길 수 있습니다. 천천히 베를린을 즐기고 싶다면 브란덴부르크 문에서 산책을 즐겨보세요.",
    "여행 6일차 \n 박물관을 기준으로 주변을 걸어서 오전 오후 하루 종일 둘러보기하세요~ 주변에 쇼핑상가도 많고 주말엔 예술품벼룩시장도 열려요 먹거리도 천지 입니다.",
    "여행 6일차 \n 독일 브란덴부르크 문은 베를린과 독일에서도 특별한 지위 때문에 독일의 여러 축하 행사가 열리는 장소가 되었습니다. 매년 12월 31일에는 이곳에서 야외 새해 파티가 열리며 광장과 거리가 인파로 붐빕니다. 무대에서 성대한 라이브 공연이 열리고 사람들이 함께 새해를 맞이합니다. 자정 불꽃놀이 투어.",
  ],
  Swiss: [
    "여행 5일차 \n 루린 호수는 스위스에서 인상적인 장소 중 하나입니다. 푸른 호수는 주변의 은 녹색 숲과 극명한 대조를 이루고 있으며, 스위스 알프스의 눈 덮인 봉우리는 호수에 반사되어 환상적인 풍경을 만듭니다. 호숫가 마을은 진정한 역사적 보물입니다.",
    "여행 5일차 \n 스위스 대표적인 산 융프라우 봉우리입니다.기차를 타고 대략 3500미터 정도의 높이까지 올라갑니다. 융프라우에서 바라보는 만년설은 장관입니다.",
    "여행 5일차 \n 토블로네 모양의 산. 모양 때문에 매우 유명합니다. 사람들은 토블로네 초콜릿을 좋아합니다. . 이 보기는 너무 매혹적이었고 어느 날 좋은 날 다시 여기에 올 생각을 계속했습니다.",
  ],
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

// //////////////////////헤더 영역//////////////////////

// 상단바 로그인 성공시
const appendMypageButton = (mypageButton, node) => {
  mypageButton = document.createElement("li");
  mypageButton.setAttribute("class", "nav-item");
  mypageButton.innerHTML = `<a class="nav-link active" style="color: black;" href="../mypage_card.html">Mypage</a>`;
  node.after(mypageButton);
};
const appendWriteButton = (writeButton, node) => {
  writeButton = document.createElement("li");
  writeButton.setAttribute("class", "nav-item");
  writeButton.innerHTML = `<a class="nav-link active" style="color: black;" href="../planning.html">글작성하기</a>`;
  node.after(writeButton);
};

const appendUserNameDisplay = (userNameDisplay, name) => {
  userNameDisplay = document.createElement("p");
  userNameDisplay.innerHTML = `<p class="nav-link active" style="color: black;" >${name}님</p>`;
  document.querySelector("#userInfo").append(userNameDisplay);
};

const setLoginOutButton = (button) => {
  button.textContent = "로그아웃";
  button.removeAttribute("data-toggle");
  button.removeAttribute("data-target");
  button.setAttribute(
    "onclick",
    "localStorage.removeItem('loggedIn'); location.href = '../index.html'"
  );
};

let name = localStorage.getItem("loggedIn");
if (name) {
  let node = document.querySelector("#pointNode");
  let mypageButton;
  let writeButton;
  let userNameDisplay;
  setLoginOutButton(document.querySelector("#loginOut"));
  appendUserNameDisplay(userNameDisplay, name);
  appendMypageButton(mypageButton, node);
  appendWriteButton(writeButton, node);
}
