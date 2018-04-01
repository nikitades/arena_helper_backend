module.exports = function raceSynergy(card, pick, type) {
    let msg = [];
    let chance = 0;
    if (card.race === type) {
        let count = pick.reduce(((acc, item) => item.synergies.indexOf(type.toLowerCase()) !== -1 ? acc + 1 : acc), 0);
        if (count > 2) msg.push(type.toLowerCase());
        chance += count * 5;
    }
    if (card.synergies.indexOf(type.toLowerCase()) !== -1) {
        let count = pick.redure(((acc, item) => item.race === type ? acc + 1 : acc), 0);
        if (count > 2) msg.push(type.toLowerCase());
        chance += count * 5;
    }
    return {msg, chance};
};