//FE

const socket = io(); //socket.io import

const welcome = document.getElementById("welcome");
const form = document.querySelector('form');

function backendDone(msg) {
    console.log(`Backend say: `, msg);
}

function handleSubmit(event) {
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit('enter_room', input.value, backendDone
        /*
        <emit 기능>
        - first argument : event name,
        - second argument : payload(여러개, 여러 type 가능),
        - third argument : server에서 호출하는 function, 무조건 마지막에 쓰기(중요), front에서 작동
        */
    );
    input.value = ""; // input 값 초기화
};

form.addEventListener('submit', handleSubmit);