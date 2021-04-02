document.getElementById('email').addEventListener('blur', validateEmail);

let inputField_Phone = document.querySelector('.phone');

addCountryCode(inputField_Phone, 1);

export function addCountryCode(phoneInputField, phone_Count) {
  phoneInputField.addEventListener('blur', () =>
    validatePhone(phoneInputField, phone_Count)
  );

  window.intlTelInput(phoneInputField, {
    preferredCountries: ['ca', 'us'],
    separateDialCode: true,
    utilsScript:
      'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
  });
}

export function validatePhone(inputField, count) {
  const info = document.querySelector(`#phoneSuccess_${count}`);
  const error = document.querySelector(`#phoneDanger_${count}`);

  //event.preventDefault();
  const phoneInput = window.intlTelInputGlobals.getInstance(inputField);

  const fullPhoneNumber = phoneInput.getNumber(); // Save this one to database
  const nationPhoneNumber = phoneInput.getNumber(inputField.value);

  if (phoneInput.isValidNumber()) {
    inputField.classList.remove('is-invalid');
    info.style.display = '';
    info.innerHTML = `Your phone number in international format: <strong>${fullPhoneNumber}</strong>`;
    error.style.display = 'none';
    inputField.value = nationPhoneNumber;
  } else {
    inputField.classList.add('is-invalid');
    error.style.display = '';
    info.style.display = '';
    error.innerHTML = `Invalid phone number.`;
    info.style.display = 'none';
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
  optionNode.value = country.name;
  let textNode = document.createTextNode(country.name);
  optionNode.appendChild(textNode);
  countryInputField.appendChild(optionNode);
}
