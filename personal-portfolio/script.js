const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

allNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      allNavLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Update the copyright year automatically.
document.getElementById('year').textContent = new Date().getFullYear();

// Front-end validation. The form opens the visitor's email app; it does not
// send messages to a server. Replace the email address before publishing.
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const fields = [name, email, message];
  let isValid = true;

  fields.forEach((field) => {
    field.parentElement.querySelector('.error-message').textContent = '';
    field.style.borderColor = '';
  });

  if (name.value.trim().length < 2) {
    showError(name, 'Please enter your name (at least 2 characters).');
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, 'Please enter a valid email address.');
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, 'Please enter a message with at least 10 characters.');
    isValid = false;
  }

  if (!isValid) return;

  const recipient = 'your.email@example.com'; // Replace with your email address.
  const subject = encodeURIComponent(`Portfolio message from ${name.value.trim()}`);
  const body = encodeURIComponent(
    `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`
  );

  if (recipient === 'your.email@example.com') {
    formStatus.style.color = '#ffcc8a';
    formStatus.textContent = 'Validation passed. Add your email address in script.js to enable the email action.';
    return;
  }

  formStatus.style.color = '#9ee2b1';
  formStatus.textContent = 'Opening your email application...';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

function showError(field, message) {
  field.parentElement.querySelector('.error-message').textContent = message;
  field.style.borderColor = '#ff8e9b';
}
