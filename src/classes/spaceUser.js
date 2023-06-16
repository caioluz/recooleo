const fetch = require("node-fetch");

// Classe Usuário
module.exports = class SpaceUser {
  constructor(idUser, idSpace, approved) {
    this.idUser = idUser;
    this.idSpace = idSpace;
    this.approved = approved;
  }

  async add() {
    const obj = {
      ...this,
    };
    const response = await fetch("http://localhost:3000/spaceUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const result = await response.json();
  }

  static async getApprovedSpacesByUser(userId) {
    const resSpaceUser = await fetch(
      `http://localhost:3000/spaceUser?idUser=${userId}&approved=1`
    );
    const spacesUsers = await resSpaceUser.json();

    const spaces = await Promise.all(
      spacesUsers.map(async (obj) => {
        const spaceId = obj.idSpace;
        const resSpace = await fetch(
          `http://localhost:3000/spaces?id=${spaceId}`
        );
        const space = await resSpace.json();
        return space;
      })
    );

    return spaces;
  }

  static async getAllSpacesByUser(userId) {
    const resSpaceUser = await fetch(
      `http://localhost:3000/spaceUser?idUser=${userId}`
    );
    const spacesUsers = await resSpaceUser.json();

    const spaces = await Promise.all(
      spacesUsers.map(async (obj) => {
        const spaceId = obj.idSpace;
        const resSpace = await fetch(
          `http://localhost:3000/spaces?id=${spaceId}`
        );
        const space = await resSpace.json();
        return space;
      })
    );

    return spaces;
  }

  static async getAllUsersBySpace(spaceId) {
    const url = "http://localhost:3000/spaceUser?idSpace=" + spaceId;

    const resSpaceUser = await fetch(url);

    const spacesUsers = await resSpaceUser.json();

    const users = await Promise.all(
      spacesUsers.map(async (obj) => {
        const userId = obj.idUser;
        const resUser = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await resUser.json();
        return { user: user, approved: obj.approved };
      })
    );

    return users;
  }
};
