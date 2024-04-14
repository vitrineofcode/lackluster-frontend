document.addEventListener('DOMContentLoaded', async () => {
  // Fetch and display food items
  const response = await fetch('http://localhost:3000/api/food-items', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (response.ok) {
    const data = await response.json();
    const foodItemsList = document.getElementById('food-items');
    foodItemsList.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - Expiry Date: ${item.expiryDate}`;
      foodItemsList.appendChild(li);
    });
  } else {
    console.error('Failed to fetch food items');
  }
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const response = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  console.log(data);
  localStorage.setItem('token', data.token); // Store the token in local storage
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const response = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    localStorage.setItem('token', data.token); // Store the token in local storage
    window.location.href = '/homepage.html';
  } else {
    console.error('Login failed');
  }
});


