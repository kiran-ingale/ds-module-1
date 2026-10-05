const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const sections = [...document.querySelectorAll('.topic, .hero')];
const progressBar = document.getElementById('progressBar');
const searchInput = document.getElementById('searchInput');

function updateProgress() {
  const scrollTop = window.scrollY;
  const max = document.body.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (scrollTop / max) * 100 : 0;
  progressBar.style.width = `${percent}%`;
}

function updateActiveLink() {
  const offset = 120;
  let currentId = 'overview';

  sections.forEach((section) => {
    const top = section.offsetTop - offset;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      currentId = section.id;
    }
  });

  sidebarLinks.forEach((link) => {
    const isMatch = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isMatch);
  });
}

window.addEventListener('scroll', () => {
  updateProgress();
  updateActiveLink();
});

window.addEventListener('load', () => {
  updateProgress();
  updateActiveLink();
});

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  sidebarLinks.forEach((link) => {
    const text = link.textContent.toLowerCase();
    const visible = !query || text.includes(query);
    link.style.display = visible ? 'block' : 'none';
  });
});

document.querySelectorAll('.toggle-solution').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    const isHidden = target.hasAttribute('hidden');

    if (isHidden) {
      target.removeAttribute('hidden');
      button.textContent = 'Hide Solution';
    } else {
      target.setAttribute('hidden', 'hidden');
      button.textContent = 'Show Solution';
    }
  });
});
