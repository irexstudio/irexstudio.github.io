var ksaCities = [
    "Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Abha", "Jizan", "Taif",
    "Tabuk", "Buraidah", "Hail", "Najran", "Khamis Mushait", "Al Qatif", "Jubail", "Yanbu",
    "Al Hofuf", "Al Mubarraz", "Al Kharj", "Hafar Al-Batin", "Sakaka", "Arar", "Al Bahah", "Dhahran"
    // Add more cities as needed
];

// Function to populate the dropdown with KSA cities
function populateCityDropdown() {
    var cityDropdown = document.getElementById("cityDropdown");

    // Clear existing options
    cityDropdown.innerHTML = '<option value="">Select a City</option>';

    // Add options for each city in the array
    for (var i = 0; i < ksaCities.length; i++) {
        var option = document.createElement("option");
        option.value = ksaCities[i];
        option.text = ksaCities[i];
        cityDropdown.appendChild(option);
    }
}

// Call the function to populate the dropdown on page load
window.onload = populateCityDropdown;

document.addEventListener('DOMContentLoaded', function () {
    // Function to validate the form
    function validateForm() {
        var name = document.querySelector("input[name='Name']").value;
        var age = document.querySelector("input[name='Age']").value;
        var phone = document.querySelector("input[name='Phone']").value;
        var email = document.querySelector("input[name='Email']").value;
        var city = document.querySelector("select[name='City']").value;

        // Basic validation
        if (name === "" || age === "" || phone === "" || email === "" || city === "") {
            alert("Please fill in all the required fields.");
            return false;
        }
        return true;
    }

    function submitForm() {
        if (validateForm()) {
            // Form data
            var formData = {
                Name: document.querySelector("input[name='Name']").value,
                Age: document.querySelector("input[name='Age']").value,
                Phone: document.querySelector("input[name='Phone']").value,
                Email: document.querySelector("input[name='Email']").value,
                City: document.querySelector("select[name='City']").value
            };

            // You need to replace 'YOUR_GOOGLE_SCRIPT_URL' with the actual URL of your Google Apps Script
            var googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxwDHpVrmeyQ2mdQQJN6LFI7c4BjkrguuBxifVK-9FHptgybj6dxpZMHtxULs6_tUyn/exec';

            // AJAX request to post data to Google Script
            fetch(googleScriptUrl + '?callback=handleResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
        }
    }

    // Event listener for form submission
    document.querySelector("form[name='contact-form']").addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        submitForm();
    });
});