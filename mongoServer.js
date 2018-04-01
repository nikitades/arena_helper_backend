const MongoD = require('mongod');
const port = 27017;
const dbpath = './db';
const server = new MongoD({
    dbpath,
    port
});
server.open()
    .then(() => {
        console.log('Mongo Server started on ' + port + ' at ' + dbpath);
    })
    .catch(console.error);