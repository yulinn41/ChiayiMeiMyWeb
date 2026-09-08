const pageLoading = document.getElementById("pageLoading");
const pageLoadingBar = document.getElementById("pageLoadingBar");

function setPageProgress(ratio) {
  if (!pageLoadingBar) return;
  pageLoadingBar.style.width = `${Math.floor(ratio * 100)}%`;
}

function hidePageLoading() {
  if (!pageLoading) return;
  pageLoading.classList.add("hide");
}

// 確保網頁與所有圖片完全載入後才關閉 Loading
window.addEventListener("load", () => {
  setPageProgress(1);
  setTimeout(() => {
    hidePageLoading();
  }, 400);
});

// 若 DOM 載入時先跑一點進度條特效
document.addEventListener("DOMContentLoaded", () => {
  setPageProgress(0.6);
});