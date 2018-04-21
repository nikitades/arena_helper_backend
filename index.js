const Koa = new require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const MongoDB = require('mongodb');
const app = new Koa();
const router = new Router();
const createMongoServer = require('./mongoServer');
const createServer = require('./server');
const arenaHandler = require('./app/arenaHandler');
const Validator = require('./Validator');

let startingPromises = [];

app.use(static('./public'));

startingPromises.push((async () => {
    await createMongoServer();
    let client = await MongoDB.MongoClient.connect('mongodb://localhost:27017');
    app.context.db = client.db('arenahelper');
})());

startingPromises.push((async () => {
    app.context.validator = new Validator();
})());

/**
 * JSON
 */
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.body = JSON.stringify({
            "Alarm-o-bot": e.message
        });
        ctx.status = 500;
        return console.log(e);
    }
    if (ctx.status === 404) ctx.body = "Not found";
    else ctx.body = ctx.body || {};
    ctx.body = JSON.stringify(ctx.body);
});

router.get('/arena', arenaHandler);

app.use(router.routes());

(async () => {
    for (let i in startingPromises) await startingPromises[i];
    createServer(app.callback());
})();