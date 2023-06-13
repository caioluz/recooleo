const fetch = require("node-fetch");

// Classe Usuário
module.exports = class User {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  async add() {
    const objUser = {
      ...this,
    };

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objUser),
    });

    const result = await response.json();
    console.log("Usuário adicionado: " + result);
  }

  async edit(id) {
    const objUser = { ...this };

    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objUser),
    });

    const data = await res.json();
    console.log("Usuário editado: " + data);
  }

  static async fecthUser(email) {
    const res = await fetch(`http://localhost:3000/users?email=${email}`);

    const data = await res.json();

    return data;
  }
};
