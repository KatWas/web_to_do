const socket = io({
    autoConnect: false
  });

//sockets

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', ({ author, content }) => addMessage(author, content));
socket.on('exitUser', ({ author, content }) => addMessage(author, content));
socket.emit('message', { author: 'John Doe', content: 'Lorem Ipsum' });

//select

const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

//functions

let userName = '';

const login = (e) => {
    e.preventDefault();
    userName = userNameInput.value;
    if (userName) {
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', userName);
    } else {
        return alert('The field is empty.')
    }
};

function sendMessage(e) {
    e.preventDefault();
  
    let messageContent = messageContentInput.value;
  
    if(!messageContent.length) {
      alert('You have to type something!');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      messageContentInput.value = '';
    }
  
  }

  function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

loginForm.addEventListener('submit', (e) => { login(e) });
addMessageForm.addEventListener('submit', (e) => { sendMessage(e) });