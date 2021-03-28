document.getElementById('email').addEventListener('blur', validateEmail);

const phoneInputField = document.querySelector('#phone');

phoneInputField.addEventListener('blur', validatePhone);
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ['ca', 'us'],
  separateDialCode: true,
  utilsScript:
    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
});

const info = document.querySelector('.text-success');
const error = document.querySelector('.phone-danger');

function validatePhone(event) {
  event.preventDefault();
  const fullPhoneNumber = phoneInput.getNumber(); // Save this one to database
  const nationPhoneNumber = phoneInput.getNumber(phoneInputField.value);

  info.style.display = 'none';
  error.style.display = 'none';

  if (phoneInput.isValidNumber()) {
    phoneInputField.classList.remove('is-invalid');
    info.style.display = '';
    info.innerHTML = `Your phone number in international format: <strong>${fullPhoneNumber}</strong>`;
    document.getElementById('phone').classList.remove('is-invalid');
    phoneInputField.value = nationPhoneNumber;
  } else {
    phoneInputField.classList.add('is-invalid');
    error.style.display = '';
    error.innerHTML = `Invalid phone number.`;
  }
}

function validateEmail() {
  const email = document.getElementById('email');
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!re.test(email.value)) {
    email.classList.add('is-invalid');
  } else {
    email.classList.remove('is-invalid');
  }
}

const countryData = window.intlTelInputGlobals.getCountryData();
const countryInputField = document.querySelector('#country');

// populate the country dropdown
for (let i = 0; i < countryData.length; i++) {
  let country = countryData[i];
  let optionNode = document.createElement('option');
  optionNode.value = country.iso2;
  let textNode = document.createTextNode(country.name);
  optionNode.appendChild(textNode);
  countryInputField.appendChild(optionNode);
}

// listen to the address dropdown for changes
countryInputField.addEventListener('change', function () {
  iti.setCountry(this.value);
});
