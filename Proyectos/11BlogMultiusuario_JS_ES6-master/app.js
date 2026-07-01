class BlogApp {
  constructor() {
    this.users = [
      { id: 1, name: 'Jorge Fuentes', username: 'jfuentes', email: 'jorge@email.com', password: 'pass123' },
      { id: 2, name: 'Maria García', username: 'mgarcia', email: 'maria@email.com', password: 'pass456' }
    ];

    this.posts = [
      {
        id: 1,
        authorId: 1,
        title: 'Introducción a JavaScript ES6',
        content: 'JavaScript ES6 (ECMAScript 2015) introducen características revolucionarias...',
        category: 'tecnologia',
        tags: ['javascript', 'es6', 'web'],
        date: new Date(Date.now() - 86400000),
        views: 234,
        likes: 45,
        comments: []
      },
      {
        id: 2,
        authorId: 2,
        title: 'La mejor ruta por Europa',
        content: 'Después de visitar 15 países, aquí está mi guía completa...',
        category: 'viajes',
        tags: ['europa', 'viajes', 'tips'],
        date: new Date(Date.now() - 172800000),
        views: 156,
        likes: 32,
        comments: []
      }
    ];

    this.currentUser = null;
    this.currentPostId = null;
    this.storage = {
      users: 'blog-users',
      posts: 'blog-posts',
      currentUser: 'blog-current-user'
    };

    this.init();
  }

  init() {
    console.log('Inicializando BlogHub...');
    this.loadData();
    this.setupEventListeners();
    this.checkUserSession();
  }

  setupEventListeners() {
    // Auth
    document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));

    // Main
    document.getElementById('newPostBtn').addEventListener('click', () => this.openPostModal());
    document.getElementById('adminBtn').addEventListener('click', () => this.toggleAdminView());
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

    // Modals
    document.getElementById('closePostModal').addEventListener('click', () => this.closePostModal());
    document.getElementById('postForm').addEventListener('submit', (e) => this.handlePostSubmit(e));
    document.getElementById('closePostDetailModal').addEventListener('click', () => this.closePostDetail());
    document.getElementById('commentForm').addEventListener('submit', (e) => this.handleCommentSubmit(e));

    // Filters
    document.getElementById('searchPosts').addEventListener('input', (e) => this.filterPosts());
    document.getElementById('categoryFilter').addEventListener('change', () => this.filterPosts());
    document.getElementById('sortFilter').addEventListener('change', () => this.filterPosts());
    document.getElementById('clearFiltersBtn').addEventListener('click', () => this.clearFilters());

    // Admin tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchAdminTab(e.target.dataset.tab));
    });

    document.getElementById('backFromAdminBtn').addEventListener('click', () => this.toggleAdminView());
  }

  // ===== AUTH =====
  handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      this.currentUser = user;
      localStorage.setItem(this.storage.currentUser, JSON.stringify(user));
      this.showApp();
      this.showNotification('✅ Sesión iniciada correctamente');
    } else {
      this.showNotification('⚠️ Usuario o contraseña incorrectos');
    }
  }

  handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (this.users.find(u => u.username === username)) {
      this.showNotification('⚠️ El usuario ya existe');
      return;
    }

    const newUser = {
      id: this.users.length + 1,
      name,
      username,
      email,
      password
    };

    this.users.push(newUser);
    this.saveData();
    this.currentUser = newUser;
    localStorage.setItem(this.storage.currentUser, JSON.stringify(newUser));
    this.showApp();
    this.showNotification('✅ Cuenta creada correctamente');
  }

  switchAuth(page) {
    document.querySelectorAll('.auth-page').forEach(p => p.classList.remove('active'));
    document.getElementById(`${page}Page`).classList.add('active');
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.storage.currentUser);
    this.hideApp();
    this.showNotification('👋 Sesión cerrada');
  }

  checkUserSession() {
    const user = localStorage.getItem(this.storage.currentUser);
    if (user) {
      this.currentUser = JSON.parse(user);
      this.showApp();
    }
  }

  // ===== POSTS =====
  handlePostSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const category = document.getElementById('postCategory').value;
    const tags = document.getElementById('postTags').value.split(',').map(t => t.trim()).filter(t => t);

    const post = {
      id: Date.now(),
      authorId: this.currentUser.id,
      title,
      content,
      category,
      tags,
      date: new Date(),
      views: 0,
      likes: 0,
      comments: []
    };

    this.posts.push(post);
    this.saveData();
    this.closePostModal();
    this.renderPosts();
    this.showNotification('✅ Post publicado exitosamente');
  }

  openPostModal() {
    document.getElementById('postForm').reset();
    document.getElementById('postModalTitle').textContent = '✍️ Crear Nuevo Post';
    document.getElementById('postModal').classList.remove('hidden');
  }

  closePostModal() {
    document.getElementById('postModal').classList.add('hidden');
  }

  renderPosts() {
    const grid = document.getElementById('postsGrid');
    const posts = this.getFilteredPosts();

    grid.innerHTML = posts.map(post => {
      const author = this.users.find(u => u.id === post.authorId);
      return `
        <div class="post-card" onclick="app.openPostDetail(${post.id})">
          <div class="post-header">
            <span class="post-category">${post.category}</span>
            <div class="post-title">${post.title}</div>
          </div>
          <p class="post-excerpt">${post.content.substring(0, 100)}...</p>
          <div class="post-footer">
            <span class="post-author">${author?.name}</span>
            <div class="post-stats">
              <span>👁️ ${post.views}</span>
              <span>❤️ ${post.likes}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  getFilteredPosts() {
    const search = document.getElementById('searchPosts').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const sort = document.getElementById('sortFilter').value;

    let filtered = this.posts.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search) || p.content.toLowerCase().includes(search);
      const matchCategory = !category || p.category === category;
      return matchSearch && matchCategory;
    });

    // Ordenar
    switch (sort) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }

  filterPosts() {
    this.renderPosts();
  }

  clearFilters() {
    document.getElementById('searchPosts').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('sortFilter').value = 'recent';
    this.renderPosts();
  }

  openPostDetail(postId) {
    const post = this.posts.find(p => p.id === postId);
    const author = this.users.find(u => u.id === post.authorId);

    this.currentPostId = postId;

    const detail = document.getElementById('postDetail');
    detail.innerHTML = `
      <h1>${post.title}</h1>
      <div class="post-detail-meta">
        <span>Por <strong>${author?.name}</strong></span>
        <span>${new Date(post.date).toLocaleDateString('es-ES')}</span>
        <span>👁️ ${post.views} vistas</span>
      </div>
      <div class="post-detail-content">${post.content}</div>
      <div class="post-detail-tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    `;

    this.renderComments(post.id);
    document.getElementById('postDetailModal').classList.remove('hidden');
  }

  closePostDetail() {
    document.getElementById('postDetailModal').classList.add('hidden');
  }

  // ===== COMMENTS =====
  renderComments(postId) {
    const post = this.posts.find(p => p.id === postId);
    const container = document.getElementById('commentsList');

    if (!post.comments || post.comments.length === 0) {
      container.innerHTML = '<p class="empty-state">Sin comentarios aún. ¡Sé el primero!</p>';
      return;
    }

    container.innerHTML = post.comments.map(comment => {
      const author = this.users.find(u => u.id === comment.authorId);
      return `
        <div class="comment">
          <div class="comment-author">${author?.name}</div>
          <div class="comment-date">${new Date(comment.date).toLocaleDateString('es-ES')}</div>
          <div class="comment-text">${comment.text}</div>
        </div>
      `;
    }).join('');
  }

  handleCommentSubmit(e) {
    e.preventDefault();
    const text = document.getElementById('commentText').value;

    const post = this.posts.find(p => p.id === this.currentPostId);
    if (!post.comments) post.comments = [];

    post.comments.push({
      id: Date.now(),
      authorId: this.currentUser.id,
      text,
      date: new Date()
    });

    this.saveData();
    document.getElementById('commentForm').reset();
    this.renderComments(this.currentPostId);
    this.showNotification('✅ Comentario publicado');
  }

  // ===== ADMIN =====
  toggleAdminView() {
    document.getElementById('blogView').classList.toggle('hidden');
    document.getElementById('adminView').classList.toggle('active');

    if (document.getElementById('adminView').classList.contains('active')) {
      this.renderAdminView();
    }
  }

  renderAdminView() {
    this.renderMyPosts();
    this.renderUsers();
    this.renderAdminComments();
    this.renderStats();
  }

  renderMyPosts() {
    const container = document.getElementById('myPostsList');
    const myPosts = this.posts.filter(p => p.authorId === this.currentUser.id);

    container.innerHTML = myPosts.map(post => `
      <div class="list-item">
        <div class="list-item-title">${post.title}</div>
        <div class="list-item-info">
          ${new Date(post.date).toLocaleDateString('es-ES')} | 👁️ ${post.views} vistas | ❤️ ${post.likes} likes
        </div>
      </div>
    `).join('') || '<p class="empty-state">Sin posts aún</p>';
  }

  renderUsers() {
    const container = document.getElementById('usersList');
    container.innerHTML = this.users.map(user => `
      <div class="list-item">
        <div class="list-item-title">${user.name} (@${user.username})</div>
        <div class="list-item-info">${user.email}</div>
      </div>
    `).join('');
  }

  renderAdminComments() {
    const container = document.getElementById('commentsList');
    const myPosts = this.posts.filter(p => p.authorId === this.currentUser.id);
    const allComments = myPosts.flatMap(post => 
      (post.comments || []).map(c => ({ ...c, postTitle: post.title }))
    );

    container.innerHTML = allComments.map(comment => {
      const author = this.users.find(u => u.id === comment.authorId);
      return `
        <div class="list-item">
          <div class="list-item-title">En: "${comment.postTitle}"</div>
          <div class="list-item-info">${author?.name}: "${comment.text.substring(0, 50)}..."</div>
        </div>
      `;
    }).join('') || '<p class="empty-state">Sin comentarios</p>';
  }

  renderStats() {
    const myPosts = this.posts.filter(p => p.authorId === this.currentUser.id);
    const totalComments = myPosts.reduce((acc, p) => acc + (p.comments?.length || 0), 0);
    const totalViews = myPosts.reduce((acc, p) => acc + p.views, 0);
    const totalLikes = myPosts.reduce((acc, p) => acc + p.likes, 0);

    document.getElementById('statPosts').textContent = myPosts.length;
    document.getElementById('statComments').textContent = totalComments;
    document.getElementById('statViews').textContent = totalViews;
    document.getElementById('statLikes').textContent = totalLikes;
  }

  switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(`${tab}Tab`).classList.add('active');
  }

  // ===== UI =====
  showApp() {
    document.getElementById('authPages').style.display = 'none';
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('userDisplay').textContent = this.currentUser.name;
    this.renderPosts();
  }

  hideApp() {
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('authPages').style.display = 'flex';
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
  }

  showNotification(message) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    text.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }

  // ===== DATA =====
  saveData() {
    localStorage.setItem(this.storage.users, JSON.stringify(this.users));
    localStorage.setItem(this.storage.posts, JSON.stringify(this.posts));
  }

  loadData() {
    const users = localStorage.getItem(this.storage.users);
    const posts = localStorage.getItem(this.storage.posts);

    if (users) this.users = JSON.parse(users);
    if (posts) this.posts = JSON.parse(posts);
  }
}

let app;

document.addEventListener('DOMContentLoaded', () => {
  app = new BlogApp();
});
