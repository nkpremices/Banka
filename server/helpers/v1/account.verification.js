import dataStructureDb from '../../storage/data.structures';

const accountVerification = {
    name: (name, owner) => dataStructureDb.storages
        .accountsStorage
        .find(el => el.accountName === name && el.owner === owner),
    number: number => dataStructureDb.storages
        .accountsStorage
        .find(el => el.accountNumber === number),

};

export default accountVerification;
