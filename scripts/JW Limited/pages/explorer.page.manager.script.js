class ExplorerManager {
    constructor(postData, postsPerPage = 8) {
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
  
      postsToRender.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
        `;
        postGridContainer.appendChild(postElement);
      });
    }
  
    setupLoadMoreButton(container) {
      const loadMoreBtn = container.querySelector('.load-more-btn');
  
      loadMoreBtn.addEventListener('click', () => {
        this.currentPage++;
        this.renderPosts(container);
      });
    }
  }