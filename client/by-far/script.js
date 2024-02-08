document.addEventListener('DOMContentLoaded', function () {
    const loading = document.querySelector('.screen');

    function hideLoading() {
        loading.style.display = 'none';
    }

    function showLoading() {
        loading.style.display = 'flex';
    }

    setTimeout(hideLoading, 2000);

    const countryInput = document.getElementById('countryInput');
    const stateInput = document.getElementById('stateInput');
    const cityInput = document.getElementById('cityInput');

    // Declare a global variable to store the country code mapping
let countryCodeMapping = {};

// Function to fetch countries and initialize Awesomplete
function fetchCountries() {
    fetch("https://api.countrystatecity.in/v1/countries", {
        headers: {
            'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            // Create a mapping of country names to country codes
            countryCodeMapping = data.reduce((mapping, country) => {
                mapping[country.name] = country.iso2;
                return mapping;
            }, {});

            const countries = Object.keys(countryCodeMapping);
            initializeAwesomplete(countryInput, countries);
        } else {
            console.error('Countries data not found in CountryStateCity data:', data);
        }
    })
    .catch(error => {
        console.error('Error fetching countries:', error.message);
    });
}

// Function to populate state dropdown based on selected country
function populateStateDropdown(selectedCountryName) {
    // Log the selected country name to verify it's correct
    console.log('Selected Country Name:', selectedCountryName);

    // Fetch the country code for the selected country name from the mapping
    const countryCode = countryCodeMapping[selectedCountryName];

    if (!countryCode) {
        console.error('Country code not found for:', selectedCountryName);
        return;
    }

    fetch(`https://api.countrystatecity.in/v1/countries/${encodeURIComponent(countryCode)}/states`, {
        headers: {
            'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(stateData => {
        if (Array.isArray(stateData)) {
            const states = stateData.map(state => state.name);
            initializeAwesomplete(stateInput, states);
        } else {
            console.error('States data not found in CountryStateCity data:', stateData);
        }
    })
    .catch(error => {
        console.error('Error fetching states:', error.message);
    });
}

    // Function to populate city dropdown based on selected country and state
    function populateCityDropdown(selectedCountryCode) {
        fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/cities`, {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cityData => {
            if (Array.isArray(cityData)) {
                const cities = cityData.map(city => city.name);
                initializeAwesomplete(cityInput, cities);
            } else {
                console.error('Cities data not found in CountryStateCity data:', cityData);
            }
        })
        .catch(error => {
            console.error('Error fetching cities:', error.message);
        });
    }

    // Initialize Awesomplete for an input field with a list of suggestions
    function initializeAwesomplete(input, list) {
        new Awesomplete(input, { list });
    }

    // Fetch countries when the document is loaded
    fetchCountries();

    // Event listener for country input change
    countryInput.addEventListener('awesomplete-selectcomplete', function (e) {
        const selectedCountryName = e.text.value;
        const selectedCountryCode = countryCodeMapping[selectedCountryName];
        populateStateDropdown(selectedCountryName);
        populateCityDropdown(selectedCountryCode);
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxwDHpVrmeyQ2mdQQJN6LFI7c4BjkrguuBxifVK-9FHptgybj6dxpZMHtxULs6_tUyn/exec';
    const form = document.forms['contact-form'];
    const publicID = "ycSQT2yov2ccQJsaA";   //email js public id
    const serviceID = "service_ikgv9oo";    //email js service id
    const templateID = "template_zu4ktkp";  //email js template id

    document.forms['contact-form'].addEventListener('submit', function (e) {
        e.preventDefault();
        showLoading();
        if (validateForm(this)) {
            const formData = new FormData(this);

            const email = form.querySelector("input[name='Email']").value;
            console.log(email);
            const selectedCountry = form.querySelector("input[name='Country']").value;
            const selectedState = form.querySelector("input[name='State']").value;
            const selectedCity = form.querySelector("input[name='City']").value;

            formData.set('Country', selectedCountry);
            formData.set('State', selectedState);
            formData.set('City', selectedCity);

            sendEmail(email);

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = "./thankyou.html"    ;
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch(error => console.error('Error!', error.message));
        }
    });

    function validateForm(form) {
        var name = form.querySelector("input[name='Name']").value;
        var age = form.querySelector("input[name='Age']").value;
        var phone = form.querySelector("input[name='Phone']").value;
        var email = form.querySelector("input[name='Email']").value;
        var country = form.querySelector("input[name='Country']").value;

        // Basic validation
        if (name === "" || age === "" || phone === "" || email === "" || country === "") {
            alert("Please fill in all the required fields.");
            hideLoading();
            return false;
        }
        
        return true;
    }

    function sendEmail(toEmail) {
        // Replace these values with your actual email.js user ID, service ID, and template ID
        emailjs.init(publicID);
    
        var emailData = {
            to_email: toEmail
            // Add any other fields you need in your email template
        };
    
        emailjs.send(serviceID, templateID, emailData)
            .then(function (response) {
                console.log("Email sent successfully", response);
            })
            .catch(function (error) {
                console.error("Email failed to send", error);
            });
    }
});
