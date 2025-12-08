document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const phoneInput = document.getElementById('phone');
    const tcknInput = document.getElementById('tckn');
    const birthdateInput = document.getElementById('birthdate');


    phoneInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');

        if (!val.startsWith('90')) {
            if (val.startsWith('0')) val = '9' + val;
            else val = '90' + val;
        }


        val = val.slice(0, 12);


        let formatted = '+90';
        if (val.length > 2) {
            formatted += ' (' + val.slice(2, 5);
        }
        if (val.length > 5) {
            formatted += ') ' + val.slice(5, 8);
        }
        if (val.length > 8) {
            formatted += ' ' + val.slice(8, 10);
        }
        if (val.length > 10) {
            formatted += ' ' + val.slice(10, 12);
        }


        if (val === '90' && e.inputType === 'deleteContentBackward') {
            formatted = '';
        }

        e.target.value = formatted;
    });


    phoneInput.addEventListener('focus', () => {
        if (phoneInput.value === '') phoneInput.value = '+90 ';
    });


    tcknInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
    });


    birthdateInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');

        if (val.length > 2) {
            val = val.slice(0, 2) + '/' + val.slice(2);
        }
        if (val.length > 5) {
            val = val.slice(0, 5) + '/' + val.slice(5);
        }

        if (val.length > 10) {
            val = val.slice(0, 10);
        }

        e.target.value = val;

    });

    const termsLink = document.getElementById('termsLink');
    const termsModal = document.getElementById('termsModal');
    const closeModal = document.getElementById('closeModal');
    const approveTerms = document.getElementById('approveTerms');
    const termsCheckbox = document.getElementById('terms');
    let termsViewed = false;

    if (termsLink && termsModal) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.classList.add('active');
            termsViewed = true;
        });

        const closeTermsModal = () => {
            termsModal.classList.remove('active');
        };

        if (closeModal) {
            closeModal.addEventListener('click', closeTermsModal);
        }

        if (approveTerms) {
            approveTerms.addEventListener('click', (e) => {
                e.preventDefault();
                termsCheckbox.checked = true;
                termsViewed = true;
                closeTermsModal();
            });
        }

        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                closeTermsModal();
            }
        });

        if (termsCheckbox) {
            termsCheckbox.addEventListener('click', (e) => {
                if (!termsViewed) {
                    e.preventDefault();
                    alert('Lütfen önce Kullanım Koşulları ve Gizlilik Sözleşmesini okuyun.');
                }
            });
        }
    }

    const messageModal = document.getElementById('messageModal');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');
    const messageIcon = document.getElementById('messageIcon');
    const messageOkBtn = document.getElementById('messageOkBtn');

    function showMessageModal(title, message, isSuccess = true) {
        return new Promise((resolve) => {
            if (messageModal) {
                messageTitle.textContent = title;
                messageText.textContent = message;

                if (isSuccess) {
                    messageIcon.innerHTML = `
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" stroke="#22C55E" stroke-width="4"/>
                            <path d="M14 24L21 31L34 17" stroke="#22C55E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`;
                } else {
                    messageIcon.innerHTML = `
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" stroke="#EF4444" stroke-width="4"/>
                            <path d="M16 16L32 32M32 16L16 32" stroke="#EF4444" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`;
                }

                messageModal.classList.add('active');

                const closeHandler = () => {
                    messageModal.classList.remove('active');
                    messageOkBtn.removeEventListener('click', closeHandler);
                    resolve();
                };

                messageOkBtn.addEventListener('click', closeHandler);
            } else {
                alert(message);
                resolve();
            }
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            await showMessageModal('Hata', 'Şifreler eşleşmiyor!', false);
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());



        const urlParams = new URLSearchParams(window.location.search);
        const roleParam = urlParams.get('role');
        const roleInput = document.getElementById('role');
        if (roleParam && (roleParam === 'renter' || roleParam === 'lessor')) {
            if (roleInput) roleInput.value = roleParam;
        }

        const newUser = {
            role: document.getElementById('role').value,
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value,
            birthdate: document.getElementById('birthdate').value,
            tckn: document.getElementById('tckn').value,
            password: password,
            terms: document.getElementById('terms').checked,
            campaigns: document.getElementById('campaigns').checked
        };

        try {
            await saveUserToDB(newUser);

            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });

                if (!response.ok) {
                    console.warn('Server sync failed:', await response.text());
                }
            } catch (fetchError) {
                console.warn('Server not reachable, working in offline mode.');
            }

            await showMessageModal('Kayıt Başarılı', 'Aramıza hoş geldin! Giriş yapabilirsin.');
            window.location.href = 'login.html';

        } catch (error) {
            console.error('Error:', error);
            if (typeof error === 'string') {
                await showMessageModal('Hata', error, false);
            } else {
                await showMessageModal('Hata', 'Beklenmedik bir hata oluştu.', false);
            }
        }
    });
});
