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

class LoggedInAccountManager 
{
    constructor(container) 
    {
        this.dataManager = new PublicUserDataManager();
        this.container = container;
        this.userData = null;
        this.accountBio = null;
        this.renderAccountPage();
    }

    async loadAccountData()
    {
        
        this.userData = await this.dataManager.fetchByName(CookieManager.getInstance().getCookie("__swp_cgb_account-username"));  


        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("content-type", "application/json");
        myHeaders.append("ngrok-skip-browser-warning","true");

        const requestOptions = 
        {
            method: "GET",
            headers: myHeaders,
            header: myHeaders,
            redirect: "follow"
        };

        await fetch(requestURL + "trader/" + CookieManager.getInstance().getCookie("profileID") + "?apiKey=" + CookieManager.getInstance().getCookie("swpKey"), requestOptions)
        .then(response => 
        {
            if (response.ok) 
            {
              return response.json();
            } else 
            {
              showError();
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => 
        {
            this.accountBio = data.bio; 
        })
        .catch(error => 
        {
            showError(error);
            console.error(error);
        }); 
    }

    async renderAccountPage() 
    {
        await this.loadAccountData();

        const accountPageContainer = document.createElement('div');
        accountPageContainer.classList.add('account-page-container');

        const profilePic = document.createElement('div');
        profilePic.classList.add('account-page-profile-pic');
        profilePic.style.backgroundImage = `url(${requestURL + "content/profiles?ApiKey=" + CookieManager.getInstance().getCookie("swpKey") + "&traderID=" + CookieManager.getInstance().getCookie("profileID")})`;
        accountPageContainer.appendChild(profilePic);

        const username = document.createElement('h2');
        username.classList.add('account-page-username');
        username.textContent = CookieManager.getInstance().getCookie("__swp_cgb_account-username");
        accountPageContainer.appendChild(username);
        
        const bio = document.createElement('p');
        bio.classList.add('account-page-bio');
        bio.textContent = this.accountBio;
        accountPageContainer.appendChild(bio);

        const accountActionButton = document.createElement('div');
        accountActionButton.classList.add('account-actions');

        const editBioButton = document.createElement('button');
        editBioButton.classList.add('edit-bio-button');
        editBioButton.textContent = 'Edit';
        editBioButton.addEventListener('click', () => 
        {
            this.renderEditBioModal();
        });
        accountActionButton.appendChild(editBioButton);

        const uploadProfilePicButton = document.createElement('button');
        uploadProfilePicButton.classList.add('upload-profile-pic-button');
        uploadProfilePicButton.textContent = 'Goals';
        uploadProfilePicButton.addEventListener('click', () => 
        {
            window.location.href = "/#/account/goals"
        });
        accountActionButton.appendChild(uploadProfilePicButton);

        accountPageContainer.appendChild(accountActionButton)

        const statsContainer = document.createElement('div');
        statsContainer.classList.add('account-page-stats-container');
    
        const posts = document.createElement('div');
        posts.classList.add('account-page-stat');
        posts.innerHTML = `
          <span class="account-page-stat-count">2</span>
          <span class="account-page-stat-label">Posts</span>
        `;
        statsContainer.appendChild(posts);
    
        const followers = document.createElement('div');
        followers.classList.add('account-page-stat');
        followers.innerHTML = `
          <span class="account-page-stat-count">${this.userData.followingTraders.length}</span>
          <span class="account-page-stat-label">Followers</span>
        `;
        statsContainer.appendChild(followers);
    
        const following = document.createElement('div');
        following.classList.add('account-page-stat');
        following.innerHTML = `
          <span class="account-page-stat-count">${this.userData.followedTraders.length}</span>
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
    
        // this.userData.posts.forEach(post => {
        //   const postElement = document.createElement('div');
        //   postElement.classList.add('account-page-post');
    
        //   const postImage = document.createElement('div');
        //   postImage.classList.add('account-page-post-image');
        //   postImage.style.backgroundImage = `url(${post.image})`;
        //   postElement.appendChild(postImage);
    
        //   const previewContainer = document.createElement('div');
        //   previewContainer.classList.add('account-page-preview-container');
        //   previewContainer.innerHTML = `
        //     <div class="account-page-preview-content">
        //       <p>${post.caption}</p>
        //       <span class="likes">${post.likes} Likes</span>
        //     </div>
        //   `;
        //   postElement.appendChild(previewContainer);
    
        //   postsContainer.appendChild(postElement);
        // });

        const videosContainer = document.createElement('div');
        videosContainer.classList.add('account-page-videos-container', 'account-page-tab-content');

        // // Add your code to render videos here
        // this.userData.videos.forEach(video => {
        // const videoElement = document.createElement('div');
        // videoElement.classList.add('account-page-video');
        // videoElement.innerHTML = `
        //     <video src="${video.src}" controls></video>
        //     <p>${video.description}</p>
        // `;
        // videosContainer.appendChild(videoElement);
        // });

        const goalsContainer = document.createElement('div');
        goalsContainer.classList.add('account-page-goals-container', 'account-page-tab-content');

        // data.goals.forEach(goal => {
        // const goalElement = document.createElement('div');
        // goalElement.classList.add('account-page-goal');
        // goalElement.innerHTML = `
        //     <h3>${goal._goalName}</h3>
        //     <p>${goal._goalDescription}</p>
        //     <p>${goal._achievmentDay}</p>
        // `;
        // goalsContainer.appendChild(goalElement);
        // });
        
        accountPageContainer.appendChild(postsContainer);
        accountPageContainer.appendChild(videosContainer);
        accountPageContainer.appendChild(goalsContainer);    

        this.container.appendChild(accountPageContainer);
    }

    renderEditBioModal() 
    {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        

        const bioInput = document.createElement('textarea');
        bioInput.classList.add('bio-input');
        bioInput.value = this.userData.bio;
        modalContent.appendChild(bioInput);

        const saveButton = document.createElement('button');
        saveButton.classList.add('save-button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            this.handleBioChange(bioInput.value);
            modal.remove();
        });
        modalContent.appendChild(saveButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            modal.remove();
        });
        modalContent.appendChild(cancelButton);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    async handleBioChange(newBio) {
        try {
            await this.dataManager.updateUserBio(newBio);
            this.userData.bio = newBio;
            const bioElement = this.container.querySelector('.account-page-bio');
            bioElement.textContent = newBio;
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    }

    renderUploadProfilePicModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        modalContent.appendChild(fileInput);

        const uploadButton = document.createElement('button');
        uploadButton.classList.add('upload-button');
        uploadButton.textContent = 'Upload';
        uploadButton.addEventListener('click', () => {
            this.handleProfilePicUpload(fileInput.files[0]);
            modal.remove();
        });
        modalContent.appendChild(uploadButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            modal.remove();
        });
        modalContent.appendChild(cancelButton);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    async handleProfilePicUpload(file) {
        try {
            const uploadedPicUrl = await this.dataManager.uploadProfilePicture(file);
            this.userData.profilePicture = uploadedPicUrl;
            const profilePicElement = this.container.querySelector('.account-page-profile-pic');
            profilePicElement.style.backgroundImage = `url(${uploadedPicUrl})`;
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    }
}