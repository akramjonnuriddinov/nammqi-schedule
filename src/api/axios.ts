// Import Axios
import axios from 'axios';

// Define API URL
const apiURL = 'https://student.nammqi.uz/rest/v1/data/department-list';

// Get token from admin panel
const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca'; // Replace with the actual token

// Send request to Backend API
axios.get(apiURL, {
  headers: {
    'Authorization': `Bearer ${adminToken}`
  }
})
  .then(response => {
    console.log('Data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
