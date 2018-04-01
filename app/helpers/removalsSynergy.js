const enough = 2;

const checkIfRemoval = card => !card.perks && card.perks.indexOf('removal') !== -1;

module.exports = function removalsSynergy(card, pick) {
    let removalCardsCount = pick.reduce(((acc, item) => checkIfRemoval(item) ? acc + 1 : acc), 0);
    if (removalCardsCount < enough && checkIfRemoval(card)) return {
        chance: 15,
        msg: ['removal_needed']
    };
    return {chance: 0, msg: []};
};