
# YTBBdl

YouTube and BiliBili downloader as a Chromium extension.

---

## 需求

- [Node.js](https://nodejs.org/zh-tw/download/current)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)

---

## 安裝與啟動

1. **[下載 ytbbdl](https://github.com/yangyx30678/YTBBdl/releases)**

2. **安裝相依套件**
   在 `server` 資料夾中執行：  
   ```bash
   npm install
   ```

3. **啟動方式：**

- **方法一：執行根目錄下的 `start.bat`**  
  在專案根目錄，雙擊或用命令行執行：  
  ```
  start.bat
  ```

- **方法二：直接在 `server` 資料夾使用 npm 啟動**  
  進入 `server` 資料夾，執行：  
  ```bash
  npm start
  ```

4. **pm2 開機自啟動：(可選)**

- 安裝 PM2 在 Windows 下開機自啟動的套件
  ```bash
  npm install -g pm2-windows-startup
  pm2-startup install
  ```
  安裝完成後啟動 server
  ```bash
  pm2 start "something\YTBBdl\server\server_mp4.js" --name ytbbdl
             ^請自行更改
  pm2 save
  ```
5. **啟動畫面**

    ```cmd
    > YTBBdl-server@1.0.0 start
    > node server_mp4.js

    Server is running on http://localhost:5000
    ```

---

## 使用方式

1. 打開 Chromium 瀏覽器，進入擴充功能頁面（`chrome://extensions/`）。

2. 啟用「開發者模式」。

3. 點擊「載入未封裝擴充功能」，選擇此專案根目錄。

4. 在 YouTube 或 BiliBili 網頁打開影片頁面，擴充功能會自動插入下載按鈕。

## 備註
該程式依賴 [yt-dlp](https://github.com/yt-dlp/yt-dlp) 以及 [ffmpeg](https://ffmpeg.org/)