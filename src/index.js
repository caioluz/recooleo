// Classe Usuário
class User {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}

const addUser = async (user) => {
  const body = { id: 3, ...user };

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log("Usuário adicionado" + result);
};

document.querySelector("#form-cadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  //Pega os valores preenchidos
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#password").value;

  let usuario = new User(nome, email, senha);

  addUser(usuario);

  //Store.addUser(usuario);
});
