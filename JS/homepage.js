document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('createGameForm');
  form.addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent the form from submitting the traditional way
      const title = document.querySelector('[name="title"]').value;
      const genreName = document.querySelector('[name="genreName"]').value;
      const numberInStock = document.querySelector('[name="numberInStock"]').value;
      const dailyRentalRate = document.querySelector('[name="dailyRentalRate"]').value;
      const data = {
          title,
          genreName,
          numberInStock,
          dailyRentalRate
      };
      fetch('https://lackluster-03e1f83af3ca.herokuapp.com/api/games/new', {  
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          form.reset();  // Optionally reset the form after successful submission
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  });
});







