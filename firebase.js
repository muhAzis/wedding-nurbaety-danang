import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js';
import { getDatabase, ref, get, set, child, update, remove } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SECRET_API_KEY,
  authDomain: import.meta.env.VITE_SECRET_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_SECRET_DB_URL,
  projectId: 'weddingweb-89681',
  storageBucket: 'weddingweb-89681.appspot.com',
  messagingSenderId: '295396365536',
  appId: '1:295396365536:web:0042354c6015a09461ec85',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Form elements
const form = document.getElementById('commentForm');
const nameForm = document.getElementById('name');
const addressForm = document.getElementById('address');
const commentForm = document.getElementById('comment');
const submitForm = document.getElementById('submitBtn');
const submitIcon = document.querySelector('#submitBtn lord-icon');
const commentsContainer = document.querySelector('#comments #commentSection .comments-container');
const commentsCount = document.querySelector('#comments .comments-count');

// Get data from Firebase
const getData = async () => {
  const dbref = ref(db);

  await get(child(dbref, 'comments/')).then((data) => {
    if (!data) {
      return alert('Website tidak terunduh sepenuhnya, mohon refresh halaman!');
    }

    const dataComments = Object.keys(data.val()).map((key) => data.val()[key]);
    dataComments.sort((a, b) => {
      const issued_a = new Date(a.issued).toISOString();
      const issued_b = new Date(b.issued).toISOString();
      return issued_a < issued_b ? 1 : -1;
    }); //sort by latest posting date

    commentsContainer.innerHTML = '';
    dataComments.forEach((data) => {
      const date = new Date(data.issued);
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
      const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      commentsContainer.innerHTML += `
      <div class="comment-card">
      <div class="date-container">
      <h5 class="date">${days[date.getDay()] + ', ' + date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear()}</h5>
      <h5 class="time">${(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + date.getSeconds()}</h5>
      </div>
      <h3 class="name">${data.name}</h3>
      <p class="comment">${data.comment}</p>
          <h3 class="address">${data.address}</h3>
        </div>
        `;
    });

    commentsCount.innerHTML = `${dataComments.length} Ucapan Terdaftar`;
  });
};

setInterval(() => {
  getData();
}, 1000);

// Insert to Firebase
const insertData = async () => {
  const date = new Date().getTime();

  submitIcon.removeAttribute('src');
  submitIcon.setAttribute('src', 'https://cdn.lordicon.com/xjovhxra.json');

  const name = nameForm.value ? nameForm.value : 'Random User';
  const address = addressForm.value ? addressForm.value : 'Random Address';
  const comment = commentForm.value ? commentForm.value : 'Lorem ipsum dolor sit amet amet jabang bayi';

  await set(ref(db, 'comments/' + nameForm.value), {
    name,
    address,
    comment,
    issued: new Date(date).toString(),
  })
    .then(() => {
      submitIcon.removeAttribute('src');
      submitIcon.setAttribute('src', 'https://cdn.lordicon.com/nkmsrxys.json');
      alert('Ucapan anda berhasil dikirim!');
      nameForm.value = '';
      addressForm.value = '';
      commentForm.value = '';
      getData();
    })
    .catch((error) => {
      alert('Ucapan gagal dikirim, coba kembali!');
      console.log(error);
    });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  insertData();
});
