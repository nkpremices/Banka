import environment from '../configs/environnements';

const generateRandomNumber = () => Math
    .floor(Math.random() * (10 ** environment.accountNumberLength));

export default generateRandomNumber;
