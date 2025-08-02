let lastUrl = location.href;

function insertDownloadButtonBilibili() {
  if (document.querySelector("#bili-dlp-download-btn")) return;

  const toolbarLeftMain = document.querySelector(".video-toolbar-left-main");
  if (!toolbarLeftMain) return;

  const wrap = document.createElement("div");
  wrap.className = "toolbar-left-item-wrap";

  const btn = document.createElement("div");
  btn.id = "bili-dlp-download-btn";
  btn.className = "video-toolbar-left-item";
  btn.style.cursor = "pointer";
  btn.innerHTML = `<svg width="28" height="28" fill="currentColor"><path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path></svg> <span>下載</span>`;

  btn.addEventListener("click", () => {
    const cleanUrl = window.location.href;
    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: cleanUrl })
    });
  });

  wrap.appendChild(btn);
  toolbarLeftMain.appendChild(wrap);
}

function tryInsert() {
  setTimeout(() => insertDownloadButtonBilibili(), 1500);
}

// 監控 URL 變化（B 站是 SPA，不會整頁刷新）
setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    tryInsert();
  }
}, 1000);

// 首次執行
tryInsert();
