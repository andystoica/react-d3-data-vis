const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('build'));

app.listen(port, () => console.log(`IntelliSense data visualiser at http://localhost:${port}`));