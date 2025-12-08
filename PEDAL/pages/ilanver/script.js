document.addEventListener('DOMContentLoaded', () => {

    const hourlyPriceInput = document.getElementById('hourlyPrice');
    const dailyPriceInput = document.getElementById('dailyPrice');
    const createAdForm = document.getElementById('createAdForm');

    const photoGrid = document.querySelector('.photo-grid');

    function setupPhotoGrid() {

        photoGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-photo-btn');
            if (btn) {
                const box = btn.closest('.photo-upload-box');
                const fileInput = box.querySelector('input[type="file"]');
                if (fileInput) {
                    fileInput.click();
                }
            }
        });

        photoGrid.addEventListener('change', (e) => {
            if (e.target.matches('input[type="file"]')) {
                handleFileSelect(e.target);
            }
        });
    }

    function handleFileSelect(inputElement) {
        if (inputElement.files && inputElement.files[0]) {
            const reader = new FileReader();
            const box = inputElement.closest('.photo-upload-box');

            reader.onload = function (e) {
                box.style.backgroundImage = `url(${e.target.result})`;
                box.style.backgroundSize = 'cover';
                box.style.backgroundPosition = 'center';
                box.classList.add('filled');

                const btn = box.querySelector('.add-photo-btn');
                if (btn) btn.style.display = 'none';

                const nextPlaceholder = photoGrid.querySelector('.photo-placeholder');
                if (nextPlaceholder) {
                    convertPlaceholderToUpload(nextPlaceholder);
                }
            }
            reader.readAsDataURL(inputElement.files[0]);
        }
    }

    function convertPlaceholderToUpload(placeholderElement) {
        const newBox = document.createElement('div');
        newBox.className = 'photo-upload-box active';

        newBox.innerHTML = `
            <input type="file" accept="image/*" hidden>
            <button type="button" class="add-photo-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 12H19" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="btn-text">Fotoğraf Ekle</span>
            </button>
        `;

        photoGrid.replaceChild(newBox, placeholderElement);
    }

    setupPhotoGrid();


    const DAILY_MULTIPLIER = 24;

    hourlyPriceInput.addEventListener('input', (e) => {
        const hourlyVal = parseFloat(e.target.value);
        if (!isNaN(hourlyVal) && hourlyVal > 0) {
            dailyPriceInput.value = (hourlyVal * DAILY_MULTIPLIER).toFixed(0);
        } else {
            dailyPriceInput.value = '';
        }
    });

    createAdForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!createAdForm.checkValidity()) {
            alert('Lütfen tüm zorunlu alanları doldurun.');
            return;
        }

        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Yükleniyor...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('İlanınız başarıyla oluşturuldu ve ödeme sayfasına yönlendiriliyorsunuz!');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            window.location.href = '../payment/index.html';
        }, 1500);
    });

    const modal = document.getElementById("mapModal");
    const btn = document.getElementById("openMapBtn");
    const span = document.getElementsByClassName("close-modal")[0];
    const confirmBtn = document.querySelector(".confirm-location-btn");
    const locationInput = document.querySelector(".location-input");

    if (btn) {
        btn.addEventListener('click', () => {
            modal.style.display = "flex";
        });
    }

    if (span) {
        span.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (locationInput.value === '') {
                locationInput.value = "Seçilen Konum, İstanbul";
            }
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

});
