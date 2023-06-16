const fetch = require("node-fetch");

module.exports = class Espaco {
  constructor(nomeespaco, tipoespacos, localizacao, proprietario) {
    this.nomeespaco = nomeespaco;
    this.tipoespacos = tipoespacos;
    this.localizacao = localizacao;
    this.proprietario = proprietario;
    this.membros = [proprietario];
    this.coletor = {
      litrosTotal: 30,
      litrosAtual: 0,
    };
    this.solicitacoes = [];
  }

  async addEspaco() {
    const objEspaco = {
      ...this,
    };

    const response = await fetch("http://localhost:3000/espacos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objEspaco),
    });

    const result = await response.json();
    console.log("Espaço Adicionado: " + result);
  }

  static async fecthEspacos() {
    const res = await fetch("http://localhost:3000/espacos");

    const data = await res.json();

    return data;
  }
};
