export default class UserService {
  static set(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static get() {
    return JSON.parse(localStorage.getItem("user"));
  }
}