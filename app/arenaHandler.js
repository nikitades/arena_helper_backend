const ratingAnalyzer = require('./ratingAnalyzer');

const ucfirst = str => {
    return str && str.split('').map((char, i) => i === 0 ? char.toUpperCase() : char).join('');
};

const getCard = async (col, id) => (await col.find({id}).limit(1).toArray()).pop();

module.exports = async function arenaHandler(ctx, next) {
    let col = ctx.db.collection('cards');

    let input = await ctx.validator.check(ctx.query);
    input.className = ucfirst(input.className);

    const classList = await col.distinct('cardClass', {});
    if (!input.className || classList.indexOf(input.className.toUpperCase()) === -1) return ctx.body = 'Nooo';

    let roster;
    if (Array.isArray(input.roster)) roster = await Promise.all(input.roster.map(id => getCard(col, id)));
    else roster = !!input.roster ? [await getCard(col, input.roster)] : [];

    let pick;
    if (Array.isArray(input.pick)) pick = await Promise.all(input.pick.map(id => getCard(col, id)));
    else pick = !!input.pick ? [await getCard(col, input.pick)] : [];

    ctx.body = await ratingAnalyzer(roster, pick, ctx);
};