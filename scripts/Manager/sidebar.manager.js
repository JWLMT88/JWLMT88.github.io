const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
const sidebar = document.querySelector('.sidebar');

sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarToggleBtn.classList.toggle('open');
});