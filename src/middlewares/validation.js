const emailValidation = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const emailVerify = regex.test(email);

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!emailVerify) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
}; 

const passwordValidation = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório',
});
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
          }); 
    }
    next();
};

const autoriza = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });   
    }
    if (authorization.length < 16 || typeof authorization !== 'string') {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next(); 
};

const nameValidation = (req, res, next) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
          });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const ageValidation = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
          });
        }
    // if (typeof idade !== 'number') {
    //     return res.status(400).json();
    // }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const talkValidation = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório',
          });
    }
    next();
};

const watchedAtValidation = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const regexValidation = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
 
    if (!watchedAt) {
        return res.status(400).json({
            message: 'O campo "watchedAt" é obrigatório',
          });
    }
    if (!regexValidation.test(watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
};

const rateValidation = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    if (rate === undefined) {
        return res.status(400).json({
            message: 'O campo "rate" é obrigatório',
          });
    }
    if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
          });
    }
    next();
    };
 
module.exports = {
    emailValidation,
    passwordValidation,
    autoriza,
    nameValidation,
    ageValidation,
    talkValidation,
    watchedAtValidation,
    rateValidation,

};
