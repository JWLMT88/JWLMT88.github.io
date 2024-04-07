/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: eplorer.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

class ExplorerManager 
{
    constructor(postData, postsPerPage = 8) 
    {
      this.posts = postData;
      this.postsPerPage = postsPerPage;
      this.currentPage = 1;
    }
  
    renderPosts(container) 
    {
      const postGridContainer = document.getElementById('post-grid');
  
      postGridContainer.innerHTML = '';
  
      const startIndex = (this.currentPage - 1) * this.postsPerPage;
      const endIndex = startIndex + this.postsPerPage;
      const postsToRender = this.posts.slice(startIndex, endIndex);
  
      postsToRender.forEach(post => 
      {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
        `;
        postGridContainer.appendChild(postElement);
      });
    }
  
    setupLoadMoreButton(container) 
    {
      const loadMoreBtn = container.querySelector('.load-more-btn');
  
      loadMoreBtn.addEventListener('click', () => 
      {
        this.currentPage++;
        this.renderPosts(container);
      });
    }
  }