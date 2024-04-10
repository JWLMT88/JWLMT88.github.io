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

var notFoundContent = `
<div class="not-found-container">
  <div class="not-found-message">
    <h2>Oops! This side doesn't exist.</h2>
    <p>Please go back to youre <span class="side-name">Main Feed</span>.</p>
    <div onclick="window.location.href = '/#/'" class="go-back-btn">Go Back</div>
  </div>
  <div class="not-found-graphic">
    <!-- Add your graphics or animations here -->
  </div>
</div>
`;

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

var tagPageContent = `
<div class="tag-container" id="tag-container">
  <!-- Tag page content goes here -->
</div>
`
var accountPageContent = `
<div class="account-container" id="account-container">
  <!-- Tag page content goes here -->
</div>
`

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
    case '/':

      renderPage(homePageContent, 'home');
      break;
    case '/tag':
      renderPage(tagPageContent, 'tags')
    default:

      if(hash.startsWith("/@"))
      {
          renderPage(accountPageContent,'account')
      }

      renderPage(notFoundContent, 'not-found');
      break;
  }
}
  async function animateContentWrapper() 
  {
    content.classList.remove('animate-in', 'animate-out');
    void content.offsetWidth;
    this.content.classList.add('animate-out');
    await setTimeout(() => 
    {
      content.classList.remove('animate-out');
      void content.offsetWidth;
      content.classList.add('animate-in');
    }, 500);

  }
  async function renderPage(pageContent, pageName) 
  {

      await animateContentWrapper();
      setTimeout(() => {
          currentPage = pageName;
          content.innerHTML = pageContent;

          if (pageName === 'explorer') 
          {

              const posts = 
              [
                  { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
                  { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
                  { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
                  { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
                  { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
                  { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
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