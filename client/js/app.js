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
}

const app = new App();
