import environment from '../configs/environnements';

/**
 * A fucntion to gnerate random numbers
 *
 */
const generateRandomNumber = () => Math
    .floor(Math.random() * (10 ** environment.accountNumberLength));

export default generateRandomNumber;
