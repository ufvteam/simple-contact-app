// This is for storing js for the homepage
const bodyElement = document.body;
const toggleText = document.getElementById('toggle-text');
const darkBtn = document.getElementById('dark-mode');
darkBtn.addEventListener('click', switchDarkMode);

// Get the current theme from local storage
const currentMode = localStorage.getItem('mode');

if (currentMode === 'dark') {
  bodyElement.classList.add('dark-mode');
  toggleText.textContent = 'Dark Mode';
  darkBtn.checked = false;
} else {
  darkBtn.checked = true;
  toggleText.textContent = 'Light Mode';
}

function switchDarkMode() {
  let mode = 'light';
  bodyElement.classList.toggle('dark-mode');

  if (bodyElement.classList.contains('dark-mode')) {
    darkBtn.checked = false;
    toggleText.textContent = 'Dark Mode';
    mode = 'dark';
  } else {
    darkBtn.checked = true;
    toggleText.textContent = 'Light Mode';
  }
  localStorage.setItem('mode', mode);
}
