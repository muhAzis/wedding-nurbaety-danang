import './style.css';
import './firebase.js';

window.addEventListener('DOMContentLoaded', () => {
  const loadingPage = document.getElementById('loadingPage');
  const flowerAnimation = document.querySelectorAll('header .flower-animation');
  const jumbotron = document.querySelector('header #jumbo1');

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
  const addressText = document.querySelector('#acara .location .address-tab');
  const mapBtn = document.getElementById('map');

  const navbar = document.querySelector('#navbar');
  const navbarTop = navbar.offsetTop;
  const menuIcons = document.querySelectorAll('#navbar #navbarMenu lord-icon');
  const menuContainer = document.querySelector('#navbar #navbarMenu');
  const menuList = document.querySelectorAll('#navbar #navbarMenu li');
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const infoBtn = document.getElementById('menu7');

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
  const musicIcon = document.querySelector('#audio-container .icon-container i');

  const infoPage = document.getElementById('info');
  const infoCloseBtn = document.querySelector('#info .close-btn');

  // DATE COUNTDOWN
  setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingTime = endTime - currentTime;
    day.innerHTML = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    hour.innerHTML = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minute.innerHTML = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    second.innerHTML = Math.floor((remainingTime % (1000 * 60)) / 1000);
  }, 1000);

  // JUMBOTRON IMAGE RESPONSIVE
  if (window.innerWidth <= 576) {
    jumbotron.setAttribute('src', 'images/jumbo3.jpg');
  } else {
    jumbotron.setAttribute('src', 'images/jumbo1.jpg');
  }

  // FLOWER ANIMATION CONTROL ONLOAD
  const flowerAnimate = () => {
    flowerAnimation.forEach((item, i) => {
      switch (i) {
        case 0:
          item.style.top = '-1rem';
          item.style.left = '-2.3rem';
          break;
        case 1:
          item.style.top = '-1rem';
          item.style.right = '-2.3rem';
          break;
        case 2:
          item.style.bottom = 0;
          item.style.left = 0;
          break;
        case 3:
          item.style.bottom = 0;
          item.style.right = 0;
          break;
        default:
          break;
      }
    });
  };

  // TOGGLE MUSIC
  music.volume = 0.1;
  let isPlaying;

  document.onreadystatechange = () => {
    setTimeout(() => {
      if (document.readyState === 'complete') {
        music.play();
        isPlaying = true;

        setTimeout(() => {
          loadingPage.style.display = 'none';
        }, 2000);
        loadingPage.style.opacity = 0;
        flowerAnimate();
      }
    }, 3000);
  };

  toggleMusicBtn.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      toggleMusicBtn.style.animationPlayState = 'paused';
      musicIcon.classList.remove('bi-disc');
      musicIcon.classList.add('bi-pause-circle');
    } else {
      music.play();
      toggleMusicBtn.style.animationPlayState = 'running';
      musicIcon.classList.remove('bi-pause-circle');
      musicIcon.classList.add('bi-disc');
    }

    isPlaying = !isPlaying;
  });

  // DISABLE OR ENABLE SCROLL
  const disableScroll = () => {
    document.body.classList.add('disable-scroll');
  };

  disableScroll();
  const enableScroll = () => {
    document.body.classList.remove('disable-scroll');
    music.play();
    music.play();
    isPlaying = true;
    musicIcon.classList.remove('bi-pause-circle');
    musicIcon.classList.add('bi-disc');
    toggleMusicBtn.style.animationPlayState = 'running';
  };

  openBtn.addEventListener('click', enableScroll);

  // STICKY NAVBAR
  const stickyNavbar = () => {
    if (window.pageYOffset >= navbarTop) {
      navbar.classList.add('sticky');
      menuIcons.forEach((item) => {
        item.removeAttribute('colors');
        item.setAttribute('colors', 'primary:#2f3e46,secondary:#84a98c');
      });
      if (window.innerWidth <= 768) {
        eventOuterContainer.style.paddingTop = '70px';
      } else {
        eventOuterContainer.style.paddingTop = '113px';
      }
    } else {
      navbar.classList.remove('sticky');
      menuIcons.forEach((item) => {
        item.removeAttribute('colors');
        item.setAttribute('colors', 'primary:#2f3e46,secondary:#84a98c');
      });
      eventOuterContainer.style.paddingTop = '20px';
    }
  };

  // HAMBURGER MENU NAVBAR
  let isHide = true;
  hamburgerMenu.addEventListener('click', () => {
    if (isHide) {
      menuContainer.style.transform = 'translateX(0)';
      menuContainer.style.opacity = 1;
    } else {
      menuContainer.style.transform = 'translateX(100%)';
      menuContainer.style.opacity = 0;
    }

    isHide = !isHide;
  });

  if (window.innerWidth <= 768) {
    menuList.forEach((menu) => {
      menu.addEventListener('click', () => {
        menuContainer.style.transform = 'translateX(100%)';
        menuContainer.style.opacity = 0;
        isHide = true;
      });
    });
  }

  // TOGGLE LOCATION TAB FOR BUTTON
  const toggleLocation = () => {
    window.scrollTo(0, eventContainer.getBoundingClientRect().top + window.scrollY - 100);

    if (addressTab.style.paddingTop != '100px' || addressTab.style.paddingTop == '') {
      addressTab.style.paddingTop = '100px';
      googleMap.style.maxHeight = '180px';
      addressText.style.maxHeight = '50px';
    } else {
      addressTab.style.paddingTop = '20px';
      googleMap.style.maxHeight = 0;
      addressText.style.maxHeight = 0;
    }
  };

  mapBtn.addEventListener('click', toggleLocation);

  // STORY ANIMATION ON-SCROLL
  window.addEventListener('scroll', () => {
    storyCardContainer.forEach((item, i) => {
      if (item.getBoundingClientRect().top >= 50 && item.getBoundingClientRect().top <= window.innerHeight - 50) {
        item.style.padding = '20px';
        storyImgContainer[i].style.maxHeight = '350px';
        storyImg[i].style.opacity = 1;
        storyImg[i].style.filter = 'blur(0)';
        storyDesc[i].style.maxHeight = '500px';
        storyDesc[i].style.paddingBlock = '20px';
      } else {
        item.style.padding = 0;
        storyImgContainer[i].style.maxHeight = '200px';
        storyImg[i].style.opacity = 0.4;
        storyImg[i].style.filter = 'blur(4px)';
        storyDesc[i].style.maxHeight = 0;
        storyDesc[i].style.paddingBlock = 0;
      }
    });

    stickyNavbar();
  });

  storyCardContainer.forEach((item) => {
    item.addEventListener('click', () => {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
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
        image.style.maxWidth = '1000px';
      } else {
        image.style.maxWidth = '800px';
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

  // TOGGLE INFO PAGE
  infoBtn.addEventListener('click', () => {
    infoPage.classList.add('show');
  });

  infoCloseBtn.addEventListener('click', () => {
    infoPage.classList.remove('show');
  });
});
