import express from 'express';
import WebSocket from 'ws';
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

const server = http.createServer(app); // http server
const wss = new WebSocket.Server({ server }); //ws server

/*
- server 두개를 한 번에 돌릴 수 있게 설정 
- express의 http 서버생성 
    : 위의 app.~~ 이 친구들을 사용할 것이기 때문에 http 서버 생성. 
    (사용안하는 경우 ws만 생성해도 됨)
- ws를 위해 server(http)위에 ws server를 따로 만들어줌
*/

server.listen(PORT, handleLiten);