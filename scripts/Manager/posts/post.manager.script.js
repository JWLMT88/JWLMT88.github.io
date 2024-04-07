/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: post.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

const PostRenderer = (function() 
{
    let postId = 0; // Counter for post IDs
    let posts = []; // Array to store post data
    let currentPostIndex = 0;

    /*
    DATA Template of PostData (type: data)

    authorAvatar = "string" (needs to be uri);
    authorLink = "string" (needs to be uri)
    authorName = "string";
    content = "string";
    postDescription = "sting";
    tag1 = "string";
    tag2 = "string";
    tag3 = "string";
    pictureContent = "string" (needs to be uri / on swapix server)
     */

    function createPostTemplate(data) {
        postId++;
        const postTemplate = `
        <div class="post" id="post-${postId}">
            <div class="post-image">
                <img src="${data.pictureURI}" alt="Post Image">
                <div class="post-actions">
                    <button class="post-action-btn wide" onclick="PostRenderer.likePost('post-${postId}')">
                        <span class="material-symbols-outlined">thumb_up_off</span>
                        <span class="post-action-text">${data.likeCount}</span>
                    </button>
                </div> 
                <div class="post-actions-secondary">
                    <button class="post-action-btn-secondary" onclick="PostRenderer.commentPost(this)">
                        <span class="material-symbols-outlined">comment</span>
                        <span class="post-action-text">Comment</span>
                    </button>
                    <button class="post-action-btn-secondary" onclick="PostRenderer.sharePost(this)">
                        <span class="material-symbols-outlined">share</span>
                        <span class="post-action-text">Share</span>
                    </button>
                </div>
            </div>
            <div class="post-content">
                <div class="enlarge-btn">
                    <span class="material-symbols-outlined">open_in_full</span>
                </div>
                <div class="post-author">
                    <div class="author-image-container glassy-design">
                        <img src="${data.authorAvatar}" alt="Author Avatar" class="author-avatar-rounded">
                        <span class="author-name">${data.authorName}</span>
                    </div>
                </div>
                <div class="post-details">
                    <div class="post-description">
                        <p>${data.postDescription}</p>
                        <div class="post-tags">
                        <span onClick="window.location.href = '/#/tags?value=${data.tag1}'" class="post-tag">${data.tag1}</span>
                        <span onClick="window.location.href = '/#/tags?value=${data.tag2}'" class="post-tag">${data.tag2}</span>
                        <span onClick="window.location.href = '/#/tags?value=${data.tag3}'" class="post-tag">${data.tag3}</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>`;
        return postTemplate;
    }

    function addPost(data) 
    {
        console.log("[PostManager (v" + swapixVersion + ")] New post data recived! : " + data)
        posts.push(data);
        renderPosts();
    }

    function renderPosts() 
    {
        
        console.log("[PostManager (v" + swapixVersion + ")] Started rendering of new data")
        let postHTML = '';
        const endIndex = currentPostIndex + 1;

        for (let i = currentPostIndex; i < endIndex && i < posts.length; i++) 
        {
            const postTemplate = createPostTemplate(posts[i]);
            postHTML += postTemplate;
        }

        $(document).ready(function() {
            $('.post-container').each(function() {
                $(this).append(postHTML);
            });
        });
        
        console.log("[PostManager (v" + swapixVersion + ")] Rendering Complete")
        

        currentPostIndex = currentPostIndex + 1
    }


    function likePost(postID) 
    {
        const likeIcon = $Select(postID +'-like-icon');
        const isLiked = likeIcon.innerHTML === 'thumb_up';

        if (isLiked) {
            likeIcon.innerHTML = 'thumb_up_off';
        } else {
            likeIcon.innerHTML = 'thumb_up';
        }
    }

    function commentPost(postElement) 
    {
        console.log('Comment post:', postElement);
    }

    function sharePost(postElement) 
    {
        console.log('Share post:', postElement);
    }

    function removePost(postId) 
    {
        const post = document.getElementById(`post-${postId}`);
        if (post) {
            post.remove();
        }
    }

    function hidePost(postId) 
    {
        const post = document.getElementById(`post-${postId}`);
        if (post) 
        {
            post.style.display = 'none';
        }
    }

    return {
        addPost,
        renderPosts,
        likePost,
        commentPost,
        sharePost,
        removePost,
        hidePost
    };
})();

