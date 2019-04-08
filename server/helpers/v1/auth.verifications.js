import dataStructureDb from '../../storage/data.structures';

const userVerification = (email) => {
    let retValue;

    if (dataStructureDb.storages.usersStorage
        .find(el => el.email === email)) retValue = true;

    return retValue;
};

export default userVerification;
