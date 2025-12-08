document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');


    openDB().catch(console.error);

    if (loginBtn && emailInput && passwordInput) {
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const enteredEmail = emailInput.value.trim();
            const enteredPassword = passwordInput.value;

            if (!enteredEmail || !enteredPassword) {
                alert('Lütfen e-posta ve şifrenizi girin.');
                return;
            }

            try {
                const user = await getUser(enteredEmail);

                if (user && user.password === enteredPassword) {
                    alert('Giriş Başarılı!');
                    window.location.href = '../pages/index.html';
                } else {
                    alert('Giriş Başarısız! E-posta veya şifre hatalı.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Giriş yapılırken bir hata oluştu: ' + error);
            }
        });
    }
});
