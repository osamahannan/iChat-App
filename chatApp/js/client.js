const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('assets/popup.mp3');

window.setInterval(function() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, 500);

const append= (message, position, position2) => {
    const messageElement = document.createElement('div');
    const messageElement2 = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement2.classList.add('box');
    messageElement2.classList.add(position2);
    messageContainer.append(messageElement);
    messageElement.append(messageElement2);
    messageElement2.innerText= message;
    if(position !== 'right') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right', 'bright');
    socket.emit('send', message);
    messageInput.value = '';
})

const name= prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'middle', 'bmiddle')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left', 'bleft')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'middle', 'bmiddle')
})

