const ideal = {
    1: 3,
    2: 4,
    3: 4,
    4: 5,
    5: 5,
    6: 4,
    7: 4
};

const getSymbolicCost = card => card.mana > 7 ? 7 : card.mana;

module.exports = function costSynergy(card, pick) {
    let cost = getSymbolicCost(card);
    let chance = 0;
    let msg = [];
    let currentCostMap = pick.reduce(((acc, item) => {
        let itemCost = getSymbolicCost(item);
        acc[itemCost] = acc[itemCost] ? acc[itemCost] + 1 : 1;
        return acc;
    }), {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
    });
    if (currentCostMap[cost] > ideal[cost]) {
        chance = -5 * currentCostMap[cost] - ideal[cost];
        msg.push('too_much_of_cost');
    }
    else chance = 5 * ideal[cost] - currentCostMap[cost];
    return {
        chance,
        msg
    }
};