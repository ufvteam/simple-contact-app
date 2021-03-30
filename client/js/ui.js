const API_URL = 'http://localhost:3000/api/contacts';
import { addCountryCode } from './validation.js';
import { App } from './app.js';

class UI {
  constructor() {
    this.show = document.querySelector('#show');
    this.firstName = document.querySelector('#fName');
    this.lastName = document.querySelector('#lName');
    this.email = document.querySelector('#email');
    this.zipcode = document.querySelector('#zipcode');
    this.address = document.querySelector('#address');
    this.city = document.querySelector('#city');
    this.province = document.querySelector('#province');
    this.country = document.querySelector('#country');
    this.phones = document.querySelectorAll('.phone');
    this.idInput = document.querySelector('#id');

    this.addBtn = document.querySelector('#add-btn');
    this.updateBtn = document.querySelector('#update-btn');
    this.deleteBtn = document.querySelector('#delete-btn');
    this.backBtn = document.querySelector('#back-btn');
    this.changeState('add');

    this.phoneInputCount = 1;
  }

  changeState(type) {
    if (type === 'edit') {
      this.updateBtn.style.display = 'inline';
      this.deleteBtn.style.display = 'inline';
      this.backBtn.style.display = 'inline';
      this.addBtn.style.display = 'none';
    } else if (type === 'add') {
      this.updateBtn.style.display = 'none';
      this.deleteBtn.style.display = 'none';
      this.backBtn.style.display = 'none';
      this.addBtn.style.display = 'inline';
      this.idInput.value = '';
    }
  }

  addPhoneField(e) {
    this.phoneInputCount++;

    e.preventDefault();

    let phoneNumberDiv = document.createElement('div');

    phoneNumberDiv.className = 'col-md-6 phoneNumberWrapper';

    phoneNumberDiv.innerHTML = `<input id="phone_${this.phoneInputCount}" class="form-control phone" type="tel" name="phone" />
    <div class="invalid-feedback">Enter a valid phone number</div>
    <div class="text text-success" id="phoneSuccess_${this.phoneInputCount}" style="display: none"></div>
    <div class="text text-danger phone-danger" id="phoneDanger_${this.phoneInputCount}" style="display: none"></div>
    `;

    // Get parent
    const parent = document.getElementById('contactWrapper');

    // Get address column
    const address = document.getElementById('addressColumn');

    parent.insertBefore(phoneNumberDiv, address);

    const phoneInput = document.querySelector(`#phone_${this.phoneInputCount}`);

    addCountryCode(phoneInput, this.phoneInputCount);
  }

  showPeople(people) {
    if (people.contacts.length === 0) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = 'alert alert-warning text-center';
      div.innerHTML = 'There is nobody here. Add someone now &#x1F61C';
      // Get parent
      const container = document.querySelector('.peoplePage');
      // Get posts
      const show = document.querySelector('#show');
      // Insert alert div
      container.insertBefore(div, show);

      // Clear all the child nodes
      show.innerHTML = '';
    } else {
      let output = '';
      people.contacts.forEach((person) => {
        output += `
        <div class="card mb-3">
        <div class="card-body" data-id="${person.contactID}" >
            <h4 class="card-title">${person.firstName} ${person.lastName}</h4>
            <p class="card-text"><i class="fas fa-paper-plane"></i> ${person.email}</p>
            <p class="card-text"><i class="fas fa-home"></i> ${person.address.street}</p>
            <p class="card-text"><i class="fas fa-city"></i> ${person.address.city}</p>
            <p class="card-text"><i class="fas fa-map-marked-alt"></i> ${person.address.province}</p>
            <p class="card-text"><i class="fas fa-mail-bulk"></i> ${person.address.zipcode}</p>
            <p class="card-text"><i class="fas fa-flag"></i> ${person.address.country}</p>`;

        let phoneNums = person.phoneNumbers;
        output += '<div class="row">';

        phoneNums.forEach((number) => {
          output += `<div class="card-text col-lg-2"><i class="fas fa-mobile-alt"></i> ${number}</div>`;
        });

        output += '</div><hr>';

        output += `<a href="#" class="card-link edit" data-id="${person.contactID}"">
                <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="card-link delete" data-id="${person.contactID}">
                <i class="fas fa-user-times"></i>
            </a>
        </div>
    </div>
        `;
      });
      this.show.innerHTML = output;
    }
  }

  // Show Alert
  showAlert(message, className) {
    // Clear any previous alert
    this.clearAlert();
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.peoplePage');
    // Get posts
    const show = document.querySelector('#show');
    // Insert alert div
    container.insertBefore(div, show);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  // Clear Alert
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearInputs() {
    this.firstName.value = '';
    this.lastName.value = '';
    this.email.value = '';
    this.zipcode.value = '';
    this.address.value = '';
    this.city.value = '';
    this.province.value = '';
    this.country.value = '';

    let validPhoneText = document.querySelectorAll('.text-success');
    let invalidPhoneText = document.querySelectorAll('.text-danger');

    if (validPhoneText.length > 0) {
      validPhoneText.forEach((phone) => (phone.innerText = ''));
    }
    if (invalidPhoneText.length > 0) {
      invalidPhoneText.forEach((phone) => (phone.innerText = ''));
    }

    this.phones.forEach((phone) => (phone.value = ''));
  }
}

export const ui = new UI();
