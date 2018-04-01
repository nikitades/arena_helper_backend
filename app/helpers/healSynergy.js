const checkIfHeals = card => card.text.match(/restore/i);
const enough = 3;

module.exports = function healSynergy(card, pick) {
    let healCardsCount = pick.reduce(((acc, item) => checkIfHeals(item) ? acc + 1 : 0), 0);
    if (healCardsCount < enough && checkIfHeals(card)) return {
        chance: 10,
        msg: ['heal_needed']
    };
    return {chance: 0, msg: []};
};