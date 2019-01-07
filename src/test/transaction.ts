import { createAppTester, Bundle } from 'zapier-platform-core';
import * as should from 'should';
import * as nock from 'nock';
import App from '../index';
import Constants from '../constants';

const appTester = createAppTester(App);

describe('Transaction Creates', () => {
    it('should create a transaction if minimum inputs are provided', async () => {
        const expectedBudgetId = 'budget1';
        const expectedAccountId = 'account1';
        const expectedDate = '2019-01-01';
        const expectedAmount = 150;
        const expectedPayeeName = 'hotbox cookies';
        const expectedCategoryId = 'category1';
        const bundle = {
            inputData: {
                budgetId: expectedBudgetId,
                accountId: expectedAccountId,
                date: expectedDate,
                payeeName: expectedPayeeName,
                categoryId: expectedCategoryId,
                amount: expectedAmount
            }
        };
        
        nock(Constants.API_BASE)
            .post(`budgets/${expectedBudgetId}/transactions`, (body: any) => {
                console.log('body: ', body);

                return true;
            })
            .reply(200, {

            });

        const response = await appTester(App.creates.transaction.operation.perform, bundle);
        should(true);
    });
});