import { ZObject, Bundle } from "zapier-platform-core";

const createTransaction = (z: ZObject, bundle: Bundle) => {
    return {}
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
                key: 'budgetId',
                label: 'Budget',
                required: true,
                dynamic: 'budget.id.name',
                altersDynamicFields: true
            },
            {
                key: 'accountId',
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
                key: 'payeeName',
                label: 'Payee',
                required: true,
                type: 'string'
            },
            {
                key: 'categoryId',
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
                key: 'cleared',
                label: 'Cleared',
                choices: ['cleared', 'uncleared', 'reconciled']
            },
            {
                key: 'flagColor',
                label: 'Flag Color',
                choices: ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
            }
        ],
        perform: createTransaction
    }
};

export default Transaction;