const silenceKeyword = new RegExp(/немот/i);
module.exports = function checkSilence(card) {
    return silenceKeyword.test(card.text);
};