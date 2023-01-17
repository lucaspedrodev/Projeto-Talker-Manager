const fs = require('fs').promises;

const talkersData = async () => {
    try {
        const tkData = await fs.readFile('src/talker.json');
        const tkDataParse = JSON.parse(tkData);
        return tkDataParse;
    } catch (error) {
       console.log(error);
    }
};

module.exports = {
    talkersData,

};