//FE

const socket = io(); //socket.io import

const roomNameDiv = document.getElementById("roomName");
const form = roomNameDiv.querySelector('form');
const messageDiv = document.getElementById('message');

message.hidden = true; //room div 숨기기
let roomName;

function showRoom(msg) {
    roomNameDiv.hidden = true; // 
    messageDiv.hidden = false; //room div를 숨기지 않음
    const h3 = messageDiv.querySelector('h3');
    h3.innerText = `Room ${roomName}`; //설정된 roomName을 위에 보여줌.
}

function handleSubmit(event) {
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit('enter_room', input.value, showRoom
        /*
        <emit 기능>
        - first argument : event name,
        - second argument : payload(여러개, 여러 type 가능),
        - third argument : server에서 호출하는 function, 무조건 마지막에 쓰기(중요), front에서 작동
        */
    );
    roomName = input.value;
    input.value = ""; // input 값 초기화
};

form.addEventListener('submit', handleSubmit);

function addMessage(message) {
    const ul = messageDiv.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = message;
    ul.appendChild(li);
}

socket.on("welcome", () => { addMessage("Someone Joined!"); });