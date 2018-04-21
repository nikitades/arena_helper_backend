const enough = 1;
const checkIfSilences = require('../../perkFinders/checkSilence');

module.exports = function silenceSynergy(card, pick) {
    let silenceCardsCount = pick.reduce(((acc, item) => checkIfSilences(item) ? acc + 1 : acc), 0);
    if (silenceCardsCount < enough && checkIfSilences(card)) return {
        chance: 10,
        msg: ['silence_needed']
    };
    return {chance: 0, msg: []};
};