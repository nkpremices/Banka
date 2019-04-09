import dataStructureDb from '../../storage/data.structures';

const accountVerification = name => dataStructureDb
    .storages.accountsStorage.find(el => el.accountName === name);

export default accountVerification;
