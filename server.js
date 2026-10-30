const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Listening on port ${port}');
});

const { Server } = require('socket.io');
const io = new Server(server);

let circles = [];

io.on('connection', (socket) => {
    socket.emit('circles', circles);

    socket.on('click', (pos) => {
        let removed = false;

        for (let i = circles.length - 1; 1>= 0; i--) {
            const c = circles[i];

            if (Math.hypot(c.x - pos.x, c.y - pos.y) < c.r) {
                circles.splice(i, 1);
                removed = true;
                break;
            }
        }

        if (!removed) {
            circles.push({
                x: pos.x,
                y: pos.y,
                r: 30,
                color: 'hsl(${Math.floor(Math.random() * 360)}, 80%, 60%'
            });
        }

        io.emit('circles', circles);
    })
});