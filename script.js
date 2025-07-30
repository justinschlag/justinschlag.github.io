// =======================
// Smooth Scroll for Navigation
// =======================
document.querySelectorAll('[data-target]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const sectionId = link.getAttribute('href'); // like "#intro"
    if (sectionId && sectionId.startsWith('#')) {
      document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =======================
// Scroll-to-Top Button
// =======================
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show button after scrolling 300px
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll smoothly to top
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =======================
// JustinBot Chat Handling
// =======================
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const responseDiv = document.getElementById('chat-response');
let firstMessage = true;

form.onsubmit = async e => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) return;

  responseDiv.classList.add('filled');
  responseDiv.innerHTML = firstMessage
    ? `<div class="sleeping-message">JustinBot is sleeping... please allow up to thirty seconds while he wakes up 💤</div>`
    : 'Thinking...';

  firstMessage = false;

  try {
    const res = await fetch('https://justin-bot-ujmo.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    responseDiv.innerHTML = `<p><strong>You:</strong> ${question}</p><p><strong>JustinBot:</strong> ${data.answer}</p>`;
    input.value = '';
  } catch (error) {
    responseDiv.innerHTML = '<p>Sorry, something went wrong.</p>';
  }
};

// =======================
// Timeline Scroll Animation
// =======================
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2 });
  items.forEach(item => observer.observe(item));
});
