const bigHealth = 5;
const enough = 5;

module.exports = function healthAttackSynergy(card, pick) {
    let bigCardsCount = pick.filter(item => item.health > bigHealth).length;
    if (bigCardsCount < enough && card.health > bigHealth) return {
        chance: 10,
        msg: ['big_cards_needed']
    };
    return {chance: 0, msg: []};
};