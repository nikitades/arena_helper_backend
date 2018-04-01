const ratingAnalyzer = require('./ratingAnalyzer');

const ucfirst = str => {
    return str && str.split('').map((char, i) => i === 0 ? char.toUpperCase() : char).join('');
};

module.exports = async function arenaHandler(ctx, next) {
    let col = ctx.db.collection('cards');

    let input = await ctx.validator.check(ctx.query);
    input.className = ucfirst(input.className);

    const classList = await col.distinct('classification', {});
    if (classList.indexOf(input.className) === -1) return ctx.body = 'Nooo';

    // let cards = await col.find({
    //     $or: [
    //         {classification: input.className},
    //         {classification: {$exists: false}}
    //     ]
    // }).toArray();

    let fetchedRoster = await col.find({
        uuid: {
            $in: Array.isArray(input.roster) ? input.roster : [input.roster]
        }
    }).toArray();

    let pick = await col.find({
        uuid: {
            $in: Array.isArray(input.pick) ? input.pick : [input.pick]
        }
    }).toArray();

    ctx.body = await ratingAnalyzer(fetchedRoster, pick, ctx);
};