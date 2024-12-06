// Toggle the side drawer
function toggleDrawer() {
  const drawer = document.getElementById("side-drawer");
  drawer.classList.toggle("open");
}

// Close the drawer
function closeDrawer() {
  const drawer = document.getElementById("side-drawer");
  drawer.classList.remove("open");
}

// Show the mess selection menu and close the drawer
function resetMessType() {
  closeDrawer(); // Close drawer after clicking reset
  document.getElementById('mess-selection').classList.remove('hidden');
  document.getElementById("mess-menu").classList.add("hidden");
}

function resetMenu() {
  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
  console.log('Reset menu triggered');
  toggleDrawer(); // Close drawer
}

function redirectToVeg() {
  window.location.href = 'veg.html';
}

function redirectToNonVeg() {
  window.location.href = 'nonveg.html';
}

function redirectToSpecial() {
  window.location.href = 'special.html';
}

// This function will run once the page is fully loaded
window.onload = function() {
  // Remove the 'hidden' class from the mess selection div
  document.getElementById('mess-selection').classList.remove('hidden');
  // Ensure the mess menu is hidden when the page loads
  document.getElementById('mess-menu').classList.add('hidden');
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker Registered'));
}
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show your custom install button
    const installBtn = document.getElementById('install-button');
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});
