function generateFace() {
    //https://api.lorem.space/image/face?w=300&h=300
}

function generateFurniture() {
    //https://api.lorem.space/image/furniture?w=150&h=150
}

function generateDrink() {
    //https://api.lorem.space/image/drink?w=150&h=150
}

function generateCursed() {
    //https://cursedimg.herokuapp.com/api
}

function generatePokemon() {
    //https://pokeapi.co/api/v2/pokemon/{id or name}/
}

const SOURCES = [
    {
        question: "Donne donc un nom à cette charmante personne :",
        generator: generateFace
    },
    {
        question: "Mais comment peut bien s'appeler ce meuble ?",
        generator: generateFurniture
    },
    {
        question: "Slurp slurp, décrivez moi ce cocktail",
        generator: generateDrink
    },
    {
        question: "Décrivez la situation suivante (parce que là je sais pas ce que c'est)",
        generator: generateCursed
    },
    {
        question: "Donnez un nom absolument incorrect à ce Pokémoune",
        generator: generatePokemon
    }
]