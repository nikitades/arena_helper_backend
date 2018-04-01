const enough = 3;
const drawKeyword = new RegExp(/draw/i);

const checkIfDraws = card => card.text.search(drawKeyword) !== -1;

module.exports = function drawSynergy(card, pick) {
    let drawCardsCount = pick.reduce(((acc, item) => checkIfDraws(item) ? acc + 1 : acc), 0);
    if (drawCardsCount < enough && checkIfDraws(card)) return {
        chance: 10,
        msg: ['draw_needed']
    };
    return {chance: 0, msg: []};
};