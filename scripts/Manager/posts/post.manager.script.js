// Post Manager
const PostRenderer = (function() {
    let postId = 0; // Counter for post IDs
    let posts = []; // Array to store post data
    let currentPostIndex = 0;

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
                    <button class="post-action-btn" onclick="PostRenderer.likePost('post-${postId}')">
                        <span class="material-symbols-outlined like-icon" id="post-${postId}-like-icon">thumb_up_off</span>
                        <span class="post-action-text">Like</span>
                    </button>
                    <button class="post-action-btn" onclick="PostRenderer.commentPost(this)">
                        <span class="material-symbols-outlined">comment</span>
                        <span class="post-action-text">Comment</span>
                    </button>
                    <button class="post-action-btn" onclick="PostRenderer.sharePost(this)">
                        <span class="material-symbols-outlined">share</span>
                        <span class="post-action-text">Share</span>
                    </button>
                </div>
            </div>
        `;
        return postTemplate;
    }

    function addPost(data) {
        console.log("[PostManager (v" + swapixVersion + ")] New post data recived! : " + data)
        posts.push(data);
        renderPosts();
    }

    function renderPosts() {
        
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


    function likePost(postID) {
        const likeIcon = $Select(postID +'-like-icon');
        const isLiked = likeIcon.innerHTML === 'thumb_up';

        if (isLiked) {
            likeIcon.innerHTML = 'thumb_up_off';
        } else {
            likeIcon.innerHTML = 'thumb_up';
        }
    }

    function commentPost(postElement) {
        console.log('Comment post:', postElement);
    }

    function sharePost(postElement) {
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

