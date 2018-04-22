const healKeyword = new RegExp(/восстанавливает/i);
module.exports = function checkHeal(card) {
    return healKeyword.test(card.text);
};