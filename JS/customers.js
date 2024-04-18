// Function to fetch customer data and display it on the page
async function fetchCustomerData() {
  try {
    const response = await fetch('https://lackluster-03e1f83af3ca.herokuapp.com/api/customers/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const customersDiv = document.getElementById('customers');

    // Assuming the data is an array of customers
    data.forEach(customer => {
      const customerDiv = document.createElement('div');
      customerDiv.textContent = `${customer.name}, ${customer.phone}`;
      customersDiv.appendChild(customerDiv);
    });
  } catch (error) {
    console.error('Failed to fetch customer data:', error);
  }
}
// Call the function to execute the fetch operation
fetchCustomerData();

// Create a new customer
document.getElementById('createCustomerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  fetch('https://lackluster-03e1f83af3ca.herokuapp.com/api/customers/new', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, phone: phone })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to create customer');
      }
      return response.json();
  })
  .then(data => {
      // alert('Customer created successfully!');
      console.log(data);
  })
  .catch(error => {
      console.error('Error creating the customer:', error);
      // alert('Failed to create the customer.');
  });
});

// Update a customer
document.getElementById('updateCustomerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const currentName = document.getElementById('currentName').value;
  const newName = document.getElementById('newName').value;
  const newPhone = document.getElementById('newPhone').value;
  const encodedCurrentName = encodeURIComponent(currentName); // Encode the name for URL

  fetch(`https://lackluster-03e1f83af3ca.herokuapp.com/api/customers/update/${encodedCurrentName}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName, phone: newPhone })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to update customer');
      }
      return response.json();
  })
  .then(data => {
      // alert('Customer updated successfully!');
      console.log(data);
  })
  .catch(error => {
      console.error('Error updating the customer:', error);
      // alert('Failed to update the customer.');
  });
});

// Delete a customer
document.getElementById('deleteCustomerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value.trim(); // Get the name and trim whitespace

  if (!name) { // Check if the name is empty
      alert('Please enter a valid name');
      return; // Stop the function if no name is entered
  }

  const encodedName = encodeURIComponent(name); // Encode the name for URL

  fetch(`https://lackluster-03e1f83af3ca.herokuapp.com/api/customers/name/${encodedName}`, {
      method: 'DELETE'
  })
  .then(response => {
      if (!response.ok) {
          return response.text().then(text => {
              throw new Error(`Failed to delete customer: ${text}`);
          });
      }
      return response.json();
  })
  .then(data => {
      alert('Customer deleted successfully!');
      console.log(data);
  })
  .catch(error => {
      console.error('Error deleting the customer:', error);
      alert('Failed to delete the customer.');
  });
});
