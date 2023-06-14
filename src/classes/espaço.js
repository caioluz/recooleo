const fetch = require("node-fetch");

module.exports = class Espaco {
  constructor(nomeespaco, tipoespacos, localizacao, proprietario, membros) {
    this.nomeespaco = nomeespaco;
    this.tipoespacos = tipoespacos;
    this.localizacao = localizacao;
    this.proprietario = proprietario;
    this.membros = membros;
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
};
