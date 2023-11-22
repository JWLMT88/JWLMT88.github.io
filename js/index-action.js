var dialogContent;
var locationInput;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addFileButton").addEventListener("click", addFile);

    function addFile() {
        // Create a dialog wrapper
        var dialogWrapper = document.createElement("div");
        dialogWrapper.classList.add("dialog-wrapper");
    
        // Create a dialog content
        dialogContent = document.createElement("div");
        dialogContent.classList.add("dialog-content");
    
        // Create a dialog title
        var dialogTitle = document.createElement("h2");
        dialogTitle.textContent = "Add File";
    
        // Create input fields
        var fileNameInput = document.createElement("input");
        fileNameInput.type = "text";
        fileNameInput.placeholder = "File Name";
    
        locationInput = document.createElement("input");
        locationInput.type = "text";
        locationInput.classList.add("location-input");
        locationInput.placeholder = "Location";
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
        submitButton.textContent = "Submit";
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

    function showDirectoryOptions(directoryOptions) {
        // Create a dropdown menu to show the directory options
        var dropdownMenu = document.createElement("ul");
        dropdownMenu.classList.add("dropdown-menu");
    
        // Create an option for each directory
        directoryOptions.forEach(function(directory) {
            var option = document.createElement("li");
            option.textContent = directory;
    
            // Add event listener to select the directory when clicked
            option.addEventListener("click", function() {
                locationInput.value = directory;
                hideDirectoryOptions();
            });
    
            dropdownMenu.appendChild(option);
        });
    
        // Position the dropdown menu below the location input
        dropdownMenu.style.top = locationInput.offsetHeight + "px";
    
        // Append the dropdown menu to the dialog content
        dialogContent.appendChild(dropdownMenu);
    
        // Add event listener to hide the directory options when clicking outside the dropdown menu
        document.addEventListener("click", function(e) {
            if (!dropdownMenu.contains(e.target)) {
                hideDirectoryOptions();
            }
        });
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
      
    
    function hideDirectoryOptions() {
        // Remove the dropdown menu from the dialog content
        var dropdownMenu = document.querySelector(".dropdown-menu");
        if (dropdownMenu) {
            dropdownMenu.remove();
        }
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
      xhr.open("POST", "/api/resources/data", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Request successful, display success dialog
            displayDialog("Success", "File added successfully!", "success");
          } else {
            // Request failed, display error dialog
            displayDialog("Error", "Failed to add file.", "error");
          }
        }
      };

      xhr.send(JSON.stringify({ fileName: fileName, location: location }));

      // Remove the dialog wrapper
      var dialogWrapper = document.querySelector(".dialog-wrapper");
      document.body.removeChild(dialogWrapper);
    }
  }

  function displayDialog(title, message, type) {
    // Create a dialog wrapper
    var dialogWrapper = document.createElement("div");
    dialogWrapper.classList.add("dialog-wrapper");

    // Create a dialog content
    var dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog-content");
    dialogContent.classList.add(type);

    // Create a dialog title
    var dialogTitle = document.createElement("h2");
    dialogTitle.textContent = title;

    // Create a dialog message
    var dialogMessage = document.createElement("p");
    dialogMessage.textContent = message;

    // Create a dismiss button
    var dismissButton = document.createElement("button");
    dismissButton.textContent = "Dismiss";
    dismissButton.addEventListener("click", function() {
        // Remove the dialog wrapper
        document.body.removeChild(dialogWrapper);
    });

    // Append elements to dialog content
    dialogContent.appendChild(dialogTitle);
    dialogContent.appendChild(dialogMessage);
    dialogContent.appendChild(dismissButton);

    // Append dialog content to dialog wrapper
    dialogWrapper.appendChild(dialogContent);

    // Append dialog wrapper to body
    document.body.appendChild(dialogWrapper);
}

  
    // Get the search input element
    var searchInput = document.getElementById("searchInput");
  
    // Attach an event listener to the input event
    searchInput.addEventListener("input", function () {
      var searchValue = searchInput.value.toLowerCase();
  
      // Get all the table rows
      var rows = document.querySelectorAll(".table tbody tr");
  
      // Loop through each row and check if it matches the search value
      rows.forEach(function (row) {
        var name = row.querySelector("td:first-child").innerText.toLowerCase();
  
        if (name.includes(searchValue)) {
          // Show the row with a fade and slide animation
          fadeInSlideIn(row);
        } else {
          // Hide the row with a fade and slide animation
          fadeOutSlideOut(row);
        }
      });
    });
  
    // Function to apply fade and slide animation when showing the element
    function fadeInSlideIn(element) {
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      element.style.display = "table-row";
      setTimeout(function () {
        element.style.transition = "opacity 0.5s, transform 0.5s";
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      }, 10);
    }
  
    // Function to apply fade and slide animation when hiding the element
    function fadeOutSlideOut(element) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
      setTimeout(function () {
        element.style.transition = "opacity 0.5s, transform 0.5s";
        element.style.opacity = 0;
        element.style.transform = "translateY(-20px)";
        setTimeout(function () {
          element.style.display = "none";
        }, 500);
      }, 10);
    }
  
    // Get all the download buttons
    var downloadButtons = document.querySelectorAll(".download-link");
  
    // Attach a click event listener to each download button
  downloadButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      event.preventDefault();

      var downloadLink = this;

      // Remove existing content inside the button
      downloadLink.innerHTML = "";

      // Create a wrapper div for the animation
      var downloadWrapper = document.createElement("div");
      downloadWrapper.classList.add("download-wrapper");

      // Create a loading spinner element
      var spinner = document.createElement("div");
      spinner.classList.add("spinner");

      // Append the spinner to the wrapper
      downloadWrapper.appendChild(spinner);

      // Append the wrapper to the button
      downloadLink.appendChild(downloadWrapper);

      // Disable the button to prevent multiple clicks
      downloadLink.disabled = true;

      // Add the loading class to initiate the animation
      downloadWrapper.classList.add("loading");

      // Set a timeout to simulate a download delay
      setTimeout(function() {
        // Remove the loading class to stop the animation
        downloadWrapper.classList.remove("loading");
        downloadWrapper.removeChild(spinner);
        // Create a success checkmark element
        var checkmark = document.createElement("div");
        checkmark.classList.add("checkmark");
        checkmark.innerHTML = "<i class='bi bi-check'></i>";

        // Append the checkmark to the wrapper
        downloadWrapper.appendChild(checkmark);

        // Re-enable the button
        downloadLink.disabled = false;

        // Get the download URL from the button's href attribute
        var downloadURL = downloadLink.href;

        // Create a temporary link element
        var tempLink = document.createElement("a");
        tempLink.href = downloadURL;
        tempLink.setAttribute("download", "");

        // Trigger the click event on the temporary link element to initiate the download
        tempLink.click();

        // Clean up the temporary link element
        document.body.removeChild(tempLink);

        downloadLink.removeChild(downloadWrapper);
        // Remove the wrapper after a delay
        setTimeout(function() {
        }, 2000);


      }, 3000);
      
    });
  });
  });
  