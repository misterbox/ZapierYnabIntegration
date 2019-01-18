import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";
import Constants from "../constants";
import { YnabResponse } from "../models/ynab-response";

const createTransaction = async (z: ZObject, bundle: Bundle) => {
    let transactionId: string = '';
    const milliUnits = bundle.inputData.amount * 1000;
    const response: HttpResponse = await z.request(`${Constants.API_BASE}/budgets/${bundle.inputData.budget_id}/transactions`,{
        method: 'POST',
        body: {
            transaction: {
                account_id: bundle.inputData.account_id,
                date: bundle.inputData.date,
                amount: milliUnits,
                payee_name: bundle.inputData.payee_name,
                category_id: bundle.inputData.category_id,
                memo: bundle.inputData.memo,
                cleared: bundle.inputData.is_cleared,
                flag_color: bundle.inputData.flag_color
            }
        }
    });

    if (response.json) {
        let ynabResponse: YnabResponse = response.json;
        transactionId = ynabResponse.data.transaction_ids[0] || '';
    }

    return {
        transaction_id: transactionId
    }
};

const Transaction = {
    key: 'transaction',
    noun: 'Transaction',
    display: {
        label: 'Create Transaction',
        description: 'Create a transaction in a budget.'
    },

    operation: {
        inputFields: [
            {
                key: 'budget_id',
                label: 'Budget',
                required: true,
                dynamic: 'budget.id.name',
                altersDynamicFields: true
            },
            {
                key: 'account_id',
                label: 'Account',
                required: true,
                dynamic: 'account.id.name'
            },
            {
                key: 'date',
                label: 'Transaction Date',
                required: true,
                type: 'datetime'
            },
            {
                key: 'payee_name',
                label: 'Payee',
                required: true,
                type: 'string'
            },
            {
                key: 'category_id',
                label: 'Category',
                required: true,
                dynamic: 'category.id.name'
            },
            {
                key: 'amount',
                label: 'Transaction Amount',
                required: true,
                type: 'number'
            },
            {
                key: 'memo',
                label: 'Memo',
                type: 'string'
            },
            {
                key: 'is_cleared',
                label: 'Cleared',
                choices: ['cleared', 'uncleared', 'reconciled']
            },
            {
                key: 'flag_color',
                label: 'Flag Color',
                choices: ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
            }
        ],
        perform: createTransaction
    }
};

export default Transaction;