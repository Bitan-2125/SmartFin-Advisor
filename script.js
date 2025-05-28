document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const profileForm = document.getElementById('profile-form');
  const profileSection = document.getElementById('profile-section');
  const chatSection = document.getElementById('chat-section');
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const resetBtn = document.getElementById('reset-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.className = savedTheme + '-theme';
  updateThemeIcon();
  
  // Event Listeners
  profileForm.addEventListener('submit', handleProfileSubmit);
  sendBtn.addEventListener('click', handleUserMessage);
  resetBtn.addEventListener('click', resetChat);
  themeToggleBtn.addEventListener('click', toggleTheme);
  
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage();
    }
  });

  // Initialize UI based on session state
  checkSessionState();
  
  // Functions
  function handleProfileSubmit(e) {
    e.preventDefault();
    
    // Disable form while processing
    const submitBtn = profileForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Get form data
    const formData = new FormData(profileForm);
    
    // Submit profile data to server
    fetch('/submit_profile', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Show chat section
      profileSection.style.display = 'none';
      chatSection.style.display = 'block';
      
      // Enable chat input
      userInput.disabled = false;
      sendBtn.disabled = false;
      
      // Add bot's initial message
      addMessage(data.response, 'bot');
      
      // Focus on input
      userInput.focus();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Something went wrong! Please try again.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-rocket"></i> Start Financial Analysis';
    });
  }
  
  function handleUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    
    // Disable input while waiting for response
    userInput.disabled = true;
    sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send message to server
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `message=${encodeURIComponent(message)}`
    })
    .then(response => response.json())
    .then(data => {
      // Remove typing indicator
      removeTypingIndicator();
      
      // Add bot response
      addMessage(data.response, 'bot');
      
      // Re-enable input
      userInput.disabled = false;
      sendBtn.disabled = false;
      userInput.focus();
    })
    .catch(error => {
      console.error('Error:', error);
      removeTypingIndicator();
      addMessage("Sorry, there was an error processing your request. Please try again.", 'bot');
      userInput.disabled = false;
      sendBtn.disabled = false;
    });
  }
  
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // Create avatar
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    // Set icon based on sender
    const icon = document.createElement('i');
    
    if (sender === 'bot') {
      icon.className = 'fas fa-robot';
    } else {
      icon.className = 'fas fa-user';
    }
    
    avatar.appendChild(icon);
    
    // Create message content
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    // Assemble message
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    // Add to chat box
    chatBox.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator-container';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-robot';
    avatar.appendChild(icon);
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message-content typing-indicator';
    
    // Add three dots
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      typingIndicator.appendChild(dot);
    }
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingIndicator);
    
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
  
  function resetChat() {
    if (confirm('Are you sure you want to start a new conversation? This will clear your current chat.')) {
      fetch('/reset', {
        method: 'POST'
      })
      .then(response => response.json())
      .then(() => {
        // Clear chat box except for the first welcome message
        while (chatBox.childNodes.length > 1) {
          chatBox.removeChild(chatBox.lastChild);
        }
        
        // Show profile section again
        profileSection.style.display = 'block';
        chatSection.style.display = 'none';
        
        // Reset form
        profileForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong! Please try again.');
      });
    }
  }
  
  function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light');
    }
    updateThemeIcon();
  }
  
  function updateThemeIcon() {
    const icon = themeToggleBtn.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }
  
  function checkSessionState() {
    // Check if we have an active chat session
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'message=__check_session__'
    })
    .then(response => response.json())
    .then(data => {
      if (data.response && data.response !== "__session_not_found__") {
        // We have an active session
        profileSection.style.display = 'none';
        chatSection.style.display = 'block';
        
        // Enable chat input
        userInput.disabled = false;
        sendBtn.disabled = false;
      }
    })
    .catch(error => {
      console.error('Error checking session:', error);
    });
  }
});