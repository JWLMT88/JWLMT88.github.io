const ModalManager = (function() {
    let elements = {};
  
    // Register elements
    function registerElements() 
    {
      elements.modal = document.getElementById("modal");
      elements.modalPages = document.getElementById("modalPages");
      elements.modalContent = document.getElementsByClassName("modal-content")[0];
      elements.closeBtn = document.getElementsByClassName("close-button")[0];
      elements.nextBtns = document.getElementsByClassName("nextButton");
      elements.prevBtns = document.getElementsByClassName("preButton");
      elements.submitBtn = document.getElementById("submit");
      elements.fileInput = document.getElementById("fileInput");
      elements.preview = document.getElementById("preview");
      elements.canvas = document.getElementById("canvas");
      elements.tagInput = document.getElementById("tagInput");
      elements.description = document.getElementById("description");
    }
  
    // Open modal
    function openModal() 
    {
        elements.modal.style.display = "block";
        setTimeout(() => 
        {
            elements.modal.classList.add("show");
            elements.modal.querySelector(".modal-page").classList.add("show");
        }, 100);
    }
    
    function closeModal() 
    {
        elements.modal.classList.remove("show");
        const pages = document.getElementsByClassName("modal-page");
        for (let i = 0; i < pages.length; i++) 
        {
            pages[i].classList.remove("show");
        }
        setTimeout(() => {
            elements.modal.style.display = "none";
            currentPage_M = 0;
            showPage(0);
        },100)
        
    }

  
    // Handle page navigation
    let currentPage_M = 0;

    function showPage(index) 
    {
        const pages = document.getElementsByClassName("modal-page");

        for (let i = 0; i < pages.length; i++) 
        {
            pages[i].classList.remove("show");
            setTimeout(() => 
            {
                pages[i].style.display = "none"
            });
        }
        console.log(index, pages)
        setTimeout(() => 
        {
            pages[index].style.display = "block";
            setTimeout(() => 
            {
                pages[index].classList.add("show");
            },100);
        }, 100);

        currentPage_M = index;
    }
  
    function handleNextPage() 
    {
      showPage(currentPage_M + 1);
    }
  
    function handlePrevPage() 
    {
      showPage(currentPage_M - 1);
    }
  
    // Handle file upload and preview
    function handleFileUpload() 
    {
        const file = elements.fileInput.files[0];
        const reader = new FileReader();
    
        reader.onload = function() 
        {
            elements.preview.src = reader.result;
            elements.preview.style.display = "block";
    
            // Draw image on canvas for editing
            const img = new Image();
            img.onload = function() 
            {
                elements.canvas.width = img.width;
                elements.canvas.height = img.height;
                const ctx = elements.canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
            }
            img.src = reader.result;
        }
    
        if (file) 
        {
            reader.readAsDataURL(file);
        }
    }
  
    // Handle form submission
    function handleSubmit() 
    {
        const tags = elements.tagInput.value.split(",");
        const description = elements.description.value;
    
        // TODO: Send data to server for processing
        console.log("Tags:", tags);
        console.log("Description:", description);
    
        // Close modal
        closeModal();
    }
  
    // Close modal when clicking outside
    function handleOutsideClick(event) 
    {
        if (event.target == elements.modal) 
        {
            closeModal();
        }
    }
  
    // Initialize
    function init() 
    {
        registerElements();
        document.getElementById("openPostCreatorButton").onclick = openModal;
        elements.closeBtn.onclick = closeModal;
    
        for (let i = 0; i < elements.nextBtns.length; i++) 
        {
            elements.nextBtns[i].onclick = handleNextPage;
        }
    
        for (let i = 0; i < elements.prevBtns.length; i++) 
        {
            elements.prevBtns[i].onclick = handlePrevPage;
        }
    
        elements.submitBtn.onclick = handleSubmit;
        elements.fileInput.onchange = handleFileUpload;
        window.onclick = handleOutsideClick;
    }
  
    return {
      init: init
    }
  })();