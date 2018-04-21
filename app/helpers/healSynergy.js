const enough = 3;
const checkHeal = require('../../perkFinders/checkHeal');

module.exports = function healSynergy(card, pick) {
    let healCardsCount = pick.reduce(((acc, item) => checkHeal(item) ? acc + 1 : 0), 0);
    if (healCardsCount < enough && checkHeal(card)) return {
        chance: 10,
        msg: ['heal_needed']
    };
    return {chance: 0, msg: []};
};