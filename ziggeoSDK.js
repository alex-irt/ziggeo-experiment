const Ziggeo = require('ziggeo');

const ziggeoConfig = {
    appToken: 'app-token',
    privateKey: 'app-private-key',
    encryptionKey: 'app-encryption-key'
};

const ziggeoSdk = new Ziggeo(ziggeoConfig.appToken, ziggeoConfig.privateKey, ziggeoConfig.encryptionKey);

module.exports = {
    ziggeoConfig,
    ziggeoSdk
};
