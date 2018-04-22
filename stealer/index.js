const request = require('request-promise');
const config = require('../config');
const getMongoClient = require('../getMongoClient');

const PERKS = ["DESTROY", "DISCARD", "HAND", "WEAPON", "SPELL", "SPELL DAMAGE", "COST", "ATTACK", "HEAL", "DIVINE SHIELD", "MURLOC", "PIRATE", "HEALTH", "MANA CRYSTAL", "DRAGON", "MECH", "BEAST", "DEMON", "RECRUIT", "DUPLICATES", "ELEMENTAL", "ADAPT", "FROZEN", "TOTEM", "JADE", "CHOOSE ONE"];
const CORRECTION = require('./correction');

(async () => {
    try {
        //init
        const client = await getMongoClient(config.mongo.serverAddress, config.mongo.login, config.mongo.password, config.mongo.dbName);
        const db = client.db(config.mongo.dbName);
        const col = db.collection('cards');

        //download
        const cardsStr = await request('https://api.hearthstonejson.com/v1/latest/enUS/cards.json');
        let cards = JSON.parse(cardsStr);
        const cardsCount = Object.values(cards).length;
        if (!cardsCount) throw new Error('No cards fetched');
        const locales = { //translate
            'ru': 'ruRU'
        };

        //locale
        for (const countryCode in locales) {
            const locale = locales[countryCode];
            const localeCardsStr = await request('https://api.hearthstonejson.com/v1/latest/' + locale + '/cards.json');
            const localeCards = JSON.parse(localeCardsStr);
            for (const i in cards) {
                cards[i][countryCode + 'Text'] = localeCards[i].text;
                cards[i][countryCode + 'Name'] = localeCards[i].name;
            }
        }

        cards = cards.map(card => {
            //synergies
            card.synergies = [];
            for (let perk of PERKS) {
                let regex = new RegExp(perk, 'i');
                if (regex.test(card.text)) card.synergies.push(perk);
            }

            //rating calculation
            card.rating = 35; //base
            const costRating = 4 - Math.abs(4 - card.cost);

            card.rating += costRating > 0 ? costRating * 5 : 0; //cose

            if (['WEAPON', 'SPELL'].indexOf(card.type) !== -1) card.rating += 25; //type
            if (['HERO'].indexOf(card.type) !== -1) card.rating += 50;

            if (card.rarity === 'RARE') card.rating += 5; //rarity
            if (card.rarity === 'EPIC') card.rating += 10;
            if (card.rarity === 'LEGENDARY') card.rating += 15;

            //correction
            if (card.id in CORRECTION) card.rating += CORRECTION[card.id];

            return card;
        });

        col.removeMany({});
        await col.insertMany(cards);

        client.close();
        console.log('Done!');

    } catch (e) {
        console.error(e);
    }
})();