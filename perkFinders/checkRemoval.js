const removalsIDs = [
    'CS2_076',
    'EX1_161',
    'CS2_234',
    'EX1_622',
    'CS2_108',
    'EX1_309',
    'EX1_246',
    'CS2_022',
    'EX1_312',
    'NEW1_030',
    'EX1_083',
    'EX1_302',
    'CS2_029',
    'CS2_084',
    'CS2_012',
    'CS2_072',
    'EX1_410',
];

module.exports = function checkRemoval(id) {
    return removalsIDs.indexOf(id) !== -1;
};