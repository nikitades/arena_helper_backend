const MongoDB = require("mongodb");
module.exports = async function getClient(address, user, password, dbname) {
    let connectUri = address;
    if (user && password) connectUri = user + ':' + password + '@' + connectUri;
    connectUri = 'mongodb://' + connectUri + '/?authMechanism=DEFAULT&authSource=' + dbname;
    return MongoDB.MongoClient.connect(connectUri);
};