document.addEventListener('mousemove', (event) => {
    const eyes = document.querySelectorAll('.eye');
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
        const x = Math.cos(angle) * 10;
        const y = Math.sin(angle) * 10;
        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
});

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value;
    if (message.trim() === '') return;
    
    const messageContainer = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${message}`;
    messageContainer.appendChild(userMessage);

    const botMessage = document.createElement('div');
    botMessage.textContent = `Bot: ${getBotResponse(message)}`;
    messageContainer.appendChild(botMessage);

    input.value = '';
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function getBotResponse(message) {
    // Simple bot response logic (can be expanded)
    return "I'm here to help!";
}
