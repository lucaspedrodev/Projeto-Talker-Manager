const fs = require('fs').promises;
const crypto = require('crypto');

const talkersData = async () => {
    try {
        const tkData = await fs.readFile('src/talker.json');
        const tkDataParse = JSON.parse(tkData);
        return tkDataParse;
    } catch (error) {
       console.log(error);
    }
};

const tokenGen = () => {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
};

module.exports = {
    talkersData,
    tokenGen,

};