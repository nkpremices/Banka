/**
 * A function to check wether a number is valid or not
 * @param {object} number - The number to check
 * @returns {object} - True when a pure number was provided
 */
const checkNumber = (number) => {
    const parsedNumber = parseInt(number, 10);
    // An object to return back after validation
    const retObj = !(parsedNumber && number.split(parsedNumber)[1]);
    return retObj;
};

export default checkNumber;
