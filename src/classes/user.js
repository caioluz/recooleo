const fetch = require("node-fetch");

// Classe Usuário
module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async add() {
    const obj = {
      ...this,
    };

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const result = await response.json();
  }

  async edit(id) {
    const obj = { ...this };
    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
  }

  static async fecth(email) {
    const res = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await res.json();
    return data;
  }
};
