document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatHistory = document.getElementById('chat-history');
    
    const slider = document.querySelector('.config-slider');
    const sliderValue = document.querySelector('.slider-value');

    // Update slider value
    if (slider && sliderValue) {
        slider.addEventListener('input', (e) => {
            sliderValue.textContent = e.target.value;
        });
    }

    // Handle chat input
    const addMessage = (text, isUser = true) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + (isUser ? 'user' : 'system');
        
        const avatar = isUser ? 'person' : 'smart_toy';
        
        msgDiv.innerHTML = `
            <div class="avatar"><span class="material-icons-outlined">${avatar}</span></div>
            <div class="message-content">
                <p>${text.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    const handleSend = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, true);
        chatInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            addMessage('Đang xử lý yêu cầu của bạn bằng Model đã chọn...', false);
        }, 500);
    };

    sendBtn.addEventListener('click', handleSend);
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSend();
        }
    });

    // Handle sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            navItems.forEach(n => n.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');
            
            // Just simulate changing title
            const title = item.getAttribute('data-tooltip');
            if (title && document.querySelector('.header-title h1')) {
                document.querySelector('.header-title h1').textContent = title;
            }
        });
    });
});
