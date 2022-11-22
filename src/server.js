import express from 'express';

const app = express();

// view engine 을 pug로 set
app.set('view engine', 'pug');

// express 로 템플릿이 어디있는지 지정해줌
app.set('views', __dirname + '/views');

// public url을 생성해서 유저에게 파일 공유
app.use('/public', express.static(__dirname + '/public'));

// '/views/home.pug 렌더 시키기
app.get('/', (req, res) => res.render('home'));

const PORT = 3000;
const handleLiten = () => console.log(`Listening on http://localhost:${PORT}`)
app.listen(PORT, handleLiten);