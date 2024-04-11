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
    localStorage.setItem('token', data.token);
    window.location.href = '/homepage.html';
  } else {
    console.error('Login failed');
  }
});

document.getElementById('add-food-btn').addEventListener('click', () => {
  document.getElementById('add-food-form').style.display = 'block';
});

document.getElementById('add-food-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const foodName = document.getElementById('food-name').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const response = await fetch('http://localhost:3000/api/food-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: foodName, expiryDate })
  });
  const data = await response.json();
  console.log(data); // Log the response from the server
  document.getElementById('food-name').value = ''; // Clear the input field after submission
  document.getElementById('expiry-date').value = ''; // Clear the input field after submission
  document.getElementById('add-food-form').style.display = 'none'; // Hide the form after submission
});
