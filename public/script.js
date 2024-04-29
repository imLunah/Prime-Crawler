document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the URL value from the input field
    var url = document.getElementById('url').value;

    // Send a POST request to the server with the URL
    fetch('/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url }) // Send URL as JSON data
    })
    .then(response => {
        // Check if response is successful (status code in the range 200-299)
        if (!response.ok) {
            throw new Error('Invalid URL or server error');
        }
        return response.json();
    })
    .then(data => {
        // Display the scraped data in the result div
        document.getElementById('result').innerHTML = `
            <div id="container">
            <h2>Title: ${data.title}</h2>
            <p>Reviews: ${data.reviews}</p>
            <p>Price: $${data.price}</p>
            <p>About this item:</p>
            <ul>
                ${data.about_this_item.map(item => `<li>${item}</li>`).join('')}
            </ul>
            </div>
            <img id="about-image" src="${data.image_url}" alt="Product Image">
        `;
    })
    .catch(error => {
        // Create a <p> element to display the error message
        var errorParagraph = document.createElement('p');
        errorParagraph.textContent = 'Error: Invalid URL'

        // Append the error <p> element to the result div
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = ''; // Clear existing content
        resultDiv.appendChild(errorParagraph);

        console.error('Error:', error);
    });
});




