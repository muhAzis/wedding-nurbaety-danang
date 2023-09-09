import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js';
import { getDatabase, ref, get, set, child, update, remove } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js';
// import { process } from './environment.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.SECRET_API_KEY,
  authDomain: process.env.SECRET_AUTH_DOMAIN,
  databaseURL: process.env.SECRET_DB_URL,
  projectId: 'weddingweb-89681',
  storageBucket: 'weddingweb-89681.appspot.com',
  messagingSenderId: '295396365536',
  appId: '1:295396365536:web:0042354c6015a09461ec85',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Form elements
const nameForm = document.getElementById('name');
const addressForm = document.getElementById('address');
const commentForm = document.getElementById('comment');
const submitForm = document.getElementById('submitBtn');
const commentsContainer = document.querySelector('#comments #commentSection .comments-container');

// Get data from Firebase
const getData = async () => {
  const dbref = ref(db);

  await get(child(dbref, 'comments/')).then((data) => {
    if (!data) {
      return alert('Website tidak terunduh sepenuhnya, mohon refresh halaman!');
    }

    const dataComments = Object.keys(data.val()).map((key) => data.val()[key]);
    // dataComments.sort((a, b) => a.issued - b.issued);

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
  });
};

setInterval(() => {
  getData();
}, 1000);

// Insert to Firebase
const insertData = async () => {
  const date = new Date().getTime();
  await set(ref(db, 'comments/' + nameForm.value), {
    name: nameForm.value,
    address: addressForm.value,
    comment: commentForm.value,
    issued: new Date(date).toString(),
  })
    .then(() => {
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

submitForm.addEventListener('click', (e) => {
  e.preventDefault();

  insertData();
});
