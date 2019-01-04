import { Category } from "./category";

export interface CategoryGroup {
    id: string;
    name: string;
    hidden: boolean;
    deleted: boolean;
    categories: Category[];
}