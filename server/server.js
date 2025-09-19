const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function getPreferredEncoder(callback) {
  const ffmpeg = spawn('ffmpeg', ['-encoders']);
  let output = '';

  ffmpeg.stdout.on('data', (data) => output += data.toString());
  ffmpeg.stderr.on('data', (data) => output += data.toString());

  ffmpeg.on('close', () => {
    if (output.includes('h264_nvenc')) {
      console.log('Using GPU encoder: h264_nvenc');
      callback('h264_nvenc');
    } else {
      console.log('Using CPU encoder: libx264');
      callback('libx264');
    }
  });
}

app.post('/download', (req, res) => {
  const { url, playlist } = req.body;
  console.log('Playlist mode:', playlist);
  if (!url) return res.status(400).send('No URL provided.');

  getPreferredEncoder((videoEncoder) => {
    const downloadFolder = '../downloads';
    const playlistFlag = playlist ? '' : '--no-playlist';

  const args = [
    ...(playlist ? [] : ['--no-playlist']), // 注意這裡加了 ...
    '-f', 'bestvideo+bestaudio',
    '-o', `${downloadFolder}/%(title)s.%(ext)s`,
    '--merge-output-format', 'mp4',
    url,
    '--postprocessor-args', `ffmpeg:-c:v ${videoEncoder} -crf 23 -preset fast -c:a aac -f mp4`
  ];

    console.log('args:', args);

    // spawn 並繫結 stdout/stderr 直接顯示
    const yt = spawn('yt-dlp', args, { stdio: 'inherit' });

    yt.on('close', (code) => {
      console.log(`\nDownload finished with code ${code}`);
      res.sendStatus(code === 0 ? 200 : 500);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
