const API_URL = 'http://localhost:3000/api/contacts';
import { http } from './http.js';


class UI {
  constructor() {
    this.show = document.querySelector('#show');
    this.firstName = document.querySelector("#fName");
    this.lastName = document.querySelector("#lName");
    this.email = document.querySelector("#email");
    this.zipcode = document.querySelector("#zipcode");
    this.address = document.querySelector("#address");
    this.city =  document.querySelector("#city");
    this.province = document.querySelector("#province");
    this.country = document.querySelector("#country");
    this.phones = document.querySelectorAll('.phone');
    this.phoneText = document.querySelector('#phoneText');
    this.invalidPhoneText = document.querySelector('#invalidPhoneText');
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
        <div class="card-body">
            <h4 class="card-title">${person.firstName} ${person.lastName}</h4>
            <p class="card-text"><i class="fas fa-paper-plane"></i> ${person.email}</p>
            <p class="card-text"><i class="fas fa-home"></i> ${person.address.street}</p>
            <p class="card-text"><i class="fas fa-city"></i> ${person.address.city}</p>
            <p class="card-text"><i class="fas fa-map-marked-alt"></i> ${person.address.province}</p>
            <p class="card-text"><i class="fas fa-mail-bulk"></i> ${person.address.zipcode}</p>
            <p class="card-text"><i class="fas fa-flag"></i> ${person.address.country}</p>
            <a href="#" class="card-link edit" data-id="${person.contactID}">
                <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="card-link delete" data-id="${person.scoreID}">
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

  clearInput() {
    this.firstName.value = '';
    this.lastName.value= '';
    this.email.value ='';
    this.zipcode.value = '';
    this.address.value = '';
    this.city.value = '';
    this.province.value = '';
    this.country.value = '';
    this.phoneText.innerText = '';
    this.invalidPhoneText.innerText = '';

    this.phones.forEach(phone => phone.value = '');
  }
}

export const ui = new UI();
