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

  // 按鈕樣式
  Object.assign(btn.style, {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    border: "none",
    minWidth: "100px",       // 避免文字擠壓圖示
    backgroundColor: "transparent",
    color: "#61666d",
    transition: "color 0.4s, background-color 0.4s"
  });

  // hover 效果
  btn.addEventListener("mouseenter", () => {
    if (!btn.disabled) {
      btn.style.color = "#00aeec";
    }
  });
  btn.addEventListener("mouseleave", () => {
    if (!btn.disabled) {
      btn.style.color = "#61666d";
    }
  });

  function setBtnDefault() {
    btn.disabled = false;
    btn.title = "下載影片";
    btn.innerHTML = `
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.163 2.819C9 3.139 9 3.559 9 4.4V11H7.803c-.883 0-1.325 0-1.534.176a.75.75 0 0 0-.266.62c.017.274.322.593.931 1.232l4.198 4.401c.302.318.453.476.63.535a.749.749 0 0 0 .476 0c.177-.059.328-.217.63-.535l4.198-4.4c.61-.64.914-.96.93-1.233a.75.75 0 0 0-.265-.62C17.522 11 17.081 11 16.197 11H15V4.4c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656C13.861 2 13.441 2 12.6 2h-1.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zM5 21a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1z"/>
      </svg>
      <span>下載</span>
    `;
  }

  function setBtnDownloading() {
    btn.disabled = true;
    btn.style.color = "#00aeec";
    btn.title = "下載中";
    btn.innerHTML = `
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.163 2.819C9 3.139 9 3.559 9 4.4V11H7.803c-.883 0-1.325 0-1.534.176a.75.75 0 0 0-.266.62c.017.274.322.593.931 1.232l4.198 4.401c.302.318.453.476.63.535a.749.749 0 0 0 .476 0c.177-.059.328-.217.63-.535l4.198-4.4c.61-.64.914-.96.93-1.233a.75.75 0 0 0-.265-.62C17.522 11 17.081 11 16.197 11H15V4.4c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656C13.861 2 13.441 2 12.6 2h-1.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zM5 21a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1z"/>
      </svg>
      <span>下載中</span>
    `;
  }

  function setBtnDownloaded() {
    btn.disabled = false;
    btn.style.color = "#61666d";
    btn.title = "已下載";
    btn.innerHTML = `
      <svg width="28" height="28" fill="currentColor" viewBox="-1 -1 22 22">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
          <g transform="translate(-1265.000000, -526.000000)" stroke="currentColor" stroke-width="2">
            <g transform="translate(1263.000000, 524.000000)">
              <path d="M12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 Z"/>
              <polyline points="7.71428571 11.6223394 11.2436971 15 16.2857143 9"/>
            </g>
          </g>
        </g>
      </svg>
      <span>已下載</span>
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

function insertExtraButton() {
  const headerLeft = document.querySelector(".header-top .left");
  if (!headerLeft) return;
  if (document.querySelector("#extra-btn")) return;

  const btn = document.createElement("button");
  btn.id = "extra-btn";
  btn.className = "video-toolbar-left-item";
  btn.type = "button";
  btn.style.cursor = "pointer";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.gap = "6px";
  btn.style.fontSize = "14px";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.padding = "6px 12px";
  btn.style.backgroundColor = "transparent";
  btn.style.transition = "color 0.2s, background-color 0.2s";

  // 狀態函數
  function setBtnDefault() {
    btn.disabled = false;
    btn.style.color = "#61666d"; // 灰色
    btn.title = "下載影片";
    btn.innerHTML = `
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    `;
  }

  function setBtnDownloading() {
    btn.disabled = true;
    btn.style.color = "#00aeec"; // 藍色
    btn.title = "下載中";
    btn.innerHTML = `
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    `;
  }

  function setBtnDownloaded() {
    btn.disabled = false;
    btn.style.color = "#61666d"; // 下載完成回灰色
    btn.title = "已下載";
    btn.innerHTML = `
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="6 11 11 16 19 4" />
      </svg>
    `;
  }

  // 初始狀態
  setBtnDefault();

  btn.addEventListener("click", () => {
    setBtnDownloading();

    const downloadPlaylist = true;  

    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: window.location.href, playlist: downloadPlaylist })
    })
    .then(() => setBtnDownloaded())
    .catch(() => setBtnDefault());
  });

  headerLeft.appendChild(btn);
}

// 等待元素載入後再插入
setTimeout(insertExtraButton, 1000);
