document.addEventListener('DOMContentLoaded', () => {

    const rentBtn = document.getElementById('rentBtn');
    const askBtn = document.getElementById('askBtn');

    if (rentBtn) {
        rentBtn.addEventListener('click', () => {
            window.location.href = '../payment/index.html';
        });
    }

    if (askBtn) {
        askBtn.addEventListener('click', () => {
            alert('Mesajlaşma özelliği yakında eklenecek!');
        });
    }

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

    const sellerProfileBtn = document.getElementById('sellerProfileBtn');
    const profileModal = document.getElementById('profileModal');
    const closeProfileModal = document.getElementById('closeProfileModal');

    function toggleProfileModal() {
        if (profileModal.style.display === 'flex') {
            profileModal.style.display = 'none';
        } else {
            profileModal.style.display = 'flex';
        }
    }

    if (sellerProfileBtn) {
        sellerProfileBtn.addEventListener('click', toggleProfileModal);
    }

    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', toggleProfileModal);
    }

    if (profileModal) {
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                toggleProfileModal();
            }
        });
    }

    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModal = document.getElementById('closeSettingsModal');

    function toggleSettingsModal() {
        if (settingsModal.style.display === 'flex') {
            settingsModal.style.display = 'none';
        } else {
            settingsModal.style.display = 'flex';
        }
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', toggleSettingsModal);
    }

    if (closeSettingsModal) {
        closeSettingsModal.addEventListener('click', toggleSettingsModal);
    }

    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                toggleSettingsModal();
            }
        });
    }

});
