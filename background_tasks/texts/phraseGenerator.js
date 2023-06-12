const lunchPhrases = [
    "Enjoy your meal!", "Have a delicious lunch!", "Bon voyage to a delightful lunch adventure!", "Bon appétit!", "May your taste buds dance with joy during lunch!",
    "Enjoy a tasty lunch!", "Enjoy every bite!", "Enjoy your lunch to the fullest!", "Have a delightful lunch!", "May your lunch be a gastronomic delight!", "Wishing you a flavorful lunchtime experience!",
    "May your lunch be a culinary journey to new and exciting flavors!", "May your lunch be filled with joy!", "Have a satisfying lunch!", "Have an amazing lunch!", "Have a relaxing lunch!", "Enjoy your lunch!",
    "Enjoy a delicious lunch!", "Enjoy an excellent lunch!"
]

const dinnerPhrases= [
    "Enjoy!", "Have a delectable dinner!", "Have a lovely dinner!", "Have a flavorful dinner!", "Enjoy an excellent dinner!", "Enjoy every bite!", "Enjoy your dinner!", "Enjoy an amazing dinner!",
    "Enjoy your dinner to the fullest!", "Wishing you a delightful dinner!", "May your dinner be delightful!", "Have a tasty dinner!", "Enjoy a delicious dinner!", "Have a great dinner!"
]

const getRandPhrase = (mealtime) => {
    if (mealtime === 'dinner') {
        const randIndex = Math.floor(Math.random() * dinnerPhrases.length);
        return dinnerPhrases[randIndex];
    } else {
        const randIndex = Math.floor(Math.random() * lunchPhrases.length);
        return lunchPhrases[randIndex];
    }
}

module.exports = getRandPhrase;