import dataStructureDb from '../../storage/data.structures';

const userVerification = email => dataStructureDb
    .storages.usersStorage.find(el => el.email === email);

export default userVerification;
