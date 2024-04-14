/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: account.page.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

class AccountManager 
{
    constructor(container)
    {

        this.dataManager = new PublicUserDataManager();
        this.container = container;
        this.usernamePlaceholder = container.querySelector('.username');
        this.extractUsernameFromHash();
        this.accountPageContent = '';
        if(this.extractUsernameFromHash() == CookieManager.getInstance().getCookie("__swp_cgb_account-username"))
        {
           window.location.href = "/#/account"
        }
        else
        {
          this.userData = {
            videos: [
                { src: "" }
            ],
            username: this.extractUsernameFromHash(),
            bio: 'Software Engineer | Travel Enthusiast',
            profilePicture: 'https://download.cnet.com/a/img/resize/3c40bb97d902d497fdf2d81cf5e5c90fe3a80d5f/catalog/2020/04/27/68048db2-973d-4c82-b9ee-e10d6f37b9fe/imgingest-3647751081601515257.png?auto=webp&fit=crop&width=64',
            posts: [
                { image: 'https://images.ctfassets.net/b4k16c7lw5ut/37pi4T16q2gUm3xhGI4Dvx/78d0ef19ab6faef492e74edce4d285dc/image1.png?w=1920&h=1080&q=50&fm=png' },
                { image: 'https://images.ctfassets.net/b4k16c7lw5ut/37pi4T16q2gUm3xhGI4Dvx/78d0ef19ab6faef492e74edce4d285dc/image1.png?w=1920&h=1080&q=50&fm=png' },
                // Add more posts here
            ],
            followers: 1234,
            following: 567,
            };
    
            this.renderAccountPage();
        }
    }

    async renderAccountPage() 
    {
      try
      {
        var data = await this.dataManager.fetchByName(this.extractUsernameFromHash(),true,false);

        const accountPageContainer = document.createElement('div');
        accountPageContainer.classList.add('account-page-container');
    
        const profilePic = document.createElement('div');
        profilePic.classList.add('account-page-profile-pic');
        profilePic.style.backgroundImage = `url(${apiURI + `v1/content/profiles/@${this.userData.username}?ApiKey=` + CookieManager.getInstance().getCookie("swpKey")})`;
        accountPageContainer.appendChild(profilePic);
    
        const username = document.createElement('h2');
        username.classList.add('account-page-username');
        username.textContent = this.userData.username;
        accountPageContainer.appendChild(username);
    
        const statsContainer = document.createElement('div');
        statsContainer.classList.add('account-page-stats-container');
    
        const posts = document.createElement('div');
        posts.classList.add('account-page-stat');
        posts.innerHTML = `
          <span class="account-page-stat-count">${this.userData.posts.length}</span>
          <span class="account-page-stat-label">Posts</span>
        `;
        statsContainer.appendChild(posts);
    
        const followers = document.createElement('div');
        followers.classList.add('account-page-stat');
        followers.innerHTML = `
          <span class="account-page-stat-count">${data.followingTraders.length}</span>
          <span class="account-page-stat-label">Followers</span>
        `;
        statsContainer.appendChild(followers);
    
        const following = document.createElement('div');
        following.classList.add('account-page-stat');
        following.innerHTML = `
          <span class="account-page-stat-count">${data.followedTraders.length}</span>
          <span class="account-page-stat-label">Following</span>
        `;
        statsContainer.appendChild(following);
    
        accountPageContainer.appendChild(statsContainer);
    
        const tabBar = document.createElement('div');
        tabBar.classList.add('account-page-tab-bar');
    
        const postsTab = document.createElement('div');
        postsTab.classList.add('account-page-tab', 'active');
        postsTab.textContent = 'Posts';
        tabBar.appendChild(postsTab);
    
        const videosTab = document.createElement('div');
        videosTab.classList.add('account-page-tab');
        videosTab.textContent = 'Videos';
        tabBar.appendChild(videosTab);
    
        const goalsTab = document.createElement('div');
        goalsTab.classList.add('account-page-tab');
        goalsTab.textContent = 'Goals';
        tabBar.appendChild(goalsTab);
    
        accountPageContainer.appendChild(tabBar);
    
        const postsContainer = document.createElement('div');
        postsContainer.classList.add('account-page-posts-container','account-page-tab-content', 'active');
    
        this.userData.posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('account-page-post');
    
          const postImage = document.createElement('div');
          postImage.classList.add('account-page-post-image');
          postImage.style.backgroundImage = `url(${post.image})`;
          postElement.appendChild(postImage);
    
          const previewContainer = document.createElement('div');
          previewContainer.classList.add('account-page-preview-container');
          previewContainer.innerHTML = `
            <div class="account-page-preview-content">
              <p>${post.caption}</p>
              <span class="likes">${post.likes} Likes</span>
            </div>
          `;
          postElement.appendChild(previewContainer);
    
          postsContainer.appendChild(postElement);
        });

        const videosContainer = document.createElement('div');
        videosContainer.classList.add('account-page-videos-container', 'account-page-tab-content');

        // Add your code to render videos here
        this.userData.videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('account-page-video');
        videoElement.innerHTML = `
            <video src="${video.src}" controls></video>
            <p>${video.description}</p>
        `;
        videosContainer.appendChild(videoElement);
        });

        const goalsContainer = document.createElement('div');
        goalsContainer.classList.add('account-page-goals-container', 'account-page-tab-content');

        data.goals.forEach(goal => {
        const goalElement = document.createElement('div');
        goalElement.classList.add('account-page-goal');
        goalElement.innerHTML = `
            <h3>${goal._goalName}</h3>
            <p>${goal._goalDescription}</p>
            <p>${goal._achievmentDay}</p>
        `;
        goalsContainer.appendChild(goalElement);
        });
        
        accountPageContainer.appendChild(postsContainer);
        accountPageContainer.appendChild(videosContainer);
        accountPageContainer.appendChild(goalsContainer);    
        
        this.container.appendChild(accountPageContainer);
        
        this.setupTabSwitching();
      }
      catch(Ex)
      {
        
      }
        
    }
    setupTabSwitching() 
    {
      
        const tabBar = this.container.querySelector('.account-page-tab-bar');
        const tabs = tabBar.querySelectorAll('.account-page-tab');
        const tabContents = this.container.querySelectorAll('.account-page-tab-content');
    
        tabs.forEach((tab, index) => 
        {
            tab.addEventListener('click', () => 
            {
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
        
                tab.classList.add('active');
                tabContents[index].classList.add('active');
          });
        });
    }
    extractUsernameFromHash() 
    {
      const hash = window.location.hash.slice(1);
      const username = hash.split('/')[1].slice(1);
      return username;
    }
  
    displayUsername(username) 
    {
      if (this.usernamePlaceholder) 
        {
        this.usernamePlaceholder.textContent = username;
      }
    }
  }