const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('https://lackluster-03e1f83af3ca.herokuapp.com/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/homepage.html';
      } else {
        console.log(token); // Display the error message
      }
    } catch (error) {
      console.error(error);
    }
  });