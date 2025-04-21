// === 1. Intro Loader & Hero Reveal ===
setTimeout(() => {
  document.getElementById('intro')?.remove();
  gsap.to('#hero', { opacity: 1, y: 0, duration: 1 });
  document.body.classList.add('lock-scroll'); // Disable scroll
}, 4000);

// === 2. “Click to Enter” Behavior ===
document.getElementById('enter-btn')?.addEventListener('click', () => {
  gsap.to('#hero', { y: -100, opacity: 0, duration: 0.8 });
  setTimeout(() => {
    document.getElementById('hero')?.remove();
    document.body.classList.remove('lock-scroll'); // Enable scroll
    document.getElementById('main-header')?.classList.add('show');
    document.getElementById('navbar')?.classList.add('show');
    revealSections();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 800);
});

// === 3. Reveal Sections ===
function revealSections() {
  document.querySelectorAll('section:not(#hero)').forEach(section => {
    section.classList.add('visible');
  });
}

// === 4. Skill Bars Animation + Parallax + Scroll-to-Top Button ===
const skillBars = document.querySelectorAll('.skill-bar');
window.addEventListener('scroll', () => {
  skillBars.forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight) {
      bar.style.width = bar.dataset.width;
    }
  });

  document.getElementById('scrollTopBtn').style.opacity = window.scrollY > 300 ? '1' : '0';

  document.querySelectorAll('.parallax').forEach(el => {
    el.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
  });

  checkVisibility(); // call link visibility check on scroll
});

// === 5. Scroll-to-Top Handler ===
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === 6. Dark/Light Mode Toggle with LocalStorage ===
const toggleBtn = document.getElementById('darkModeToggle');
const savedMode = localStorage.getItem('mode') || 'light';
document.body.classList.add(`${savedMode}-mode`);
toggleBtn.textContent = savedMode === 'dark' ? '☀️' : '🌙';

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('mode', currentMode);
  toggleBtn.textContent = currentMode === 'dark' ? '☀️' : '🌙';
});

// === 7. ScrollReveal Animations ===
ScrollReveal().reveal('section:not(#hero)', {
  distance: '50px',
  duration: 800,
  easing: 'ease-in-out',
  interval: 200
});

// === 8. Contact Form Validation ===
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    ['input[type="email"]', 'textarea'].forEach(selector => {
      const field = contactForm.querySelector(selector);
      field.classList.remove('error');
      if (!field.value.trim() || (selector.includes('email') && !field.value.includes('@'))) {
        field.classList.add('error');
        valid = false;
        field.animate([
          { transform: 'translateX(-5px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(0)' }
        ], { duration: 300 });
      }
    });

    if (valid) {
      contactForm.reset();
      alert('Thank you! Your message has been sent.');
    }
  });
}

// === 9. Feedback Section Stub ===
document.querySelector('.feedback')?.addEventListener('click', e => {
  if (e.target.matches('.feedback button')) {
    alert('Thanks for your feedback!');
  }
});

// === 10. Social Feed Stub ===
const feed = document.querySelector('.social-feed');
if (feed) {
  feed.innerHTML = '<div class="post">Loading latest social posts…</div>';
}

// === 11. Custom Cursor ===
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
Object.assign(cursor.style, {
  position: 'fixed',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: '#c27c5a',
  pointerEvents: 'none',
  transform: 'translate(-50%, -50%)',
  transition: 'background 0.2s, transform 0.1s',
  zIndex: '9999'
});
document.body.appendChild(cursor);
document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.5)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
});

// === 12. Lazy-Load Images ===
const lazyImgs = document.querySelectorAll('img.lazyload');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('lazyloaded');
        io.unobserve(img);
      }
    });
  });
  lazyImgs.forEach(img => io.observe(img));
}

// === 13. Preloader ===
window.addEventListener('load', () => {
  document.getElementById('preloader')?.style.setProperty('display', 'none');
  document.getElementById('content')?.style.setProperty('display', 'block');
});

// === 14. Section Hover Interaction (Cursor-Aware) ===
document.querySelectorAll('section:not(.no-hover)').forEach(section => {
  section.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;
    const x = (offsetX / clientWidth) * 100;
    const y = (offsetY / clientHeight) * 100;
    target.style.setProperty('--x', `${x - 50}px`);
    target.style.setProperty('--y', `${y - 50}px`);
  });
  section.addEventListener('mouseleave', () => {
    section.style.setProperty('--x', `0px`);
    section.style.setProperty('--y', `0px`);
  });
});

// === 15. Nav Link Visibility (Active Animation) ===
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function checkVisibility() {
  document.querySelectorAll('nav a').forEach(link => {
    if (isElementInViewport(link)) {
      link.classList.add('visible');
    }
  });
}
checkVisibility(); // Initial call
// Get the dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');

// Check the saved preference in localStorage or default to light mode
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.add('light-mode');
}

// Function to toggle between dark and light mode
darkModeToggle.addEventListener('click', () => {
  // Toggle classes
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');

  // Save the theme preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
// JavaScript to detect scroll and add the 'visible' class
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');

  const checkSectionVisibility = () => {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= windowHeight - 100) {  // Trigger when section is near the viewport
        section.classList.add('visible');
      }
    });
  };

  // Check visibility on page load and on scroll
  window.addEventListener('scroll', checkSectionVisibility);
  checkSectionVisibility();  // Initial check on load
});
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');

  // Function to check if section is in view
  const checkSectionVisibility = () => {
      const windowHeight = window.innerHeight;

      sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;

          // Trigger animation when section is in the viewport
          if (sectionTop <= windowHeight - 100) {
              section.classList.add('visible');
          }
      });
  };

  // Check visibility on page load and on scroll
  window.addEventListener('scroll', checkSectionVisibility);
  checkSectionVisibility();  // Initial check when the page is loaded
});
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: unobserve once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach((reveal) => {
    observer.observe(reveal);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById('enter-btn');
  const sections = document.querySelectorAll('section');
  
  // Initially hide all sections
  sections.forEach(section => {
    section.classList.add('hidden');
  });

  // Show sections when "Enter" button is clicked
  enterBtn.addEventListener('click', () => {
    // Hide the hero section
    document.getElementById('hero').style.display = 'none';

    // Reveal the sections
    sections.forEach(section => {
      section.classList.remove('hidden');
    });
  });

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // optional
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach((reveal) => observer.observe(reveal));
});
// Assuming you want to remove the hero section and unlock scroll when the button is clicked
const enterButton = document.querySelector('.enter-btn');
const heroSection = document.querySelector('#hero');
const body = document.body;

// When the "Enter" button is clicked
enterButton.addEventListener('click', () => {
  heroSection.classList.remove('visible'); // Hide the hero section
  body.classList.remove('hero-active'); // Re-enable scrolling
});
