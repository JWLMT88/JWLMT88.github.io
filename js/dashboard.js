document.addEventListener("DOMContentLoaded", function () {
  const settingsButton = document.getElementById("settingsButton");
  const settingsDropdown = document.getElementById("settingsDropdown");
  document.getElementById("addProjectButton").addEventListener("click", addFile);

  function addFile() {
      // Create a dialog wrapper
      var dialogWrapper = document.createElement("div");
      dialogWrapper.classList.add("dialog-wrapper");
  
      // Create a dialog content
      dialogContent = document.createElement("div");
      dialogContent.classList.add("dialog-content");
  
      // Create a dialog title
      var dialogTitle = document.createElement("h2");
      dialogTitle.textContent = "Add Project";
  
      // Create input fields
      var fileNameInput = document.createElement("input");
      fileNameInput.type = "text";
      fileNameInput.placeholder = "Project Name";
  
      locationInput = document.createElement("input");
      locationInput.type = "text";
      locationInput.classList.add("location-input");
      locationInput.placeholder = "Directory";
      locationInput.value = getCurrentDirectory();
  
      // Create the dropdown button
      var dropdownButton = document.createElement("button");
      dropdownButton.classList.add("dropdown-button");
      dropdownButton.innerHTML = "&#x25BE;";
  
      // Add event listener to show directory options when clicked
      dropdownButton.addEventListener("click", function() {
          var directoryOptions = getDirectoryOptions(locationInput.value);
          showDirectoryOptions(directoryOptions);
      });
  
      // Create buttons
      var cancelButton = document.createElement("button");
      cancelButton.classList.add("bottom-button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", cancelAddFile);
  
      var submitButton = document.createElement("button");
      submitButton.textContent = "Create";
      submitButton.classList.add("bottom-button");
      submitButton.addEventListener("click", submitAddFile);
  
      // Append elements to dialog content
      dialogContent.appendChild(dialogTitle);
      dialogContent.appendChild(fileNameInput);
      dialogContent.appendChild(locationInput);
      //dialogContent.appendChild(dropdownButton);
      dialogContent.appendChild(cancelButton);
      dialogContent.appendChild(submitButton);
  
      // Append dialog content to dialog wrapper
      dialogWrapper.appendChild(dialogContent);
  
      // Append dialog wrapper to body
      document.body.appendChild(dialogWrapper);

      
  }

  
  function getCurrentDirectory() {
    // Replace this with your own logic to get the current directory
    // For example, you can use the current URL or any other means to determine the current directory
    return "C:/LILO/dist";
}


function getDirectoryOptions(directory) {
    // Make an AJAX request to the server-side endpoint to get the subdirectories
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/directory?directory=" + encodeURIComponent(directory), false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  
    if (xhr.status === 200) {
      // Parse the response JSON
      var response = JSON.parse(xhr.responseText);
      var subdirectories = response.subdirectories;
  
      // Return the subdirectories as an array
      return Array.isArray(subdirectories) ? subdirectories : [];
    } else {
      // Error occurred, return an empty array
      return [];
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
   function cancelAddFile() {
      // Remove the dialog wrapper
      var dialogWrapper = document.querySelector(".dialog-wrapper");
      document.body.removeChild(dialogWrapper);
    }

  function submitAddFile() {
    var fileName = document.querySelector(".dialog-content input[type='text']").value;
    var location = document.querySelector(".dialog-content input[type='text']:last-of-type").value;

    // Validate user input
    if (fileName && location) {
      // Make an AJAX request to the server-side endpoint
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/projects/data", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Request successful, display success dialog
            displayDialog("Success", "Project created successfully!", "success");
          } else {
            // Request failed, display error dialog
            displayDialog("Error", "Failed to create Project.", "error");
          }
        }
      };

      xhr.send(JSON.stringify({ fileName: fileName, location: location }));

      // Remove the dialog wrapper
      var dialogWrapper = document.querySelector(".dialog-wrapper");
      document.body.removeChild(dialogWrapper);
    }
  }


  settingsButton.addEventListener("click", function () {
    settingsDropdown.classList.toggle("show-dropdown");
  });
  const userPreference = localStorage.getItem('darkMode');

  
  // If the preference exists in localStorage, apply it
  if (userPreference) {
    document.body.classList.toggle('dark-mode', userPreference === 'true');
  }

  // Function to toggle the dark mode
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Check if the body has the dark-mode class
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Save the user's preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }

  // Add event listener to the dark mode switch
  const darkModeSwitch = document.querySelector('.dark-mode-switch input');
  darkModeSwitch.addEventListener('change', toggleDarkMode);


});


