const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/download', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('No URL provided.');

  // 檢查 yt-dlp 是否可用 (執行 `yt-dlp --version` 看有沒有錯誤)
  exec('yt-dlp --version', (checkErr) => {
    if (checkErr) {
      console.error('yt-dlp not available:', checkErr);
      return res.status(500).send('yt-dlp is not installed or not available.');
    }

    const downloadFolder = '../downloads';  // 指定下載資料夾路徑，記得資料夾要存在
    const command = `yt-dlp -o "${downloadFolder}/%(title)s.%(ext)s" "${url}"`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        return res.status(500).send('Download failed.');
      }
      console.log(stdout);
      res.send('Download started!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
