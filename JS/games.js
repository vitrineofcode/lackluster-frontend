// Function to fetch customer data and display it on the page
async function fetchGameData() {
  try {
    const response = await fetch('https://lackluster-03e1f83af3ca.herokuapp.com/api/games/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const gamesDiv = document.getElementById('games');

    // Assuming the data is an array of customers
    data.forEach(game => {
      const gameDiv = document.createElement('div');
      gameDiv.textContent = `${game.title}, ${game.numberInStock} in stock, $${game.dailyRentalRate} a week`;
      gamesDiv.appendChild(gameDiv);
    });
  } catch (error) {
    console.error('Failed to fetch games data:', error);
  }
}
// Call the function to execute the fetch operation
fetchGameData();


// Create a new game
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
          // alert('Game created successfully!');
          form.reset();  // Optionally reset the form after successful submission
      })
      .catch((error) => {
          console.error('Error:', error);
          // alert('Error creating game. Please try again.');
      });
  });
});

// Delete a game
document.getElementById('deleteForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const gameTitle = document.getElementById('gameTitle').value;
  const encodedTitle = encodeURIComponent(gameTitle); // Encode the title for URL

  fetch(`https://lackluster-03e1f83af3ca.herokuapp.com/api/games/title/${encodedTitle}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      alert('Game deleted successfully!');
      console.log(data);
  })
  .catch(error => {
      console.error('Error deleting the game:', error);
      alert('Failed to delete the game.');
  });
});

// Update a game
document.getElementById('updateForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const currentName = document.getElementById('currentName').value;
  const newName = document.getElementById('newName').value;
  const encodedCurrentName = encodeURIComponent(currentName); // Encode for URL

  fetch(`https://lackluster-03e1f83af3ca.herokuapp.com/api/games/update/${encodedCurrentName}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newTitle: newName }) // Send new name as JSON
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to update the game');
      }
      return response.json();
  })
  .then(data => {
      alert('Game updated successfully!');
      console.log(data);
  })
  .catch(error => {
      console.error('Error updating the game:', error);
      alert('Failed to update the game.');
  });
});
