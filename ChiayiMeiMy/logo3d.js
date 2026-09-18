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

// 主動載入 Canvas 繪圖所需的字型
async function preloadAppFonts() {
  if (!document.fonts) return;
  try {
    // 明確要求載入 500 字重、Noto Serif TC 字體
    await Promise.all([
      document.fonts.load('500 50px "Noto Serif TC"'),
      document.fonts.load('500 50px "Noto Serif"'),
      document.fonts.ready
    ]);
  } catch (e) {
    console.warn("字型載入提示:", e);
  }
}

// 當 DOM Ready，進度到 40%
document.addEventListener("DOMContentLoaded", () => {
  setPageProgress(0.4);
});

// 當網頁資源（圖片）與字型皆載入完畢才關閉 Loading
window.addEventListener("load", async () => {
  setPageProgress(0.7);

  // ⭐ 在關閉 Loading 畫面之前，確保字型已經就緒
  await preloadAppFonts();

  setPageProgress(1);
  setTimeout(() => {
    hidePageLoading();
  }, 300);
});