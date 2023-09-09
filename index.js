import './style.css';
import './firebase.js';

const day = document.querySelector('#countdown .day .number');
const hour = document.querySelector('#countdown .hour .number');
const minute = document.querySelector('#countdown .minute .number');
const second = document.querySelector('#countdown .second .number');
const openBtn = document.getElementById('open');

const endTime = new Date('Oct 7, 2023 08:00:00').getTime();

const eventOuterContainer = document.querySelector('#acara');
const eventContainer = document.querySelector('#acara .rundown');
const addressTab = document.querySelector('#acara .location');
const googleMap = document.querySelector('#acara .location #gmap');
const mapBtn = document.getElementById('map');

const navbar = document.querySelector('#navbar');
const navbarTop = navbar.offsetTop;
const menuIcons = document.querySelectorAll('#navbar #navbarMenu lord-icon');

const storyCardContainer = document.querySelectorAll('#loveStory .story-card');
const storyImgContainer = document.querySelectorAll('#loveStory .story-card .col1');
const storyImg = document.querySelectorAll('#loveStory .story-card .col1 img');
const storyDesc = document.querySelectorAll('#loveStory .story-card .col2');

const galleryImages = document.querySelectorAll('#gallery .image-container img.gallery-img');
const carouselContainer = document.querySelector('#galleryCarousel');
const carouselImages = document.querySelectorAll('#galleryCarousel .image-container img.carousel-images');
const prevBtn = document.querySelector('#galleryCarousel .navigation .prev-btn');
const nextBtn = document.querySelector('#galleryCarousel .navigation .next-btn');
const closeBtn = document.querySelector('#galleryCarousel .navigation .close-btn');

const music = document.querySelector('#BGM');
const toggleMusicBtn = document.querySelector('#audio-container .icon-container');

// DATE COUNTDOWN
setInterval(() => {
  const currentTime = new Date().getTime();
  const remainingTime = endTime - currentTime;
  day.innerHTML = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  hour.innerHTML = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minute.innerHTML = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  second.innerHTML = Math.floor((remainingTime % (1000 * 60)) / 1000);
}, 1000);

// TOGGLE MUSIC
music.volume = 0.1;
music.play();
let isPlaying = true;

toggleMusicBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    toggleMusicBtn.style.animationPlayState = 'paused';
  } else {
    music.play();
    isPlaying = true;
    toggleMusicBtn.style.animationPlayState = 'running';
  }
});

// DISABLE OR ENABLE SCROLL
const disableScroll = () => {
  document.body.classList.add('disable-scroll');
};

disableScroll();
const enableScroll = () => {
  document.body.classList.remove('disable-scroll');
};

openBtn.addEventListener('click', enableScroll);

// STICKY NAVBAR
const stickyNavbar = () => {
  if (window.pageYOffset >= navbarTop) {
    navbar.classList.add('sticky');
    menuIcons.forEach((item) => {
      item.removeAttribute('colors');
      item.setAttribute('colors', 'primary:#cad2c5,secondary:#84a98c');
    });
    eventOuterContainer.style.paddingTop = '113px';
  } else {
    navbar.classList.remove('sticky');
    menuIcons.forEach((item) => {
      item.removeAttribute('colors');
      item.setAttribute('colors', 'primary:#2f3e46,secondary:#84a98c');
    });
    eventOuterContainer.style.paddingTop = '20px';
  }
};

// TOGGLE LOCATION TAB FOR BUTTON
const toggleLocation = () => {
  window.scrollTo(0, eventContainer.getBoundingClientRect().top + window.scrollY - 100);

  if (addressTab.style.paddingTop != '100px' || addressTab.style.paddingTop == '') {
    addressTab.style.paddingTop = '100px';
    googleMap.style.height = '180px';
  } else {
    addressTab.style.paddingTop = '20px';
    googleMap.style.height = 0;
  }
};

mapBtn.addEventListener('click', toggleLocation);

// STORY ANIMATION ON-SCROLL
window.addEventListener('scroll', () => {
  storyCardContainer.forEach((item, i) => {
    if (item.getBoundingClientRect().top >= 100 && item.getBoundingClientRect().top <= 700) {
      item.style.padding = '20px';
      storyImgContainer[i].style.height = '350px';
      storyImg[i].style.opacity = 1;
      storyImg[i].style.filter = 'blur(0)';
      storyDesc[i].style.height = '120px';
    } else {
      item.style.padding = 0;
      storyImgContainer[i].style.height = '200px';
      storyImg[i].style.opacity = 0.4;
      storyImg[i].style.filter = 'blur(4px)';
      storyDesc[i].style.height = 0;
    }
  });

  stickyNavbar();
});

// CAROUSEL CONFIGURATION
const slideImage = () => {
  carouselImages.forEach((image) => {
    if (image.hasAttribute('active')) {
      image.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  });
};

const scaleImage = () => {
  carouselImages.forEach((image) => {
    if (image.hasAttribute('active')) {
      image.style.width = '45vw';
    } else {
      image.style.width = '40vw';
    }
  });
};

galleryImages.forEach((image, i) => {
  image.addEventListener('click', () => {
    carouselImages.forEach((image) => image.removeAttribute('active'));
    carouselContainer.style.display = 'flex';
    carouselImages[i].setAttribute('active', '');

    scaleImage();
    setTimeout(() => {
      slideImage();
    }, 200);
  });
});

carouselContainer.addEventListener('click', (e) => {
  if (e.target.className !== 'carousel-images' && !e.target.className.includes('prev-btn') && !e.target.className.includes('next-btn')) {
    carouselContainer.style.display = 'none';
  }
});

carouselImages.forEach((image, i) => {
  image.addEventListener('click', () => {
    carouselImages.forEach((image) => image.removeAttribute('active'));
    image.setAttribute('active', '');

    scaleImage();
    setTimeout(() => {
      slideImage();
    }, 200);
  });
});

nextBtn.addEventListener('click', () => {
  let index;

  carouselImages.forEach((image, i) => {
    if (image.hasAttribute('active')) {
      index = i;
      image.removeAttribute('active');
    }
  });

  if (index >= carouselImages.length - 1) {
    index = -1;
  }

  carouselImages[index + 1].setAttribute('active', '');
  scaleImage();
  setTimeout(() => {
    slideImage();
  }, 200);
});

prevBtn.addEventListener('click', () => {
  let index;

  carouselImages.forEach((image, i) => {
    if (image.hasAttribute('active')) {
      index = i;
      image.removeAttribute('active');
    }
  });

  if (index <= 0) {
    index = carouselImages.length;
  }

  carouselImages[index - 1].setAttribute('active', '');
  scaleImage();
  setTimeout(() => {
    slideImage();
  }, 200);
});

closeBtn.addEventListener('click', () => {
  carouselContainer.style.display = 'none';
});
