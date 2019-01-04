import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";
import Constants from "../constants";
import { YnabResponse } from "../models/ynab-response";
import { Budget } from "../models/budget";

const queryBudgets = async (z: ZObject, bundle: Bundle) => {
    const response: HttpResponse = await z.request(`${Constants.API_BASE}/budgets`, {
        method: 'GET'
    });
    let budgets: any[] = [];

    if (response.json) {
        let ynabResponse: YnabResponse = response.json;
        let ynabBudgets: Budget[] = ynabResponse.data.budgets;

        ynabBudgets.forEach((budget: Budget) => {
            budgets.push({
                id: budget.id,
                name: budget.name
            });
        });
    }

    return budgets;
};

const Budget = {
    key: 'budget',
    noun: 'Budget',
    display: {
        label: 'List of Budgets',
        description: 'This is a hidden trigger',
        hidden: true
    },
    operation: {
        perform: queryBudgets
    }
};

export default Budget;