
# YTBBdl

YouTube and BiliBili downloader as a Chromium plugin.

---

## 需求

- Node.js (請先安裝 Node.js 環境，建議版本 14 以上)

你可以從 [Node.js 官方網站](https://nodejs.org/) 下載並安裝。

---

## 安裝與啟動

1. **下載或 clone 此專案到你的本地電腦。**

2. **安裝相依套件**（可選，視你的專案需求）  
   如果有 `package.json`，請先在 `server` 資料夾中執行：  
   ```bash
   cd server
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

3. **啟動方式：**

- **pm2 開機自啟動** 
- `pm2-windows-startup`
- PM2 在 Windows 下開機自啟動的套件
  ```bash
  npm install -g pm2-windows-startup
  pm2-startup install
  ```
  安裝完成後啟動 server
  ```bash
  pm2 start "something\YTBBdl\server\server.js" --name ytbbdl
             ^請自行更改
  pm2 save
  ```

---

## 使用方式

1. 打開 Chromium 瀏覽器，進入擴充功能頁面（`chrome://extensions/`）。

2. 啟用「開發者模式」。

3. 點擊「載入未封裝擴充功能」，選擇此專案根目錄。

4. 在 YouTube 或 BiliBili 網頁打開影片頁面，擴充功能會自動插入下載按鈕。
