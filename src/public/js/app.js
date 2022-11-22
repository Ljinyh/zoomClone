// FE

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

// 메세지를 보내기까지 10초를 기다림.
setTimeout(() => {
    socket.send("hello from the browser");
}, 10000);