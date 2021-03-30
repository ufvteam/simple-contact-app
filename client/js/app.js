import { http } from './http.js';
import { ui } from './ui.js';

const API_URL = 'http://localhost:3000/api/contacts';

class People {
  constructor() {
    http
      .get(`${API_URL}`)
      .then((people) => {
        ui.showPeople(people);
        // ui.addCRUDEventsListeners();
      })
      .catch((err) => console.log(err));
  }
}

export class App {
  constructor() {
    new People();
    this.contact = {};
  }

  loadAllEvents() {
    // Add a person
    document
      .querySelector('#add-btn')
      .addEventListener('click', () => this.addContact());

    //Delete All Contacts
    document
      .querySelector('#delete-all-btn')
      .addEventListener('click', this.deleteAllContacts);

    //Add one more phone Number
    document
      .querySelector('#addOneMoreContact-btn')
      .addEventListener('click', (e) => ui.addPhoneField(e));

    // Edit contact by icon
    document
      .querySelector('#show')
      .addEventListener('click', (e) => this.editContact(e));

    // Cancel edit
    document
      .querySelector('#update-btn')
      .addEventListener('click', (e) => this.updateContact(e));

    // Delete contact by icon
    document
      .querySelector('#show')
      .addEventListener('click', (e) => this.deleteContactByIcon(e));

    // Cancel edit
    document
      .querySelector('#back-btn')
      .addEventListener('click', (e) => this.cancelEditState(e));
  }

  deleteAllContacts() {
    if (confirm('Are you sure ?')) {
      http
        .delete(`${API_URL}/deleteAll`)
        .then((result) => {
          ui.showAlert(result.msg, 'alert alert-danger');

          setTimeout(() => {
            new People();
          }, 600);
        })
        .catch((err) => console.log(err));
    }
  }
  editContact(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains('edit')) {
      ui.clearPhoneNumbers(e);
      const id = e.target.parentElement.dataset.id;

      http.get(`${API_URL}/${id}`).then((data) => {
        // Get the contact Object
        const contact = data.data[0];
        console.log(contact);

        // Change the add state to edit state
        ui.changeState('edit');

        ui.fillInputs(contact, id, e);
      });
    }
  }

  deleteContactByIcon(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('delete')) {
      const id = e.target.parentElement.dataset.id;

      if (confirm('Are you sure?')) {
        http.delete(`${API_URL}/${id}`).then((result) => {
          ui.showAlert(result.msg, 'alert alert-warning');

          setTimeout(() => new People(), 600);
        });
      }
    }
  }

  addContact() {
    let firstName = document.querySelector('#fName').value;
    let lastName = document.querySelector('#lName').value;
    let email = document.querySelector('#email').value;

    let phoneNumbers = [];
    let formattedNumbers = document.querySelectorAll('.text-success > strong');

    formattedNumbers.forEach((formattedNumber) => {
      const number = formattedNumber.innerText;
      phoneNumbers.push(number);
      console.log('number =>', number);
    });

    console.log('phoneNumbers => ', phoneNumbers);

    let contact = {
      firstName,
      lastName,
      email,
      phoneNumbers,
      address: {
        zipcode: document.querySelector('#zipcode').value,
        street: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        province: document.querySelector('#province').value,
        country: document.querySelector('#country').value,
      },
    };

    http
      .post(`${API_URL}`, contact)
      .then((result) => {
        ui.showAlert(result.msg, 'alert alert-success');
        ui.clearInputs();
        setTimeout(() => {
          new People();
        }, 600);
      })
      .catch((err) => console.log(err));
  }

  updateContact(e) {
    e.preventDefault();
    let firstName = document.querySelector('#fName').value;
    let lastName = document.querySelector('#lName').value;
    let email = document.querySelector('#email').value;

    let phoneNumbers = [];
    let formattedNumbers = document.querySelectorAll('.text-success > strong');

    formattedNumbers.forEach((formattedNumber) => {
      const number = formattedNumber.innerText;
      phoneNumbers.push(number);
      console.log('number =>', number);
    });
    const id = document.getElementById('id').value;
    let contact = {
      firstName,
      lastName,
      email,
      phoneNumbers,
      address: {
        zipcode: document.querySelector('#zipcode').value,
        street: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        province: document.querySelector('#province').value,
        country: document.querySelector('#country').value,
      },
    };

    http
      .put(`${API_URL}/${id}`, contact)
      .then((result) => {
        ui.showAlert(result.msg, 'alert alert-success');
        ui.clearInputs();
        setTimeout(() => {
          new People();
        }, 600);
      })
      .catch((err) => console.log(err));
  }

  // Cancel Edit State
  cancelEditState(e) {
    ui.changeState('add');
    ui.clearInputs(e);
  }
}

const app = new App();

app.loadAllEvents();
