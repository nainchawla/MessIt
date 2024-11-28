  
// You can extend this script to dynamically update the menu.
// Fetch the JSON file and populate the menu dynamically
async function loadMenu(day) {
    try {
      // Fetch the JSON file
      const response = await fetch('messMenu.json');
      if (!response.ok) {
        throw new Error('Could not fetch JSON file');
      }
      const data = await response.json();
  
      // Get the selected day's menu
      const selectedMenu = data.special[day];
      if (!selectedMenu) {
        throw new Error(`No menu found for ${day}`);
      }
  
      // Populate the menu on the page
      const menuContainer = document.getElementById('menu-container');
      menuContainer.innerHTML = ''; // Clear previous content
  
      // Loop through each meal type and render it
      Object.keys(selectedMenu).forEach((mealType) => {
        const meal = selectedMenu[mealType];
        const card = document.createElement('div');
        card.className = 'menu-card';
  
        // Populate the card content
        card.innerHTML = `
          <h3>${mealType}</h3>
          <p>${meal.menu}</p>
          <p class="time">⏰ ${meal.time}</p>
        `;
        menuContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  }
  
  // Add click listeners for day selection
  document.querySelectorAll('.day').forEach((dayElement) => {
    dayElement.addEventListener('click', () => {
      // Highlight the selected day
      document.querySelectorAll('.day').forEach((d) => d.classList.remove('active'));
      dayElement.classList.add('active');
  
      // Load the menu for the selected day
      const day = dayElement.getAttribute('data-day');
      loadMenu(day);
    });
  });
  
  // Load the menu for the default day on page load
  window.onload = () => {
    const defaultDay = document.querySelector('.day.active').getAttribute('data-day');
    loadMenu(defaultDay);
  };
  
  function reset() {
    window.location.href = 'index.html';
  }