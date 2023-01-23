const fs = require('fs').promises;
// const path = require('path');
const crypto = require('crypto');

// const jsonPath = path.resolve(`${__dirname}/talker.json`);

const talkersData = async () => {
    try {
        const data = await fs.readFile('src/talker.json');
        const tkData = JSON.parse(data);
        return tkData;
    } catch (error) {
        console.log(`Erro na leitura : ${error}`);
    }
};

console.log(talkersData());

const tokenGen = () => {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
};

// const writeTalkerFile = async (talker) => {
//     try {
//       const talkerData = await talkersData();
//       const newTalker = {
//         name: talker.name,
//         age: talker.age,
//         id: talkerData[talkerData.length - 1].id + 1,
//         talk: talker.talk,
//       };
//       const allTalkers = JSON.stringify([...talkerData, newTalker]);
//       await fs.writeFile(jsonPath, allTalkers);
//       return newTalker;
//       } catch (err) {
//         return null;s
//       }
//   };

// const newTalkerObj = async (talker) => {    
//     const talkers = await talkersData();
//     const ids = talkers[talkers.length - 1].id + 1;
//     const talkerObj = { id: ids, ...talker };
//     const talkerObjMake = JSON.stringify([...talkers, talkerObj]);
//     await fs.writeFile(jsonPath, talkerObjMake);
//     return talkerObjMake;
// };

// const registerNewTalker = async (newTalker) => {
//     const talkerList = await talkersData();
//     const newId = talkerList[talkerList.length - 1].id + 1;
//     const newObj = { id: newId, ...newTalker };
//     talkerList.push(newObj);
//     await fs.writeFile(jsonPath, JSON.stringify(talkerList));
//     return newObj;
// };

const writeNewTalkerData = async (talk) => {
      const data = await talkersData();
      const newTalkerId = { id: data.length + 1, ...talk };
      const talkers = JSON.stringify([...data, newTalkerId]);

      await fs.writeFile(('src/talker.json'), talkers);

      return newTalkerId;  
};

const talkerDelete = async (id) => {
    const talkers = await talkersData();

    const talkerFilter = talkers.filter((talk) => talk.id !== id);

    const updateData = JSON.stringify(talkerFilter);
 
        await fs.writeFile('src/talker.json', updateData);
};  
    
module.exports = {
    talkersData,
    tokenGen,
    writeNewTalkerData,
    talkerDelete,
};