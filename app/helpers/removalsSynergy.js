const enough = 2;
const checkRemoval = require('../../perkFinders/checkRemoval');

module.exports = function removalsSynergy(card, pick) {
    let removalCardsCount = pick.reduce(((acc, item) => checkRemoval(item) ? acc + 1 : acc), 0);
    if (removalCardsCount < enough && checkRemoval(card)) return {
        chance: 15,
        msg: ['removal_needed']
    };
    return {chance: 0, msg: []};
};