import dataStructureDb from '../../storage/data.structures';

const storage = dataStructureDb.storages.usersStorage;

const loginUser = (user) => {
    storage[storage.indexOf(user)].isLoggedIn = true;
    // console.log(storage);
};

const register = {
    loginUser,
};

export default register;
