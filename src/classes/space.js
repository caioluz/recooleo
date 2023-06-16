const fetch = require("node-fetch");

module.exports = class Space {
  constructor(name, type, street, owner) {
    this.name = name;
    this.type = type;
    this.street = street;
    this.owner = owner;
    this.coletor = {
      litrosTotal: 30,
      litrosAtual: 0,
    };
  }

  async add() {
    const obj = {
      ...this,
    };
    const response = await fetch("http://localhost:3000/spaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const result = await response.json();
  }

  static async fecth() {
    const res = await fetch("http://localhost:3000/spaces");
    const data = await res.json();
    return data;
  }
};
