const healKeyword = new RegExp(/восстанавливает/i);
module.expors = function checkHeal(card) {
    return healKeyword.test(card.text);
};