const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Listening on port ${port}');
});