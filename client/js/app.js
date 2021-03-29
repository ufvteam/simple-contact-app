import { http } from './http.js';
import { ui } from './ui.js';

const API_URL = 'http://localhost:3000/api/contacts';

class People {
  constructor() {
    http
      .get(`${API_URL}`)
      .then((people) => ui.showPeople(people))
      .catch((err) => console.log(err));
  }
}

class App {
  constructor() {
    new People();
  }

  loadAllEvents() {
    // Add a person
    document.querySelector('#add-btn').addEventListener('click',this.addContact);

    document.querySelector("#delete-all-btn").addEventListener('click',this.deleteAllContacts);

  }

  deleteAllContacts(){
    if(confirm('Are you sure ?')){
      http.delete(`${API_URL}/deleteAll`)
      .then(result => {
        ui.showAlert(result.msg,'alert alert-danger');

        setTimeout(() => {
          new People();
        }, 600);
        
      }).catch(err => console.log(err))
    }
  }


  addContact(){

    let firstName = document.querySelector("#fName").value;
    let lastName = document.querySelector("#lName").value;
    let email = document.querySelector("#email").value;

    let phoneNumbers = [];
    phoneNumbers.push(document.querySelector("#phoneText > strong").innerText);
  
      let contact = {
        firstName,
        lastName,
        email,
        phoneNumbers,
        address : {
          "zipcode": document.querySelector("#zipcode").value,
          "street" : document.querySelector("#address").value,
          "city" : document.querySelector("#city").value,
          "province": document.querySelector("#province").value,
          "country": document.querySelector("#country").value
        }
      }

      console.log('Data is ---> ',JSON.stringify(contact));

      http
      .post(`${API_URL}`,contact)
      .then(result => {

        ui.showAlert(result.msg, 'alert alert-success')
        setTimeout(() => {
          new People();
        }, 600);

    
      })
      .catch((err) => console.log(err));

  }

}

const app = new App();
app.loadAllEvents();