const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function getPreferredEncoder(callback) {
  exec('ffmpeg -encoders', (err, stdout) => {
    if (err) {
      console.error('ffmpeg check failed:', err);
      return callback('libx264'); // fallback
    }
    if (stdout.includes('h264_nvenc')) {
      console.log('Using GPU encoder: h264_nvenc');
      return callback('h264_nvenc');
    } else {
      console.log('Using CPU encoder: libx264');
      return callback('libx264');
    }
  });
}

app.post('/download', (req, res) => {
  const { url } = req.body;
  console.log(url);
  if (!url) return res.status(400).send('No URL provided.');

  exec('yt-dlp --version', (checkErr) => {
    if (checkErr) {
      console.error('yt-dlp not available:', checkErr);
      return res.status(500).send('yt-dlp is not installed or not available.');
    }

    getPreferredEncoder((videoEncoder) => {
      const downloadFolder = '../downloads';
      const command = `yt-dlp --no-playlist -f bestvideo+bestaudio -o "${downloadFolder}/%(title)s.%(ext)s" --merge-output-format mp4 "${url}" --postprocessor-args "ffmpeg:-c:v ${videoEncoder} -crf 23 -preset fast -c:a aac -f mp4"`;

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(stderr);
          return res.status(500).send('Download failed.');
        }
        console.log(stdout);
        res.sendStatus(200);
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
