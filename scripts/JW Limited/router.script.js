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

const notFoundContent = `
<div class="not-found-container">
  <div class="not-found-message">
    <h2>Oops! This page doesn't exist.</h2>
    <p>Please go back to your <span class="side-name">Main Feed</span>.</p>
    <div onclick="window.location.href = '/#/'" class="go-back-btn">Go Back</div>
  </div>
  <div class="not-found-graphic">
    <!-- Add your graphics or animations here -->
  </div>
</div>
`;

let homePageContent = `
  <div class="post-container" id="post-container">
    <!-- Home page content goes here -->
  </div>
`;

let groupsPageContent = `
  <div class="groups-container">
    <!-- Groups page content goes here -->
  </div>
`;

let explorerPageContent = `
  <div class="explorer-container" id="explorer-container">
    <div class="post-grid" id="post-grid"></div>
    <div class="load-more-btn" id="load-more-btn">Load More</div>
  </div>
`;

let tagPageContent = `
<div class="tag-container" id="tag-container">
</div>
`;

let accountPageContent = ``;

let currentPage = "home";
var content = document.getElementById('content');

function router() {
  const hash = window.location.hash.slice(1);
  console.log(`Navigating to: ${hash}`);
  content = document.getElementById('content');
  savePage();
  
  switch (hash) {
    case '/account':
      renderPage(accountPageContent, 'personal');
      break;
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
      renderPage(tagPageContent, 'tags');
      break;
    case '/account/goals':
      renderPage(groupsPageContent, 'goals');
      break;
    default:
      if (hash.startsWith("/@")) {
        renderPage(accountPageContent, 'account');
        break;
      }
      renderPage(notFoundContent, 'not-found');
      break;
  }
}

async function animateContentWrapper() {
  content.classList.remove('animate-in', 'animate-out');
  void content.offsetWidth;
  content.classList.add('animate-out');
  await new Promise(resolve => setTimeout(resolve, 500));
  content.classList.remove('animate-out');
  void content.offsetWidth;
  content.classList.add('animate-in');
}
async function renderPage(pageContent, pageName) {
  await animateContentWrapper();
  content.innerHTML = pageContent;
    currentPage = pageName;
    
    if (pageName === 'explorer') {
      const posts = [
        { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
        { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
        { id: 3, title: 'Post 3', content: 'This is the content of post 3' },
        // Add more posts as needed
      ];
      
      const explorerManager = new ExplorerManager(posts);
      explorerManager.renderPosts();
      explorerManager.setupLoadMoreButton();
    } else if (pageName === 'account') {
      const accountManager = new AccountManager(content);
    } else if (pageName === 'goals') {
      content.innerHTML = "";
      renderGoals(content);
    } else if (pageName === 'personal') {
      const personalAccountManager = new LoggedInAccountManager(content);
    }
}

function savePage() {
  switch (currentPage) {
    case 'home':
      homePageContent = content.innerHTML;
      break;
    case 'groups':
      groupsPageContent = content.innerHTML;
      break;
    case 'explorer':
      explorerPageContent = content.innerHTML;
      break;
  }
}
