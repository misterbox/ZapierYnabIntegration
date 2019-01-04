import { Bundle, ZObject, HttpResponse } from "zapier-platform-core";
import Constants from "../constants";
import { YnabResponse } from "../models/ynab-response";
import { Account } from "../models/account";

const queryAccounts = async (z: ZObject, bundle: Bundle) => {
    const response: HttpResponse = await z.request({
        url: `${Constants.API_BASE}/budgets/${bundle.inputData.budgetId}/accounts`
    });
    let accounts: any[] = [];

    if (response.json) {
        let ynabResponse: YnabResponse = response.json;
        let ynabAccounts: Account[] = ynabResponse.data.accounts;

        ynabAccounts.forEach((account: Account) => {
            if (!account.closed) {
                accounts.push({
                    id: account.id,
                    name: account.name
                });
            }
        });
    }

    return accounts;
};

const Account = {
    key: 'account',
    noun: 'Account',
    display: {
        label: 'Payee Account',
        description: 'This is a hidden trigger',
        hidden: true
    },
    operation: {
        perform: queryAccounts
    }
};

export default Account;