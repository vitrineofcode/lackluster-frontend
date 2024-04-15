document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    // Fetch user profile after successful login
    fetchUserProfile(data.token);
  } else {
    alert(data.message);
  }
});

document.getElementById('signup-link').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = '/signup.html'; // Redirect to signup page
});

// Function to fetch user profile after successful login
async function fetchUserProfile(token) {
  try {
    const response = await fetch('/api/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    const user = await response.json();
    console.log(user);
    window.location.href = '/dashboard.html'; // Redirect to dashboard after fetching user profile
  } catch (error) {
    console.error(error.message);
  }
}
