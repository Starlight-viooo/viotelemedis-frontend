import axios from 'axios';

// Mengatur Axios agar secara otomatis menangani CSRF token
// dan mengirim cookie pada setiap permintaan.
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

// Perubahan Kunci:
// Memberitahu Axios untuk membaca token dari cookie bernama 'XSRF-TOKEN'
// dan menempatkannya di header bernama 'X-XSRF-TOKEN' pada permintaan berikutnya.
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export default axios;