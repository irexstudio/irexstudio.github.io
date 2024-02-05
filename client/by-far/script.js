var loading = document.querySelector('.screen');

function hideLoading(){
    loading.style.display = 'none';
}

function showLoading(){
    loading.style.display = 'flex';
}

setTimeout(hideLoading, 2000);

document.addEventListener('DOMContentLoaded', function () {
    function fetchCountries() {
        var countryDropdown = document.getElementById("countryDropdown");

        fetch("https://api.countrystatecity.in/v1/countries", {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==', // Replace 'your_api_key' with your actual API key
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
                    data.forEach(country => {
                        var option = document.createElement("option");
                        option.value = country.iso2;
                        option.text = country.name;
                        countryDropdown.appendChild(option);
                    });
                } else {
                    console.error('Countries data not found in CountryStateCity data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }

    function populateStateDropdown() {
        var countryDropdown = document.getElementById("countryDropdown");
        var stateDropdown = document.getElementById("stateDropdown");

        stateDropdown.innerHTML = '<option value="">Select a State</option>';

        var selectedCountryCode = countryDropdown.value;

        if (selectedCountryCode) {
            fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/states`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==', // Replace 'your_api_key' with your actual API key
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
                        stateData.forEach(state => {
                            var option = document.createElement("option");
                            option.value = state.iso2;
                            option.text = state.name;
                            stateDropdown.appendChild(option);
                        });
                    } else {
                        console.error('States data not found in CountryStateCity data:', stateData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching states:', error);
                });
        }
    }

    function populateCityDropdown() {
        var countryDropdown = document.getElementById("countryDropdown");
        var stateDropdown = document.getElementById("stateDropdown");
        var cityDropdown = document.getElementById("cityDropdown");

        cityDropdown.innerHTML = '<option value="">Select a City</option>';

        var selectedCountryCode = countryDropdown.value;
        var selectedStateCode = stateDropdown.value;

        if (selectedCountryCode && selectedStateCode) {
            fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/states/${selectedStateCode}/cities`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==', // Replace 'your_api_key' with your actual API key
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
                        cityData.forEach(city => {
                            var option = document.createElement("option");
                            option.value = city.name;
                            option.text = city.name;
                            cityDropdown.appendChild(option);
                        });
                    } else {
                        console.error('Cities data not found in CountryStateCity data:', cityData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                });
        }
    }

    fetchCountries();

    document.getElementById("countryDropdown").addEventListener('change', function () {
        populateStateDropdown();
    });

    document.getElementById("stateDropdown").addEventListener('change', function () {
        populateCityDropdown();
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
            const selectedCountry = form.querySelector("select[name='Country']").options[form.querySelector("select[name='Country']").selectedIndex].text;
            const selectedState = form.querySelector("select[name='State']").options[form.querySelector("select[name='State']").selectedIndex].text;
            const selectedCity = form.querySelector("select[name='City']").options[form.querySelector("select[name='City']").selectedIndex].text;

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
        var country = form.querySelector("select[name='Country']").value;

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
