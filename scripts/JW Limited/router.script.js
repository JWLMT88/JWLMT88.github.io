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
  <div class="explorer-container">
    <!-- Group H page content goes here -->
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

// Render page function
function renderPage(pageContent, pageName) {
  currentPage = pageName;
  content.innerHTML = pageContent;
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