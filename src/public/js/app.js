//FE

const socket = io(); //socket.io import

const welcome = document.getElementById("welcome");
const form = document.querySelector('form');

function handleSubmit(event) {
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit('enter_room', { payload: input.value }, () => {
        console.log("server is Done!");
        /*
        - first argument : event name,
        - second argument : payload,
        - third argument : server에서 호출하는 function
        */
    });
    input.value = ""; // input 값 초기화
};

form.addEventListener('submit', handleSubmit);