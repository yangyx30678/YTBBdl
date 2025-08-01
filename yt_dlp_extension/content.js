function insertDownloadButton() {
  // 如果按鈕已存在就跳過
  if (document.querySelector("#yt-dlp-download-btn")) return;

  // 找訂閱按鈕元件
  const subscribeBtn = document.querySelector("ytd-subscribe-button-renderer");
  if (!subscribeBtn) return;

  // 找訂閱按鈕的外層容器（flex row）
  const container = subscribeBtn.parentElement;
  if (!container || !container.style) return;
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.alignItems = "center";

  // 建立按鈕
  const btn = document.createElement("button");
  btn.id = "yt-dlp-download-btn";
  btn.textContent = "下載";
  btn.title = "下載影片";
  btn.className =
    "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment";
  btn.style.marginLeft = "8px";

  // 加入 icon
  const iconWrapper = document.createElement("div");
  iconWrapper.setAttribute("aria-hidden", "true");
  iconWrapper.className = "yt-spec-button-shape-next__icon";
  iconWrapper.innerHTML = `
    <span class="ytIconWrapperHost" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
      <span class="yt-icon-shape yt-spec-icon-shape" style="display: flex; align-items: center;">
        <div style="width: 100%; height: 100%; display: block; fill: currentColor;">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
            <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
          </svg>
        </div>
      </span>
    </span>
  `;
  btn.prepend(iconWrapper);

  // 點擊事件
  btn.addEventListener("click", () => {
    const url = new URL(window.location.href);
    const videoId = url.searchParams.get('v');
    const cleanUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : window.location.href;

    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: cleanUrl })
    })
    .then(r => r.text())
    .then(alert)
    .catch(err => alert("下載失敗: " + err));
  });

  // 插入訂閱按鈕旁邊（右側）
  container.insertBefore(btn, subscribeBtn.nextSibling);
}

// 監聽 DOM 變化，自動呼叫插入按鈕函式
const observer = new MutationObserver(insertDownloadButton);
observer.observe(document.body, { childList: true, subtree: true });

// 頁面載入時先嘗試插入一次
insertDownloadButton();
