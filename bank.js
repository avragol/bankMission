

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        setTheBank();
        setEvents();
    }
};

const setTheBank = () => {


    let accountsCustomArray = [];
    BankDB.Accounts.forEach(acc => {
        const client = BankDB.API.getClientByID(acc.OwnerID);
        const newAcc = { ...acc, OwnerName: `${client.firstName} ${client.lastName}` }
        accountsCustomArray.push(newAcc);
    })


    let accountsListSection = document.getElementById('accounts-list');
    accountsListSection.innerHTML += bankRender(templates.account, accountsCustomArray);
};

//temlates
const templates = {
    account: `
            <div class="account">
                <div><label>AccountID: </label><span>{ID}</span></div>
                <div><label>OwnerID: </label><span>{OwnerID}</span></div>
                <div><label>Owner Name: </label><span>{OwnerName}</span></div>
                <div><label>Balance: </label><span> {Balance}</span></div>
            </div>
        `,
    transaction: `
            <div class="transaction">
                <div><label>Transaction: </label><span>{ID}</span></div>
                <div><label>Type: </label><span>{Type}</span></div>
                <div><label>Amount: </label><span>{Amount}</span></div>
            </div>
        `,
};

//events
const setEvents = () => {
    const accountsElements = document.querySelectorAll(".account");
    accountsElements.forEach(accElemnt => {
        accElemnt.addEventListener('click', () => {
            if (document.querySelector('.active')) document.querySelector('.active').classList.remove("active");
            accElemnt.classList.add("active");
            const accID = accElemnt.querySelector('span').textContent;
            const accTrans = BankDB.API.getTransationsByAccountID(accID);
            const deatelsPanel = document.getElementById('deatels-panel');
            let html = `<h3>deatels for account ${accID}</h3><div class="flex">`;
            html += bankRender(templates.transaction, accTrans);
            html += `</div>`
            deatelsPanel.innerHTML = html;
        })
    })
}