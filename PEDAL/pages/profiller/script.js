document.addEventListener('DOMContentLoaded', () => {

    const menuBtn = document.querySelector('.menu-btn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebar');

    function toggleSidebar() {
        sidebarMenu.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    const notificationBtn = document.querySelector('.notification-icon');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            alert('Yeni bildiriminiz yok.');
        });
    }

    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert('Ayarlar sayfası yakında eklenecek.');
        });
    }
});
