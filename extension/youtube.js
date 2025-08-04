function insertDownloadButton() {
  if (document.querySelector("#yt-dlp-download-btn")) return;

  const subscribeBtn = document.querySelector("ytd-subscribe-button-renderer");
  if (!subscribeBtn) return;

  const container = subscribeBtn.parentElement;
  if (!container || !container.style) return;
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.alignItems = "center";

  const btn = document.createElement("button");
  btn.id = "yt-dlp-download-btn";
  btn.className =
    "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment";
  btn.style.marginLeft = "8px";

  // 預設
  function setBtnDefault() {
    btn.innerHTML = `
      <div aria-hidden="true" class="yt-spec-button-shape-next__icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
        </svg>
      </div>
      <div class="yt-spec-button-shape-next__button-text-content">
        <span>下載</span>
      </div>
    `;
    btn.disabled = false;
    btn.title = "下載影片";
  }

  // 下載中（只有 SVG 變藍）
  function setBtnDownloading() {
    btn.innerHTML = `
      <div aria-hidden="true" class="yt-spec-button-shape-next__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24">
          <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00673 12C3.00673 16.9668 7.03315 20.9933 12 20.9933C16.9668 20.9933 20.9933 16.9668 20.9933 12C20.9933 7.03315 16.9668 3.00673 12 3.00673C7.03315 3.00673 3.00673 7.03315 3.00673 12Z" fill="var(--yt-spec-call-to-action-inverse)"></path>
          <path d="M17.3596 12.71L11.9996 18.07L6.63965 12.71L8.04965 11.3L10.9996 14.24V6H12.9996V14.24L15.9496 11.29L17.3596 12.71Z" fill="var(--yt-spec-call-to-action)"></path>
        </svg>
      </div>
      <div class="yt-spec-button-shape-next__button-text-content">
        <span>下載中</span>
      </div>
    `;
    btn.disabled = true;
    btn.title = "下載中";
  }

  // 已下載
  function setBtnDownloaded() {
    btn.innerHTML = `
      <div aria-hidden="true" class="yt-spec-button-shape-next__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24">
          <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M17,18H7v-2h10V18z M10.3,14L7,10.7l1.4-1.4l1.9,1.9 l5.3-5.3L17,7.3L10.3,14z"></path>
        </svg>
      </div>
      <div class="yt-spec-button-shape-next__button-text-content">
        <span>已下載</span>
      </div>
    `;
    btn.disabled = false;
    btn.title = "已下載";
  }

  setBtnDefault();

  btn.addEventListener("click", () => {
    const url = new URL(window.location.href);
    const videoId = url.searchParams.get('v');
    const cleanUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : window.location.href;

    setBtnDownloading();

    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: cleanUrl })
    })
      .then(() => setBtnDownloaded())
      .catch(() => setBtnDefault());
  });

  container.insertBefore(btn, subscribeBtn.nextSibling);
}

const observer = new MutationObserver(insertDownloadButton);
observer.observe(document.body, { childList: true, subtree: true });

insertDownloadButton();
