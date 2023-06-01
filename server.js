const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const SOURCE = 'dist';
const INEDX_HTML = 'index.html';

const app = express();

app.use(express.static(path.join(__dirname, SOURCE)));
app.use('*', (_, res) => {
    res.sendFile(path.join(__dirname, SOURCE, INEDX_HTML));
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
