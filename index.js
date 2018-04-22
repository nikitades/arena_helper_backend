const Koa = new require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const MongoDB = require('mongodb');
const app = new Koa();
const router = new Router();
const createServer = require('./server');
const arenaHandler = require('./app/arenaHandler');
const Validator = require('./Validator');
const config = require('./config');
const getMongoClient = require('./getMongoClient');

let startingPromises = [];

app.use(static('./public'));

startingPromises.push((async () => {
    const client = await getMongoClient(config.mongo.serverAddress, config.mongo.login, config.mongo.password, config.mongo.dbName);
    app.context.db = client.db(config.mongo.dbName);
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
    try {
        for (let i in startingPromises) await startingPromises[i];
    } catch (e) {
        console.error('Start failed!');
        console.error(e);
    }
    try {
        createServer(app.callback());
    } catch (e) {
        console.error('Runtime error!');
        console.error(e);
    }
})();