module.exports = function raceSynergy(card, pick, analyzedRace) {
    let msg = [];
    let chance = 0;
    if (card.race === analyzedRace) {
        let count = pick.reduce(((acc, item) => item.synergies.indexOf(analyzedRace) !== -1 ? acc + 1 : acc), 0);
        if (count > 2) msg.push(analyzedRace);
        chance += count * 5;
    }
    if (card.synergies.indexOf(analyzedRace) !== -1) {
        let count = pick.reduce(((acc, item) => item.race === analyzedRace ? acc + 1 : acc), 0);
        if (count > 2) msg.push(analyzedRace);
        chance += count * 5;
    }
    return {msg, chance};
};