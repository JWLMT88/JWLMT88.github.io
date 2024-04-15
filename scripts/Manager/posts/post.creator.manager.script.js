const ModalManager = (function() {
    let elements = {};
  
    // Register elements
    function registerElements() 
    {
      elements.modal = document.getElementById("modal");
      elements.modalPages = document.getElementById("modalPages");
      elements.modalContent = document.getElementsByClassName("modal-content")[0];
      elements.closeBtn = document.getElementsByClassName("close-button")[0];
      elements.nextBtns = document.getElementsByClassName("modal-page");
      elements.prevBtns = document.getElementsByClassName("modal-page");
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
    }
  
    // Close modal
    function closeModal() 
    {
      elements.modal.style.display = "none";
    }
  
    // Handle page navigation
    let currentPage = 0;
    const pages = document.getElementsByClassName("modal-page");
  
    function showPage(index) 
    {
        for (let i = 0; i < pages.length; i++) 
        {
            pages[i].style.display = "none";
        }

        pages[index].style.display = "block";
        currentPage = index;
    }
  
    function handleNextPage() 
    {
      showPage(currentPage + 1);
    }
  
    function handlePrevPage() 
    {
      showPage(currentPage - 1);
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