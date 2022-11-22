//FE

const socket = io(); //socket.io import

const roomNameDiv = document.getElementById("roomName");
const form = roomNameDiv.querySelector('form');
const messageDiv = document.getElementById('message');

message.hidden = true; //room div 숨기기
let roomName;

// messages fn
function handleMessageSubmit(event) {
    event.preventDefault();
    const input = messageDiv.querySelector('input');
    const value = input.value; //input 값을 value란 변수에다 저장해놔야 초기화해도 불러올 수 있음.
    socket.emit("new_message", input.value, roomName, () => {
        // 내 창에서 내가 보는 나의 메세지
        addMessage(`You: ${value}`);
    });
    input.value = '';
};

// hidden div changed fn
function showRoom() {
    roomNameDiv.hidden = true; // 
    messageDiv.hidden = false; //room div를 숨기지 않음
    const h3 = messageDiv.querySelector('h3');
    h3.innerText = `Room ${roomName}`; //설정된 roomName을 위에 보여줌.
    const form = messageDiv.querySelector('form');
    form.addEventListener('submit', handleMessageSubmit);
};

// add message ul fn
function addMessage(message) {
    const ul = messageDiv.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = message;
    ul.appendChild(li);
};

// enter room fn
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

// 누군가 방을 들어올 때 message
socket.on("welcome", () => {
    addMessage("Someone joined!");
});

// 누군가 방을 나갈 때 message
socket.on("bye", () => {
    addMessage("Someone left😢");
});

// 보낸 message 보여주기
socket.on('new_message', addMessage);
// 위의 addMessage 가 (msg) => {addMessage(msg)} 와 같음