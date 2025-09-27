// ======= Scroll Spy with Underline Animation =======

// Grab all navbar links (adjust selector if needed)
const navLinks = document.querySelectorAll('.navbar a');

// Grab all sections with matching IDs
const sections = Array.from(navLinks).map(link =>
  document.querySelector(link.getAttribute('href'))
);

window.addEventListener('scroll', () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // offset for header height
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});


// ======== Mobile Overlay Menu Toggle ========
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menuIcon");
  const overlay  = document.getElementById("overlay");
  const overlayLinks = overlay.querySelectorAll("a");

  // Function to open/close overlay and toggle icon
  function toggleMenu() {
    overlay.classList.toggle("active");       // show/hide overlay
    menuIcon.classList.toggle("active");      // 3-dot ↔ X
    document.body.style.overflow = overlay.classList.contains("active") ? "hidden" : ""; // prevent scroll
  }

  // Open/close overlay when icon clicked
  menuIcon.addEventListener("click", toggleMenu);

  // Close overlay when a link is clicked
  overlayLinks.forEach(link => {
    link.addEventListener("click", toggleMenu);
  });
});


// ======== Typing Effect (without cursor) ========
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".hero-text .typing");
  const skills = ["Python", "Electron", "Software Development", "Web Apps", "Web Development (Flask)"];
  let skillIndex = 0;
  let charIndex = 0;
  let typingSpeed = 100; // ms per character
  let pauseTime = 1500;  // pause after each skill

  function typeSkill() {
    if (charIndex < skills[skillIndex].length) {
      typingElement.textContent += skills[skillIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeSkill, typingSpeed);
    } else {
      setTimeout(eraseSkill, pauseTime);
    }
  }

  function eraseSkill() {
    if (charIndex > 0) {
      typingElement.textContent = skills[skillIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseSkill, typingSpeed / 2);
    } else {
      skillIndex = (skillIndex + 1) % skills.length;
      setTimeout(typeSkill, typingSpeed);
    }
  }

  // Start typing
  if (typingElement) typeSkill();
});


// ======= About Section Scroll Animation =======
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const aboutText = document.querySelector(".about-text");
  const aboutCards = document.querySelectorAll(".about-cards .card");
  const aboutCTA = document.querySelector(".about-cta");

  observer.observe(aboutText);
  aboutCards.forEach(card => observer.observe(card));
  observer.observe(aboutCTA);
});


// ======= Animated Counter =======
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          animateCounter(counter);
        });
        observer.disconnect(); // Run only once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector(".about-cards"));

  function animateCounter(counter) {
    const target = parseInt(counter.dataset.target, 10);
    let count = 0;
    const step = target / 100; // number of steps
    const speed = 15; // ms between updates

    const update = () => {
      count += step;
      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + "+"; // finish with +
      }
    };
    update();
  }
});


// ======= Skills Section Smooth Staggered Animations =======

// Helper: check if element is in viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100;
}

// Track already animated elements
const animatedSkills = new Set();
const animatedCards = new Set();

// Animate skills & soft skill cards
function animateSkillsSmooth() {
  // Animate soft skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    if (isInViewport(card) && !animatedCards.has(card)) {
      animatedCards.add(card);
      setTimeout(() => card.classList.add('in-view'), index * 150); // small stagger
    }
  });

  // Animate technical skills with stagger
  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    if (isInViewport(skill) && !animatedSkills.has(skill)) {
      animatedSkills.add(skill);

      const progressBar = skill.querySelector('.skill-progress');
      let value = progressBar.getAttribute('data-progress');
      const skillName = skill.querySelector('h3').textContent.trim().toLowerCase();

      // Flask bar always 100%
      if (skillName === 'flask') value = '100%';

      // Smooth staggered animation
      setTimeout(() => {
        skill.classList.add('in-view');
        progressBar.style.width = value;
      }, index * 300); 
    }
  });
}

// Trigger animation
window.addEventListener('scroll', animateSkillsSmooth);
window.addEventListener('load', animateSkillsSmooth);


// ======= Projects Section Scroll Animations =======

// Helper function to check if an element is in viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100
  );
}

// Animate project cards
function animateProjects() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    if (isInViewport(card) && !card.classList.contains('in-view')) {
      // Add in-view class with staggered delay
      setTimeout(() => {
        card.classList.add('in-view');
      }, index * 200); // 200ms delay between each card
    }
  });
}

// Trigger animation on scroll and page load
window.addEventListener('scroll', animateProjects);
window.addEventListener('load', animateProjects);


// ======= Toast Notification Helper =======
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.innerHTML = `
    <span>${message}</span>
    <span class="close-btn">&times;</span>
  `;

  // Add close functionality
  toast.querySelector(".close-btn").addEventListener("click", () => {
    toast.remove();
  });

  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add("show"), 100);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// ======= Contact Form Submission using Formspree AJAX =======
const contactForm = document.getElementById("contactForm");
const infoCards = document.querySelectorAll(".info-card");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent default form submission

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  // Animate info cards slightly upwards
  infoCards.forEach(card => {
    card.style.transform = "translateY(-5px)";
    card.style.transition = "transform 0.3s ease";
    setTimeout(() => {
      card.style.transform = "translateY(0)";
    }, 500);
  });

  // Send form data via AJAX to Formspree
  fetch("https://formspree.io/f/xpwywvzn", { // FORM_ID
    method: "POST",
    headers: { 'Accept': 'application/json' },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok || data.success) {
      showToast("Thanks for reaching out! I’ll get back to you soon to explore ideas together", "success");
      contactForm.reset();
    } else {
      showToast("Failed to send message. Please try again later.", "error");
      console.error("Formspree response:", data);
    }
  })
  .catch(error => {
    showToast("Failed to send message. Please check your internet connection.", "error");
    console.error("Error:", error);
  });
});


// ======= Footer Fade-In Animation =======
const footer = document.querySelector('.site-footer');

function footerInView() {
  const rect = footer.getBoundingClientRect();
  if (rect.top <= window.innerHeight - 100) {
    footer.classList.add('in-view');
    window.removeEventListener('scroll', footerInView);
  }
}

window.addEventListener('scroll', footerInView);
window.addEventListener('load', footerInView);




