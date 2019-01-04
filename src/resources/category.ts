import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";
import Constants from "../constants";
import { YnabResponse } from "../models/ynab-response";
import { CategoryGroup } from "../models/category-group";
import { Category } from "../models/category";

const queryCategories = async (z: ZObject, bundle: Bundle) => {
    const response: HttpResponse = await z.request({
        url: `${Constants.API_BASE}/budgets/${bundle.inputData.budgetId}/categories`
    });
    let categories: any[] = [];

    if (response.json) {
        let ynabResponse: YnabResponse = response.json;
        let categoryGroups: CategoryGroup[] = ynabResponse.data.category_groups;

        categoryGroups.forEach((group: CategoryGroup) => {
            if (!group.hidden && !group.deleted) {
                group.categories.forEach((category: Category) => {
                    if (!category.hidden && !category.deleted) {
                        categories.push({
                            id: category.id,
                            name: category.name
                        });
                    }
                });
            }
        });
    }

    return categories;
};

const Category = {
    key: 'category',
    noun: 'Category',
    display: {
        label: 'Budget Category',
        description: 'This is a hidden trigger',
        hidden: true
    },
    operation: {
        perform: queryCategories
    }
};

export default Category;