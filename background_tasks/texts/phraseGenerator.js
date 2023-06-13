const lunchPhrases = [
    "Enjoy your meal!", "Have an awesome lunch!", "Have an amazing lunch!", "Enjoy your lunch!"
]

const dinnerPhrases= [
    "Enjoy!",  "Have a lovely dinner!", "Enjoy your dinner!", "Have an amazing dinner!", "Have a great dinner!"
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