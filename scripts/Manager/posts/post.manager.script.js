// Post Manager
const PostRenderer = (function() {
    let postId = 0; // Counter for post IDs
    let posts = []; // Array to store post data
    let currentPostIndex = 0; // Index of the next post to be displayed
    const postsPerLoad = 5; // Number of posts to load initially and on each scroll

    function createPostTemplate(data) {
        postId++;
        const postTemplate = `
            <div class="post" id="post-${postId}">
                <div class="post-header">
                    <div class="post-author">
                        <img src="${data.authorAvatar}" alt="Author Avatar" class="author-avatar">
                        <div class="author-info">
                            <h4 class="author-name">${data.authorName}</h4>
                            <small class="post-timestamp">${data.timestamp}</small>
                        </div>
                    </div>
                    <div class="post-options">
                        <span class="material-symbols-outlined">more_vert</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${data.content}</p>
                </div>
                <div class="post-actions">
                    <button class="post-action-btn" onclick="PostManager.likePost(this)">
                        <span class="material-symbols-outlined like-icon">thumb_up_off</span>
                        <span class="post-action-text">Like</span>
                    </button>
                    <button class="post-action-btn" onclick="PostManager.commentPost(this)">
                        <span class="material-symbols-outlined">comment</span>
                        <span class="post-action-text">Comment</span>
                    </button>
                    <button class="post-action-btn" onclick="PostManager.sharePost(this)">
                        <span class="material-symbols-outlined">share</span>
                        <span class="post-action-text">Share</span>
                    </button>
                </div>
            </div>
        `;
        return postTemplate;
    }

    function addPost(data) {
        posts.push(data);
        renderPosts();
    }

    function renderPosts() {
        let postHTML = '';
        const endIndex = currentPostIndex + postsPerLoad;

        for (let i = currentPostIndex; i < endIndex && i < posts.length; i++) {
            const postTemplate = createPostTemplate(posts[i]);
            postHTML += postTemplate;
        }

        $(`.post-container`).then((containers) => {
            containers.forEach((container) => {
                container.insertAdjacentHTML('beforeend', postHTML);
            });
        });

        currentPostIndex += postsPerLoad;
    }


    function likePost(postElement) {
        const likeIcon = postElement.querySelector('.like-icon');
        const isLiked = likeIcon.innerHTML === 'thumb_up';

        if (isLiked) {
            likeIcon.innerHTML = 'thumb_up_off';
            // Add your logic for unliking a post here
        } else {
            likeIcon.innerHTML = 'thumb_up';
            // Add your logic for liking a post here
        }
    }

    function commentPost(postElement) {
        // Add your logic for commenting on a post here
        console.log('Comment post:', postElement);
    }

    function sharePost(postElement) {
        // Add your logic for sharing a post here
        console.log('Share post:', postElement);
    }

    function removePost(postId) {
        const post = document.getElementById(`post-${postId}`);
        if (post) {
            post.remove();
        }
    }

    function hidePost(postId) {
        const post = document.getElementById(`post-${postId}`);
        if (post) {
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

