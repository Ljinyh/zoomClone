// BE

import express from 'express';
// import WebSocket from 'ws';
import SocketIO from 'socket.io';
import http from 'http';


const app = express();

// view engine 을 pug로 set
app.set('view engine', 'pug');

// express 로 템플릿이 어디있는지 지정해줌
app.set('views', __dirname + '/views');

// public url을 생성해서 유저에게 파일 공유
app.use('/public', express.static(__dirname + '/public'));

// '/views/home.pug 렌더 시키기
app.get('/', (req, res) => res.render('home'));

// 어떤 Url을 써도 home "/" 으로 돌아가게 만듦 (다른 url 을 쓰지 않을 예정)
app.get('/*', (req, res) => res.redirect('/'));

const PORT = 3000;  // http & ws 는 같은 port 를 공유한다.
const handleLiten = () => console.log(`Listening on http://localhost:${PORT}`);

const httpServer = http.createServer(app); // http server
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket) => {
    socket.on('enter_room', (roomName, done) => {
        console.log(roomName);
        setTimeout(() => {
            done("Done!");
        }, 10000);
    });
});


//const wss = new WebSocket.Server({ server }); //ws server

/*
- server 두개를 한 번에 돌릴 수 있게 설정 
- express의 http 서버생성 
    : 위의 app.~~ 이 친구들을 사용할 것이기 때문에 http 서버 생성. 
    (사용안하는 경우 ws만 생성해도 됨)
- ws를 위해 server(http)위에 ws server를 따로 만들어줌
*/


// 가상의 DB
//const sockets = [];
/* 
이렇게 설정하지 않으면 브라우저들끼리 연결이 안되고, 브라우저 각각 통신이 되기 때문에
각기 다른 브라우저라도 하나로 통신하고 싶으면 배열로 저장
*/
/*
// 여기의 socket은 연결된 브라우저를 뜻함.
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous"; // 만약 user가 nickname을 설정하지 않는다면 디폴트는 anonymous(익명)이다.
    console.log("Connected to Browser ✅");  // socket state = open 일 경우
 
    socket.on("close", () => { // socket state = close일 경우
        console.log("Discnnected to Browser ❌");
    });
 
    socket.on("message", (msg) => {
        const message = JSON.parse(msg.toString());
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) =>
                    // 연결된 모든 브라우저에게 받은 msg를 다시 돌려줌
                    aSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname":
                // socket = object type, so insert new item
                socket["nickname"] = message.payload;
                // { nickname : message.payload }
                break;
        };
    });
});
*/
httpServer.listen(PORT, handleLiten);