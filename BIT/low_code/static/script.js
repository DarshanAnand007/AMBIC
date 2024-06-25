async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value;
    if (message.trim() === '') return;

    animateEyes('typing');

    const messageContainer = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${message}`;
    messageContainer.appendChild(userMessage);

    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    const botResponse = data.bot_message;

    const botMessageContainer = document.createElement('div');
    botMessageContainer.className = 'bot-reply';

    const botLogo = document.createElement('div');
    botLogo.className = 'bot-logo';
    botLogo.textContent = 'A';
    botMessageContainer.appendChild(botLogo);

    const botMessage = document.createElement('div');
    botMessage.textContent = `Bot: ${botResponse}`;
    botMessageContainer.appendChild(botMessage);

    const voiceButton = document.createElement('button');
    voiceButton.className = 'voice-button';
    voiceButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    voiceButton.onclick = () => {
        animateEyes('speaking');
        readAloud(botResponse);
    };
    botMessageContainer.appendChild(voiceButton);

    messageContainer.appendChild(botMessageContainer);

    input.value = '';
    messageContainer.scrollTop = messageContainer.scrollHeight;
    animateEyes('');
}

function clearMessages() {
    document.getElementById('messages').innerHTML = '';
}

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

function readAloud(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

function animateEyes(action) {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        eye.classList.remove('blinking', 'searching', 'typing');
        if (action) {
            eye.classList.add(action);
        }
    });
}

// Mock setting personality settings on load
window.onload = async function() {
    const intelligence = 0.7;
    const humor = 0.5;

    console.log(`Settings updated: Intelligence - ${intelligence}, Humor - ${humor}`);
};
