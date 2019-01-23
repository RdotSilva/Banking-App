const transactions = document.querySelector("#enter_transaction")
const transactionsSavings = document.querySelector("enter_transaction_savings");
const transactionType = document.querySelector("#transaction_type") 
const transactionTypeSavings = document.querySelector("#transaction_type_savings");
const transAmount = document.querySelector("#transaction_amount");
const transAmountSavings = document.querySelector("#transaction_amount_savings");
const transDescription = document.querySelector("#transaction_description");
const table = document.querySelector("#trans_table");
const tableSavings =  document.querySelector("#trans_table_savings");
const desc = document.querySelector("#desc");
const checkingStartingBalance = document.querySelector("#checking_balance");
const savingsStartingBalance = document.querySelector("#savings_balance");
const balanceInfo = document.querySelector("#balance_info");

let checkingAccount = {
    // Checking account.
    name: "checking",
    balance: 0.00,
    allTransactions: [],
    deposit: function (amount) {
        this.balance += amount;
        this.allTransactions.push({
            type: "deposit",
            amount: amount,
        })
    },
    withdraw: function (amount) {
        this.balance -= amount;
        this.allTransactions.push({
            type: "withdrawal",
            amount: amount,
        })
    },   
    debit: function (amount, purpose) {
        this.balance -= amount;
        this.allTransactions.push({
            type: "debit",
            amount: amount,
            purpose: purpose,
        });
    },
    transfer: function (amount, transferAccount) {
        this.balance -= amount;
        transferAccount.balance += amount;
        transferAccount.allTransactions.push({
            type: "transfer",
            amount: amount,
            purpose: "transfer",
        }),
        this.allTransactions.push({
            type: "transfer",
            amount: amount,
            purpose: "transfer",
        })
    }
}

let savingsAccount = {
    // Savings account.
    name: "savings",
    balance: 0,
    allTransactions: [],
    deposit: function (amount) {
        this.balance += amount;
        this.allTransactions.push({
            type: "deposit",
            amount: amount,
        })
    },
    withdraw: function (amount) {
        this.balance -= amount;
        this.allTransactions.push({
            type: "withdrawal",
            amount: amount,
        })
    },   
    debit: function (amount, purpose) {
        this.balance -= amount;
        this.allTransactions.push({
            type: "debit",
            amount: amount,
            purpose: purpose,
        });
    },
    transfer: function (amount, transferAccount) {
        this.balance -= amount;
        transferAccount.balance += amount;
        transferAccount.allTransactions.push({
            type: "transfer",
            amount: amount,
            purpose: "transfer",
        }),
        this.allTransactions.push({
            type: "transfer",
            amount: amount,
            purpose: "transfer",
        })
    }
}

hideStartingInfo(); // Call this at start to hide info until we need it.

function hideStartingInfo() {
    // Hides savings/checking info and transaction info.
    hideToggle(checking_info); 
    hideToggle(savings_info); 
    hideToggle(transactions);  
}

function printTable(tableId, account, transferMessage) {
    // Prints items to table as they are entered.
    let newRow = tableId.insertRow(-1);5
    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);
    newCell1.innerHTML = account.allTransactions[account.allTransactions.length - 1].type;
    newCell3.innerHTML = account.allTransactions[account.allTransactions.length - 1].amount;
    newCell4.innerHTML = account.balance;
    if (account.allTransactions[account.allTransactions.length - 1].purpose != undefined) {
        if(account.allTransactions[account.allTransactions.length - 1].purpose === "transfer") {
            newCell2.innerHTML = transferMessage;
        } else {
            newCell2.innerHTML = account.allTransactions[account.allTransactions.length - 1].purpose;
        }
    } else {
        newCell2.innerHTML = "";
    }
}

function mainBankChecking() {
    // Checks which transaction button is selected and executes correct function.
    if (transactionType.value === "Debit") {
        runDebitChecking();
        transDescription.value = "";
        transAmount.value = "";
    } else if (transactionType.value === "Deposit") {
        runDepositChecking();
        transAmount.value = "";
    } else if (transactionType.value === "Withdraw") {
        runWithdrawChecking();
        transAmount.value = "";
    } else if (transactionType.value === "Transfer") {
        runTransferChecking();
        transAmount.value = "";
    }
}

function mainBankSavings() {
    // Checks which transaction button is selected and executes correct function.
    if (transactionTypeSavings.value === "Deposit") {
        runDepositSavings();
        transAmountSavings.value = "";
    } else if (transactionTypeSavings.value === "Withdraw") {
        runWithdrawSavings();
        transAmountSavings.value = "";
    } else if (transactionTypeSavings.value === "Transfer") {
        runTransferSavings();
        transAmountSavings.value = "";
    }
}

function runDebitChecking() {
    // Checking debit.
    let howMuch = Number.parseFloat(transAmount.value);
    let forWhat = transDescription.value;
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
           alert("Enter positive number.");
        } else {
            if (checkingAccount.balance >= howMuch) {
                checkingAccount.debit(howMuch, forWhat);
                displayAccountBalances();
                printTable(table, checkingAccount);
            } else {
                alert("Not enough funds for transaction.")
            }
        }
}

function runDepositChecking() {
    // Checking deposit.
    let howMuch = Number.parseFloat(transAmount.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.")
        } else {
            checkingAccount.deposit(howMuch);
            displayAccountBalances();
            printTable(table, checkingAccount);
        } 
}

function runDepositSavings() {
    // Savings deposit.
    let howMuch = Number.parseFloat(transAmountSavings.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.")
        } else {
            savingsAccount.deposit(howMuch);
            displayAccountBalances(); 
            printTable(tableSavings, savingsAccount);
        } 
}

function runWithdrawChecking() {
    // Checking withdrawal.
    let howMuch = Number.parseFloat(transAmount.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.");
        } else {
            if (checkingAccount.balance >= howMuch) {
                checkingAccount.withdraw(howMuch);
                displayAccountBalances();
                printTable(table, checkingAccount);
            } else {
                alert("Not enough funds for transaction.")
            }
    }  
}

function runWithdrawSavings() {
    // Savings withdrawal.
    let howMuch = Number.parseFloat(transAmountSavings.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.");
        } else {
            if (savingsAccount.balance >= howMuch) {
                savingsAccount.withdraw(howMuch);
                displayAccountBalances();
                printTable(tableSavings, savingsAccount);
            } else {
                alert("Not enough funds for transaction.")
            }
    }  
}

function runTransferChecking() {
    // Transfer Checking to Savings.
    let howMuch = Number.parseFloat(transAmount.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.");
        } else {
            if (checkingAccount.balance >= howMuch) {
                checkingAccount.transfer(howMuch, savingsAccount);
                displayAccountBalances();
                printTable(table, checkingAccount, "Transfer to Savings");
                printTable(tableSavings, savingsAccount, "Transfer from Checking");
            } else {
                alert("Not enough funds for transaction.")
            }
    }  
}

function runTransferSavings() {
    // Transfer Savings to Checking.
    let howMuch = Number.parseFloat(transAmountSavings.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.");
        } else {
            if (savingsAccount.balance >= howMuch) {
                savingsAccount.transfer(howMuch, checkingAccount);
                displayAccountBalances();
                printTable(tableSavings, savingsAccount, "Transfer to Checking");
                printTable(table, checkingAccount, "Transfer from Savings");
            } else {
                alert("Not enough funds for transaction.")
            }
    }  
}

function displayAccountBalances () {
    // Displays current balance of both accounts.
    document.querySelector("#current_checking_balance").textContent = "Current Balance: $" + checkingAccount.balance;
    document.querySelector("#current_savings_balance").textContent = "Current Balance: $" + savingsAccount.balance;
}

function getStartingBalance() {
    // Get starting balance of both accounts.
    let checkStart = parseFloat(checkingStartingBalance.value);
    let saveStart = parseFloat(savingsStartingBalance.value);
    let checkFixed = parseFloat(checkStart.toFixed(2));
    let saveFixed = parseFloat(saveStart.toFixed(2));
    if (isNaN(checkStart) || isNaN(saveStart)) {
        alert("Enter starting balance.")
    } else {
        checkingAccount.balance = checkFixed;
        savingsAccount.balance = saveFixed;
        clearBox("balance_info");
        displayAccountBalances();
        hideToggle(checking_info);
        hideToggle(savings_info);
        hideToggle(transactions);
        hideToggle(balanceInfo);
    } 
}

function clearBox(elementID) {
    // Clears element html.
    document.getElementById(elementID).innerHTML = "";
}

function checkTransType() {
    // Checks transaction type. If debit it then shows description box. If not debit it hides box.
    if (transactionType.value === "Debit") {
        desc.style.display = "block";
        transDescription.value = "";
    } else if (transactionType.value === "Deposit") {
        desc.style.display = "none";
    } else if (transactionType.value === "Withdraw") {
        desc.style.display = "none";
    } else if (transactionType.value === "Transfer") {
        desc.style.display = "none";
    }
}

function hideToggle(itemToHide) {
    // Toggle to hide items.
    if (itemToHide.style.display === "none") {
        itemToHide.style.display = "block";
    } else {
        itemToHide.style.display = "none";
    }
}

function validate(event) {
    // Limits input boxes to .00 decimal places. Use this function oninput for input boxess in html.
    let x = this.value;
    this.value = (x.indexOf(".") >= 0) ? (x.substr(0, x.indexOf(".")) + x.substr(x.indexOf("."), 3)) : x;
}

checkingStartingBalance.addEventListener("input", validate);
savingsStartingBalance.addEventListener("input", validate);
transAmount.addEventListener("input", validate);
transAmountSavings.addEventListener("input", validate);
document.querySelector("#submit_balance").addEventListener("click", getStartingBalance);
document.querySelector("#submit_transaction").addEventListener("click", () => {
    mainBankChecking();
});
document.querySelector("#submit_transaction_savings").addEventListener("click", () => {
    mainBankSavings();
});
transactionType.addEventListener("click", checkTransType);