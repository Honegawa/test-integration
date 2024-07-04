class Livre {
  static initID = 5;
  constructor(titre, auteur) {
    this.titre = titre;
    this.auteur = auteur;
    this.id = Livre.initID++;
  }
}

module.exports = Livre;
