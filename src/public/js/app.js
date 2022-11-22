// FE
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');
// ws connect
const socket = new WebSocket(`ws://${window.location.host}`);
/* 
여기의 socket은 서버로 연결된 것을 뜻함.
socket 연결은 http로 하면 error 뜸. ws or wss로 프로토콜을 설정해주어야 한다. 
window.loaction.host = 내가 연결한 host 주소
*/

socket.addEventListener("open", () => { // Server is online
    console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data, " from Server");
});

socket.addEventListener("close", () => { //Server is offline
    console.log("Discnnected to Server ❌");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);  // server 로 input 값을 보내줌
    input.value = "";  //보낸 뒤 input 값 초기화
}

messageForm.addEventListener("submit", handleSubmit);
