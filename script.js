// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');
const menuLinks = document.querySelectorAll('.menu-link');
const scheduleTabs = document.querySelectorAll('.schedule-tab');
const scheduleContents = document.querySelectorAll('.schedule-content');
const audioToggle = document.getElementById('audio-toggle');
const learnMoreBtn = document.getElementById('learn-more-btn');
const viewMoreBtn = document.getElementById('view-more-btn');
const aboutPopup = document.getElementById('about-popup');
const galleryPopup = document.getElementById('gallery-popup');
const popupCloseButtons = document.querySelectorAll('.popup-close');

// Audio element
let audioElement = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Hide loading screen after 2.5 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 2500);

  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize particles background
  initParticles();
});

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// Close menu when link is clicked
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// Schedule tabs functionality
scheduleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    scheduleTabs.forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Hide all content sections
    scheduleContents.forEach(content => {
      content.classList.remove('active');
    });
    
    // Show selected content
    const targetId = tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

// Audio player functionality
audioToggle.addEventListener('click', () => {
  if (!audioElement) {
    // Create audio element
    audioElement = new Audio('https://cdn.pixabay.com/download/audio/2021/11/23/audio_cb4f1f9896.mp3?filename=inspiring-cinematic-ambient-116199.mp3');
    audioElement.loop = true;
    audioElement.volume = 0.5;
  }
  
  if (audioElement.paused) {
    audioElement.play();
    audioToggle.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audioElement.pause();
    audioToggle.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Popup functionality
learnMoreBtn.addEventListener('click', () => {
  aboutPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
});

viewMoreBtn.addEventListener('click', () => {
  galleryPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
});

popupCloseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Close popup when clicking outside of content
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Scroll animations
function initScrollAnimations() {
  const hiddenElements = document.querySelectorAll('.hidden-element');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  hiddenElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize particles.js
function initParticles() {
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#3b82f6",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#3b82f6",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
}