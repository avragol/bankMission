class Client {
    firstName; //str
    lastName; //str
    ID; //int
};

class Account {
    ID; //int
    OwnerID; //int - ClientID
    Balance; //int
    TransactionsList; //arr of Transactions IDs
};

class Transactions {
    ID; //int
    Type; // "withdraw" or "deposit"
    Amount; //int
    AccountID; //int
};

let BankDB = {
    Clients: [],
    Accounts: [],
    Transactions: [],
    API: {
        getAccountById: function (accID) {
            for (let i = 0; i < BankDB.Accounts.length; i++) {
                if (BankDB.Accounts[i].ID === accID) return BankDB.Accounts[i];
                return null;
            }
        },
        getTransationsByAccountID: function (accID) {
            let account = BankDB.Accounts.find(acc => acc.ID == accID);
            return account.TransactionsList;
        },
        getBalance: function (accID) {
            const trans = BankDB.API.getTransationsByAccountID(accID);
            let Balance = 0;
            trans.forEach(tran => Balance += tran.Amount);
            return Balance;
        },
        getClientByID: function (clientID) {
            return BankDB.Clients.find(client => client.ID === clientID);
        },
    },
};
function initializeBankDB() {
    // 5 random Clients
    for (let i = 0; i < 5; i++) {
        let client = new Client();
        client.firstName = randomName();
        client.lastName = randomName();
        client.ID = randomID();
        BankDB.Clients.push(client);
    }

    // 15 random Accounts
    for (let i = 0; i < 15; i++) {
        let account = new Account();
        account.ID = randomID();
        account.OwnerID = randomClientID();
        account.Balance = 0;
        account.TransactionsList = [];
        BankDB.Accounts.push(account);
    }

    // 120 random Transactions
    for (let i = 0; i < 120; i++) {
        let transaction = new Transactions();
        transaction.ID = randomID();
        transaction.Type = randomType();
        transaction.Amount = randomAmount();
        transaction.AccountID = randomAccountID();
        if (transaction.Type === 'withdraw') transaction.Amount *= -1;
        let account = BankDB.Accounts.find(acc => acc.ID === transaction.AccountID);
        account.TransactionsList.push(transaction);
        BankDB.Transactions.push(transaction);
    }

    BankDB.Accounts.forEach(acc => acc.Balance = BankDB.API.getBalance(acc.ID));

    // Helper functions

    function randomName() {
        const names = ["John", "Jane", "David", "Sarah", "Mike"];
        return names[Math.floor(Math.random() * names.length)];
    }

    function randomID() {
        return Math.floor(Math.random() * 100000000);
    }

    function randomClientID() {
        return BankDB.Clients[Math.floor(Math.random() * BankDB.Clients.length)].ID;
    }

    function randomType() {
        const Types = ["deposit", "withdraw"];
        return Types[Math.floor(Math.random() * Types.length)];
    }

    function randomAmount() {
        return Math.floor(Math.random() * 5000);
    }
    function randomAccountID() {
        return BankDB.Accounts[Math.floor(Math.random() * BankDB.Accounts.length)].ID;
    }
};

initializeBankDB()