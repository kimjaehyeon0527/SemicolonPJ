function openModal() {
  document.getElementById("myModal").style.display = "block"; // 모달 열기
}

function closeModal() {
  document.getElementById("myModal").style.display = "none"; // 모달 닫기
}

function setText() {
  let text = document.getElementById("text").value;
  let postingDiv = document.getElementById("postList");
  let p = document.createElement("p");
  p.innerText = text;

  postingDiv.append(p);
}

// 이미지 미리보기
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}
