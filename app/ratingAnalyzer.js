const raceSynergy = require('./helpers/raceSynergy');
const costSynergy = require('./helpers/costSynergy');
const healthAttackSynergy = require('./helpers/healthAttackSynergy');
const drawSynergy = require('./helpers/drawSynergy');
const healSynergy = require('./helpers/healSynergy');
const silenceSynergy = require('./helpers/silenceSynergy');
const removalsSynergy = require('./helpers/removalsSynergy');

module.exports = async (roster, pick, ctx) => {
    let msg = [];
    let col = ctx.db.collection('cards');
    let races = await col.distinct('race');
    return {
        chances: roster.map(card => {
            let chance = 0;

            /** Race synergies */


            for (let i in races) {
                let raceData = raceSynergy(card, pick, races[i]);
                chance += raceData.chance;
                msg = msg.concat(raceData.msg);
            }

            /** Cost synergy */

            let costData = costSynergy(card, pick);
            chance += costData.chance;
            msg = msg.concat(costData.msg);

            /** Health synergy */

            let healthAttackData = healthAttackSynergy(card, pick);
            chance += healthAttackData.chance;
            msg = msg.concat(healthAttackData.msg);

            /** Draw synergy */

            let drawData = drawSynergy(card, pick);
            chance += drawData.chance;
            msg = msg.concat(drawData.msg);

            /** Heal synergy */

            let healData = healSynergy(card, pick);
            chance += healData.chance;
            msg = msg.concat(healData.msg);

            /** Silence synergy */

            let silenceData = silenceSynergy(card, pick);
            chance += silenceData.chance;
            msg = msg.concat(silenceData.msg);

            /** Removals synergy */

            let removalsData = removalsSynergy(card, pick);
            chance += removalsData.chance;
            msg = msg.concat(removalsData.msg);

            return card.rating + chance;
        }),
        msg: Array.from(new Set(msg))
    };
};