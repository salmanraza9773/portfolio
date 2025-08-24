const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle){
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}
const themeToggle = document.getElementById('theme-toggle');
function setTheme(mode){
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('theme', mode);
}
if (themeToggle){
  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}
(() => {
  const stored = localStorage.getItem('theme');
  if (stored){ setTheme(stored); }
})();

// GitHub API integration
async function loadGitHubProjects(){
  const container = document.getElementById('github-projects');
  try {
    const res = await fetch('https://api.github.com/users/salmanraza9773/repos?sort=updated&per_page=6');
    const repos = await res.json();
    container.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <a class="btn small" href="${repo.html_url}" target="_blank">View Repo</a>
      `;
      container.appendChild(card);
    });
  } catch (err){
    container.innerHTML = '<p>Error loading projects.</p>';
  }
}
loadGitHubProjects();
