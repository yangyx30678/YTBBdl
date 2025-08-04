let lastUrlBili = location.href;

function insertDownloadButtonBilibili() {
  if (document.querySelector("#bili-dlp-download-btn")) return;

  const toolbarLeftMain = document.querySelector(".video-toolbar-left-main");
  if (!toolbarLeftMain) return;

  const wrap = document.createElement("div");
  wrap.className = "toolbar-left-item-wrap";

  const btn = document.createElement("button");
  btn.id = "bili-dlp-download-btn";
  btn.className = "video-toolbar-left-item";
  btn.type = "button";
  btn.style.cursor = "pointer";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.gap = "6px";
  btn.style.padding = "6px 12px";
  btn.style.fontSize = "14px";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.backgroundColor = "transparent";  // 保持背景透明或原色
  btn.style.color = "inherit";  // 保持文字原色

    function setBtnDefault() {
    btn.disabled = false;
    btn.title = "下載影片";
    btn.innerHTML = `
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z" fill="#666"></path>
      </svg>
      <span style="color:#666">下載</span>
    `;
  }

  function setBtnDownloading() {
    btn.disabled = true;
    btn.title = "下載中";
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00673 12C3.00673 16.9668 7.03315 20.9933 12 20.9933C16.9668 20.9933 20.9933 16.9668 20.9933 12C20.9933 7.03315 16.9668 3.00673 12 3.00673C7.03315 3.00673 3.00673 7.03315 3.00673 12Z" fill="#007acc"></path>
        <path d="M17.3596 12.71L11.9996 18.07L6.63965 12.71L8.04965 11.3L10.9996 14.24V6H12.9996V14.24L15.9496 11.29L17.3596 12.71Z" fill="#007acc"></path>
      </svg>
      <span style="color:#666">下載中</span>
    `;
  }

  function setBtnDownloaded() {
    btn.disabled = false;
    btn.title = "已下載";
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M17,18H7v-2h10V18z M10.3,14L7,10.7l1.4-1.4l1.9,1.9 l5.3-5.3L17,7.3L10.3,14z" fill="#666"></path>
      </svg>
      <span style="color:#666">已下載</span>
    `;
  }


  setBtnDefault();

  btn.addEventListener("click", () => {
    const cleanUrl = window.location.href;
    setBtnDownloading();

    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: cleanUrl })
    })
      .then(() => setBtnDownloaded())
      .catch(() => setBtnDefault());
  });

  wrap.appendChild(btn);
  toolbarLeftMain.appendChild(wrap);

  const observer = new MutationObserver(() => {
    if (!document.querySelector("#bili-dlp-download-btn")) {
      insertDownloadButtonBilibili();
      observer.disconnect();
    }
  });
  observer.observe(toolbarLeftMain, { childList: true, subtree: true });
}

function tryInsert() {
  setTimeout(() => insertDownloadButtonBilibili(), 1500);
}

setInterval(() => {
  if (location.href !== lastUrlBili) {
    lastUrlBili = location.href;
    tryInsert();
  }
}, 1000);

tryInsert();
