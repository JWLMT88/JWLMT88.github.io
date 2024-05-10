let sessionKey = null;

function setCookie(name, value, expirationDays) 
{
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    const expires = 'expires=' + expirationDate.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function getCookie(name) 
{
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) 
    {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) 
        {
            return cookie.substring(name.length + 1);
        }
    }

    return null;
}

function fadeOutStartupOverlay() 
{
    const startupOverlay = document.getElementById('startup-overlay');
    startupOverlay.classList.add("stp-disapear");
    setTimeout(() => {
      startupOverlay.style.display = 'none';
    }, 1000); // Fade out duration (1000ms = 1s)
}

function showLoading() 
  {
    document.getElementById('loading-bot-message').style.display = 'flex';
  }

function showErrorState() 
  {
    document.getElementById('reload-button').style.display = 'inline-block';
    document.getElementById('input-container').style.display = 'none';
  }            

function showErrorBotMessage() 
  {
    const loadingBotMessage = document.getElementById('loading-bot-message');
    loadingBotMessage.classList.add('error');
    loadingBotMessage.innerHTML = 
    'Error occurred. Please try again';
    loadingBotMessage.style.display = 'flex';

    showErrorState();
  }

  function hideLoading() 
  {
    document.getElementById('loading-bot-message').style.display = 'none';
  }

    $(document).ready(
    async function() 
    {
      const chatDiv = document.getElementById('chat');
      const inputField = document.getElementById('input');
      const chatContainer = document.getElementById('chat-container');
      const menuBtn = document.getElementById('menu-btn');
      const menu = document.getElementById('menu');
      const settingsLink = document.getElementById('settings-link');
      const settingsPage = document.getElementById('settings-page');
      const defaultPromptInput = document.getElementById('default-prompt');
      const saveSettingsBtn = document.getElementById('save-settings');
      const email = document.getElementById('header-dropdown-email');
      const username = document.getElementById('header-dropdown-username');

        var usrMng = new UserManager();
        await usrMng.loginUserWithCredentials();

        menuBtn.addEventListener('click', () => 
        {
            menu.classList.toggle('show');
        });
        
        settingsLink.addEventListener('click', async (e) => 
        {
            e.preventDefault();
            await fadeOutStartupOverlay();
            menu.classList.toggle('show');
            chatDiv.style.display = 'none';
            settingsPage.style.display = 'block';
        });
        
        saveSettingsBtn.addEventListener('click', () => 
        {
            const defaultPrompt = defaultPromptInput.value;
            const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
            CookieManager.getInstance().setCookie('theme', selectedTheme, 365);
            chatDiv.style.display = 'flex';
            settingsPage.style.display = 'none';
        });

        inputField.addEventListener('keydown', async (event) => 
        {
            if (event.key === 'Enter') 
            {
                fadeOutStartupOverlay();
                showLoading(); 
                try
                {
                    const message = inputField.value.trim();
                    if (message) 
                    {
                        const userMessage = document.createElement('div');
                        userMessage.textContent = message;
                        userMessage.classList.add('message', 'user');
                        userMessage.innerHTML = '<i class="fas fa-user message-icon"></i>' + userMessage.innerHTML;
                        chatDiv.appendChild(userMessage);
                        inputField.value = '';
                
                        const url = sessionKey
                            ? '/chat?message=' + encodeURIComponent(message) + '&session_key=' + sessionKey
                            : '/chat?message=' + encodeURIComponent(message);
                        const response = await fetch(url);
                        const data = await response.json();
                        const botMessage = document.createElement('div');
                        botMessage.textContent = data.response;
                        botMessage.classList.add('message', 'bot');
                        botMessage.innerHTML = '<i class="fas fa-robot message-icon"></i>' + botMessage.innerHTML;
                        chatDiv.appendChild(botMessage);
                        chatDiv.scrollTop = chatDiv.scrollHeight;
            
                        if (!sessionKey) 
                        {
                            sessionKey = data.session_key;
                        }
                    }
                    
                  
                    hideLoading();
                }
                catch(error)
                {
                    showErrorBotMessage();
                }
            }
        });

        email.innerHTML = usrMng.getUserObject().email;
        username.innerHTML = usrMng.getUserObject().userName;
    });