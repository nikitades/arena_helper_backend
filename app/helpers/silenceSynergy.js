const enough = 1;
const silenceKeyword = new RegExp(/silence/i);

const checkIfSilences = card => card.text.search(silenceKeyword) !== -1;

module.exports = function silenceSynergy(card, pick) {
    let silenceCardsCount = pick.reduce(((acc, item) => checkIfSilences(item) ? acc + 1 : acc), 0);
    if (silenceCardsCount < enough && checkIfSilences(card)) return {
        chance: 10,
        msg: ['silence_needed']
    };
    return {chance: 0, msg: []};
};