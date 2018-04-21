const enough = 3;
const checkDraw = require('../../perkFinders/checkDraw');

module.exports = function drawSynergy(card, pick) {
    let drawCardsCount = pick.reduce(((acc, item) => checkDraw(item) ? acc + 1 : acc), 0);
    if (drawCardsCount < enough && checkDraw(card)) return {
        chance: 10,
        msg: ['draw_needed']
    };
    return {chance: 0, msg: []};
};