const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');

openModal.addEventListener('click', () => {
    modal.showModal();
})

//Select the form element
const form = document.getElementById('movieForm');
const confirmationMessage = document.getElementById('confirmation-message');

// Function to store form data in localStorage
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Get form data
    const title = document.getElementById('title').value.trim();
    const pRating = document.getElementById('personalRating').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const mpaa = document.getElementById('mpaa').value;
    const watched = document.getElementById('watched').checked;
    const thumbnail = document.getElementById('thumbnail').files[0];

    // Create a FileReader to convert the image file to Base64
  const reader = new FileReader();
  reader.onload = function() {

    // Once the file is read, store the form data and image in localStorage
    const newEntry = {
        title,
        pRating,
        duration,
        mpaa,
        watched,
        thumbnail: reader.result
        
    };

    // Get the existing data array from localStorage, or start with an empty array
    const existingData = JSON.parse(localStorage.getItem('userDataArray')) || [];

    // Add the new entry to the array
    existingData.push(newEntry);

    // Save the updated array back to localStorage
    localStorage.setItem('userDataArray', JSON.stringify(existingData));

    // Display a confirmation message to the user
    confirmationMessage.textContent = "Your data has been saved!";

    // Clear the form
    form.reset();

    // Close the modal
    if (modal instanceof HTMLDialogElement) {
        modal.close();
    }
  };

  // Read the image file as a Data URL (Base64 string)
  reader.readAsDataURL(thumbnail);

});
