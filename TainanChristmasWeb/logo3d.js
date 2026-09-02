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

// ========================================
// ★ 頁面與圖片載入監控（取代原本的 3D 初始化）
// ========================================
function initPageLoader() {
  setPageProgress(0.3);

  // 檢查首頁新加入的 Home-text 圖片與主要背景圖
  const homeTextImg = document.querySelector(".home-text-image");
  
  // 模擬載入進度或等待圖片載入完成
  if (homeTextImg) {
    if (homeTextImg.complete) {
      finishLoading();
    } else {
      homeTextImg.onload = () => {
        finishLoading();
      };
      homeTextImg.onerror = () => {
        // 即使圖片載入失敗也強制關閉 loading，避免畫面卡住
        finishLoading(); 
      };
    }
  } else {
    // 如果找不到圖片標籤，直接完成
    window.addEventListener("load", finishLoading);
  }
}

function finishLoading() {
  setPageProgress(1);
  setTimeout(() => {
    hidePageLoading();
  }, 400);
}

// ========================================
// ★ 啟動
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPageLoader);
} else {
  initPageLoader();
}