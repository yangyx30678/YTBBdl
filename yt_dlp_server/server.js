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

  const command = `yt-dlp --output "%(title)s.%(ext)s" "${url}"`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send('Download failed.');
    }
    console.log(stdout);
    res.send('Download started!');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
