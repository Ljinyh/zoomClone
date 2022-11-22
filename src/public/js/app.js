// FE
const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
// ws connect
const socket = new WebSocket(`ws://${window.location.host}`);
/* 
여기의 socket은 서버로 연결된 것을 뜻함.
socket 연결은 http로 하면 error 뜸. ws or wss로 프로토콜을 설정해주어야 한다. 
window.loaction.host = 내가 연결한 host 주소
*/

function maekMessage(type, payload) {
    // nickname 과 msg를 구분하기 위해서 object 형식으로 만들어 줌
    const msg = { type, payload };
    return JSON.stringify(msg);
    /* 
    WebSocket이 브라우저 API기 때문에,
    만들어진 object를 backend에서 js뿐만 아닌 다른 다양한 언어로 받아도 알 수 있게 
    string 으로 보내준다.
    */
};

socket.addEventListener("open", () => { // Server is online
    console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
    // ul로 목록화된 list에 msg 넣기
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li); // msg들 목록에 추가
});

socket.addEventListener("close", () => { //Server is offline
    console.log("Discnnected to Server ❌");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(maekMessage("new_message", input.value));  // server 로 input 값을 보내줌
    input.value = "";  //보낸 뒤 input 값 초기화
};

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(maekMessage("nickname", input.value));
    input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);