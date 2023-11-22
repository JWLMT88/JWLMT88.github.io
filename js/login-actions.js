function verifyPassword() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Check if password is correct
    if (username === 'admin' && password === 'lilodev420') {
      displayDialog('Success', 'Login successful!', 'success');
         window.location.href = '/api/home';
    } else {
      displayDialog('Error', 'Invalid username or password.', 'error');
    }
  }
  
  function displayDialog(title, message, type) {
    // Create a dialog wrapper
    var dialogWrapper = document.createElement('div');
    dialogWrapper.classList.add('dialog-wrapper');
  
    // Create a dialog content
    var dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog-content');
    dialogContent.classList.add(type);
  
    // Create a dialog title
    var dialogTitle = document.createElement('h2');
    dialogTitle.textContent = title;
  
    // Create a dialog message
    var dialogMessage = document.createElement('p');
    dialogMessage.textContent = message;
  
    // Append elements to dialog content
    dialogContent.appendChild(dialogTitle);
    dialogContent.appendChild(dialogMessage);
  
    // Append dialog content to dialog wrapper
    dialogWrapper.appendChild(dialogContent);
  
    // Append dialog wrapper to body
    document.body.appendChild(dialogWrapper);
  
    // Automatically remove the dialog after a certain duration
    setTimeout(function () {
      document.body.removeChild(dialogWrapper);
    }, 2000);
  }
