var fetch = require('node-fetch');

async function generateFace() {
    return "https://api.lorem.space/image/face?w=500&h=500&rndmtoken=" + Math.random();
}

async function generateFurniture() {
    return "https://api.lorem.space/image/furniture?w=500&h=500&rndmtoken=" + Math.random();
}

async function generateDrink() {
    return "https://api.lorem.space/image/drink?w=500&h=500&rndmtoken=" + Math.random();
}

async function generateCursed() {
    let res = await fetch("https://cursedimg.herokuapp.com/api");
    let json = await res.json();
    return json["image"];
}

async function generatePokemon() {
    let id = Math.floor(Math.random() * 500);
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png"
}

async function generateFood() {
    let res = await fetch("https://foodish-api.herokuapp.com/api/");
    let json = await res.json();
    return json["image"];
}

module.exports = [
    {
        question: "Donne donc un nom à cette charmante personne :",
        generator: generateFace
    },
    {
        question: "Mais quel est le prénom de ce meuble ?",
        generator: generateFurniture
    },
    {
        question: "Décrivez la situation suivante (parce que là je sais pas ce que c'est)",
        generator: generateCursed
    },
    {
        question: "Donne un nom absolument incorrect à ce Pokémoune (ex : Francisco)",
        generator: generatePokemon
    },
    {
        question: "Décrivez ce plat à la manière de 'poulet piquante, manese'",
        generator: generateFood
    }
];