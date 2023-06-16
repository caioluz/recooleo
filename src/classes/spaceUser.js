const fetch = require("node-fetch");

// Classe Usuário
module.exports = class SpaceUser {

  static async getSpaceByUser(userId) {
    const resSpaceUser = await fetch(`http://localhost:3000/spaceUser?idUser=${userId}&approved=1`);
    const spacesUsers = await resSpaceUser.json();

    const spaces = await Promise.all(spacesUsers.map(async obj => {
      const spaceId = obj.idSpace;
      const resSpace = await fetch(`http://localhost:3000/spaces?id=${spaceId}`);
      const space = await resSpace.json();
      return space;
    }));

    return spaces;
  }

};
