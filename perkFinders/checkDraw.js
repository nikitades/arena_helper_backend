const drawKeyword = new RegExp(/берет/i);
module.exports = function checkDraw(card) {
    return drawKeyword.test(card.text);
};