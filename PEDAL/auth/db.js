const DB_NAME = 'PedalAppDB';
const DB_VERSION = 1;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.error);
            reject('Database error');
        };

        request.onsuccess = (event) => {
            console.log('Database opened successfully');
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('users')) {
                const objectStore = db.createObjectStore('users', { keyPath: 'email' });

                console.log('Object store "users" created');
            }
        };
    });
}

function saveUserToDB(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');

            user.createdAt = new Date().toISOString();

            const request = store.add(user);

            request.onsuccess = () => {
                console.log('User saved to IndexedDB');
                resolve(true);
            };

            request.onerror = (event) => {
                if (event.target.error.name === 'ConstraintError') {
                    reject('Bu e-posta adresi ile zaten bir kayıt mevcut.');
                } else {
                    console.error('Save error:', event.target.error);
                    reject('Kayıt sırasında bir hata oluştu.');
                }
            };

            transaction.oncomplete = () => {
                db.close();
            };
        } catch (error) {
            reject(error);
        }
    });
}

function getUser(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const request = store.get(email);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                console.error('Get user error:', event.target.error);
                reject('Kullanıcı bilgileri alınamadı.');
            };

            transaction.oncomplete = () => {
                db.close();
            };
        } catch (error) {
            reject(error);
        }
    });
}
