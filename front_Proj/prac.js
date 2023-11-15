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

// readGoogleMaps에서 활용하기 위해 전역변수 처리
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

  readGoogleMaps();
}

function readGoogleMaps() {
  let mapCode = {
    Bankok:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4788000523135!2d100.49146026804355!3d13.749974951213549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2994e316c363f%3A0x2a6c77dd93ef4c41!2z67Cp7L2VIOyZleq2gQ!5e0!3m2!1sko!2skr!4v1700015952787!5m2!1sko!2skr",
    Japan:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2569432.632352232!2d138.1128306612084!3d35.354534596360594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2z7J2867O4!5e0!3m2!1sko!2skr!4v1700013581057!5m2!1sko!2skr",
    USA: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d392569.79304998065!2d-105.47897255090844!3d39.76319714170874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x118ef4f8278a36d6!2z66-46rWtIOy9nOuhnOudvOuPhCDrjbTrsoQ!5e0!3m2!1sko!2skr!4v1700013717502!5m2!1sko!2skr",
    Seoul:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120388.28591018873!2d126.9028593362394!3d37.54175168884004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2z7ISc7Jq47Yq567OE7Iuc!5e0!3m2!1sko!2skr!4v1700015733566!5m2!1sko!2skr",
  };

  let iframe = document.querySelector("#maps iframe");
  let country = document.querySelector(".country");
  iframe.setAttribute("src", mapCode[destinationText]);
  country.innerText = destinationText;
}

function closeModal() {
  document.getElementById("myModal").style.display = "none"; // 모달 닫기
}

// 추 후 수정예정
function setText() {
  let text = document.getElementById("text").value;
}
