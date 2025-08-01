function addDownloadButton() {
  // 避免重複插入
  if (document.querySelector("#yt-dlp-download-btn")) return;

  // 找到訂閱按鈕容器
  const subscribeButton = document.querySelector('ytd-subscribe-button-renderer tp-yt-paper-button');
  if (!subscribeButton) return;

  // 複製訂閱按鈕的 class
  const btn = document.createElement("button");
  btn.id = "yt-dlp-download-btn";
  btn.className = subscribeButton.className; // 複製樣式
  btn.setAttribute("style", subscribeButton.getAttribute("style")); // 複製行內樣式
  btn.innerHTML = `
    <div class="yt-spec-button-shape-next__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
        <path d="M480-120q-74 0-140-28t-114.5-77Q177-274 148.5-340T120-480q0-74 28.5-140t77-114q48.5-48 114.5-76.5T480-840q74 0 140 28.5t114.5 77q48.5 48.5 77 114T840-480q0 74-28.5 140T734-225q-48.5 49-114.5 77T480-120Zm0-560q-17 0-28.5 11.5T440-640v200l146 88q14 8 28 4t22-18q8-14 4-28t-18-22l-126-76v-148q0-17-11.5-28.5T480-680Z"/>
      </svg>
    </div>
    <div class="yt-spec-button-shape-next__button-text-content">
      <span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" role="text">
        下載
      </span>
    </div>
  `;

  // 綁定下載事件
  btn.addEventListener("click", () => {
    const videoUrl = window.location.href;
    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl })
    })
      .then(r => r.text())
      .then(alert)
      .catch(err => alert("下載失敗: " + err));
  });

  // 把新按鈕插在訂閱按鈕的右邊
  subscribeButton.parentElement.insertBefore(btn, subscribeButton.nextSibling);
}

// YouTube 頁面是動態載入的，所以要定時檢查
setInterval(addDownloadButton, 1000);
