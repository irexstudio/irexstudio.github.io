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

const scriptURL = 'https://script.google.com/macros/s/AKfycbxwDHpVrmeyQ2mdQQJN6LFI7c4BjkrguuBxifVK-9FHptgybj6dxpZMHtxULs6_tUyn/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateForm()) {
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                if (response.ok) {
                    alert("Thank you! Your form is submitted successfully.");
                    window.location.reload();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => console.error('Error!', error.message));
    }
});