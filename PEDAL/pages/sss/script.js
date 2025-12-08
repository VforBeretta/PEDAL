document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.querySelector('.contact-card:nth-child(2) .action-btn');
    const supportBtn = document.querySelector('.contact-card:nth-child(3) .action-btn');

    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatBtn.textContent = 'Sohbet Yükleniyor...';
            chatBtn.style.backgroundColor = '#7ab040';
            setTimeout(() => {
                alert('Sohbet arayüzüne yönlendiriliyorsunuz...');
                chatBtn.textContent = 'Sohbet başlat / Sohbeti görüntüle';
                chatBtn.style.backgroundColor = '';
            }, 500);
        });
    }

    if (supportBtn) {
        supportBtn.addEventListener('click', () => {
            alert('Destek talebi formu açılıyor...');
        });
    }

    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
