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
      .addEventListener('click', (e) => this.addContact(e));

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

    //Delete contact
    document
      .querySelector('#delete-btn')
      .addEventListener('click', (e) => this.deleteContact(e));

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

    document
      .querySelector('#contactWrapper')
      .addEventListener('click', (e) => this.deleteOnePhoneNumber(e));
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

  deleteOnePhoneNumber(e) {
    if (e.target.parentElement.classList.contains('del-by-icon')) {
      const id = e.target.parentElement.dataset.id;

      if (confirm('Are you sure?')) {
        // Call the API to delete the phone number
        http.delete(`${API_URL}/phones/${id}`).then((result) => {
          e.target.parentElement.parentElement.remove();
          ui.showAlert(result.msg, 'alert alert-warning');
        });
      }
    }

    e.preventDefault();
  }

  editContact(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains('edit')) {
      ui.clearPhoneNumbers(e);
      const id = e.target.parentElement.dataset.id;

      http.get(`${API_URL}/${id}`).then((data) => {
        // Get the contact Object
        const contact = data.data[0];

        // Change the add state to edit state
        ui.changeState('edit');

        ui.fillInputs(contact, id, e);
      });
    }
  }

  deleteContact(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;

    if (confirm('Are you sure?')) {
      http.delete(`${API_URL}/${id}`).then((result) => {
        ui.showAlert(result.msg, 'alert alert-warning');
        ui.clearInputs(e);
        ui.changeState('add');

        setTimeout(() => new People(), 600);
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

  addContact(e) {
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
        ui.clearInputs(e);
        setTimeout(() => {
          new People();
        }, 800);
      })
      .catch((err) => console.log(err));
  }

  updateContact(e) {
    let firstName = document.querySelector('#fName').value;
    let lastName = document.querySelector('#lName').value;
    let email = document.querySelector('#email').value;

    let phoneNumbers = [];
    let phoneIDs = [];
    let formattedNumbers = document.querySelectorAll('.text-success > strong');

    formattedNumbers.forEach((formattedNumber) => {
      const number = formattedNumber.innerText;
      phoneNumbers.push(number);
    });

    document.querySelectorAll('.phoneNumberWrapper').forEach((phone, i) => {
      phoneIDs.push(document.querySelector(`#phone_${i + 1}`).dataset.id);
    });

    const id = document.getElementById('id').value;
    let contact = {
      firstName,
      lastName,
      email,
      phoneNumbers,
      phoneIDs,
      address: {
        zipcode: document.querySelector('#zipcode').value,
        street: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        province: document.querySelector('#province').value,
        country: document.querySelector('#country').value,
      },
    };

    //Put request for the API
    http
      .put(`${API_URL}/${id}`, contact)
      .then((result) => {
        ui.showAlert(result.msg, 'alert alert-success');
        ui.clearInputs(e);
        ui.changeState('add');
        setTimeout(() => {
          new People();
        }, 800);
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
