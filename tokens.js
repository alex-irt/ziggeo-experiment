const { ziggeoSdk, ziggeoConfig } = require('./ziggeoSDK');

const recordTokenSettings = {
    grants: JSON.stringify({ create: { all: true } }),
    session_limit: 1
};

function getAppToken() {
    return { appToken: ziggeoConfig.appToken };
}

function generateRecordToken() {
    return generateToken(recordTokenSettings);
}

function generateViewToken(id) {
    const viewTokenSettings = {
        grants: JSON.stringify({ read: { resources: [id] } }),
        session_limit: 1,
    };

    return generateToken(viewTokenSettings);
}

const sessionTokenSettings = {
    grants: JSON.stringify({
        create: { session_owned: true },
        destroy: { session_owned: true },
        read: { session_owned: true },
    }),
    session_limit: 1
};

function generateSessionToken() {
    return generateToken(sessionTokenSettings);
}

function generateToken(settings) {
    return new Promise((resolve, reject) => {
        ziggeoSdk.Authtokens.create(settings, authToken => {
            resolve(authToken);
        }, (args, error) => {
            reject(new Error(error));
        });
    });
}

module.exports = {
    getAppToken,
    generateRecordToken,
    generateViewToken,
    generateSessionToken
};
