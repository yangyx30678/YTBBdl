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

  const downloadFolder = '../downloads'; // 確保資料夾已存在

  // 判斷是 YouTube 還是 Bilibili
  let command;
  if (/youtube\.com|youtu\.be/.test(url)) {
    // YouTube 用 yt-dlp
    command = `yt-dlp -o "${downloadFolder}/%(title)s.%(ext)s" "${url}"`;
  } else if (/bilibili\.com/.test(url)) {
    // Bilibili 用 BBDown
    command = `BBDown --work-dir "${downloadFolder}" "${url}"`;
  } else {
    return res.status(400).send('Unsupported URL.');
  }

  console.log(`Downloading: ${url}`);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send('Download failed.');
    }
    console.log(stdout);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
