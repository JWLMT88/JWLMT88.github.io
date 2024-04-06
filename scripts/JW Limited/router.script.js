/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: router.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

var homePageContent = `
  <div class="post-container" id="post-container">
    <!-- Home page content goes here -->
  </div>
`;

var groupsPageContent = `
  <div class="groups-container">
    <!-- Groups page content goes here -->
  </div>
`;

var explorerPageContent = `
    <div class="explorer-container" id="explorer-container">
    <div class="post-grid" id="post-grid"></div>
    <div class="load-more-btn">Load More</div>
    </div>
`;

// Initialize variables
var currentPage = "home";
var content = document.getElementById('content');

// Router function
function router() 
{
  const hash = window.location.hash.slice(1);
  console.log(hash)
  content = document.getElementById('content');
  savePage();

  switch (hash) 
  {
    case '/groups':
      renderPage(groupsPageContent, 'groups');
      break;
    case '/explore':
      renderPage(explorerPageContent, 'explorer');
      break;
    default:
      renderPage(homePageContent, 'home');
      break;
  }
}

async function animateContentWrapper() {
    content.classList.remove('animate-in', 'animate-out');
    void content.offsetWidth; // Trigger reflow
    this.content.classList.add('animate-out');
    await setTimeout(() => {
        content.classList.remove('animate-out');
      void content.offsetWidth; // Trigger reflow
      content.classList.add('animate-in');
    }, 500); // Wait for the fade-out animation to complete
  }

// Render page function
async function renderPage(pageContent, pageName) 
{

    await animateContentWrapper();
    await setTimeout(() => {
        currentPage = pageName;
        content.innerHTML = pageContent;

        if (pageName === 'explorer') 
        {
            const posts = [
                // Replace with your actual post data
                { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
                { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
                { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
                { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
                { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
                { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
                // Add more posts here
            ];
            
            const explorerManager = new ExplorerManager(posts);
            explorerManager.renderPosts(content);
            explorerManager.setupLoadMoreButton(content);
        }
    }, 500); 
    
}


  function savePage() 
  {
    switch (currentPage) 
    {
      case 'home':
        homePageContent = content.innerHTML;
        break;
      case 'groups':
        groupsPageContent = content.innerHTML;
        break;
      case 'explorer':
        groupHPageContent = content.innerHTML;
        break;
    }
  }