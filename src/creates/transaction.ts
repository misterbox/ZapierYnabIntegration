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
                dynamic: 'budget.id.name'
            }
        ],
        perform: createTransaction
    }
};

export default Transaction;